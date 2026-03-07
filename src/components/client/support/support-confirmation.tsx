"use client"

import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SupportConfirmationProps {
  onReset: () => void
}

export function SupportConfirmation({ onReset }: SupportConfirmationProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-green-500/30 bg-green-500/5 p-8 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-green-500/10">
        <CheckCircle2 className="size-8 text-green-500" />
      </div>
      <h3 className="text-xl font-semibold text-foreground">
        Votre message a été transmis à l&apos;équipe
      </h3>
      <p className="text-muted-foreground">
        Vous recevrez une réponse par email sous 24h.
      </p>
      <Button variant="outline" onClick={onReset} className="mt-2">
        Envoyer un autre message
      </Button>
    </div>
  )
}
