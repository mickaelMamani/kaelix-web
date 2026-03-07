import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getUserOrganization } from "@/lib/queries/organizations"
import {
  getBillingSummary,
  getInvoices,
  getPaymentMethods,
} from "@/lib/queries/billing"
import { PageHeader } from "@/components/shared/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BillingSummary } from "@/components/client/billing/billing-summary"
import { InvoicesTab } from "@/components/client/billing/invoices-tab"
import { PaymentMethodsTab } from "@/components/client/billing/payment-methods-tab"

export const metadata = {
  title: "Facturation",
}

export default async function BillingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const userOrg = await getUserOrganization(user.id)

  if (!userOrg) {
    redirect("/dashboard")
  }

  const orgId = userOrg.organization.id

  // Fetch billing data in parallel
  const [summary, invoices, paymentMethods] = await Promise.all([
    getBillingSummary(orgId),
    getInvoices(orgId),
    getPaymentMethods(orgId),
  ])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Facturation"
        description="G\u00e9rez vos factures et m\u00e9thodes de paiement."
      />

      <BillingSummary summary={summary} />

      <Tabs defaultValue="invoices">
        <TabsList>
          <TabsTrigger value="invoices">Factures</TabsTrigger>
          <TabsTrigger value="payment-methods">
            M\u00e9thodes de paiement
          </TabsTrigger>
        </TabsList>
        <TabsContent value="invoices" className="mt-6">
          <InvoicesTab invoices={invoices} />
        </TabsContent>
        <TabsContent value="payment-methods" className="mt-6">
          <PaymentMethodsTab
            paymentMethods={paymentMethods}
            orgId={orgId}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
