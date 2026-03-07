import { z } from "zod"

export const secteurValues = [
  "restauration",
  "ecommerce",
  "artisanat",
  "services",
  "sante",
  "immobilier",
  "autre",
] as const

export const objectifValues = [
  "plus-de-trafic",
  "plus-de-conversions",
  "refonte-visuelle",
  "lancement",
] as const

export const tailleEntrepriseValues = [
  "auto-entrepreneur",
  "1-10",
  "11-50",
  "51-plus",
] as const

export const auditSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  urlSite: z.string().url("URL invalide — ex : https://www.votre-site.com"),
  secteur: z.enum(secteurValues, {
    error: "Veuillez sélectionner un secteur d'activité",
  }),
  objectif: z.enum(objectifValues, {
    error: "Veuillez sélectionner un objectif",
  }),
  tailleEntreprise: z.enum(tailleEntrepriseValues).optional(),
})

export type AuditFormData = z.infer<typeof auditSchema>

export const secteurLabels: Record<AuditFormData["secteur"], string> = {
  restauration: "Restauration",
  ecommerce: "E-commerce",
  artisanat: "Artisanat",
  services: "Services",
  sante: "Santé",
  immobilier: "Immobilier",
  autre: "Autre",
}

export const objectifLabels: Record<AuditFormData["objectif"], string> = {
  "plus-de-trafic": "Plus de trafic",
  "plus-de-conversions": "Plus de conversions",
  "refonte-visuelle": "Refonte visuelle",
  lancement: "Lancement d'un nouveau site",
}

export const tailleEntrepriseLabels: Record<
  NonNullable<AuditFormData["tailleEntreprise"]>,
  string
> = {
  "auto-entrepreneur": "Auto-entrepreneur",
  "1-10": "1 à 10 salariés",
  "11-50": "11 à 50 salariés",
  "51-plus": "51 salariés et plus",
}
