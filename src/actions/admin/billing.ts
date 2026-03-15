"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateInvoiceStatus(invoiceId: string, newStatus: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Non authentifié" }

  const { data: profile } = await supabase
    .from("profiles").select("role").eq("id", user.id).single()
  if (profile?.role !== "admin") return { error: "Accès refusé" }

  // Validate status
  const validStatuses = ["draft", "open", "paid", "void", "uncollectible"]
  if (!validStatuses.includes(newStatus)) return { error: "Statut invalide" }

  const updateData: Record<string, any> = { status: newStatus }
  if (newStatus === "paid") updateData.paid_at = new Date().toISOString()

  const { error } = await supabase
    .from("invoices").update(updateData).eq("id", invoiceId)

  if (error) return { error: "Impossible de mettre à jour la facture" }

  await supabase.from("activity_log").insert({
    user_id: user.id,
    action: "invoice_status_changed",
    description: `Facture mise à jour: ${newStatus}`,
  })

  revalidatePath("/admin/billing")
  return { success: true }
}
