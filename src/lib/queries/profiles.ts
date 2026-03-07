import { createClient } from "@/lib/supabase/server"
import type { Profile } from "@/types"

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single()

  if (error || !data) {
    return null
  }

  return data as Profile
}

export async function updateProfile(
  userId: string,
  data: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>
): Promise<Profile | null> {
  const supabase = await createClient()

  const { data: updated, error } = await supabase
    .from("profiles")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", userId)
    .select("*")
    .single()

  if (error || !updated) {
    return null
  }

  return updated as Profile
}
