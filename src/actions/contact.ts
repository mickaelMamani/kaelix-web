"use server"

import { contactSchema, typeProjetLabels } from "@/lib/validations/contact"
import { sendToTeams } from "@/lib/teams/webhook"

export type ContactActionState = {
  error?: string
  success?: string
}

export async function sendContactMessage(
  prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const raw = {
    nom: formData.get("nom") as string,
    email: formData.get("email") as string,
    telephone: (formData.get("telephone") as string) || undefined,
    typeProjet: formData.get("typeProjet") as string,
    message: formData.get("message") as string,
    urlSiteActuel: (formData.get("urlSiteActuel") as string) || undefined,
    source: (formData.get("source") as string) || undefined,
  }

  const parsed = contactSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { nom, email, typeProjet, message, telephone, urlSiteActuel, source } =
    parsed.data

  const typeLabel =
    typeProjetLabels[typeProjet as keyof typeof typeProjetLabels] || typeProjet

  try {
    await sendToTeams({
      subject: `Nouveau contact : ${typeLabel}`,
      senderName: nom,
      senderEmail: email,
      message: [
        `**Type de projet :** ${typeLabel}`,
        telephone ? `**Téléphone :** ${telephone}` : null,
        urlSiteActuel ? `**Site actuel :** ${urlSiteActuel}` : null,
        source ? `**Source :** ${source}` : null,
        "",
        `**Message :**`,
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    })
  } catch {
    // Log error internally but don't expose details to the user
    console.error("Failed to send contact message to Teams")
  }

  return {
    success:
      "Merci pour votre message ! Nous vous répondrons dans les 24 heures.",
  }
}
