// Auto-generated from Supabase schema — project xjbpucxoyokvduyhlulk

export type UserRole = "client" | "admin"

export type ProjectType =
  | "site-vitrine"
  | "site-ecommerce"
  | "application-web"
  | "refonte-site"
  | "seo-performance"
  | "maintenance"

export type ProjectStatus =
  | "pending"
  | "discovery"
  | "proposal"
  | "design"
  | "development"
  | "review"
  | "launched"
  | "maintenance"

export type DeliverableStatus = "pending" | "in_progress" | "completed"

export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  phone: string | null
  company: string | null
  address: string | null
  city: string | null
  country: string | null
  role: UserRole
  stripe_customer_id: string | null
  notification_project_emails: boolean | null
  notification_invoice_alerts: boolean | null
  notification_team_messages: boolean | null
  notification_deadline_reminders: boolean | null
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  user_id: string
  name: string
  description: string | null
  type: ProjectType
  status: ProjectStatus
  progress: number | null
  budget: string | null
  start_date: string | null
  due_date: string | null
  admin_id: string | null
  started_at: string | null
  created_at: string
  updated_at: string
}

export interface Deliverable {
  id: string
  project_id: string
  title: string
  description: string | null
  status: DeliverableStatus
  due_date: string | null
  sort_order: number | null
  created_at: string
  updated_at: string
}

export interface ActivityLog {
  id: string
  project_id: string | null
  user_id: string
  action: string
  description: string | null
  created_at: string
}

// Billing types

export type InvoiceStatus = "draft" | "open" | "paid" | "void" | "uncollectible"

export type PaymentMethodType = "card" | "sepa"

export interface Invoice {
  id: string
  user_id: string
  project_id: string | null
  stripe_invoice_id: string | null
  amount: number
  currency: string
  status: InvoiceStatus
  due_date: string | null
  paid_at: string | null
  pdf_url: string | null
  created_at: string
  updated_at: string
}

export interface PaymentMethod {
  id: string
  user_id: string
  stripe_payment_method_id: string
  type: PaymentMethodType
  brand: string | null
  last4: string | null
  exp_month: number | null
  exp_year: number | null
  is_default: boolean
  created_at: string
}
