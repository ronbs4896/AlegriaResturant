-- סכימת הבסיס, DDL אידמפוטנטי. Postgres רגיל, בלי תלות בסביבה.
--
-- בפיתוח: נטען אוטומטית ל-PGlite בהרצה הראשונה.
-- בייצור: אפשר להדביק אותו ב-SQL Editor של Neon כדי ליצור את
-- הטבלאות בפעם הראשונה. שינויי סכימה בהמשך דרך drizzle-kit.

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  role text NOT NULL DEFAULT 'uploader',
  last_seen_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS login_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  code_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  consumed_at timestamptz,
  attempts integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS login_codes_email_idx ON login_codes (email, created_at);

CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  tax_id text,
  default_category text,
  vat_deductible boolean NOT NULL DEFAULT true,
  known_senders jsonb NOT NULL DEFAULT '[]'::jsonb,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS suppliers_tax_id_idx ON suppliers (tax_id);

CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sha256 text NOT NULL,
  blob_path text NOT NULL,
  mime text NOT NULL,
  size_bytes integer NOT NULL,
  original_filename text,
  source text NOT NULL,
  source_ref text,
  source_sender text,
  uploaded_by uuid REFERENCES users(id),
  status text NOT NULL DEFAULT 'pending',
  doc_type text,
  supplier_id uuid REFERENCES suppliers(id),
  supplier_name text,
  supplier_tax_id text,
  recipient_name text,
  recipient_tax_id text,
  doc_number text,
  doc_date text,
  net_amount numeric(14,2),
  vat_amount numeric(14,2),
  total_amount numeric(14,2),
  currency text DEFAULT 'ILS',
  allocation_number text,
  payment_method text,
  expense_category text,
  confidence numeric(4,3),
  validation_flags jsonb NOT NULL DEFAULT '[]'::jsonb,
  classify_reason text,
  extracted_raw jsonb,
  extraction_model text,
  extracted_at timestamptz,
  reviewed_by uuid REFERENCES users(id),
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS documents_sha256_idx ON documents (sha256);
CREATE INDEX IF NOT EXISTS documents_doc_date_idx ON documents (doc_date);
CREATE INDEX IF NOT EXISTS documents_supplier_tax_id_idx ON documents (supplier_tax_id);
CREATE INDEX IF NOT EXISTS documents_doc_type_idx ON documents (doc_type);
CREATE INDEX IF NOT EXISTS documents_status_idx ON documents (status, created_at);

CREATE TABLE IF NOT EXISTS audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id),
  field text NOT NULL,
  old_value text,
  new_value text,
  at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS audit_log_document_idx ON audit_log (document_id, at);

CREATE TABLE IF NOT EXISTS exports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  period text NOT NULL,
  status text NOT NULL DEFAULT 'running',
  blob_path text,
  doc_count integer NOT NULL DEFAULT 0,
  total_amount numeric(14,2),
  error text,
  created_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ingest_state (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
