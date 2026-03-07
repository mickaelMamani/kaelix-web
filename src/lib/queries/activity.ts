import { createClient } from "@/lib/supabase/server"
import type { ActivityLog } from "@/types"

export async function getRecentActivity(
  orgId: string,
  limit: number = 5
): Promise<ActivityLog[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("activity_log")
    .select("*")
    .eq("org_id", orgId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error || !data) {
    return []
  }

  return data as ActivityLog[]
}
