import { z } from "zod"

export const inviteUserSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  fullName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  company: z.string().optional(),
  phone: z.string().optional(),
})

export const createProjectSchema = z.object({
  name: z.string().min(2, "Le nom du projet est requis"),
  description: z.string().optional(),
  type: z.enum(["site-vitrine", "site-ecommerce", "application-web", "refonte-site", "seo-performance", "maintenance"]),
  user_id: z.string().uuid("Client invalide"),
  budget: z.string().optional(),
  start_date: z.string().optional(),
  due_date: z.string().optional(),
})

export const updateProjectStatusSchema = z.object({
  project_id: z.string().uuid(),
  new_status: z.enum(["pending", "discovery", "proposal", "design", "development", "review", "launched", "maintenance"]),
})
