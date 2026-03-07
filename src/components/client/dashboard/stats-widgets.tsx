import { FolderKanban, TrendingUp, ClipboardList } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Project, Deliverable } from "@/types"

interface StatsWidgetsProps {
  projects: Project[]
  deliverables?: Deliverable[]
}

export function StatsWidgets({ projects, deliverables = [] }: StatsWidgetsProps) {
  const activeStatuses = ["discovery", "proposal", "design", "development", "review"]
  const activeProjects = projects.filter((p) =>
    activeStatuses.includes(p.status)
  )

  const averageProgress =
    activeProjects.length > 0
      ? Math.round(
          activeProjects.reduce((sum, p) => sum + (p.progress ?? 0), 0) /
            activeProjects.length
        )
      : 0

  const pendingDeliverables = deliverables.filter(
    (d) => d.status === "pending" || d.status === "in_progress"
  )

  const stats = [
    {
      label: "Projets actifs",
      value: activeProjects.length,
      icon: FolderKanban,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Progression moyenne",
      value: `${averageProgress}%`,
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Livrables en attente",
      value: pendingDeliverables.length,
      icon: ClipboardList,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex items-center gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
