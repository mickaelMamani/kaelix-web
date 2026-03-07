import { z } from "zod"

export const supportSchema = z.object({
  sujet: z.enum(["question-technique", "facturation", "autre"] as const, {
    error: "Veuillez sélectionner un sujet",
  }),
  projectId: z.string().optional(),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
})

export type SupportFormData = z.infer<typeof supportSchema>

export const sujetLabels: Record<SupportFormData["sujet"], string> = {
  "question-technique": "Question technique",
  facturation: "Facturation",
  autre: "Autre",
}
