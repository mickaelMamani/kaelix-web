"use server"

import {
  auditSchema,
  secteurLabels,
  objectifLabels,
  tailleEntrepriseLabels,
} from "@/lib/validations/audit"
import { sendToTeams } from "@/lib/teams/webhook"

export type AuditActionState = {
  error?: string
  success?: string
  email?: string
}

export async function requestAudit(
  prevState: AuditActionState,
  formData: FormData
): Promise<AuditActionState> {
  const raw = {
    nom: formData.get("nom") as string,
    prenom: formData.get("prenom") as string,
    email: formData.get("email") as string,
    urlSite: formData.get("urlSite") as string,
    secteur: formData.get("secteur") as string,
    objectif: formData.get("objectif") as string,
    tailleEntreprise:
      (formData.get("tailleEntreprise") as string) || undefined,
  }

  const parsed = auditSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { nom, prenom, email, urlSite, secteur, objectif, tailleEntreprise } =
    parsed.data

  const secteurLabel =
    secteurLabels[secteur as keyof typeof secteurLabels] || secteur
  const objectifLabel =
    objectifLabels[objectif as keyof typeof objectifLabels] || objectif
  const tailleLabel = tailleEntreprise
    ? tailleEntrepriseLabels[
        tailleEntreprise as keyof typeof tailleEntrepriseLabels
      ] || tailleEntreprise
    : null

  try {
    await sendToTeams({
      subject: `Demande d'audit gratuit — ${urlSite}`,
      senderName: `${prenom} ${nom}`,
      senderEmail: email,
      message: [
        `**Site à auditer :** ${urlSite}`,
        `**Secteur :** ${secteurLabel}`,
        `**Objectif :** ${objectifLabel}`,
        tailleLabel ? `**Taille entreprise :** ${tailleLabel}` : null,
        "",
        `Audit demandé par ${prenom} ${nom} (${email}).`,
      ]
        .filter(Boolean)
        .join("\n"),
    })
  } catch {
    console.error("Failed to send audit request to Teams")
  }

  return {
    success:
      "Votre demande d'audit a bien été enregistrée. Vous recevrez votre rapport sous 48h.",
    email,
  }
}
