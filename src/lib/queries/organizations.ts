import { createClient } from "@/lib/supabase/server"
import type { Organization, OrgMember } from "@/types"

interface UserOrganization {
  organization: Organization
  membership: OrgMember
}

export async function getUserOrganization(
  userId: string
): Promise<UserOrganization | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("org_members")
    .select("*, organizations(*)")
    .eq("user_id", userId)
    .limit(1)
    .single()

  if (error || !data) {
    return null
  }

  const orgData = data.organizations as unknown as Organization
  if (!orgData) {
    return null
  }

  const membership: OrgMember = {
    id: data.id,
    org_id: data.org_id,
    user_id: data.user_id,
    role: data.role,
    created_at: data.created_at,
    updated_at: data.updated_at,
  }

  return {
    organization: orgData,
    membership,
  }
}

export async function getOrgMembers(orgId: string): Promise<OrgMember[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("org_members")
    .select("*")
    .eq("org_id", orgId)
    .order("created_at", { ascending: true })

  if (error || !data) {
    return []
  }

  return data as OrgMember[]
}
