-- מיגרציה 0002: שכבות הסינון.
--
-- מריצים פעם אחת ב-SQL Editor של Neon. כל הפקודות אידמפוטנטיות —
-- הרצה חוזרת לא משנה כלום.

-- ── פרופיל העסק: מי אנחנו, מעבר לח.פ. בודד ─────────────────
CREATE TABLE IF NOT EXISTS business_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legal_name text NOT NULL,
  trade_names jsonb NOT NULL DEFAULT '[]'::jsonb,
  tax_id text,
  vat_number text,
  addresses jsonb NOT NULL DEFAULT '[]'::jsonb,
  emails jsonb NOT NULL DEFAULT '[]'::jsonb,
  phones jsonb NOT NULL DEFAULT '[]'::jsonb,
  bank_accounts jsonb NOT NULL DEFAULT '[]'::jsonb,
  default_currency text NOT NULL DEFAULT 'ILS',
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ── יומן קליטה: כל קובץ שנראה, כולל מה שלא נכנס ────────────
CREATE TABLE IF NOT EXISTS ingest_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL,
  mailbox text,
  message_ref text,
  sender text,
  subject text,
  filename text,
  mime text,
  size_bytes integer,
  decision text NOT NULL,
  reason_code text NOT NULL,
  reason text NOT NULL,
  document_id uuid REFERENCES documents(id) ON DELETE SET NULL,
  at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ingest_log_at_idx ON ingest_log (at);
CREATE INDEX IF NOT EXISTS ingest_log_decision_idx ON ingest_log (decision, at);

-- ── שדות הזיהוי החדשים על המסמכים ──────────────────────────
ALTER TABLE documents ADD COLUMN IF NOT EXISTS doc_kind text;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS kind_reason text;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS field_confidence jsonb;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS doc_language text;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS duplicate_of_id uuid;
CREATE INDEX IF NOT EXISTS documents_dup_idx
  ON documents (supplier_tax_id, doc_number, total_amount);
