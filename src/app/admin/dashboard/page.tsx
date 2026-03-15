import { PageHeader } from "@/components/shared/page-header"
import { KPICards } from "@/components/admin/dashboard/kpi-cards"
import { PendingProjects } from "@/components/admin/dashboard/pending-projects"
import { ActiveProjects } from "@/components/admin/dashboard/active-projects"
import { RecentInvoices } from "@/components/admin/dashboard/recent-invoices"
import {
  getAdminKPIs,
  getPendingProjects,
  getInProgressProjects,
  getRecentInvoices,
} from "@/lib/queries/admin"

export const metadata = {
  title: "Tableau de bord — Admin Kaelix",
}

export default async function AdminDashboardPage() {
  const [kpis, pendingProjects, activeProjects, recentInvoices] =
    await Promise.all([
      getAdminKPIs(),
      getPendingProjects(),
      getInProgressProjects(),
      getRecentInvoices(),
    ])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tableau de bord"
        description="Vue d'ensemble de l'activité et des projets"
      />
      <KPICards kpis={kpis} />
      <PendingProjects projects={pendingProjects} />
      <ActiveProjects projects={activeProjects} />
      <RecentInvoices invoices={recentInvoices} />
    </div>
  )
}
