-- מיגרציה 0003: תשלומים.
--
-- מריצים פעם אחת ב-SQL Editor של Neon. כל הפקודות אידמפוטנטיות —
-- הרצה חוזרת לא משנה כלום.

-- ── תנאי תשלום מוסכמים, כשהמסמך עצמו שותק ──────────────────
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS default_payment_terms text;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS default_payment_terms text;

-- ── שדות התשלום על המסמך ───────────────────────────────────
-- payment_status הוא סיכום נגזר של document_payments, לא מקור
-- אמת. הוא יושב כאן כדי שסינון על אלפי מסמכים לא ידרוש צירוף.
ALTER TABLE documents ADD COLUMN IF NOT EXISTS due_date text;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS payment_terms text;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS payment_status text NOT NULL DEFAULT 'unpaid';
ALTER TABLE documents ADD COLUMN IF NOT EXISTS paid_amount numeric(14,2) NOT NULL DEFAULT 0;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS paid_at text;

CREATE INDEX IF NOT EXISTS documents_payment_idx
  ON documents (payment_status, due_date);

-- ── טבלת התשלומים ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS document_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  amount numeric(14,2) NOT NULL,
  paid_at text NOT NULL,
  source text NOT NULL,
  method text,
  reference text,
  note text,
  created_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS document_payments_document_idx
  ON document_payments (document_id, paid_at);
CREATE INDEX IF NOT EXISTS document_payments_paid_at_idx
  ON document_payments (paid_at);

-- ── מילוי לאחור ────────────────────────────────────────────
-- קבלה וחשבונית מס-קבלה כבר שולמו בעצם הנפקתן. בלי השורות
-- האלה דוח ההתחייבויות היה מציג ביום הראשון את כל הקבלות
-- כחוב פתוח, ובעסק הסעדה רוב המסמכים הם קבלות.
UPDATE documents
   SET payment_status = 'paid',
       paid_at = COALESCE(paid_at, doc_date)
 WHERE doc_kind IN ('receipt', 'tax_invoice_receipt')
   AND payment_status <> 'paid';

-- זיכוי אינו חוב ואינו זכות שממתינה — הוא קיזוז מול מסמך אחר,
-- ולכן יוצא מחוץ למשוואת התזרים.
UPDATE documents
   SET payment_status = 'n/a'
 WHERE doc_kind = 'credit_note'
   AND payment_status <> 'n/a';
