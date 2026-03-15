import { createClient } from "@/lib/supabase/server"

export interface AdminKPIs {
  pendingProjects: number
  inProgressProjects: number
  launchedThisMonth: number
  revenueThisMonth: number
  unpaidInvoices: number
  unpaidAmount: number
}

export async function getAdminKPIs(): Promise<AdminKPIs> {
  const supabase = await createClient()

  // Pending projects count
  const { count: pendingProjects } = await supabase
    .from("projects")
    .select("id", { count: "exact", head: true })
    .eq("status", "pending")

  // In-progress projects count (discovery through review)
  const { count: inProgressProjects } = await supabase
    .from("projects")
    .select("id", { count: "exact", head: true })
    .in("status", ["discovery", "proposal", "design", "development", "review"])

  // Launched this month
  const monthStart = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  ).toISOString()
  const { count: launchedThisMonth } = await supabase
    .from("projects")
    .select("id", { count: "exact", head: true })
    .eq("status", "launched")
    .gte("updated_at", monthStart)

  // Revenue this month (paid invoices)
  const { data: paidInvoices } = await supabase
    .from("invoices")
    .select("amount")
    .eq("status", "paid")
    .gte("paid_at", monthStart)

  const revenueThisMonth = (paidInvoices ?? []).reduce(
    (sum, inv) => sum + (inv.amount ?? 0),
    0
  )

  // Unpaid invoices
  const { data: openInvoices } = await supabase
    .from("invoices")
    .select("amount")
    .eq("status", "open")

  const unpaidInvoices = (openInvoices ?? []).length
  const unpaidAmount = (openInvoices ?? []).reduce(
    (sum, inv) => sum + (inv.amount ?? 0),
    0
  )

  return {
    pendingProjects: pendingProjects ?? 0,
    inProgressProjects: inProgressProjects ?? 0,
    launchedThisMonth: launchedThisMonth ?? 0,
    revenueThisMonth,
    unpaidInvoices,
    unpaidAmount,
  }
}

// Projects with joined profile name
export interface ProjectWithClient {
  id: string
  name: string
  type: string
  status: string
  progress: number | null
  budget: string | null
  start_date: string | null
  due_date: string | null
  admin_id: string | null
  started_at: string | null
  created_at: string
  updated_at: string
  user_id: string
  client_name: string | null
  client_company: string | null
  admin_name: string | null
}

export async function getPendingProjects(): Promise<ProjectWithClient[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("projects")
    .select("*, profiles!projects_user_id_fkey(full_name, company)")
    .eq("status", "pending")
    .order("created_at", { ascending: false })

  if (error || !data) return []

  return data.map((p: any) => ({
    ...p,
    client_name: p.profiles?.full_name ?? null,
    client_company: p.profiles?.company ?? null,
    admin_name: null,
    profiles: undefined,
  }))
}

export async function getInProgressProjects(): Promise<ProjectWithClient[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("projects")
    .select("*, profiles!projects_user_id_fkey(full_name, company)")
    .in("status", ["discovery", "proposal", "design", "development", "review"])
    .order("updated_at", { ascending: false })

  if (error || !data) return []

  return data.map((p: any) => ({
    ...p,
    client_name: p.profiles?.full_name ?? null,
    client_company: p.profiles?.company ?? null,
    admin_name: null,
    profiles: undefined,
  }))
}

export async function getRecentInvoices(limit = 10) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("invoices")
    .select("*, profiles!invoices_user_id_fkey(full_name, company)")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error || !data) return []

  return data.map((inv: any) => ({
    ...inv,
    client_name: inv.profiles?.full_name ?? null,
    client_company: inv.profiles?.company ?? null,
    profiles: undefined,
  }))
}

// --- Billing KPIs & invoice queries ---

export interface AdminBillingKPIs {
  revenueThisMonth: number
  revenueThisYear: number
  pendingAmount: number
  overdueAmount: number
  recoveryRate: number
}

export async function getAdminBillingKPIs(): Promise<AdminBillingKPIs> {
  const supabase = await createClient()

  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  const yearStart = new Date(new Date().getFullYear(), 0, 1).toISOString()
  const today = new Date().toISOString().split("T")[0]

  // Revenue this month
  const { data: monthPaid } = await supabase
    .from("invoices")
    .select("amount")
    .eq("status", "paid")
    .gte("paid_at", monthStart)

  const revenueThisMonth = (monthPaid ?? []).reduce((s, i) => s + (i.amount ?? 0), 0)

  // Revenue this year
  const { data: yearPaid } = await supabase
    .from("invoices")
    .select("amount")
    .eq("status", "paid")
    .gte("paid_at", yearStart)

  const revenueThisYear = (yearPaid ?? []).reduce((s, i) => s + (i.amount ?? 0), 0)

  // Pending (open) amount
  const { data: openInvoices } = await supabase
    .from("invoices")
    .select("amount, due_date")
    .eq("status", "open")

  const pendingAmount = (openInvoices ?? []).reduce((s, i) => s + (i.amount ?? 0), 0)

  // Overdue amount (open + past due)
  const overdueAmount = (openInvoices ?? [])
    .filter(i => i.due_date && i.due_date < today)
    .reduce((s, i) => s + (i.amount ?? 0), 0)

  // Recovery rate = paid / (paid + open) * 100
  const { count: totalPaid } = await supabase
    .from("invoices")
    .select("id", { count: "exact", head: true })
    .eq("status", "paid")

  const { count: totalOpen } = await supabase
    .from("invoices")
    .select("id", { count: "exact", head: true })
    .eq("status", "open")

  const total = (totalPaid ?? 0) + (totalOpen ?? 0)
  const recoveryRate = total > 0 ? Math.round(((totalPaid ?? 0) / total) * 100) : 100

  return { revenueThisMonth, revenueThisYear, pendingAmount, overdueAmount, recoveryRate }
}

export async function getAdminInvoices(filters?: { status?: string; search?: string }) {
  const supabase = await createClient()

  let query = supabase
    .from("invoices")
    .select("*, profiles!invoices_user_id_fkey(full_name, company)")
    .order("created_at", { ascending: false })

  if (filters?.status) {
    query = query.eq("status", filters.status)
  }

  const { data, error } = await query

  if (error || !data) return []

  let results = data.map((inv: any) => ({
    ...inv,
    client_name: inv.profiles?.full_name ?? null,
    client_company: inv.profiles?.company ?? null,
    profiles: undefined,
  }))

  if (filters?.search) {
    const s = filters.search.toLowerCase()
    results = results.filter(
      (inv: any) =>
        inv.client_name?.toLowerCase().includes(s) ||
        inv.client_company?.toLowerCase().includes(s) ||
        inv.stripe_invoice_id?.toLowerCase().includes(s)
    )
  }

  return results
}

// ---------------------------------------------------------------------------
// Admin project management queries (Phase 5)
// ---------------------------------------------------------------------------

export interface AdminProjectFilters {
  status?: string
  type?: string
  search?: string
}

export async function getAdminProjects(
  filters?: AdminProjectFilters
): Promise<ProjectWithClient[]> {
  const supabase = await createClient()

  let query = supabase
    .from("projects")
    .select("*, profiles!projects_user_id_fkey(full_name, company)")
    .order("created_at", { ascending: false })

  if (filters?.status) {
    query = query.eq("status", filters.status)
  }
  if (filters?.type) {
    query = query.eq("type", filters.type)
  }
  if (filters?.search) {
    query = query.ilike("name", `%${filters.search}%`)
  }

  const { data, error } = await query

  if (error || !data) return []

  return data.map((p: any) => ({
    ...p,
    client_name: p.profiles?.full_name ?? null,
    client_company: p.profiles?.company ?? null,
    admin_name: null,
    profiles: undefined,
  }))
}

export interface AdminProjectDetail {
  project: ProjectWithClient & { description: string | null }
  deliverables: Array<{
    id: string
    title: string
    description: string | null
    status: string
    due_date: string | null
    sort_order: number | null
    created_at: string
    updated_at: string
  }>
  invoices: Array<{
    id: string
    amount: number
    currency: string
    status: string
    due_date: string | null
    paid_at: string | null
    created_at: string
  }>
  activity: Array<{
    id: string
    action: string
    description: string | null
    created_at: string
    user_id: string
  }>
}

export async function getAdminProjectById(
  id: string
): Promise<AdminProjectDetail | null> {
  const supabase = await createClient()

  // Fetch project with client profile
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*, profiles!projects_user_id_fkey(full_name, company)")
    .eq("id", id)
    .single()

  if (projectError || !project) return null

  // Fetch deliverables, invoices, and activity in parallel
  const [deliverableRes, invoiceRes, activityRes] = await Promise.all([
    supabase
      .from("deliverables")
      .select("id, title, description, status, due_date, sort_order, created_at, updated_at")
      .eq("project_id", id)
      .order("sort_order", { ascending: true }),
    supabase
      .from("invoices")
      .select("id, amount, currency, status, due_date, paid_at, created_at")
      .eq("project_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("activity_log")
      .select("id, action, description, created_at, user_id")
      .eq("project_id", id)
      .order("created_at", { ascending: false })
      .limit(20),
  ])

  const mappedProject = {
    ...project,
    client_name: (project as any).profiles?.full_name ?? null,
    client_company: (project as any).profiles?.company ?? null,
    admin_name: null,
    profiles: undefined,
  }

  return {
    project: mappedProject as AdminProjectDetail["project"],
    deliverables: deliverableRes.data ?? [],
    invoices: invoiceRes.data ?? [],
    activity: activityRes.data ?? [],
  }
}

export interface ActiveClient {
  id: string
  full_name: string | null
  company: string | null
}

export async function getActiveClients(): Promise<ActiveClient[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, company")
    .order("full_name", { ascending: true })

  if (error || !data) return []

  return data
}
