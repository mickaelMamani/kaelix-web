import { Mail, Phone, Clock } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SupportAlternatives() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Autres moyens de contact</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Email */}
        <div className="flex items-start gap-3">
          <Mail className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Email direct</p>
            <a
              href="mailto:contact@kaelix.com"
              className="text-sm text-primary hover:underline"
            >
              contact@kaelix.com
            </a>
          </div>
        </div>

        {/* Phone call */}
        <div className="flex items-start gap-3">
          <Phone className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Planifier un appel</p>
            <a
              href="#"
              className="text-sm text-primary hover:underline"
            >
              Réserver un créneau
            </a>
          </div>
        </div>

        {/* Response time */}
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Délai de réponse</p>
            <p className="text-sm text-muted-foreground">
              Délai de réponse moyen : moins de 24h
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
