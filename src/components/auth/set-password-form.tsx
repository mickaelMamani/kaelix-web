"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthCard } from "@/components/auth/auth-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { resetPasswordSchema } from "@/lib/validations/auth"
import { createClient } from "@/lib/supabase/client"

export function SetPasswordForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [sessionReady, setSessionReady] = useState(false)

  // Process hash fragment tokens from Supabase invite/recovery redirects
  useEffect(() => {
    const supabase = createClient()
    const hash = window.location.hash

    if (hash && hash.includes("access_token")) {
      const params = new URLSearchParams(hash.substring(1))
      const accessToken = params.get("access_token")
      const refreshToken = params.get("refresh_token")

      if (accessToken && refreshToken) {
        supabase.auth
          .setSession({ access_token: accessToken, refresh_token: refreshToken })
          .then(({ error }) => {
            if (error) {
              setError("Le lien d'invitation a expiré ou est invalide.")
            } else {
              // Clean hash from URL
              window.history.replaceState(null, "", window.location.pathname)
              setSessionReady(true)
            }
          })
      } else {
        setSessionReady(true)
      }
    } else {
      // No hash — check if there's already an active session
      supabase.auth.getUser().then(({ data }) => {
        if (data.user) {
          setSessionReady(true)
        } else {
          setError("Aucune session active. Veuillez utiliser le lien reçu par email.")
        }
      })
    }
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const raw = {
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    }

    const parsed = resetPasswordSchema.safeParse(raw)
    if (!parsed.success) {
      setError(parsed.error.issues[0].message)
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({
      password: parsed.data.password,
    })

    if (updateError) {
      setError("Une erreur est survenue. Veuillez réessayer.")
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <AuthCard
      title="Définir votre mot de passe"
      description="Bienvenue ! Choisissez un mot de passe pour activer votre compte."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {!sessionReady && !error && (
          <div className="text-center text-sm text-muted-foreground">
            Vérification en cours...
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            autoComplete="new-password"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading || !sessionReady}>
          {loading ? "Activation en cours..." : "Activer mon compte"}
        </Button>
      </form>
    </AuthCard>
  )
}
