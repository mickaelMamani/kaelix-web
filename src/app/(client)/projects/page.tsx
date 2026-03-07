import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { FolderOpen } from "lucide-react"

import { getUserOrganization } from "@/lib/queries/organizations"
import { getProjects } from "@/lib/queries/projects"
import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { ProjectList } from "@/components/client/projects/project-list"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Mes Projets",
}

export default async function ProjectsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const userOrg = await getUserOrganization(user.id)
  const projects = userOrg ? await getProjects(userOrg.organization.id) : []

  return (
    <div>
      <PageHeader
        title="Mes Projets"
        description="Suivez la progression de tous vos projets en cours"
        actions={
          projects.length > 0 ? (
            <Badge variant="secondary">{projects.length} projet{projects.length > 1 ? "s" : ""}</Badge>
          ) : undefined
        }
      />

      {projects.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="Aucun projet pour le moment"
          description="Vous n'avez pas encore de projet. Contactez-nous pour discuter de votre prochain projet web."
          actionLabel="Demander un devis"
          actionHref="/contact"
        />
      ) : (
        <ProjectList projects={projects} />
      )}
    </div>
  )
}
