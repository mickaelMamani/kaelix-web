import { createClient } from "@/lib/supabase/server"
import type { Invoice, PaymentMethod } from "@/types"

/**
 * Fetches all invoices for an organization, ordered by most recent first.
 */
export async function getInvoices(orgId: string): Promise<Invoice[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("org_id", orgId)
    .order("created_at", { ascending: false })

  if (error || !data) {
    return []
  }

  return data as Invoice[]
}

/**
 * Fetches a single invoice, verifying it belongs to the given org.
 */
export async function getInvoice(
  invoiceId: string,
  orgId: string
): Promise<Invoice | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", invoiceId)
    .eq("org_id", orgId)
    .single()

  if (error || !data) {
    return null
  }

  return data as Invoice
}

/**
 * Fetches all payment methods for an organization, default first.
 */
export async function getPaymentMethods(
  orgId: string
): Promise<PaymentMethod[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("payment_methods")
    .select("*")
    .eq("org_id", orgId)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: false })

  if (error || !data) {
    return []
  }

  return data as PaymentMethod[]
}

/**
 * Aggregate billing summary for the dashboard.
 */
export interface BillingSummary {
  total_due: number
  total_paid_this_year: number
  pending_count: number
  payment_methods_count: number
}

export async function getBillingSummary(
  orgId: string
): Promise<BillingSummary> {
  const supabase = await createClient()

  // Fetch open invoices (amount due)
  const { data: openInvoices } = await supabase
    .from("invoices")
    .select("amount")
    .eq("org_id", orgId)
    .eq("status", "open")

  const total_due = (openInvoices ?? []).reduce(
    (sum, inv) => sum + (inv.amount ?? 0),
    0
  )

  const pending_count = (openInvoices ?? []).length

  // Fetch paid invoices this year
  const yearStart = new Date(new Date().getFullYear(), 0, 1).toISOString()
  const { data: paidInvoices } = await supabase
    .from("invoices")
    .select("amount")
    .eq("org_id", orgId)
    .eq("status", "paid")
    .gte("paid_at", yearStart)

  const total_paid_this_year = (paidInvoices ?? []).reduce(
    (sum, inv) => sum + (inv.amount ?? 0),
    0
  )

  // Count payment methods
  const { count } = await supabase
    .from("payment_methods")
    .select("id", { count: "exact", head: true })
    .eq("org_id", orgId)

  return {
    total_due,
    total_paid_this_year,
    pending_count,
    payment_methods_count: count ?? 0,
  }
}
