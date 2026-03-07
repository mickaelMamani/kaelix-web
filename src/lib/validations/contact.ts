import { z } from "zod"

export const contactSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  telephone: z.string().optional(),
  typeProjet: z.enum([
    "site-vitrine",
    "site-ecommerce",
    "application-web",
    "refonte",
    "seo",
    "autre",
  ] as const, { error: "Veuillez sélectionner un type de projet" }),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères"),
  urlSiteActuel: z
    .string()
    .url("URL invalide")
    .optional()
    .or(z.literal("")),
  source: z
    .enum(["google", "bouche-a-oreille", "reseaux-sociaux", "autre"])
    .optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

export const typeProjetLabels: Record<ContactFormData["typeProjet"], string> = {
  "site-vitrine": "Site Vitrine",
  "site-ecommerce": "Site E-commerce",
  "application-web": "Application Web",
  refonte: "Refonte de site",
  seo: "SEO & Performance",
  autre: "Autre",
}

export const sourceLabels: Record<
  NonNullable<ContactFormData["source"]>,
  string
> = {
  google: "Google",
  "bouche-a-oreille": "Bouche-à-oreille",
  "reseaux-sociaux": "Réseaux sociaux",
  autre: "Autre",
}
