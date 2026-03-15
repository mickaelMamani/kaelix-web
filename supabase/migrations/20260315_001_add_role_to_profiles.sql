-- Add role column to profiles for admin/client distinction
ALTER TABLE profiles ADD COLUMN role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin'));

-- Index for role-based queries
CREATE INDEX idx_profiles_role ON profiles (role);
