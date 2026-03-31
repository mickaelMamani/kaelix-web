"use server"

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { inviteUserSchema } from "@/lib/validations/admin"
import { createStripeCustomerAdmin } from "@/lib/stripe/customers"
import { revalidatePath } from "next/cache"

export type InviteUserState = {
  error?: string
  success?: boolean
  message?: string
  fieldErrors?: Record<string, string>
}

export async function inviteUser(
  prevState: InviteUserState,
  formData: FormData
): Promise<InviteUserState> {
  const raw = {
    email: formData.get("email") as string,
    fullName: formData.get("fullName") as string,
    company: (formData.get("company") as string) || undefined,
    phone: (formData.get("phone") as string) || undefined,
  }

  const parsed = inviteUserSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as string
      fieldErrors[field] = issue.message
    }
    return { fieldErrors }
  }

  // Verify the current user is an admin
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Vous devez être connecté" }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    return { error: "Accès non autorisé" }
  }

  // Invite the user via admin client
  const supabaseAdmin = createAdminClient()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  const { data: inviteData, error: inviteError } =
    await supabaseAdmin.auth.admin.inviteUserByEmail(parsed.data.email, {
      data: { full_name: parsed.data.fullName },
      redirectTo: siteUrl + "/auth/set-password",
    })

  if (inviteError) {
    return { error: `Erreur lors de l'invitation : ${inviteError.message}` }
  }

  // Update profile with company/phone if provided
  if (inviteData.user && (parsed.data.company || parsed.data.phone)) {
    await supabaseAdmin
      .from("profiles")
      .update({
        ...(parsed.data.company ? { company: parsed.data.company } : {}),
        ...(parsed.data.phone ? { phone: parsed.data.phone } : {}),
      })
      .eq("id", inviteData.user.id)
  }

  // Create Stripe customer for the new user
  if (inviteData.user) {
    await createStripeCustomerAdmin(
      inviteData.user.id,
      parsed.data.email,
      parsed.data.fullName
    )
  }

  // Log activity
  await supabaseAdmin.from("activity_log").insert({
    user_id: user.id,
    action: "user_invited",
    details: { invited_email: parsed.data.email, invited_name: parsed.data.fullName },
  })

  revalidatePath("/admin/users")

  return {
    success: true,
    message: `Invitation envoyée à ${parsed.data.email} avec succès.`,
  }
}

export async function reinviteUser(userId: string): Promise<{ error?: string; success?: boolean }> {
  // Verify the current user is an admin
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Vous devez être connecté" }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    return { error: "Accès non autorisé" }
  }

  // Get the target user's email
  const supabaseAdmin = createAdminClient()
  const { data: targetUser, error: getUserError } =
    await supabaseAdmin.auth.admin.getUserById(userId)

  if (getUserError || !targetUser.user?.email) {
    return { error: "Utilisateur introuvable" }
  }

  // Re-invite via admin client
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  const { error: inviteError } =
    await supabaseAdmin.auth.admin.inviteUserByEmail(targetUser.user.email, {
      data: { full_name: targetUser.user.user_metadata?.full_name },
      redirectTo: siteUrl + "/auth/set-password",
    })

  if (inviteError) {
    return { error: `Erreur : ${inviteError.message}` }
  }

  // Log activity
  await supabaseAdmin.from("activity_log").insert({
    user_id: user.id,
    action: "user_reinvited",
    details: { reinvited_email: targetUser.user.email },
  })

  revalidatePath("/admin/users")

  return { success: true }
}
