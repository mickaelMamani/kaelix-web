import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"

import { getProjectWithDeliverables } from "@/lib/queries/projects"
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

  const result = await getProjectWithDeliverables(id)

  if (!result) {
    notFound()
  }

  // Verify the user owns this project
  if (result.project.user_id !== user.id) {
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
