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

  // Fetch user profile (includes company name)
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url, company, role")
    .eq("id", user.id)
    .single()

  const userData = {
    fullName: profile?.full_name ?? user.email?.split("@")[0] ?? "Utilisateur",
    email: user.email ?? "",
    avatarUrl: profile?.avatar_url ?? undefined,
    isAdmin: profile?.role === "admin",
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar user={userData} companyName={profile?.company ?? undefined} />
      <div className="flex flex-1 flex-col">
        <ClientHeader user={userData} />
        <main className="flex-1 bg-gray-50 p-4 pb-20 lg:p-6 lg:pb-6">
          {children}
        </main>
      </div>
      <MobileBottomNav isAdmin={userData.isAdmin} />
    </div>
  )
}
