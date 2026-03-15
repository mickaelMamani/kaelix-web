import { notFound } from "next/navigation"
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
import { getAdminProjectById } from "@/lib/queries/admin"
import { StatusTransition } from "@/components/admin/projects/status-transition"
import { DeliverablesManager } from "@/components/admin/projects/deliverables-manager"
import {
  Calendar,
  DollarSign,
  User,
  Building2,
  Clock,
} from "lucide-react"

export const metadata = {
  title: "Détail du projet — Admin Kaelix",
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

const dateTimeFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
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

const activityLabels: Record<string, string> = {
  project_created: "Projet créé",
  project_started: "Projet démarré",
  status_changed: "Statut modifié",
  deliverable_created: "Livrable ajouté",
  deliverable_updated: "Livrable mis à jour",
  deliverable_deleted: "Livrable supprimé",
}

export default async function AdminProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const data = await getAdminProjectById(id)
  if (!data) notFound()

  const { project, deliverables, invoices, activity } = data

  return (
    <>
      <PageHeader
        title={project.name}
        breadcrumbs={[
          { label: "Projets", href: "/admin/projects" },
          { label: project.name },
        ]}
        actions={
          <Badge variant="secondary">
            {projectTypeLabels[project.type] ?? project.type}
          </Badge>
        }
      />

      {/* Status pipeline */}
      <div className="mb-6">
        <StatusTransition
          projectId={project.id}
          currentStatus={project.status}
        />
      </div>

      {/* Project info cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <User className="size-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Client</p>
              <p className="text-sm font-medium">
                {project.client_name ?? "Non attribué"}
              </p>
              {project.client_company && (
                <p className="text-xs text-muted-foreground">
                  {project.client_company}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <DollarSign className="size-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Budget</p>
              <p className="text-sm font-medium">
                {project.budget
                  ? currencyFormatter.format(Number(project.budget) / 100)
                  : "Non défini"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <Calendar className="size-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Dates</p>
              <p className="text-sm font-medium">
                {project.start_date
                  ? dateFormatter.format(new Date(project.start_date))
                  : "—"}
                {" — "}
                {project.due_date
                  ? dateFormatter.format(new Date(project.due_date))
                  : "—"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <Building2 className="size-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Statut</p>
              <StatusBadge type="project" status={project.status} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      {project.description && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {project.description}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Tabs: Deliverables, Invoices, Activity */}
      <Tabs defaultValue="deliverables">
        <TabsList>
          <TabsTrigger value="deliverables">
            Livrables ({deliverables.length})
          </TabsTrigger>
          <TabsTrigger value="invoices">
            Factures ({invoices.length})
          </TabsTrigger>
          <TabsTrigger value="activity">
            Activité ({activity.length})
          </TabsTrigger>
        </TabsList>

        {/* Deliverables tab */}
        <TabsContent value="deliverables" className="mt-4">
          <DeliverablesManager
            deliverables={deliverables}
            projectId={project.id}
          />
        </TabsContent>

        {/* Invoices tab */}
        <TabsContent value="invoices" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Factures associées</CardTitle>
            </CardHeader>
            <CardContent>
              {invoices.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  Aucune facture associée à ce projet
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Statut</TableHead>
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
                          <StatusBadge
                            type="invoice"
                            status={invoice.status}
                          />
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

        {/* Activity tab */}
        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Journal d&apos;activité</CardTitle>
            </CardHeader>
            <CardContent>
              {activity.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  Aucune activité enregistrée
                </p>
              ) : (
                <div className="space-y-4">
                  {activity.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start gap-3 border-b pb-3 last:border-0"
                    >
                      <Clock className="mt-0.5 size-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {activityLabels[log.action] ?? log.action}
                        </p>
                        {log.description && (
                          <p className="text-xs text-muted-foreground">
                            {log.description}
                          </p>
                        )}
                      </div>
                      <time className="text-xs text-muted-foreground">
                        {dateTimeFormatter.format(new Date(log.created_at))}
                      </time>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
