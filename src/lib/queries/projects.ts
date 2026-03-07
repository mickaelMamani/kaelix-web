import { createClient } from "@/lib/supabase/server"
import type { Project, Deliverable } from "@/types"

export async function getProjects(orgId: string): Promise<Project[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("org_id", orgId)
    .order("created_at", { ascending: false })

  if (error || !data) {
    return []
  }

  return data as Project[]
}

export async function getProject(projectId: string): Promise<Project | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single()

  if (error || !data) {
    return null
  }

  return data as Project
}

export async function getProjectDeliverables(
  projectId: string
): Promise<Deliverable[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("deliverables")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true })

  if (error || !data) {
    return []
  }

  return data as Deliverable[]
}

export async function getProjectWithDeliverables(
  projectId: string
): Promise<{ project: Project; deliverables: Deliverable[] } | null> {
  const [project, deliverables] = await Promise.all([
    getProject(projectId),
    getProjectDeliverables(projectId),
  ])

  if (!project) {
    return null
  }

  return { project, deliverables }
}
