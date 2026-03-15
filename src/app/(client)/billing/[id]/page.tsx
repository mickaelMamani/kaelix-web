import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import {
  CreditCard,
  Download,
  Calendar,
  Clock,
  CheckCircle2,
} from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { getInvoice } from "@/lib/queries/billing"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata = {
  title: "D\u00e9tail Facture",
}

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

export default async function InvoiceDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ success?: string }>
}) {
  const { id } = await params
  const { success } = await searchParams

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const invoice = await getInvoice(id, user.id)

  if (!invoice) {
    notFound()
  }

  const shortId = invoice.id.slice(0, 8)

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Facture #${shortId}`}
        breadcrumbs={[
          { label: "Facturation", href: "/billing" },
          { label: `Facture #${shortId}` },
        ]}
        actions={
          <div className="flex items-center gap-2">
            {invoice.pdf_url && (
              <Button
                variant="outline"
                render={
                  <a
                    href={invoice.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <Download className="mr-1 h-4 w-4" />
                T\u00e9l\u00e9charger PDF
              </Button>
            )}
            {invoice.status === "open" && (
              <Button
                render={<Link href={`/billing/${invoice.id}/pay`} />}
              >
                <CreditCard className="mr-1 h-4 w-4" />
                Payer maintenant
              </Button>
            )}
          </div>
        }
      />

      {success === "true" && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          <CheckCircle2 className="h-5 w-5" />
          <p>
            Paiement effectu\u00e9 avec succ\u00e8s ! Votre facture sera mise \u00e0 jour sous peu.
          </p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Invoice details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>D\u00e9tails de la facture</CardTitle>
                <StatusBadge type="invoice" status={invoice.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Date de cr\u00e9ation
                    </p>
                    <p className="font-medium">
                      {dateFormatter.format(new Date(invoice.created_at))}
                    </p>
                  </div>
                </div>

                {invoice.due_date && (
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Date d&apos;\u00e9ch\u00e9ance
                      </p>
                      <p className="font-medium">
                        {dateFormatter.format(new Date(invoice.due_date))}
                      </p>
                    </div>
                  </div>
                )}

                {invoice.paid_at && (
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Pay\u00e9e le
                      </p>
                      <p className="font-medium">
                        {dateFormatter.format(new Date(invoice.paid_at))}
                      </p>
                    </div>
                  </div>
                )}

                {invoice.project_id && (
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Projet</p>
                      <Link
                        href={`/projects/${invoice.project_id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        Voir le projet
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Montant total</span>
                <span className="text-2xl font-bold">
                  {formatEur(invoice.amount)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>R\u00e9sum\u00e9</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Statut</span>
                <StatusBadge type="invoice" status={invoice.status} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Montant</span>
                <span className="font-medium">
                  {formatEur(invoice.amount)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Devise</span>
                <span className="font-medium uppercase">
                  {invoice.currency}
                </span>
              </div>
              {invoice.stripe_invoice_id && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    R\u00e9f. Stripe
                  </span>
                  <span className="font-mono text-xs">
                    {invoice.stripe_invoice_id.slice(0, 16)}...
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {invoice.status === "open" && (
            <Button
              className="w-full"
              size="lg"
              render={<Link href={`/billing/${invoice.id}/pay`} />}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Payer {formatEur(invoice.amount)}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
