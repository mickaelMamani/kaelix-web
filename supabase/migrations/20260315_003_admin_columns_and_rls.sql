-- Add admin-specific columns to projects
ALTER TABLE projects ADD COLUMN admin_id UUID REFERENCES auth.users(id);
ALTER TABLE projects ADD COLUMN started_at TIMESTAMPTZ;

-- Helper function to get the current user's role (SECURITY DEFINER so RLS policies can call it)
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$;

-- ─── Admin RLS Policies ─────────────────────────────────────────────────────

-- profiles: admin can SELECT all profiles
CREATE POLICY "admin_select_profiles" ON profiles
  FOR SELECT USING (get_user_role() = 'admin');

-- profiles: admin can UPDATE any profile
CREATE POLICY "admin_update_profiles" ON profiles
  FOR UPDATE USING (get_user_role() = 'admin');

-- projects: admin can SELECT all projects
CREATE POLICY "admin_select_projects" ON projects
  FOR SELECT USING (get_user_role() = 'admin');

-- projects: admin can INSERT projects for any user
CREATE POLICY "admin_insert_projects" ON projects
  FOR INSERT WITH CHECK (get_user_role() = 'admin');

-- projects: admin can UPDATE any project
CREATE POLICY "admin_update_projects" ON projects
  FOR UPDATE USING (get_user_role() = 'admin');

-- deliverables: admin can SELECT all deliverables
CREATE POLICY "admin_select_deliverables" ON deliverables
  FOR SELECT USING (get_user_role() = 'admin');

-- deliverables: admin can INSERT deliverables
CREATE POLICY "admin_insert_deliverables" ON deliverables
  FOR INSERT WITH CHECK (get_user_role() = 'admin');

-- deliverables: admin can UPDATE any deliverable
CREATE POLICY "admin_update_deliverables" ON deliverables
  FOR UPDATE USING (get_user_role() = 'admin');

-- deliverables: admin can DELETE deliverables
CREATE POLICY "admin_delete_deliverables" ON deliverables
  FOR DELETE USING (get_user_role() = 'admin');

-- invoices: admin can SELECT all invoices
CREATE POLICY "admin_select_invoices" ON invoices
  FOR SELECT USING (get_user_role() = 'admin');

-- invoices: admin can INSERT invoices
CREATE POLICY "admin_insert_invoices" ON invoices
  FOR INSERT WITH CHECK (get_user_role() = 'admin');

-- invoices: admin can UPDATE any invoice
CREATE POLICY "admin_update_invoices" ON invoices
  FOR UPDATE USING (get_user_role() = 'admin');

-- activity_log: admin can SELECT all activity
CREATE POLICY "admin_select_activity_log" ON activity_log
  FOR SELECT USING (get_user_role() = 'admin');

-- activity_log: admin can INSERT activity entries
CREATE POLICY "admin_insert_activity_log" ON activity_log
  FOR INSERT WITH CHECK (get_user_role() = 'admin');

-- payment_methods: admin can SELECT all payment methods
CREATE POLICY "admin_select_payment_methods" ON payment_methods
  FOR SELECT USING (get_user_role() = 'admin');
