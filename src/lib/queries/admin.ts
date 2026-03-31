import { createAdminClient } from "@/lib/supabase/admin"

export interface AdminKPIs {
  pendingProjects: number
  inProgressProjects: number
  launchedThisMonth: number
  revenueThisMonth: number
  unpaidInvoices: number
  unpaidAmount: number
}

export async function getAdminKPIs(): Promise<AdminKPIs> {
  const supabase = createAdminClient()

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
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false })

  if (error || !data) return []

  const userIds = [...new Set(data.map((p) => p.user_id))]
  const { data: profiles } = userIds.length
    ? await supabase.from("profiles").select("id, full_name, company").in("id", userIds)
    : { data: [] }
  const profileMap = new Map((profiles ?? []).map((pr) => [pr.id, pr]))

  return data.map((p) => {
    const profile = profileMap.get(p.user_id)
    return { ...p, client_name: profile?.full_name ?? null, client_company: profile?.company ?? null, admin_name: null }
  })
}

export async function getInProgressProjects(): Promise<ProjectWithClient[]> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .in("status", ["discovery", "proposal", "design", "development", "review"])
    .order("updated_at", { ascending: false })

  if (error || !data) return []

  const userIds = [...new Set(data.map((p) => p.user_id))]
  const { data: profiles } = userIds.length
    ? await supabase.from("profiles").select("id, full_name, company").in("id", userIds)
    : { data: [] }
  const profileMap = new Map((profiles ?? []).map((pr) => [pr.id, pr]))

  return data.map((p) => {
    const profile = profileMap.get(p.user_id)
    return { ...p, client_name: profile?.full_name ?? null, client_company: profile?.company ?? null, admin_name: null }
  })
}

export async function getRecentInvoices(limit = 10) {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error || !data) return []

  const userIds = [...new Set(data.map((inv) => inv.user_id))]
  const { data: profiles } = userIds.length
    ? await supabase.from("profiles").select("id, full_name, company").in("id", userIds)
    : { data: [] }
  const profileMap = new Map((profiles ?? []).map((pr) => [pr.id, pr]))

  return data.map((inv) => {
    const profile = profileMap.get(inv.user_id)
    return { ...inv, client_name: profile?.full_name ?? null, client_company: profile?.company ?? null }
  })
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
  const supabase = createAdminClient()

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
  const supabase = createAdminClient()

  let query = supabase
    .from("invoices")
    .select("*")
    .order("created_at", { ascending: false })

  if (filters?.status) {
    query = query.eq("status", filters.status)
  }

  const { data, error } = await query

  if (error || !data) return []

  const userIds = [...new Set(data.map((inv) => inv.user_id))]
  const { data: profiles } = userIds.length
    ? await supabase.from("profiles").select("id, full_name, company").in("id", userIds)
    : { data: [] }
  const profileMap = new Map((profiles ?? []).map((pr) => [pr.id, pr]))

  let results = data.map((inv: any) => {
    const profile = profileMap.get(inv.user_id)
    return { ...inv, client_name: profile?.full_name ?? null, client_company: profile?.company ?? null }
  })

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
  const supabase = createAdminClient()

  let query = supabase
    .from("projects")
    .select("*")
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

  // Fetch client profiles separately (projects.user_id FK points to auth.users, not profiles)
  const userIds = [...new Set(data.map((p) => p.user_id))]
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, company")
    .in("id", userIds)

  const profileMap = new Map(
    (profiles ?? []).map((pr) => [pr.id, pr])
  )

  return data.map((p) => {
    const profile = profileMap.get(p.user_id)
    return {
      ...p,
      client_name: profile?.full_name ?? null,
      client_company: profile?.company ?? null,
      admin_name: null,
    }
  })
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
  const supabase = createAdminClient()

  // Fetch project
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single()

  if (projectError || !project) return null

  // Fetch client profile and related data in parallel
  const [profileRes, deliverableRes, invoiceRes, activityRes] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, company")
      .eq("id", project.user_id)
      .single(),
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
    client_name: profileRes.data?.full_name ?? null,
    client_company: profileRes.data?.company ?? null,
    admin_name: null,
  }

  return {
    project: mappedProject as AdminProjectDetail["project"],
    deliverables: deliverableRes.data ?? [],
    invoices: invoiceRes.data ?? [],
    activity: activityRes.data ?? [],
  }
}

// ---------------------------------------------------------------------------
// Admin user detail query
// ---------------------------------------------------------------------------

export interface AdminUserDetail {
  profile: {
    id: string
    full_name: string | null
    avatar_url: string | null
    phone: string | null
    company: string | null
    address: string | null
    city: string | null
    country: string | null
    role: string
    stripe_customer_id: string | null
    notification_project_emails: boolean | null
    notification_invoice_alerts: boolean | null
    notification_team_messages: boolean | null
    notification_deadline_reminders: boolean | null
    created_at: string
    updated_at: string
  }
  email: string
  hasConfirmed: boolean
  projects: Array<{
    id: string
    name: string
    type: string
    status: string
    progress: number | null
    created_at: string
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
  stripe: {
    customerId: string
    name: string | null
    email: string | null
    balance: number
    currency: string
    created: number
    invoiceCount: number
    totalSpent: number
  } | null
}

export async function getAdminUserById(
  userId: string
): Promise<AdminUserDetail | null> {
  const supabase = createAdminClient()

  // Fetch profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single()

  if (profileError || !profile) return null

  // Fetch auth user for email + confirmation status
  const { data: authData } = await supabase.auth.admin.getUserById(userId)
  const authUser = authData?.user

  // Fetch projects and invoices in parallel
  const [projectsRes, invoicesRes] = await Promise.all([
    supabase
      .from("projects")
      .select("id, name, type, status, progress, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false }),
    supabase
      .from("invoices")
      .select("id, amount, currency, status, due_date, paid_at, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false }),
  ])

  // Fetch Stripe customer info if exists
  let stripeInfo: AdminUserDetail["stripe"] = null
  if (profile.stripe_customer_id) {
    try {
      const { stripe } = await import("@/lib/stripe/client")
      const customer = await stripe.customers.retrieve(profile.stripe_customer_id) as import("stripe").Stripe.Customer

      // Get invoice stats from Stripe
      const stripeInvoices = await stripe.invoices.list({
        customer: profile.stripe_customer_id,
        limit: 100,
      })

      const totalSpent = stripeInvoices.data
        .filter((inv) => inv.status === "paid")
        .reduce((sum, inv) => sum + (inv.amount_paid ?? 0), 0)

      stripeInfo = {
        customerId: profile.stripe_customer_id,
        name: customer.name ?? null,
        email: customer.email ?? null,
        balance: customer.balance ?? 0,
        currency: customer.currency ?? "eur",
        created: customer.created,
        invoiceCount: stripeInvoices.data.length,
        totalSpent,
      }
    } catch {
      // Stripe call failed — customer may have been deleted
    }
  }

  return {
    profile,
    email: authUser?.email ?? "",
    hasConfirmed: !!authUser?.email_confirmed_at,
    projects: projectsRes.data ?? [],
    invoices: invoicesRes.data ?? [],
    stripe: stripeInfo,
  }
}

export interface ActiveClient {
  id: string
  full_name: string | null
  company: string | null
}

export async function getActiveClients(): Promise<ActiveClient[]> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, company")
    .order("full_name", { ascending: true })

  if (error || !data) return []

  return data
}
