import {
  Activity,
  FileText,
  CheckCircle2,
  MessageSquare,
  Upload,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ActivityLog } from "@/types"

interface ActivityFeedProps {
  activities: ActivityLog[]
}

function getActivityIcon(action: string) {
  switch (action) {
    case "project_created":
    case "project_updated":
      return FileText
    case "deliverable_completed":
      return CheckCircle2
    case "message_sent":
    case "comment_added":
      return MessageSquare
    case "file_uploaded":
      return Upload
    default:
      return Activity
  }
}

function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMinutes < 1) return "À l'instant"
  if (diffMinutes < 60) return `Il y a ${diffMinutes} min`
  if (diffHours < 24) return `Il y a ${diffHours}h`
  if (diffDays === 1) return "Hier"
  if (diffDays < 7) return `Il y a ${diffDays} jours`
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  })
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  if (activities.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activité récente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.action)
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm">
                    {activity.description ?? activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {getRelativeTime(activity.created_at)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
