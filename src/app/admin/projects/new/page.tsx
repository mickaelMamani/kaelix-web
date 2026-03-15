import { PageHeader } from "@/components/shared/page-header"
import { CreateProjectForm } from "@/components/admin/projects/create-project-form"
import { getActiveClients } from "@/lib/queries/admin"

export const metadata = {
  title: "Nouveau projet — Admin Kaelix",
}

export default async function NewProjectPage() {
  const clients = await getActiveClients()

  return (
    <>
      <PageHeader
        title="Nouveau projet"
        breadcrumbs={[
          { label: "Projets", href: "/admin/projects" },
          { label: "Nouveau projet" },
        ]}
      />
      <CreateProjectForm clients={clients} />
    </>
  )
}
