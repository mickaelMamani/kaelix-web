"use server"

import { supportSchema, sujetLabels } from "@/lib/validations/support"
import { sendToTeams } from "@/lib/teams/webhook"
import { createClient } from "@/lib/supabase/server"

export type SupportActionState = {
  error?: string
  success?: string
}

export async function sendSupportMessage(
  prevState: SupportActionState,
  formData: FormData
): Promise<SupportActionState> {
  const supabase = await createClient()

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Vous devez être connecté pour envoyer un message." }
  }

  // Parse form data
  const raw = {
    sujet: formData.get("sujet") as string,
    projectId: (formData.get("projectId") as string) || undefined,
    message: formData.get("message") as string,
  }

  // Validate with Zod
  const parsed = supportSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { sujet, projectId, message } = parsed.data
  const sujetLabel = sujetLabels[sujet]

  // Fetch user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single()

  const senderName = profile?.full_name ?? "Utilisateur inconnu"
  const senderEmail = user.email ?? "Email inconnu"

  // Fetch project name if projectId provided
  let projectName: string | undefined
  if (projectId) {
    const { data: project } = await supabase
      .from("projects")
      .select("name")
      .eq("id", projectId)
      .single()

    projectName = project?.name ?? undefined
  }

  // Send to Teams with formatted message
  try {
    await sendToTeams({
      subject: `Support client : ${sujetLabel}`,
      senderName,
      senderEmail,
      projectName,
      message: [
        `**Sujet :** ${sujetLabel}`,
        projectName ? `**Projet :** ${projectName}` : null,
        "",
        `**Message :**`,
        message,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    })
  } catch {
    console.error("Failed to send support message to Teams")
  }

  // Log to activity_log
  try {
    await supabase.from("activity_log").insert({
      project_id: projectId ?? null,
      user_id: user.id,
      action: "support_message",
      description: sujetLabel,
    })
  } catch {
    console.error("Failed to log support message to activity_log")
  }

  return {
    success:
      "Votre message a été transmis à notre équipe. Vous recevrez une réponse par email sous 24h.",
  }
}
