import { PageHeader } from "@/components/shared/page-header"
import { InviteForm } from "@/components/admin/users/invite-form"

export const metadata = {
  title: "Inviter un utilisateur — Admin Kaelix",
}

export default function InviteUserPage() {
  return (
    <>
      <PageHeader
        title="Inviter un utilisateur"
        breadcrumbs={[
          { label: "Utilisateurs", href: "/admin/users" },
          { label: "Inviter" },
        ]}
      />
      <InviteForm />
    </>
  )
}
