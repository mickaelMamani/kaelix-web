import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatusBadge } from "@/components/shared/status-badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle } from "lucide-react"
import type { ProjectWithClient } from "@/lib/queries/admin"

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

function isOverdue(dueDate: string | null, status: string): boolean {
  if (!dueDate || status === "launched") return false
  return new Date(dueDate) < new Date()
}

export function ActiveProjects({
  projects,
}: {
  projects: ProjectWithClient[]
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projets en cours</CardTitle>
      </CardHeader>
      <CardContent>
        {projects.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Aucun projet en cours
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Projet</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Progression</TableHead>
                <TableHead>Dates</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => {
                const overdue = isOverdue(project.due_date, project.status)
                return (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {project.name}
                        {overdue && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                            <AlertTriangle className="size-3" />
                            En retard
                          </span>
                        )}
                      </div>
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
                          <p
                            className={overdue ? "font-medium text-red-600" : ""}
                          >
                            Échéance :{" "}
                            {dateFormatter.format(new Date(project.due_date))}
                          </p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
