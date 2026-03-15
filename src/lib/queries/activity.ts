import { createClient } from "@/lib/supabase/server"
import type { ActivityLog } from "@/types"

export async function getRecentActivity(
  userId: string,
  limit: number = 5
): Promise<ActivityLog[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("activity_log")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error || !data) {
    return []
  }

  return data as ActivityLog[]
}
