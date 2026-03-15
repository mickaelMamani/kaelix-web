import Stripe from "stripe"
import { stripe } from "@/lib/stripe/client"
import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"

/**
 * Creates a Supabase admin client using the service role key.
 * This bypasses RLS so the webhook can write to all tables.
 */
function createAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )
}

/**
 * Maps a Stripe invoice status to our local InvoiceStatus enum value.
 */
function mapInvoiceStatus(
  stripeStatus: string | null
): "draft" | "open" | "paid" | "void" | "uncollectible" {
  switch (stripeStatus) {
    case "draft":
      return "draft"
    case "open":
      return "open"
    case "paid":
      return "paid"
    case "void":
      return "void"
    case "uncollectible":
      return "uncollectible"
    default:
      return "draft"
  }
}

/**
 * Resolves the local user_id from a Stripe customer ID via profiles.stripe_customer_id.
 */
async function getUserIdFromCustomer(
  stripeCustomerId: string
): Promise<string | null> {
  const supabase = createAdminClient()

  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("stripe_customer_id", stripeCustomerId)
    .single()

  return data?.id ?? null
}

/**
 * Upserts a Stripe invoice into the local invoices table.
 */
async function upsertInvoice(invoice: Stripe.Invoice): Promise<void> {
  const customerId =
    typeof invoice.customer === "string"
      ? invoice.customer
      : invoice.customer?.id ?? null

  if (!customerId) return

  const userId = await getUserIdFromCustomer(customerId)
  if (!userId) return

  const supabase = createAdminClient()

  await supabase.from("invoices").upsert(
    {
      user_id: userId,
      stripe_invoice_id: invoice.id,
      amount: invoice.amount_due ?? 0,
      currency: invoice.currency ?? "eur",
      status: mapInvoiceStatus(invoice.status),
      due_date: invoice.due_date
        ? new Date(invoice.due_date * 1000).toISOString().split("T")[0]
        : null,
      paid_at:
        invoice.status === "paid" && invoice.status_transitions?.paid_at
          ? new Date(invoice.status_transitions.paid_at * 1000).toISOString()
          : null,
      pdf_url: invoice.invoice_pdf ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_invoice_id", ignoreDuplicates: false }
  )
}

// ─── Webhook handler ─────────────────────────────────────────────────────────

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook signature verification failed"
    console.log(`Webhook signature verification failed: ${message}`)
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const supabase = createAdminClient()

  try {
    switch (event.type) {
      // ── Invoice events ──────────────────────────────────────────────────

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice

        await upsertInvoice(invoice)

        // Explicitly mark as paid with paid_at timestamp
        await supabase
          .from("invoices")
          .update({
            status: "paid",
            paid_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_invoice_id", invoice.id)

        // Log activity
        const customerId =
          typeof invoice.customer === "string"
            ? invoice.customer
            : invoice.customer?.id ?? null

        if (customerId) {
          const userId = await getUserIdFromCustomer(customerId)
          if (userId) {
            await supabase.from("activity_log").insert({
              user_id: userId,
              action: "invoice_paid",
              description: `Facture ${invoice.number ?? invoice.id} payée — ${((invoice.amount_due ?? 0) / 100).toFixed(2)} ${(invoice.currency ?? "eur").toUpperCase()}`,
            })
          }
        }

        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice

        await supabase
          .from("invoices")
          .update({
            status: "open",
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_invoice_id", invoice.id)

        break
      }

      case "invoice.created": {
        const invoice = event.data.object as Stripe.Invoice
        await upsertInvoice(invoice)
        break
      }

      case "invoice.updated": {
        const invoice = event.data.object as Stripe.Invoice
        await upsertInvoice(invoice)
        break
      }

      // ── Payment method events ───────────────────────────────────────────

      case "payment_method.attached": {
        const paymentMethod = event.data.object as Stripe.PaymentMethod

        const customerId =
          typeof paymentMethod.customer === "string"
            ? paymentMethod.customer
            : paymentMethod.customer?.id ?? null

        if (!customerId) break

        const userId = await getUserIdFromCustomer(customerId)
        if (!userId) break

        const type = paymentMethod.type === "sepa_debit" ? "sepa" : "card"

        await supabase.from("payment_methods").upsert(
          {
            user_id: userId,
            stripe_payment_method_id: paymentMethod.id,
            type,
            brand:
              paymentMethod.card?.brand ??
              paymentMethod.sepa_debit?.bank_code ??
              null,
            last4:
              paymentMethod.card?.last4 ??
              paymentMethod.sepa_debit?.last4 ??
              null,
            exp_month: paymentMethod.card?.exp_month ?? null,
            exp_year: paymentMethod.card?.exp_year ?? null,
            is_default: false,
          },
          {
            onConflict: "stripe_payment_method_id",
            ignoreDuplicates: false,
          }
        )

        break
      }

      case "payment_method.detached": {
        const paymentMethod = event.data.object as Stripe.PaymentMethod

        await supabase
          .from("payment_methods")
          .delete()
          .eq("stripe_payment_method_id", paymentMethod.id)

        break
      }

      default:
        console.log(`Unhandled Stripe event type: ${event.type}`)
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.log(`Error processing webhook event ${event.type}: ${message}`)
  }

  return NextResponse.json({ received: true })
}
