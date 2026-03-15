"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// ---------------------------------------------------------------------------
// Validation schemas
// ---------------------------------------------------------------------------

const createDeliverableSchema = z.object({
  project_id: z.string().uuid("Projet invalide"),
  title: z.string().min(2, "Le titre est requis"),
  description: z.string().optional(),
  due_date: z.string().optional(),
  sort_order: z.coerce.number().int().optional(),
})

const updateDeliverableSchema = z.object({
  id: z.string().uuid("Livrable invalide"),
  title: z.string().min(2, "Le titre est requis").optional(),
  description: z.string().optional(),
  status: z.enum(["pending", "in_progress", "completed"]).optional(),
  due_date: z.string().optional(),
})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function verifyAdmin() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Non authentifié" as const, supabase, user: null }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin")
    return { error: "Accès refusé" as const, supabase, user: null }

  return { error: null, supabase, user }
}

// ---------------------------------------------------------------------------
// Create deliverable
// ---------------------------------------------------------------------------

export type DeliverableActionState = {
  error?: string
  success?: boolean
}

export async function createDeliverable(
  prevState: DeliverableActionState,
  formData: FormData
): Promise<DeliverableActionState> {
  const raw = {
    project_id: formData.get("project_id") as string,
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || undefined,
    due_date: (formData.get("due_date") as string) || undefined,
    sort_order: formData.get("sort_order")
      ? Number(formData.get("sort_order"))
      : undefined,
  }

  const parsed = createDeliverableSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Données invalides" }
  }

  const { error: authError, supabase, user } = await verifyAdmin()
  if (authError) return { error: authError }

  const { error: insertError } = await supabase.from("deliverables").insert({
    project_id: parsed.data.project_id,
    title: parsed.data.title,
    description: parsed.data.description ?? null,
    due_date: parsed.data.due_date ?? null,
    sort_order: parsed.data.sort_order ?? 0,
    status: "pending",
  })

  if (insertError) return { error: "Impossible de créer le livrable" }

  // Log activity
  await supabase.from("activity_log").insert({
    user_id: user!.id,
    action: "deliverable_created",
    description: `Livrable "${parsed.data.title}" ajouté`,
    project_id: parsed.data.project_id,
  })

  revalidatePath(`/admin/projects/${parsed.data.project_id}`)
  return { success: true }
}

// ---------------------------------------------------------------------------
// Update deliverable
// ---------------------------------------------------------------------------

export async function updateDeliverable(
  prevState: DeliverableActionState,
  formData: FormData
): Promise<DeliverableActionState> {
  const raw = {
    id: formData.get("id") as string,
    title: (formData.get("title") as string) || undefined,
    description: (formData.get("description") as string) || undefined,
    status: (formData.get("status") as string) || undefined,
    due_date: (formData.get("due_date") as string) || undefined,
  }

  const parsed = updateDeliverableSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Données invalides" }
  }

  const { error: authError, supabase, user } = await verifyAdmin()
  if (authError) return { error: authError }

  const updateData: Record<string, unknown> = {}
  if (parsed.data.title) updateData.title = parsed.data.title
  if (parsed.data.description !== undefined)
    updateData.description = parsed.data.description || null
  if (parsed.data.status) updateData.status = parsed.data.status
  if (parsed.data.due_date !== undefined)
    updateData.due_date = parsed.data.due_date || null

  if (Object.keys(updateData).length === 0) {
    return { error: "Aucune modification" }
  }

  // Get the project_id before updating for revalidation
  const { data: deliverable } = await supabase
    .from("deliverables")
    .select("project_id")
    .eq("id", parsed.data.id)
    .single()

  const { error: updateError } = await supabase
    .from("deliverables")
    .update(updateData)
    .eq("id", parsed.data.id)

  if (updateError) return { error: "Impossible de mettre à jour le livrable" }

  if (deliverable?.project_id) {
    // Log activity
    await supabase.from("activity_log").insert({
      user_id: user!.id,
      action: "deliverable_updated",
      description: `Livrable mis à jour`,
      project_id: deliverable.project_id,
    })

    revalidatePath(`/admin/projects/${deliverable.project_id}`)
  }

  return { success: true }
}

// ---------------------------------------------------------------------------
// Delete deliverable
// ---------------------------------------------------------------------------

export async function deleteDeliverable(
  deliverableId: string
): Promise<DeliverableActionState> {
  const { error: authError, supabase, user } = await verifyAdmin()
  if (authError) return { error: authError }

  // Get project_id before deleting
  const { data: deliverable } = await supabase
    .from("deliverables")
    .select("project_id, title")
    .eq("id", deliverableId)
    .single()

  if (!deliverable) return { error: "Livrable introuvable" }

  const { error: deleteError } = await supabase
    .from("deliverables")
    .delete()
    .eq("id", deliverableId)

  if (deleteError) return { error: "Impossible de supprimer le livrable" }

  // Log activity
  await supabase.from("activity_log").insert({
    user_id: user!.id,
    action: "deliverable_deleted",
    description: `Livrable "${deliverable.title}" supprimé`,
    project_id: deliverable.project_id,
  })

  revalidatePath(`/admin/projects/${deliverable.project_id}`)
  return { success: true }
}
