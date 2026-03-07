import { CheckCircle2, Circle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmptyState } from "@/components/shared/empty-state"
import { ClipboardList } from "lucide-react"
import type { Deliverable } from "@/types"

interface ProjectDeliverablesProps {
  deliverables: Deliverable[]
}

function getStatusIcon(status: string) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-5 w-5 text-green-600" />
    case "in_progress":
      return <Clock className="h-5 w-5 text-blue-600" />
    default:
      return <Circle className="h-5 w-5 text-gray-400" />
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case "completed":
      return "Terminé"
    case "in_progress":
      return "En cours"
    default:
      return "À venir"
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ""
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function ProjectDeliverables({ deliverables }: ProjectDeliverablesProps) {
  if (deliverables.length === 0) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="Aucun livrable"
        description="Les livrables de ce projet n'ont pas encore été définis."
      />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Livrables</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {deliverables.map((deliverable, index) => (
            <div key={deliverable.id}>
              <div className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50">
                <div className="mt-0.5 shrink-0">
                  {getStatusIcon(deliverable.status)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-medium">{deliverable.title}</h4>
                      {deliverable.description && (
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {deliverable.description}
                        </p>
                      )}
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className="text-xs text-muted-foreground">
                        {getStatusLabel(deliverable.status)}
                      </span>
                      {deliverable.due_date && (
                        <span className="text-xs text-muted-foreground">
                          {formatDate(deliverable.due_date)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {index < deliverables.length - 1 && (
                <div className="ml-6 border-l-2 border-muted pl-5 py-1" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
