"use client"

import { useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  createProject,
  type CreateProjectState,
} from "@/actions/admin/projects"
import type { ActiveClient } from "@/lib/queries/admin"

const projectTypeOptions = [
  { value: "site-vitrine", label: "Site Vitrine" },
  { value: "site-ecommerce", label: "Site E-commerce" },
  { value: "application-web", label: "Application Web" },
  { value: "refonte-site", label: "Refonte de Site" },
  { value: "seo-performance", label: "SEO & Performance" },
  { value: "maintenance", label: "Maintenance" },
]

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Création en cours..." : "Créer le projet"}
    </Button>
  )
}

interface CreateProjectFormProps {
  clients: ActiveClient[]
}

export function CreateProjectForm({ clients }: CreateProjectFormProps) {
  const router = useRouter()
  const [state, formAction] = useActionState<CreateProjectState, FormData>(
    createProject,
    {}
  )

  // Redirect on success
  useEffect(() => {
    if (state.success && state.projectId) {
      router.push(`/admin/projects/${state.projectId}`)
    }
  }, [state.success, state.projectId, router])

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Informations du projet</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          {state.error && (
            <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {state.error}
            </div>
          )}

          {/* Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nom du projet *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Mon super projet"
              required
            />
            {state.fieldErrors?.name && (
              <p className="text-xs text-destructive">
                {state.fieldErrors.name[0]}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Décrivez le projet..."
            />
          </div>

          {/* Type and Client row */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Type */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="type">Type de projet *</Label>
              <Select name="type" required defaultValue="">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypeOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.fieldErrors?.type && (
                <p className="text-xs text-destructive">
                  {state.fieldErrors.type[0]}
                </p>
              )}
            </div>

            {/* Client */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="user_id">Client *</Label>
              <Select name="user_id" required defaultValue="">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner un client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.full_name ?? "Sans nom"}
                      {client.company ? ` — ${client.company}` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.fieldErrors?.user_id && (
                <p className="text-xs text-destructive">
                  {state.fieldErrors.user_id[0]}
                </p>
              )}
            </div>
          </div>

          {/* Budget */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="budget">Budget (en centimes)</Label>
            <Input
              id="budget"
              name="budget"
              type="number"
              placeholder="Ex: 500000 (= 5 000 €)"
              min="0"
            />
          </div>

          {/* Dates row */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="start_date">Date de début</Label>
              <Input id="start_date" name="start_date" type="date" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="due_date">Date d&apos;échéance</Label>
              <Input id="due_date" name="due_date" type="date" />
            </div>
          </div>

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  )
}
