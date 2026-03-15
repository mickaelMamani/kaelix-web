import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ProjectWithClient } from "@/lib/queries/admin"
import { StartProjectButton } from "./start-project-button"

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

export function PendingProjects({
  projects,
}: {
  projects: ProjectWithClient[]
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projets en attente</CardTitle>
      </CardHeader>
      <CardContent>
        {projects.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Aucun projet en attente
          </p>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{project.name}</p>
                    <Badge variant="secondary">
                      {projectTypeLabels[project.type] ?? project.type}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span>
                      {project.client_name ?? "Client inconnu"}
                      {project.client_company && ` — ${project.client_company}`}
                    </span>
                    <span>
                      Créé le{" "}
                      {dateFormatter.format(new Date(project.created_at))}
                    </span>
                    {project.budget && (
                      <span>
                        Budget : {currencyFormatter.format(Number(project.budget) / 100)}
                      </span>
                    )}
                  </div>
                </div>
                <StartProjectButton projectId={project.id} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
