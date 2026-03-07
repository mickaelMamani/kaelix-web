import {
  AlertCircle,
  CheckCircle2,
  Clock,
  CreditCard,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { BillingSummary as BillingSummaryData } from "@/lib/queries/billing"

function formatEur(amountInCents: number): string {
  return (amountInCents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  })
}

interface BillingSummaryProps {
  summary: BillingSummaryData
}

export function BillingSummary({ summary }: BillingSummaryProps) {
  const stats = [
    {
      label: "Montant d\u00fb",
      value: formatEur(summary.total_due),
      icon: AlertCircle,
      color: summary.total_due > 0 ? "text-red-600" : "text-muted-foreground",
      bg: summary.total_due > 0 ? "bg-red-50" : "bg-muted",
    },
    {
      label: "Total pay\u00e9",
      value: formatEur(summary.total_paid_this_year),
      description: "Cette ann\u00e9e",
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Factures en attente",
      value: summary.pending_count.toString(),
      icon: Clock,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "M\u00e9thodes de paiement",
      value: summary.payment_methods_count.toString(),
      icon: CreditCard,
      color: "text-muted-foreground",
      bg: "bg-muted",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex items-center gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}
            >
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
              {stat.description && (
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
