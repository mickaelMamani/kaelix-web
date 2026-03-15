import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

import { PageHeader } from "@/components/shared/page-header"
import { SupportForm } from "@/components/client/support/support-form"
import { SupportAlternatives } from "@/components/client/support/support-alternatives"

export const metadata = {
  title: "Support",
}

export default async function SupportPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user's projects for the dropdown
  const { data: projectsData } = await supabase
    .from("projects")
    .select("id, name")
    .eq("user_id", user.id)
    .order("name", { ascending: true })

  const projects = projectsData ?? []

  return (
    <div className="space-y-6">
      <PageHeader
        title="Support"
        description="Envoyez un message à notre équipe. Vous recevrez une réponse par email sous 24h."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SupportForm projects={projects} />
        </div>
        <div>
          <SupportAlternatives />
        </div>
      </div>
    </div>
  )
}
