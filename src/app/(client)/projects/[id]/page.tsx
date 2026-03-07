import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"

import { getProjectWithDeliverables } from "@/lib/queries/projects"
import { getUserOrganization } from "@/lib/queries/organizations"
import { PageHeader } from "@/components/shared/page-header"
import { ProjectOverview } from "@/components/client/projects/project-overview"
import { ProjectDeliverables } from "@/components/client/projects/project-deliverables"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
  title: "Détail Projet",
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch project and verify organization access
  const [result, userOrg] = await Promise.all([
    getProjectWithDeliverables(id),
    getUserOrganization(user.id),
  ])

  // Project not found
  if (!result) {
    notFound()
  }

  // Verify the user belongs to the project's organization
  if (!userOrg || result.project.org_id !== userOrg.organization.id) {
    notFound()
  }

  const { project, deliverables } = result

  return (
    <div>
      <PageHeader
        title={project.name}
        breadcrumbs={[
          { label: "Projets", href: "/projects" },
          { label: project.name },
        ]}
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Vue d&apos;ensemble</TabsTrigger>
          <TabsTrigger value="deliverables">
            Livrables ({deliverables.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <ProjectOverview project={project} />
        </TabsContent>

        <TabsContent value="deliverables" className="mt-6">
          <ProjectDeliverables deliverables={deliverables} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
