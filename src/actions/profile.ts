"use server"

import { createClient } from "@/lib/supabase/server"
import {
  profileSchema,
  passwordSchema,
  notificationPreferencesSchema,
} from "@/lib/validations/profile"

export type ProfileActionState = {
  error?: string
  success?: string
}

export async function updateProfile(
  prevState: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  const raw = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    phone: (formData.get("phone") as string) || undefined,
    company: (formData.get("company") as string) || undefined,
    address: (formData.get("address") as string) || undefined,
    city: (formData.get("city") as string) || undefined,
    country: (formData.get("country") as string) || undefined,
  }

  const parsed = profileSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Vous devez être connecté" }
  }

  const fullName = `${parsed.data.firstName} ${parsed.data.lastName}`.trim()

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      phone: parsed.data.phone || null,
      company: parsed.data.company || null,
      address: parsed.data.address || null,
      city: parsed.data.city || null,
      country: parsed.data.country || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)

  if (error) {
    return { error: "Une erreur est survenue lors de la mise à jour du profil" }
  }

  return { success: "Profil mis à jour avec succès" }
}

export async function updatePassword(
  prevState: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  const raw = {
    currentPassword: formData.get("currentPassword") as string,
    newPassword: formData.get("newPassword") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  }

  const parsed = passwordSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !user.email) {
    return { error: "Vous devez être connecté" }
  }

  // Verify current password by attempting to sign in
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: parsed.data.currentPassword,
  })

  if (signInError) {
    return { error: "Le mot de passe actuel est incorrect" }
  }

  // Update password
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.newPassword,
  })

  if (error) {
    return { error: "Une erreur est survenue lors du changement de mot de passe" }
  }

  return { success: "Mot de passe modifié avec succès" }
}

export async function updateNotificationPreferences(
  prevState: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  const raw = {
    notification_project_emails: formData.get("notification_project_emails") === "true",
    notification_invoice_alerts: formData.get("notification_invoice_alerts") === "true",
    notification_team_messages: formData.get("notification_team_messages") === "true",
    notification_deadline_reminders: formData.get("notification_deadline_reminders") === "true",
  }

  const parsed = notificationPreferencesSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Vous devez être connecté" }
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      ...parsed.data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)

  if (error) {
    return { error: "Une erreur est survenue lors de la mise à jour des préférences" }
  }

  return { success: "Préférences mises à jour" }
}
