import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getUserOrganization } from "@/lib/queries/organizations"
import { getInvoice } from "@/lib/queries/billing"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentForm } from "@/components/client/billing/payment-form"
import { PaymentSummary } from "@/components/client/billing/payment-summary"

export const metadata = {
  title: "Paiement",
}

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

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
  const invoice = await getInvoice(id, orgId)

  if (!invoice) {
    notFound()
  }

  // Only open invoices can be paid
  if (invoice.status !== "open") {
    redirect(`/billing/${invoice.id}`)
  }

  const shortId = invoice.id.slice(0, 8)

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Paiement \u2014 Facture #${shortId}`}
        breadcrumbs={[
          { label: "Facturation", href: "/billing" },
          { label: `Facture #${shortId}`, href: `/billing/${invoice.id}` },
          { label: "Paiement" },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Payment form - left column */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Informations de paiement</CardTitle>
            </CardHeader>
            <CardContent>
              <PaymentForm invoiceId={invoice.id} amount={invoice.amount} />
            </CardContent>
          </Card>
        </div>

        {/* Invoice summary - right column */}
        <div className="lg:col-span-2">
          <PaymentSummary invoice={invoice} />
        </div>
      </div>
    </div>
  )
}
