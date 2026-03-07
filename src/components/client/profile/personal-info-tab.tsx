"use client"

import { useActionState } from "react"
import { updateProfile, type ProfileActionState } from "@/actions/profile"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PersonalInfoTabProps {
  profile: {
    full_name: string | null
    phone: string | null
    company: string | null
    address: string | null
    city: string | null
    country: string | null
  }
  email: string
}

export function PersonalInfoTab({ profile, email }: PersonalInfoTabProps) {
  const nameParts = (profile.full_name ?? "").split(" ")
  const defaultFirstName = nameParts[0] ?? ""
  const defaultLastName = nameParts.slice(1).join(" ")

  const initialState: ProfileActionState = {}
  const [state, formAction, isPending] = useActionState(updateProfile, initialState)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations personnelles</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                name="firstName"
                defaultValue={defaultFirstName}
                placeholder="Votre prénom"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                name="lastName"
                defaultValue={defaultLastName}
                placeholder="Votre nom"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              disabled
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={profile.phone ?? ""}
              placeholder="+33 6 12 34 56 78"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Entreprise</Label>
            <Input
              id="company"
              name="company"
              defaultValue={profile.company ?? ""}
              placeholder="Nom de votre entreprise"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Adresse</Label>
            <Input
              id="address"
              name="address"
              defaultValue={profile.address ?? ""}
              placeholder="Adresse postale"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">Ville</Label>
              <Input
                id="city"
                name="city"
                defaultValue={profile.city ?? ""}
                placeholder="Ville"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Pays</Label>
              <Input
                id="country"
                name="country"
                defaultValue={profile.country ?? "France"}
                placeholder="Pays"
              />
            </div>
          </div>

          {state.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
          {state.success && (
            <p className="text-sm text-green-600">{state.success}</p>
          )}

          <Button type="submit" disabled={isPending}>
            {isPending ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
