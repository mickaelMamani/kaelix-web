import { notFound } from "next/navigation"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAdminUserById } from "@/lib/queries/admin"
import { createStripeCustomerAdmin } from "@/lib/stripe/customers"
import {
  Mail,
  Phone,
  Building2,
  MapPin,
  CreditCard,
  Calendar,
  ExternalLink,
  CheckCircle2,
  Clock,
  DollarSign,
  FolderKanban,
} from "lucide-react"

export const metadata = {
  title: "Utilisateur — Admin Kaelix",
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
})

const projectTypeLabels: Record<string, string> = {
  "site-vitrine": "Site Vitrine",
  "site-ecommerce": "E-commerce",
  "application-web": "Application Web",
  "refonte-site": "Refonte",
  "seo-performance": "SEO",
  maintenance: "Maintenance",
}

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  let data = await getAdminUserById(id)
  if (!data) notFound()

  // If no Stripe customer exists, create one now
  if (!data.stripe && data.email) {
    await createStripeCustomerAdmin(
      data.profile.id,
      data.email,
      data.profile.full_name ?? data.email
    )
    // Re-fetch to get Stripe data
    data = (await getAdminUserById(id))!
  }

  const { profile, email, hasConfirmed, projects, invoices, stripe } = data

  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const totalPaid = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <>
      <PageHeader
        title={profile.full_name ?? email}
        breadcrumbs={[
          { label: "Utilisateurs", href: "/admin/users" },
          { label: profile.full_name ?? email },
        ]}
        actions={
          <Badge variant={hasConfirmed ? "default" : "outline"}>
            {hasConfirmed ? "Actif" : "En attente"}
          </Badge>
        }
      />

      {/* Info cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <Mail className="size-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium">{email}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <Building2 className="size-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Entreprise</p>
              <p className="text-sm font-medium">
                {profile.company ?? "Non renseigné"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <Phone className="size-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Téléphone</p>
              <p className="text-sm font-medium">
                {profile.phone ?? "Non renseigné"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <Calendar className="size-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Inscrit le</p>
              <p className="text-sm font-medium">
                {dateFormatter.format(new Date(profile.created_at))}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Address */}
      {(profile.address || profile.city || profile.country) && (
        <Card className="mb-6">
          <CardContent className="flex items-center gap-3 pt-6">
            <MapPin className="size-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Adresse</p>
              <p className="text-sm font-medium">
                {[profile.address, profile.city, profile.country]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs: Stripe, Projects, Invoices */}
      <Tabs defaultValue="stripe">
        <TabsList>
          <TabsTrigger value="stripe">
            <CreditCard className="mr-1.5 size-4" />
            Stripe
          </TabsTrigger>
          <TabsTrigger value="projects">
            <FolderKanban className="mr-1.5 size-4" />
            Projets ({projects.length})
          </TabsTrigger>
          <TabsTrigger value="invoices">
            <DollarSign className="mr-1.5 size-4" />
            Factures ({invoices.length})
          </TabsTrigger>
        </TabsList>

        {/* Stripe tab */}
        <TabsContent value="stripe" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Informations Stripe
                {stripe && (
                  <a
                    href={`https://dashboard.stripe.com/customers/${stripe.customerId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-normal text-kaelix-blue hover:underline inline-flex items-center gap-1"
                  >
                    Voir dans Stripe
                    <ExternalLink className="size-3" />
                  </a>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stripe ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground">Customer ID</p>
                    <p className="mt-1 font-mono text-sm">{stripe.customerId}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-green-500" />
                      <p className="text-xs text-muted-foreground">
                        Créé le
                      </p>
                    </div>
                    <p className="mt-1 text-sm font-medium">
                      {dateFormatter.format(new Date(stripe.created * 1000))}
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground">Solde</p>
                    <p className="mt-1 text-sm font-medium">
                      {currencyFormatter.format(stripe.balance / 100)}
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground">
                      Factures Stripe
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      {stripe.invoiceCount}
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground">Total payé</p>
                    <p className="mt-1 text-sm font-medium">
                      {currencyFormatter.format(stripe.totalSpent / 100)}
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground">Email Stripe</p>
                    <p className="mt-1 text-sm font-medium">
                      {stripe.email ?? "—"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="size-4" />
                  Aucun compte Stripe associé
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects tab */}
        <TabsContent value="projects" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Projets</CardTitle>
            </CardHeader>
            <CardContent>
              {projects.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  Aucun projet pour cet utilisateur
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Progression</TableHead>
                      <TableHead>Créé le</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>
                          <Link
                            href={`/admin/projects/${project.id}`}
                            className="font-medium text-kaelix-blue hover:underline"
                          >
                            {project.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          {projectTypeLabels[project.type] ?? project.type}
                        </TableCell>
                        <TableCell>
                          <StatusBadge type="project" status={project.status} />
                        </TableCell>
                        <TableCell>
                          {project.progress != null
                            ? `${project.progress}%`
                            : "—"}
                        </TableCell>
                        <TableCell>
                          {dateFormatter.format(new Date(project.created_at))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoices tab */}
        <TabsContent value="invoices" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Factures</span>
                <div className="flex gap-4 text-sm font-normal text-muted-foreground">
                  <span>
                    Total facturé :{" "}
                    <strong className="text-foreground">
                      {currencyFormatter.format(totalInvoiced / 100)}
                    </strong>
                  </span>
                  <span>
                    Payé :{" "}
                    <strong className="text-green-600">
                      {currencyFormatter.format(totalPaid / 100)}
                    </strong>
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {invoices.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  Aucune facture pour cet utilisateur
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Échéance</TableHead>
                      <TableHead>Payée le</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>
                          {dateFormatter.format(new Date(invoice.created_at))}
                        </TableCell>
                        <TableCell className="font-medium">
                          {currencyFormatter.format(invoice.amount / 100)}
                        </TableCell>
                        <TableCell>
                          <StatusBadge type="invoice" status={invoice.status} />
                        </TableCell>
                        <TableCell>
                          {invoice.due_date
                            ? dateFormatter.format(new Date(invoice.due_date))
                            : "—"}
                        </TableCell>
                        <TableCell>
                          {invoice.paid_at
                            ? dateFormatter.format(new Date(invoice.paid_at))
                            : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
