import Link from "next/link"
import { Calendar, Euro, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/shared/status-badge"
import type { Project } from "@/types"

interface ProjectCardProps {
  project: Project
}

const projectTypeLabels: Record<string, string> = {
  "site-vitrine": "Site Vitrine",
  "site-ecommerce": "E-commerce",
  "application-web": "Application Web",
  "refonte-site": "Refonte",
  "seo-performance": "SEO",
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

export function ProjectCard({ project }: ProjectCardProps) {
  const progress = project.progress ?? 0

  return (
    <Card>
      <CardContent className="space-y-4">
        {/* Top row: status + due date */}
        <div className="flex items-center justify-between">
          <StatusBadge type="project" status={project.status} />
          {project.due_date && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(project.due_date)}</span>
            </div>
          )}
        </div>

        {/* Project name */}
        <div>
          <h3 className="text-lg font-semibold">{project.name}</h3>
          {project.description && (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {project.description}
            </p>
          )}
        </div>

        {/* Progress bar */}
        <div>
          <Progress value={progress}>
            <span className="text-sm font-medium">{progress}%</span>
          </Progress>
        </div>

        {/* Metadata row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">
              {projectTypeLabels[project.type] ?? project.type}
            </Badge>
            {project.budget && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Euro className="h-3.5 w-3.5" />
                <span>{formatBudget(project.budget)}</span>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            render={<Link href={`/projects/${project.id}`} />}
          >
            Voir détails
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
