import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

import { Sidebar } from "@/components/client/sidebar"
import { MobileBottomNav } from "@/components/client/mobile-bottom-nav"
import { ClientHeader } from "@/components/client/client-header"

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
    .eq("id", user.id)
    .single()

  // Fetch organization name
  const { data: membership } = await supabase
    .from("org_members")
    .select("organizations(name)")
    .eq("user_id", user.id)
    .limit(1)
    .single()

  const organizations = membership?.organizations as
    | { name: string }
    | { name: string }[]
    | null

  const orgName = organizations
    ? Array.isArray(organizations)
      ? organizations[0]?.name
      : organizations.name
    : undefined

  const userData = {
    fullName: profile?.full_name ?? user.email?.split("@")[0] ?? "Utilisateur",
    email: user.email ?? "",
    avatarUrl: profile?.avatar_url ?? undefined,
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar user={userData} organizationName={orgName} />
      <div className="flex flex-1 flex-col">
        <ClientHeader user={userData} />
        <main className="flex-1 bg-gray-50 p-4 pb-20 lg:p-6 lg:pb-6">
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  )
}
