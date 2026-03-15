"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ClientPortalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[ClientPortalError]", error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="flex flex-col items-center gap-6">
          <div className="flex size-16 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle className="size-8 text-red-500" />
          </div>
          <div className="space-y-2">
            <h1 className="font-heading text-2xl font-semibold text-foreground">
              Erreur dans l&apos;espace client
            </h1>
            <p className="text-muted-foreground">
              Un problème est survenu. Veuillez réessayer ou contacter le
              support.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button onClick={reset}>Réessayer</Button>
            <Button nativeButton={false} render={<Link href="/dashboard" />}>
              Retour au dashboard
            </Button>
            <Button variant="outline" nativeButton={false} render={<Link href="/support" />}>
              Contacter le support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
