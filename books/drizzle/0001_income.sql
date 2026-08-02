-- מיגרציה 0001: הכנסות כצד ראשון במעלה.
--
-- מריצים פעם אחת ב-SQL Editor של Neon לפני (או יחד עם) פריסת
-- הקוד שמכיר בהכנסות. כל הפקודות אידמפוטנטיות — הרצה חוזרת
-- לא משנה כלום.

CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  tax_id text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS customers_tax_id_idx ON customers (tax_id);

ALTER TABLE documents ADD COLUMN IF NOT EXISTS direction text;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS customer_id uuid REFERENCES customers(id);
CREATE INDEX IF NOT EXISTS documents_direction_idx ON documents (direction, status, doc_date);

-- כל מה שכבר נרשם היה הוצאה מעצם הבנייה: הצנרת הישנה זרקה
-- הכנסות לפני שנרשמו.
UPDATE documents SET direction = 'expense'
  WHERE direction IS NULL AND status IN ('approved', 'rejected');

-- המסמכים שסומנו "לא הוצאה" הם בדיוק ההכנסות שחיכו בצד:
-- הם חוזרים לתור הבדיקה ונרשמים לראשונה.
UPDATE documents SET direction = 'income', status = 'review',
  classify_reason = 'סווג מחדש כהכנסה — ממתין לבדיקה'
  WHERE status = 'not_expense';
