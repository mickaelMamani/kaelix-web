import { createClient } from "@/lib/supabase/server"
import type { Invoice, PaymentMethod } from "@/types"

export async function getInvoices(userId: string): Promise<Invoice[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error || !data) {
    return []
  }

  return data as Invoice[]
}

export async function getInvoice(
  invoiceId: string,
  userId: string
): Promise<Invoice | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", invoiceId)
    .eq("user_id", userId)
    .single()

  if (error || !data) {
    return null
  }

  return data as Invoice
}

export async function getPaymentMethods(
  userId: string
): Promise<PaymentMethod[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("payment_methods")
    .select("*")
    .eq("user_id", userId)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: false })

  if (error || !data) {
    return []
  }

  return data as PaymentMethod[]
}

export interface BillingSummary {
  total_due: number
  total_paid_this_year: number
  pending_count: number
  payment_methods_count: number
}

export async function getBillingSummary(
  userId: string
): Promise<BillingSummary> {
  const supabase = await createClient()

  const { data: openInvoices } = await supabase
    .from("invoices")
    .select("amount")
    .eq("user_id", userId)
    .eq("status", "open")

  const total_due = (openInvoices ?? []).reduce(
    (sum, inv) => sum + (inv.amount ?? 0),
    0
  )

  const pending_count = (openInvoices ?? []).length

  const yearStart = new Date(new Date().getFullYear(), 0, 1).toISOString()
  const { data: paidInvoices } = await supabase
    .from("invoices")
    .select("amount")
    .eq("user_id", userId)
    .eq("status", "paid")
    .gte("paid_at", yearStart)

  const total_paid_this_year = (paidInvoices ?? []).reduce(
    (sum, inv) => sum + (inv.amount ?? 0),
    0
  )

  const { count } = await supabase
    .from("payment_methods")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)

  return {
    total_due,
    total_paid_this_year,
    pending_count,
    payment_methods_count: count ?? 0,
  }
}
