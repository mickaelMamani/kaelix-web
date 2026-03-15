-- Add 'pending' to project_status enum (must be standalone — ALTER TYPE ADD VALUE cannot run in a transaction)
ALTER TYPE project_status ADD VALUE 'pending' BEFORE 'discovery';
