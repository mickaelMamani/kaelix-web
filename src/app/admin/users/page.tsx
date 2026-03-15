import Link from "next/link"
import { UserPlus, Users } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const metadata = {
  title: "Utilisateurs — Admin Kaelix",
}

export default async function AdminUsersPage() {
  // Fetch auth users (emails) via admin client
  const supabaseAdmin = createAdminClient()
  const { data: authData } = await supabaseAdmin.auth.admin.listUsers()
  const authUsers = authData?.users ?? []

  // Build email lookup map
  const emailMap = new Map<string, string>()
  for (const u of authUsers) {
    emailMap.set(u.id, u.email ?? "")
  }

  // Fetch profiles via server client (admin RLS policy)
  const supabase = await createClient()
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, company, role, created_at")
    .order("created_at", { ascending: false })

  // Fetch project counts per user
  const { data: projectCounts } = await supabase
    .from("projects")
    .select("user_id")

  const countMap = new Map<string, number>()
  if (projectCounts) {
    for (const p of projectCounts) {
      countMap.set(p.user_id, (countMap.get(p.user_id) ?? 0) + 1)
    }
  }

  // Merge data
  const users = (profiles ?? []).map((profile) => ({
    ...profile,
    email: emailMap.get(profile.id) ?? "",
    projectCount: countMap.get(profile.id) ?? 0,
  }))

  return (
    <>
      <PageHeader
        title="Utilisateurs"
        description="Gérez les utilisateurs et envoyez des invitations"
        actions={
          <Button nativeButton={false} render={<Link href="/admin/users/invite" />}>
            <UserPlus className="size-4" />
            Inviter un utilisateur
          </Button>
        }
      />

      {users.length === 0 ? (
        <EmptyState
          icon={<Users className="h-8 w-8 text-muted-foreground" />}
          title="Aucun utilisateur"
          description="Invitez votre premier client pour commencer."
          actionLabel="Inviter un utilisateur"
          actionHref="/admin/users/invite"
        />
      ) : (
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Entreprise</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Projets</TableHead>
                <TableHead>Inscrit le</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.full_name ?? "—"}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.company ?? "—"}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                      {user.role === "admin" ? "Admin" : "Client"}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.projectCount}</TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  )
}
