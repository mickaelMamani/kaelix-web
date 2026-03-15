import { PageHeader } from "@/components/shared/page-header"
import { BillingKPIs } from "@/components/admin/billing/billing-kpis"
import { InvoicesTable } from "@/components/admin/billing/invoices-table"
import { getAdminBillingKPIs, getAdminInvoices } from "@/lib/queries/admin"

export const metadata = {
  title: "Facturation — Admin Kaelix",
}

export default async function AdminBillingPage() {
  const [kpis, invoices] = await Promise.all([
    getAdminBillingKPIs(),
    getAdminInvoices(),
  ])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Facturation"
        description="Suivi des factures et revenus"
      />
      <BillingKPIs kpis={kpis} />
      <InvoicesTable invoices={invoices} />
    </div>
  )
}
