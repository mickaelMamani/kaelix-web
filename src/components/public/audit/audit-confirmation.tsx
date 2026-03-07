import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"

interface AuditConfirmationProps {
  email: string
}

export function AuditConfirmation({ email }: AuditConfirmationProps) {
  return (
    <div className="flex flex-col items-center gap-6 rounded-xl border border-kaelix-green/30 bg-kaelix-green/5 p-8 text-center sm:p-12">
      {/* Animated green checkmark circle */}
      <div className="relative flex size-20 items-center justify-center rounded-full bg-kaelix-green/10">
        <div className="absolute inset-0 animate-ping rounded-full bg-kaelix-green/20" />
        <CheckCircle2 className="relative size-10 text-kaelix-green" />
      </div>

      <div className="space-y-2">
        <h3 className="font-heading text-2xl font-bold text-foreground">
          Votre demande a été envoyée !
        </h3>
        <p className="text-muted-foreground">
          Vous recevrez votre rapport d&apos;audit sous 48h à l&apos;adresse{" "}
          <span className="font-medium text-foreground">{email}</span>.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          render={<Link href="/blog" />}
          variant="outline"
        >
          En attendant, découvrez nos articles
        </Button>
        <Button
          render={<Link href="/contact" />}
          className="bg-kaelix-blue text-white hover:bg-kaelix-blue/90"
        >
          Planifier un appel découverte
        </Button>
      </div>
    </div>
  )
}
