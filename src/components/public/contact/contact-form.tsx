"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { CheckCircle2 } from "lucide-react"

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
import {
  sendContactMessage,
  type ContactActionState,
} from "@/actions/contact"
import { typeProjetLabels, sourceLabels } from "@/lib/validations/contact"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      className="w-full bg-kaelix-blue text-white hover:bg-kaelix-blue/90"
      disabled={pending}
    >
      {pending ? "Envoi en cours..." : "Envoyer le message"}
    </Button>
  )
}

export function ContactForm() {
  const [state, formAction] = useActionState<ContactActionState, FormData>(
    sendContactMessage,
    {}
  )

  if (state.success) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-kaelix-green/30 bg-kaelix-green/5 p-8 text-center">
        <CheckCircle2 className="size-12 text-kaelix-green" />
        <h3 className="font-heading text-xl font-semibold text-foreground">
          Message envoy&eacute; !
        </h3>
        <p className="text-muted-foreground">{state.success}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </div>
      )}

      {/* Name */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="nom">
          Nom <span className="text-destructive">*</span>
        </Label>
        <Input
          id="nom"
          name="nom"
          placeholder="Votre nom"
          required
          autoComplete="name"
        />
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

      {/* Phone */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="telephone">T&eacute;l&eacute;phone</Label>
        <Input
          id="telephone"
          name="telephone"
          type="tel"
          placeholder="06 12 34 56 78"
          autoComplete="tel"
        />
      </div>

      {/* Project type */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="typeProjet">
          Type de projet <span className="text-destructive">*</span>
        </Label>
        <Select name="typeProjet" required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="S&eacute;lectionnez un type" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(typeProjetLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Current website URL */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="urlSiteActuel">URL du site actuel</Label>
        <Input
          id="urlSiteActuel"
          name="urlSiteActuel"
          type="url"
          placeholder="https://www.votre-site.com"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="message">
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="D&eacute;crivez votre projet, vos besoins et vos objectifs..."
          required
          rows={5}
        />
      </div>

      {/* Source */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="source">Comment nous avez-vous connu ?</Label>
        <Select name="source">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="S&eacute;lectionnez une option" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(sourceLabels).map(([value, label]) => (
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
