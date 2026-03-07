"use client"

import { useActionState } from "react"
import { updatePassword, type ProfileActionState } from "@/actions/profile"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SecurityTab() {
  const initialState: ProfileActionState = {}
  const [state, formAction, isPending] = useActionState(updatePassword, initialState)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Changer le mot de passe</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Mot de passe actuel</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              placeholder="Votre mot de passe actuel"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Minimum 8 caractères"
              minLength={8}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirmez votre nouveau mot de passe"
              minLength={8}
              required
            />
          </div>

          {state.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
          {state.success && (
            <p className="text-sm text-green-600">{state.success}</p>
          )}

          <Button type="submit" disabled={isPending}>
            {isPending ? "Modification..." : "Modifier le mot de passe"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
