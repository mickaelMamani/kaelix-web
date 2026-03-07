import { Calendar, Euro, Clock, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { StatusBadge } from "@/components/shared/status-badge"
import { Separator } from "@/components/ui/separator"
import type { Project } from "@/types"

interface ProjectOverviewProps {
  project: Project
}

const projectTypeLabels: Record<string, string> = {
  "site-vitrine": "Site Vitrine",
  "site-ecommerce": "E-commerce",
  "application-web": "Application Web",
  "refonte-site": "Refonte",
  "seo-performance": "SEO & Performance",
  maintenance: "Maintenance",
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Non défini"
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function formatBudget(budget: string | null): string {
  if (!budget) return "Non défini"
  const num = parseFloat(budget)
  if (isNaN(num)) return budget
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(num)
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  const progress = project.progress ?? 0

  return (
    <div className="space-y-6">
      {/* Progress section */}
      <Card>
        <CardHeader>
          <CardTitle>Progression</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={progress}>
              <span className="text-lg font-bold">{progress}%</span>
            </Progress>
          </div>
        </CardContent>
      </Card>

      {/* Project info */}
      <Card>
        <CardHeader>
          <CardTitle>Informations du projet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Type</p>
                <Badge variant="secondary">
                  {projectTypeLabels[project.type] ?? project.type}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Statut</p>
                <StatusBadge type="project" status={project.status} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Euro className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Budget</p>
                <p className="text-sm font-medium">
                  {formatBudget(project.budget)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Dates</p>
                <p className="text-sm font-medium">
                  {formatDate(project.start_date)} — {formatDate(project.due_date)}
                </p>
              </div>
            </div>
          </div>

          {project.description && (
            <>
              <Separator />
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Description
                </p>
                <p className="text-sm leading-relaxed">{project.description}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
