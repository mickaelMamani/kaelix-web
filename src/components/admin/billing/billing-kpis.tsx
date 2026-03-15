import { Euro, TrendingUp, Clock, AlertTriangle, Percent } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { AdminBillingKPIs } from "@/lib/queries/admin"

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
})

interface KPICardProps {
  icon: React.ReactNode
  label: string
  value: string
  iconClassName?: string
  valueClassName?: string
}

function KPICard({ icon, label, value, iconClassName, valueClassName }: KPICardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconClassName ?? "bg-muted text-muted-foreground"}`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className={`text-2xl font-bold tracking-tight ${valueClassName ?? ""}`}>{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function BillingKPIs({ kpis }: { kpis: AdminBillingKPIs }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      <KPICard
        icon={<Euro className="size-5" />}
        label="Revenu (mois)"
        value={currencyFormatter.format(kpis.revenueThisMonth / 100)}
        iconClassName="bg-emerald-100 text-emerald-600"
      />
      <KPICard
        icon={<TrendingUp className="size-5" />}
        label="Revenu (année)"
        value={currencyFormatter.format(kpis.revenueThisYear / 100)}
        iconClassName="bg-blue-100 text-kaelix-blue"
      />
      <KPICard
        icon={<Clock className="size-5" />}
        label="En attente"
        value={currencyFormatter.format(kpis.pendingAmount / 100)}
        iconClassName="bg-amber-100 text-amber-600"
      />
      <KPICard
        icon={<AlertTriangle className="size-5" />}
        label="En retard"
        value={currencyFormatter.format(kpis.overdueAmount / 100)}
        iconClassName="bg-red-100 text-red-600"
        valueClassName={kpis.overdueAmount > 0 ? "text-red-600" : undefined}
      />
      <KPICard
        icon={<Percent className="size-5" />}
        label="Taux de recouvrement"
        value={`${kpis.recoveryRate}%`}
        iconClassName="bg-green-100 text-kaelix-green"
      />
    </div>
  )
}
