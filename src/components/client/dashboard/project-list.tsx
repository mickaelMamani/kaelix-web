import Link from "next/link"
import { Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { StatusBadge } from "@/components/shared/status-badge"
import type { Project } from "@/types"

interface DashboardProjectListProps {
  projects: Project[]
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Non défini"
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function DashboardProjectList({ projects }: DashboardProjectListProps) {
  const activeStatuses = ["discovery", "proposal", "design", "development", "review"]
  const activeProjects = projects.filter((p) =>
    activeStatuses.includes(p.status)
  )

  if (activeProjects.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projets en cours</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeProjects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="block rounded-lg border p-4 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-medium">{project.name}</h3>
                  <StatusBadge type="project" status={project.status} />
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <div className="flex-1">
                    <Progress value={project.progress ?? 0}>
                      <span className="text-xs text-muted-foreground">
                        {project.progress ?? 0}%
                      </span>
                    </Progress>
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(project.due_date)}</span>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
