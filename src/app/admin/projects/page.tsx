import Link from "next/link"
import { Plus, FolderKanban } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAdminProjects } from "@/lib/queries/admin"

export const metadata = {
  title: "Projets — Admin Kaelix",
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

const projectTypeLabels: Record<string, string> = {
  "site-vitrine": "Site Vitrine",
  "site-ecommerce": "E-commerce",
  "application-web": "Application Web",
  "refonte-site": "Refonte",
  "seo-performance": "SEO",
  maintenance: "Maintenance",
}

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects()

  return (
    <>
      <PageHeader
        title="Projets"
        description="Gérez tous les projets clients"
        actions={
          <Button nativeButton={false} render={<Link href="/admin/projects/new" />}>
            <Plus className="size-4" />
            Nouveau projet
          </Button>
        }
      />

      {projects.length === 0 ? (
        <EmptyState
          icon={<FolderKanban className="h-8 w-8 text-muted-foreground" />}
          title="Aucun projet"
          description="Créez votre premier projet pour commencer."
          actionLabel="Nouveau projet"
          actionHref="/admin/projects/new"
        />
      ) : (
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Progression</TableHead>
                <TableHead>Dates</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id} className="cursor-pointer">
                  <TableCell className="font-medium">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="hover:underline"
                    >
                      {project.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {projectTypeLabels[project.type] ?? project.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">
                        {project.client_name ?? "Client inconnu"}
                      </p>
                      {project.client_company && (
                        <p className="text-xs text-muted-foreground">
                          {project.client_company}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge type="project" status={project.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-24">
                        <Progress value={project.progress ?? 0} />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {project.progress ?? 0}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-muted-foreground">
                      {project.start_date && (
                        <p>
                          Début :{" "}
                          {dateFormatter.format(new Date(project.start_date))}
                        </p>
                      )}
                      {project.due_date && (
                        <p>
                          Échéance :{" "}
                          {dateFormatter.format(new Date(project.due_date))}
                        </p>
                      )}
                      {!project.start_date && !project.due_date && (
                        <p>—</p>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  )
}
