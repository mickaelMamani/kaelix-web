# Feature: kaelix-admin — Espace d'administration

## Overview

Admin space for managing users, projects, invoices, and deliverables. Adds role-based access (`admin` / `client`) to the existing single-user model, with a dedicated `/admin/*` route group protected by middleware, layout guard, and RLS policies. The admin can invite clients, create/manage projects through a full status pipeline, and monitor billing KPIs.

**Spec reference:** `specs/kaelix-admin-spec.md`

---

## SaaS Feature Checklist (pre-flight)

- [x] No subscription gating — admin is the agency owner, not a paid tier
- [x] No multi-tenancy — single-agency model, `role` column on `profiles`
- [x] No billing impact — admin manages client invoices, doesn't pay a subscription
- [x] Auth: `role = 'admin'` enforced at 4 layers (RLS, middleware, layout, server actions)
- [ ] RLS policies cover all CRUD operations for admin
- [ ] Audit logging for important actions (activity_log)
- [ ] Error states (auth, permission, network)
- [ ] Loading states (skeleton/spinner)
- [ ] Mobile responsive
- [ ] Empty states with helpful guidance

---

## Phase 1: Foundation — DB Migrations & Types

### 1.1 Migration: add `role` to `profiles`

- [ ] Create migration file via `saas-toolkit:db-migration`
- SQL: `ALTER TABLE profiles ADD COLUMN role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin'));`
- **File:** new migration in `supabase/migrations/`

### 1.2 Migration: `get_user_role()` function + admin RLS policies

- [ ] Create `get_user_role()` — `SECURITY DEFINER STABLE` SQL function
- [ ] Add admin SELECT/UPDATE policies on `profiles`
- [ ] Add admin SELECT/INSERT/UPDATE policies on `projects`
- [ ] Add admin SELECT/INSERT/UPDATE policies on `invoices`
- [ ] Add admin SELECT/INSERT/UPDATE/DELETE policies on `deliverables`
- [ ] Add admin SELECT/INSERT policies on `activity_log`
- [ ] Add admin SELECT policy on `payment_methods`
- **File:** new migration in `supabase/migrations/`

### 1.3 Migration: add `pending` to `project_status` + admin columns

- [ ] `ALTER TYPE project_status ADD VALUE 'pending' BEFORE 'discovery';`
- [ ] `ALTER TABLE projects ADD COLUMN admin_id UUID REFERENCES auth.users(id);`
- [ ] `ALTER TABLE projects ADD COLUMN started_at TIMESTAMPTZ;`
- **File:** new migration in `supabase/migrations/`

### 1.4 Update TypeScript types

- [ ] Add `role: 'client' | 'admin'` to `Profile` interface — `src/types/database.ts`
- [ ] Add `'pending'` to `ProjectStatus` type union — `src/types/database.ts`
- [ ] Add `admin_id: string | null` and `started_at: string | null` to `Project` interface — `src/types/database.ts`
- [ ] Export `UserRole` type (`'client' | 'admin'`) — `src/types/database.ts`

### 1.5 Update status badge config

- [ ] Add `pending` entry to `projectStatusConfig` — `src/components/shared/status-badge.tsx`
  - Label: `"En attente"`, variant: `"outline"`, className: amber/yellow styling

### 1.6 Set current user as admin

- [ ] One-time SQL via Supabase dashboard or migration seed: `UPDATE profiles SET role = 'admin' WHERE id = '<your-user-id>';`

**Dependencies:** None
**Risks:** `ALTER TYPE ... ADD VALUE` cannot run inside a transaction in PostgreSQL — each enum change needs its own migration file.

---

## Phase 2: Middleware & Admin Layout

### 2.1 Update middleware to protect `/admin/*`

- [ ] Add `/admin` to protected paths in `src/lib/supabase/middleware.ts`
- Logic: if path starts with `/admin` and no user → redirect to `/auth/login`
- Note: role check is NOT done in middleware (too expensive to query DB per request) — layout handles it

### 2.2 Create admin Supabase client helper

- [ ] Create `src/lib/supabase/admin.ts` — exports `createAdminClient()` using `SUPABASE_SERVICE_ROLE_KEY`
- Reuses pattern from existing Stripe webhook (`src/app/api/stripe/webhook/route.ts`)
- Server-only, never imported in client components

### 2.3 Create admin layout

- [ ] Create `src/app/admin/layout.tsx`
  - Server component
  - Fetches user with `getUser()`, fetches profile with `role`
  - If `!user` → redirect `/auth/login`
  - If `profile.role !== 'admin'` → redirect `/dashboard`
  - Renders admin sidebar + header + children

### 2.4 Create admin sidebar component

- [ ] Create `src/components/admin/admin-sidebar.tsx`
  - Navigation items: Dashboard, Utilisateurs, Projets, Facturation
  - Reuses sidebar pattern from `src/components/client/sidebar.tsx`
  - Different icon set and color accent to differentiate from client portal

### 2.5 Create admin header component

- [ ] Create `src/components/admin/admin-header.tsx`
  - User avatar + dropdown (profile, switch to client view, logout)
  - Reuses pattern from `src/components/client/client-header.tsx`

### 2.6 Add admin nav constants

- [ ] Add `adminNavItems` array to `src/lib/constants.ts`
  - `{ label: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" }`
  - `{ label: "Utilisateurs", href: "/admin/users", icon: "Users" }`
  - `{ label: "Projets", href: "/admin/projects", icon: "FolderKanban" }`
  - `{ label: "Facturation", href: "/admin/billing", icon: "CreditCard" }`

**Dependencies:** Phase 1 (needs `role` column in DB and types)

---

## Phase 3: Admin Dashboard (`/admin/dashboard`)

### 3.1 Create admin query helpers

- [ ] Create `src/lib/queries/admin.ts` with functions:
  - `getAdminKPIs()` — returns counts (pending projects, in-progress, launched this month, revenue this month, unpaid invoices, unpaid amount)
  - `getPendingProjects()` — projects with `status = 'pending'`, joined with `profiles.full_name`
  - `getInProgressProjects()` — projects with status IN (`discovery`..`review`), joined with profiles + admin profile
  - `getRecentInvoices(limit)` — latest invoices joined with profiles

### 3.2 Create KPI card components

- [ ] Create `src/components/admin/dashboard/kpi-cards.tsx`
  - 6 cards: pending projects, in-progress, launched (month), revenue (month), unpaid invoices, unpaid total
  - Reuses `Card` from shadcn/ui
  - Format amounts with `Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })`

### 3.3 Create pending projects list

- [ ] Create `src/components/admin/dashboard/pending-projects.tsx`
  - Table/card list of pending projects
  - Shows: project name, type, client name, created_at, budget
  - "Démarrer le projet" button per row

### 3.4 Create "start project" server action

- [ ] Create `src/actions/admin/projects.ts` with `startProject(projectId)`
  - Verifies admin role
  - Updates: `status → 'discovery'`, `admin_id → current user`, `started_at → now()`
  - Guard: `.eq('status', 'pending')` to prevent race conditions
  - Inserts `activity_log` entry (`action: 'project_started'`)
  - Uses `revalidatePath('/admin/dashboard')`

### 3.5 Create in-progress projects list

- [ ] Create `src/components/admin/dashboard/active-projects.tsx`
  - Table of projects with status between `discovery` and `review`
  - Shows: name, type, client, admin, status badge, progress bar, started_at, due_date
  - Late indicator if `due_date < today && status !== 'launched'`

### 3.6 Create recent invoices list

- [ ] Create `src/components/admin/dashboard/recent-invoices.tsx`
  - Last 10 invoices
  - Shows: client, amount, status badge, due_date, PDF link
  - Late indicator if `status = 'open' && due_date < today`

### 3.7 Create dashboard page

- [ ] Create `src/app/admin/dashboard/page.tsx`
  - Server component
  - Calls all query helpers in parallel with `Promise.all`
  - Renders: KPI cards → pending projects → active projects → recent invoices
  - Loading skeleton with `loading.tsx`

### 3.8 Create dashboard loading state

- [ ] Create `src/app/admin/dashboard/loading.tsx`
  - Uses `WidgetSkeleton` and `TableRowSkeleton` from shared components

**Dependencies:** Phase 2 (layout + middleware)

---

## Phase 4: User Management (`/admin/users`)

### 4.1 Create user query helpers

- [ ] Add to `src/lib/queries/admin.ts`:
  - `getAdminUsers()` — all profiles with project counts, needs `auth.users.email` via admin client
  - Note: email is in `auth.users`, not `profiles` — must use admin client to get emails

### 4.2 Create users list page

- [ ] Create `src/app/admin/users/page.tsx`
  - Server component
  - Fetches profiles + emails (via admin client for `auth.users` access)
  - Table with columns: name, email, company, role, created_at, project count, account status
  - Filters: role, account status, search by name/email
  - "Inviter un utilisateur" CTA button

### 4.3 Create user invite form

- [ ] Create `src/components/admin/users/invite-form.tsx`
  - Client component with `useActionState`
  - Fields: email (required), full_name (required), company, phone
  - Submit → server action

### 4.4 Create invite validation schema

- [ ] Create `src/lib/validations/admin.ts`
  - `inviteUserSchema` — Zod schema: email, fullName, company?, phone?

### 4.5 Create invite server action

- [ ] Create `src/actions/admin/users.ts` with `inviteUser(prevState, formData)`
  - Validates with Zod
  - Verifies admin role
  - Uses admin client: `supabaseAdmin.auth.admin.inviteUserByEmail(email, { data: { full_name }, redirectTo })`
  - Updates profile with company/phone if provided
  - Logs to `activity_log` (`action: 'user_invited'`)
  - Returns success/error state

### 4.6 Create invite page

- [ ] Create `src/app/admin/users/invite/page.tsx`
  - Server component wrapper
  - Renders `PageHeader` + `InviteForm`

### 4.7 Create set-password page (invitation flow)

- [ ] Create `src/app/(auth)/auth/set-password/page.tsx`
  - Handles the redirect from invitation email
  - Form: new password + confirm password
  - Calls `supabase.auth.updateUser({ password })`
  - Redirects to `/dashboard` on success
- [ ] Create `src/components/auth/set-password-form.tsx`

### 4.8 Create users loading state

- [ ] Create `src/app/admin/users/loading.tsx`

**Dependencies:** Phase 2 (layout), Phase 1 (`role` column for admin verification in actions)

---

## Phase 5: Project Management (`/admin/projects`)

### 5.1 Add project query helpers

- [ ] Add to `src/lib/queries/admin.ts`:
  - `getAdminProjects(filters?)` — all projects with client profile join, supports filters (status, type, admin, search)
  - `getAdminProjectById(id)` — single project with client profile, deliverables, invoices, activity log
  - `getActiveClients()` — profiles with confirmed email (for project creation dropdown)
  - `getAdminUsers()` — profiles with `role = 'admin'` (for admin assignment filter)

### 5.2 Create project validation schemas

- [ ] Add to `src/lib/validations/admin.ts`:
  - `createProjectSchema` — name (required), description, type (required), user_id (required), budget, start_date, due_date
  - `updateProjectStatusSchema` — project_id, new_status

### 5.3 Create project server actions

- [ ] Add to `src/actions/admin/projects.ts`:
  - `createProject(prevState, formData)` — creates project with `status: 'pending'`, `progress: 0`, logs `project_created`
  - `updateProjectStatus(projectId, newStatus)` — transitions status, auto-updates progress (mapping from spec), logs `status_changed`
  - `updateProject(prevState, formData)` — updates project fields (name, description, budget, dates)

### 5.4 Progress mapping constant

- [ ] Add `PROJECT_STATUS_PROGRESS` map to `src/lib/constants.ts`:
  ```
  pending: 0, discovery: 10, proposal: 20, design: 40, development: 65, review: 85, launched: 100, maintenance: 100
  ```

### 5.5 Create projects list page

- [ ] Create `src/app/admin/projects/page.tsx`
  - Server component
  - Table with filters (status, type, admin, search)
  - Columns: name, type, client, admin, status badge, progress, dates
  - "Nouveau projet" CTA button

### 5.6 Create project creation page

- [ ] Create `src/app/admin/projects/new/page.tsx`
  - Server component — fetches active clients for dropdown
- [ ] Create `src/components/admin/projects/create-project-form.tsx`
  - Client component with `useActionState`
  - Fields: name, description, type (select), client (select from active users), budget, start_date, due_date

### 5.7 Create project detail page

- [ ] Create `src/app/admin/projects/[id]/page.tsx`
  - Server component — `await params`, fetches project + related data
  - Tabs: Overview, Livrables, Factures, Activité
  - Status transition buttons (advance / revert)
  - Project info card with edit capability

### 5.8 Create status transition component

- [ ] Create `src/components/admin/projects/status-transition.tsx`
  - Shows current status in pipeline visualization
  - "Avancer" / "Reculer" buttons based on current position
  - Calls `updateProjectStatus` server action

### 5.9 Create deliverable management

- [ ] Create `src/actions/admin/deliverables.ts`:
  - `createDeliverable(prevState, formData)`
  - `updateDeliverable(prevState, formData)`
  - `deleteDeliverable(deliverableId)`
- [ ] Create `src/components/admin/projects/deliverables-manager.tsx`
  - List of deliverables with inline status toggle
  - Add/edit/delete capability
  - Sort order drag-and-drop (stretch goal — can be deferred)

### 5.10 Loading states

- [ ] Create `src/app/admin/projects/loading.tsx`
- [ ] Create `src/app/admin/projects/[id]/loading.tsx`

**Dependencies:** Phase 4 (need users for client dropdown)

---

## Phase 6: Billing Management (`/admin/billing`)

### 6.1 Add billing query helpers

- [ ] Add to `src/lib/queries/admin.ts`:
  - `getAdminBillingKPIs()` — revenue this month, revenue this year, pending amount, overdue amount, recovery rate
  - `getAdminInvoices(filters?)` — all invoices with client + project join, supports filters (status, client, project, date range)
  - `getAdminInvoiceById(id)` — single invoice with full details

### 6.2 Create billing KPIs component

- [ ] Create `src/components/admin/billing/billing-kpis.tsx`
  - 5 cards: revenue (month), revenue (year), pending amount, overdue amount, recovery rate %

### 6.3 Create invoice table component

- [ ] Create `src/components/admin/billing/invoices-table.tsx`
  - Full table with filters
  - Columns: ID (truncated), client, project, amount (€), status badge (with "late" variant), issued, due, paid, PDF link
  - Status badges per spec (grey/blue/red/green)

### 6.4 Create billing page

- [ ] Create `src/app/admin/billing/page.tsx`
  - Server component
  - KPIs + invoice table with filters

### 6.5 Create invoice detail page (stretch)

- [ ] Create `src/app/admin/billing/[id]/page.tsx`
  - Invoice details, client info, project link
  - Action buttons: send (draft→open), mark paid (open→paid), void (draft/open→void)
  - Note: actual Stripe operations are deferred — this phase focuses on DB status management

### 6.6 Create invoice actions

- [ ] Add to `src/actions/admin/billing.ts`:
  - `updateInvoiceStatus(invoiceId, newStatus)` — validates transitions, logs activity
  - Note: Stripe sync is out of scope per spec — focus on DB state

### 6.7 Loading states

- [ ] Create `src/app/admin/billing/loading.tsx`

**Dependencies:** Phase 3 (reuses KPI patterns), Phase 5 (project data)

---

## Phase 7: Polish & Edge Cases

### 7.1 Empty states

- [ ] Admin dashboard: "Aucun projet en attente" / "Aucun projet en cours" / "Aucune facture récente"
- [ ] Users list: "Aucun utilisateur. Invitez votre premier client."
- [ ] Projects list: "Aucun projet. Créez un projet pour un client."
- [ ] Billing: "Aucune facture."
- Uses existing `EmptyState` shared component

### 7.2 Mobile responsive

- [ ] Admin sidebar: collapsible on mobile (sheet/drawer pattern from client sidebar)
- [ ] Admin tables: card layout on mobile, table on desktop
- [ ] Mobile bottom nav for admin (optional — could just use responsive sidebar)

### 7.3 Error handling

- [ ] All server actions: handle Supabase errors, return French error messages
- [ ] All pages: handle null/missing data gracefully
- [ ] Permission denied: friendly redirect with toast (not raw error)

### 7.4 Client layout update

- [ ] Update `(client)/layout.tsx` to fetch `role` and add "Admin" link in header dropdown if `role === 'admin'`
- [ ] Add conditional nav item in sidebar for admins

---

## File Summary

### New files (~25 files)

| Path | Type |
|---|---|
| `supabase/migrations/xxx_add_role.sql` | Migration |
| `supabase/migrations/xxx_admin_rls.sql` | Migration |
| `supabase/migrations/xxx_pending_status.sql` | Migration |
| `src/lib/supabase/admin.ts` | Supabase admin client |
| `src/lib/queries/admin.ts` | Admin query helpers |
| `src/lib/validations/admin.ts` | Zod schemas |
| `src/actions/admin/projects.ts` | Server actions |
| `src/actions/admin/users.ts` | Server actions |
| `src/actions/admin/billing.ts` | Server actions |
| `src/actions/admin/deliverables.ts` | Server actions |
| `src/app/admin/layout.tsx` | Admin layout |
| `src/app/admin/dashboard/page.tsx` | Dashboard page |
| `src/app/admin/dashboard/loading.tsx` | Loading state |
| `src/app/admin/users/page.tsx` | Users page |
| `src/app/admin/users/invite/page.tsx` | Invite page |
| `src/app/admin/users/loading.tsx` | Loading state |
| `src/app/admin/projects/page.tsx` | Projects page |
| `src/app/admin/projects/new/page.tsx` | Create project page |
| `src/app/admin/projects/[id]/page.tsx` | Project detail page |
| `src/app/admin/projects/loading.tsx` | Loading state |
| `src/app/admin/billing/page.tsx` | Billing page |
| `src/app/admin/billing/loading.tsx` | Loading state |
| `src/components/admin/admin-sidebar.tsx` | Sidebar |
| `src/components/admin/admin-header.tsx` | Header |
| `src/components/admin/dashboard/kpi-cards.tsx` | KPI cards |
| `src/components/admin/dashboard/pending-projects.tsx` | Pending list |
| `src/components/admin/dashboard/active-projects.tsx` | Active list |
| `src/components/admin/dashboard/recent-invoices.tsx` | Invoice list |
| `src/components/admin/users/invite-form.tsx` | Invite form |
| `src/components/admin/projects/create-project-form.tsx` | Create form |
| `src/components/admin/projects/status-transition.tsx` | Status pipeline |
| `src/components/admin/projects/deliverables-manager.tsx` | Deliverables CRUD |
| `src/components/admin/billing/billing-kpis.tsx` | Billing KPIs |
| `src/components/admin/billing/invoices-table.tsx` | Invoice table |
| `src/app/(auth)/auth/set-password/page.tsx` | Set password page |
| `src/components/auth/set-password-form.tsx` | Set password form |

### Modified files (~6 files)

| Path | Changes |
|---|---|
| `src/types/database.ts` | Add `role`, `pending`, `admin_id`, `started_at`, `UserRole` |
| `src/lib/supabase/middleware.ts` | Add `/admin` to protected paths |
| `src/lib/constants.ts` | Add `adminNavItems`, `PROJECT_STATUS_PROGRESS` |
| `src/components/shared/status-badge.tsx` | Add `pending` to project status config |
| `src/app/(client)/layout.tsx` | Fetch `role`, show admin link for admins |
| `src/components/client/client-header.tsx` | Add "Administration" link for admin users |

---

## Risks & Open Questions

1. **`ALTER TYPE ADD VALUE` transaction limitation** — PostgreSQL does not allow adding enum values inside a transaction. Each enum migration must be a standalone file. The Supabase migration runner should handle this, but worth verifying.

2. **Email access for user list** — `auth.users` is not accessible via the PostgREST API (anon/authenticated clients). The user list page needs the admin client (service_role) to fetch emails. This means the user list must be fetched entirely server-side. Consider creating a database view or RPC function to join `profiles` with `auth.users.email` for admin access.

3. **Invitation email template** — Supabase sends a default invitation email. Custom email templates can be configured in the Supabase dashboard but are out of scope for code changes.

4. **Set-password page** — The invitation magic link includes a token. Need to verify how `@supabase/ssr` handles the token exchange on the set-password page (likely via `auth.exchangeCodeForSession` or automatic URL hash handling).

5. **Deliverable sort order drag-and-drop** — Marked as stretch goal. Initial implementation can use manual sort_order field with up/down buttons instead.

6. **Invoice Stripe sync** — Explicitly out of scope per spec. Admin can manage invoice statuses in DB only. Stripe integration (create invoice, send, webhooks) is a separate future feature.

7. **Admin mobile experience** — The admin portal is primarily desktop-oriented (data tables, forms). Mobile support should be functional but doesn't need to be optimal. Responsive sidebar (sheet drawer) + card layout on mobile is sufficient.
