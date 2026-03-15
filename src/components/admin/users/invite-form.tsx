"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { inviteUser, type InviteUserState } from "@/actions/admin/users"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Envoi en cours..." : "Envoyer l'invitation"}
    </Button>
  )
}

export function InviteForm() {
  const [state, formAction] = useActionState<InviteUserState, FormData>(
    inviteUser,
    {}
  )

  if (state.success) {
    return (
      <Card className="max-w-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
              <svg
                className="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">{state.message}</p>
            <Button
              nativeButton={false}
              render={<Link href="/admin/users" />}
              variant="outline"
            >
              Retour aux utilisateurs
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Nouvel utilisateur</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          {state.error && (
            <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {state.error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="utilisateur@exemple.com"
              required
              autoComplete="email"
            />
            {state.fieldErrors?.email && (
              <p className="text-xs text-destructive">{state.fieldErrors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="fullName">Nom complet *</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Jean Dupont"
              required
              autoComplete="name"
            />
            {state.fieldErrors?.fullName && (
              <p className="text-xs text-destructive">{state.fieldErrors.fullName}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="company">Entreprise</Label>
            <Input
              id="company"
              name="company"
              type="text"
              placeholder="Nom de l'entreprise"
              autoComplete="organization"
            />
            {state.fieldErrors?.company && (
              <p className="text-xs text-destructive">{state.fieldErrors.company}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+33 6 12 34 56 78"
              autoComplete="tel"
            />
            {state.fieldErrors?.phone && (
              <p className="text-xs text-destructive">{state.fieldErrors.phone}</p>
            )}
          </div>

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  )
}
