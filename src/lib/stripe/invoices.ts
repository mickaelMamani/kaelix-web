import Stripe from "stripe"
import { stripe } from "./client"
import { createClient } from "@/lib/supabase/server"
import type { InvoiceStatus } from "@/types"

/**
 * Maps a Stripe invoice status string to our local InvoiceStatus enum.
 */
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
  orgId: string
): Promise<void> {
  const supabase = await createClient()

  // Fetch all invoices from Stripe (paginated, up to 100)
  const stripeInvoices = await stripe.invoices.list({
    customer: stripeCustomerId,
    limit: 100,
  })

  if (stripeInvoices.data.length === 0) return

  const records = stripeInvoices.data.map((inv: Stripe.Invoice) => ({
    org_id: orgId,
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

  // Upsert by stripe_invoice_id (unique constraint)
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
