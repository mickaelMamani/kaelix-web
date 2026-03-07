"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { requestAudit, type AuditActionState } from "@/actions/audit"
import {
  secteurLabels,
  objectifLabels,
  tailleEntrepriseLabels,
} from "@/lib/validations/audit"
import { AuditConfirmation } from "./audit-confirmation"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      className="w-full bg-kaelix-blue text-white hover:bg-kaelix-blue/90"
      disabled={pending}
    >
      {pending ? "Envoi en cours..." : "Demander mon audit gratuit"}
    </Button>
  )
}

export function AuditForm() {
  const [state, formAction] = useActionState<AuditActionState, FormData>(
    requestAudit,
    {}
  )

  if (state.success && state.email) {
    return <AuditConfirmation email={state.email} />
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </div>
      )}

      {/* First name and last name side by side */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* First name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="prenom">
            Prénom <span className="text-destructive">*</span>
          </Label>
          <Input
            id="prenom"
            name="prenom"
            placeholder="Votre prénom"
            required
            autoComplete="given-name"
          />
        </div>

        {/* Last name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="nom">
            Nom <span className="text-destructive">*</span>
          </Label>
          <Input
            id="nom"
            name="nom"
            placeholder="Votre nom"
            required
            autoComplete="family-name"
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="vous@exemple.com"
          required
          autoComplete="email"
        />
      </div>

      {/* Website URL */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="urlSite">
          URL du site à auditer <span className="text-destructive">*</span>
        </Label>
        <Input
          id="urlSite"
          name="urlSite"
          type="url"
          placeholder="https://www.votre-site.com"
          required
        />
      </div>

      {/* Secteur */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="secteur">
          Secteur d&apos;activité <span className="text-destructive">*</span>
        </Label>
        <Select name="secteur" required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionnez un secteur" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(secteurLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Objectif */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="objectif">
          Objectif principal <span className="text-destructive">*</span>
        </Label>
        <Select name="objectif" required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionnez un objectif" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(objectifLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Taille entreprise (optional) */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="tailleEntreprise">
          Taille de l&apos;entreprise
        </Label>
        <Select name="tailleEntreprise">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionnez (optionnel)" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(tailleEntrepriseLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <SubmitButton />
    </form>
  )
}
