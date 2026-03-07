"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[GlobalError]", error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-kaelix-black px-4">
      <Card className="w-full max-w-md border-none bg-kaelix-black text-center shadow-none">
        <CardContent className="flex flex-col items-center gap-6">
          <div className="flex size-16 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle className="size-8 text-red-500" />
          </div>
          <div className="space-y-2">
            <h1 className="font-heading text-2xl font-semibold text-white">
              Une erreur est survenue
            </h1>
            <p className="text-muted-foreground">
              Nous nous excusons pour la gêne. Veuillez réessayer.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button onClick={reset}>Réessayer</Button>
            <Button variant="outline" render={<Link href="/" />}>
              Retour à l&apos;accueil
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
