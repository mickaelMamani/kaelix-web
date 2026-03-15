"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { createProjectSchema, updateProjectStatusSchema } from "@/lib/validations/admin"
import { PROJECT_STATUS_PROGRESS } from "@/lib/constants"

export async function startProject(projectId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Non authentifié" }

  // Verify admin role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") return { error: "Accès refusé" }

  // Update project — guard with status = pending to prevent race conditions
  const { error } = await supabase
    .from("projects")
    .update({
      status: "discovery",
      admin_id: user.id,
      started_at: new Date().toISOString(),
    })
    .eq("id", projectId)
    .eq("status", "pending")

  if (error) return { error: "Impossible de démarrer le projet" }

  // Log activity
  await supabase.from("activity_log").insert({
    user_id: user.id,
    action: "project_started",
    description: `Projet démarré`,
    project_id: projectId,
  })

  revalidatePath("/admin/dashboard")
  revalidatePath("/admin/projects")
  return { success: true }
}

// ---------------------------------------------------------------------------
// Create project
// ---------------------------------------------------------------------------

export type CreateProjectState = {
  error?: string
  success?: boolean
  projectId?: string
  fieldErrors?: Record<string, string[]>
}

export async function createProject(
  prevState: CreateProjectState,
  formData: FormData
): Promise<CreateProjectState> {
  const raw = {
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || undefined,
    type: formData.get("type") as string,
    user_id: formData.get("user_id") as string,
    budget: (formData.get("budget") as string) || undefined,
    start_date: (formData.get("start_date") as string) || undefined,
    due_date: (formData.get("due_date") as string) || undefined,
  }

  const parsed = createProjectSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as string
      if (!fieldErrors[field]) fieldErrors[field] = []
      fieldErrors[field].push(issue.message)
    }
    return { fieldErrors }
  }

  const supabase = await createClient()

  // Verify admin
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Non authentifié" }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") return { error: "Accès refusé" }

  // Insert project
  const { data: newProject, error: insertError } = await supabase
    .from("projects")
    .insert({
      name: parsed.data.name,
      description: parsed.data.description ?? null,
      type: parsed.data.type,
      user_id: parsed.data.user_id,
      budget: parsed.data.budget ?? null,
      start_date: parsed.data.start_date ?? null,
      due_date: parsed.data.due_date ?? null,
      status: "pending",
      progress: 0,
      admin_id: user.id,
    })
    .select("id")
    .single()

  if (insertError || !newProject) {
    return { error: "Impossible de créer le projet" }
  }

  // Log activity
  await supabase.from("activity_log").insert({
    user_id: user.id,
    action: "project_created",
    description: `Projet "${parsed.data.name}" créé`,
    project_id: newProject.id,
  })

  revalidatePath("/admin/projects")
  revalidatePath("/admin/dashboard")
  return { success: true, projectId: newProject.id }
}

// ---------------------------------------------------------------------------
// Update project status
// ---------------------------------------------------------------------------

export async function updateProjectStatus(projectId: string, newStatus: string) {
  const parsed = updateProjectStatusSchema.safeParse({
    project_id: projectId,
    new_status: newStatus,
  })
  if (!parsed.success) return { error: "Statut invalide" }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Non authentifié" }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") return { error: "Accès refusé" }

  const progress = PROJECT_STATUS_PROGRESS[parsed.data.new_status] ?? 0

  const updateData: Record<string, unknown> = {
    status: parsed.data.new_status,
    progress,
  }

  // Set started_at when transitioning from pending
  if (parsed.data.new_status === "discovery") {
    updateData.started_at = new Date().toISOString()
  }

  const { error } = await supabase
    .from("projects")
    .update(updateData)
    .eq("id", parsed.data.project_id)

  if (error) return { error: "Impossible de mettre à jour le statut" }

  // Log activity
  await supabase.from("activity_log").insert({
    user_id: user.id,
    action: "status_changed",
    description: `Statut changé vers "${parsed.data.new_status}"`,
    project_id: parsed.data.project_id,
  })

  revalidatePath(`/admin/projects/${parsed.data.project_id}`)
  revalidatePath("/admin/projects")
  revalidatePath("/admin/dashboard")
  return { success: true }
}

// ---------------------------------------------------------------------------
// Update project details
// ---------------------------------------------------------------------------

export type UpdateProjectState = {
  error?: string
  success?: boolean
}

export async function updateProject(
  prevState: UpdateProjectState,
  formData: FormData
): Promise<UpdateProjectState> {
  const projectId = formData.get("project_id") as string
  if (!projectId) return { error: "ID du projet manquant" }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Non authentifié" }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") return { error: "Accès refusé" }

  const name = formData.get("name") as string
  if (!name || name.length < 2) return { error: "Le nom du projet est requis" }

  const updateData: Record<string, unknown> = {
    name,
    description: (formData.get("description") as string) || null,
    budget: (formData.get("budget") as string) || null,
    start_date: (formData.get("start_date") as string) || null,
    due_date: (formData.get("due_date") as string) || null,
  }

  const { error } = await supabase
    .from("projects")
    .update(updateData)
    .eq("id", projectId)

  if (error) return { error: "Impossible de mettre à jour le projet" }

  revalidatePath(`/admin/projects/${projectId}`)
  revalidatePath("/admin/projects")
  return { success: true }
}
