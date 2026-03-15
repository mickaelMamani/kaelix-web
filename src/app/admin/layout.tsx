import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default async function AdminLayout({
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

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url, company, role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    redirect("/dashboard")
  }

  const userData = {
    fullName: profile.full_name ?? user.email?.split("@")[0] ?? "Admin",
    email: user.email ?? "",
    avatarUrl: profile.avatar_url ?? undefined,
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar user={userData} />
      <div className="flex flex-1 flex-col">
        <AdminHeader user={userData} />
        <main className="flex-1 bg-gray-50 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
