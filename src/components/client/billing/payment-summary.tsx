import { Lock, FileText, Calendar } from "lucide-react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Invoice } from "@/types"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

function formatEur(amountInCents: number): string {
  return (amountInCents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  })
}

interface PaymentSummaryProps {
  invoice: Invoice
  projectName?: string | null
}

export function PaymentSummary({ invoice, projectName }: PaymentSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>R\u00e9capitulatif</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Facture</p>
            <p className="font-medium">#{invoice.id.slice(0, 8)}</p>
          </div>
        </div>

        {projectName && (
          <div className="flex items-center gap-3">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Projet</p>
              <p className="font-medium">{projectName}</p>
            </div>
          </div>
        )}

        {invoice.due_date && (
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">\u00c9ch\u00e9ance</p>
              <p className="font-medium">
                {dateFormatter.format(new Date(invoice.due_date))}
              </p>
            </div>
          </div>
        )}

        <Separator />

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total \u00e0 payer</span>
          <span className="text-xl font-bold">
            {formatEur(invoice.amount)}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-center gap-2 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" />
          <span>Paiement s\u00e9curis\u00e9 par Stripe</span>
        </div>
      </CardFooter>
    </Card>
  )
}
