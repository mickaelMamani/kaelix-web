import {
  Clock,
  Rocket,
  CheckCircle,
  Euro,
  AlertTriangle,
  Receipt,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { AdminKPIs } from "@/lib/queries/admin"

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
})

interface KPICardProps {
  icon: React.ReactNode
  label: string
  value: string
  iconClassName?: string
}

function KPICard({ icon, label, value, iconClassName }: KPICardProps) {
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
          <p className="text-2xl font-bold tracking-tight">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function KPICards({ kpis }: { kpis: AdminKPIs }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      <KPICard
        icon={<Clock className="size-5" />}
        label="En attente"
        value={String(kpis.pendingProjects)}
        iconClassName="bg-amber-100 text-amber-600"
      />
      <KPICard
        icon={<Rocket className="size-5" />}
        label="En cours"
        value={String(kpis.inProgressProjects)}
        iconClassName="bg-blue-100 text-kaelix-blue"
      />
      <KPICard
        icon={<CheckCircle className="size-5" />}
        label="Lancés ce mois"
        value={String(kpis.launchedThisMonth)}
        iconClassName="bg-green-100 text-kaelix-green"
      />
      <KPICard
        icon={<Euro className="size-5" />}
        label="Revenus ce mois"
        value={currencyFormatter.format(kpis.revenueThisMonth / 100)}
        iconClassName="bg-emerald-100 text-emerald-600"
      />
      <KPICard
        icon={<AlertTriangle className="size-5" />}
        label="Factures impayées"
        value={String(kpis.unpaidInvoices)}
        iconClassName="bg-red-100 text-red-600"
      />
      <KPICard
        icon={<Receipt className="size-5" />}
        label="Montant impayé"
        value={currencyFormatter.format(kpis.unpaidAmount / 100)}
        iconClassName="bg-orange-100 text-orange-600"
      />
    </div>
  )
}
