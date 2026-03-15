import Stripe from "stripe"
import { stripe } from "./client"
import { createClient } from "@/lib/supabase/server"
import type { InvoiceStatus } from "@/types"

function mapStripeInvoiceStatus(
  stripeStatus: string | null
): InvoiceStatus {
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
 * Fetches all invoices from Stripe for a given customer and upserts them
 * into the local `invoices` table.
 */
export async function syncInvoicesFromStripe(
  stripeCustomerId: string,
  userId: string
): Promise<void> {
  const supabase = await createClient()

  const stripeInvoices = await stripe.invoices.list({
    customer: stripeCustomerId,
    limit: 100,
  })

  if (stripeInvoices.data.length === 0) return

  const records = stripeInvoices.data.map((inv: Stripe.Invoice) => ({
    user_id: userId,
    stripe_invoice_id: inv.id,
    amount: inv.amount_due ?? 0,
    currency: inv.currency ?? "eur",
    status: mapStripeInvoiceStatus(inv.status),
    due_date: inv.due_date
      ? new Date(inv.due_date * 1000).toISOString().split("T")[0]
      : null,
    paid_at:
      inv.status === "paid" && inv.status_transitions?.paid_at
        ? new Date(inv.status_transitions.paid_at * 1000).toISOString()
        : null,
    pdf_url: inv.invoice_pdf ?? null,
    updated_at: new Date().toISOString(),
  }))

  await supabase.from("invoices").upsert(records, {
    onConflict: "stripe_invoice_id",
    ignoreDuplicates: false,
  })
}

/**
 * Fetches a single invoice from the Stripe API.
 */
export async function getStripeInvoice(
  stripeInvoiceId: string
): Promise<Stripe.Invoice> {
  return stripe.invoices.retrieve(stripeInvoiceId)
}
