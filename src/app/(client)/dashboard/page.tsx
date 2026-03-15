import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { FolderOpen } from "lucide-react"

import { getProfile } from "@/lib/queries/profiles"
import { getProjects } from "@/lib/queries/projects"
import { getRecentActivity } from "@/lib/queries/activity"
import { WelcomeHeader } from "@/components/client/dashboard/welcome-header"
import { StatsWidgets } from "@/components/client/dashboard/stats-widgets"
import { DashboardProjectList } from "@/components/client/dashboard/project-list"
import { ActivityFeed } from "@/components/client/dashboard/activity-feed"
import { QuickActions } from "@/components/client/dashboard/quick-actions"
import { EmptyState } from "@/components/shared/empty-state"

export const metadata = {
  title: "Tableau de Bord",
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch data in parallel
  const [profile, projects, activities] = await Promise.all([
    getProfile(user.id),
    getProjects(user.id),
    getRecentActivity(user.id, 5),
  ])

  return (
    <div className="space-y-6">
      <WelcomeHeader fullName={profile?.full_name ?? null} />

      <StatsWidgets projects={projects} />

      {projects.length === 0 ? (
        <EmptyState
          icon={<FolderOpen className="h-8 w-8 text-muted-foreground" />}
          title="Aucun projet pour le moment"
          description="Vous n'avez pas encore de projet en cours. Contactez-nous pour démarrer votre premier projet."
          actionLabel="Demander un devis"
          actionHref="/contact"
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <DashboardProjectList projects={projects} />
          </div>
          <div>
            <ActivityFeed activities={activities} />
          </div>
        </div>
      )}

      <div>
        <h2 className="mb-4 text-lg font-semibold">Actions rapides</h2>
        <QuickActions />
      </div>
    </div>
  )
}
