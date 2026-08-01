import {
  pgTable,
  text,
  timestamp,
  integer,
  numeric,
  boolean,
  jsonb,
  uuid,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core'
import type { ValidationFlag } from '@/lib/validate'

// ============================================================
//  משתמשים. הרשימה המורשית מגיעה מ-AUTH_ALLOWLIST, והשורה כאן
//  נוצרת בכניסה הראשונה. אין סיסמאות ואין מה לדלוף.
// ============================================================
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  role: text('role', { enum: ['admin', 'uploader'] }).notNull().default('uploader'),
  lastSeenAt: timestamp('last_seen_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

// ============================================================
//  קודי התחברות חד-פעמיים. נשמר hash בלבד, לא הקוד עצמו.
// ============================================================
export const loginCodes = pgTable(
  'login_codes',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull(),
    codeHash: text('code_hash').notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    consumedAt: timestamp('consumed_at', { withTimezone: true }),
    attempts: integer('attempts').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('login_codes_email_idx').on(t.email, t.createdAt)],
)

// ============================================================
//  ספקים. הטבלה לומדת: אחרי שסיווגת ספק פעם אחת, כל מסמך הבא
//  ממנו מגיע כבר מסווג.
// ============================================================
export const suppliers = pgTable(
  'suppliers',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    taxId: text('tax_id'),
    defaultCategory: text('default_category'),
    vatDeductible: boolean('vat_deductible').notNull().default(true),
    /** דומייני מייל שראינו שולחים מסמכים של הספק הזה. */
    knownSenders: jsonb('known_senders').$type<string[]>().notNull().default([]),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex('suppliers_tax_id_idx').on(t.taxId)],
)

// ============================================================
//  מסמכים. הליבה.
//
//  שדות האינדקס שנספח ז׳ להוראות ניהול פנקסים דורש — סוג מסמך,
//  תאריך, וח.פ. המנפיק — הם עמודות אמיתיות עם אינדקס, ולא רק
//  טקסט בתוך JSON, כדי שהשליפה והחיפוש יעבדו כמו שנדרש.
//
//  סכומים כ-numeric ולא float: כסף בנקודה צפה מייצר טעויות
//  עיגול שמצטברות, וכאן זה דיווח לרשויות.
// ============================================================
export const documents = pgTable(
  'documents',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    // ── הקובץ ──────────────────────────────────────────────
    sha256: text('sha256').notNull(),
    blobPath: text('blob_path').notNull(),
    mime: text('mime').notNull(),
    sizeBytes: integer('size_bytes').notNull(),
    originalFilename: text('original_filename'),

    // ── מאיפה הגיע ─────────────────────────────────────────
    source: text('source', { enum: ['email', 'upload'] }).notNull(),
    /** message-id של המייל, או מזהה ההעלאה. */
    sourceRef: text('source_ref'),
    sourceSender: text('source_sender'),
    uploadedBy: uuid('uploaded_by').references(() => users.id),

    // ── מצב ────────────────────────────────────────────────
    status: text('status', {
      enum: ['pending', 'review', 'approved', 'rejected', 'not_expense'],
    })
      .notNull()
      .default('pending'),

    // ── שדות המסמך ─────────────────────────────────────────
    docType: text('doc_type'),
    supplierId: uuid('supplier_id').references(() => suppliers.id),
    supplierName: text('supplier_name'),
    supplierTaxId: text('supplier_tax_id'),
    recipientName: text('recipient_name'),
    recipientTaxId: text('recipient_tax_id'),
    docNumber: text('doc_number'),
    /** תאריך בלבד. שמור כטקסט ISO כדי שלא יזוז באזורי זמן. */
    docDate: text('doc_date'),

    netAmount: numeric('net_amount', { precision: 14, scale: 2 }),
    vatAmount: numeric('vat_amount', { precision: 14, scale: 2 }),
    totalAmount: numeric('total_amount', { precision: 14, scale: 2 }),
    currency: text('currency').default('ILS'),

    allocationNumber: text('allocation_number'),
    paymentMethod: text('payment_method'),
    expenseCategory: text('expense_category'),

    // ── תוצרי העיבוד ───────────────────────────────────────
    confidence: numeric('confidence', { precision: 4, scale: 3 }),
    validationFlags: jsonb('validation_flags').$type<ValidationFlag[]>().notNull().default([]),
    classifyReason: text('classify_reason'),
    extractedRaw: jsonb('extracted_raw'),
    extractionModel: text('extraction_model'),
    extractedAt: timestamp('extracted_at', { withTimezone: true }),

    reviewedBy: uuid('reviewed_by').references(() => users.id),
    reviewedAt: timestamp('reviewed_at', { withTimezone: true }),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    // אותו קובץ בדיוק, במייל ובצילום, נספר פעם אחת.
    uniqueIndex('documents_sha256_idx').on(t.sha256),
    // אינדקס נספח ז׳: שליפה לפי סוג, תאריך וח.פ. מנפיק.
    index('documents_doc_date_idx').on(t.docDate),
    index('documents_supplier_tax_id_idx').on(t.supplierTaxId),
    index('documents_doc_type_idx').on(t.docType),
    index('documents_status_idx').on(t.status, t.createdAt),
  ],
)

// ============================================================
//  יומן שינויים. כל עריכה של שדה במסך הבדיקה נרשמת. זו גם
//  דרישת ביקורת וגם מה שמאפשר להאמין למספרים אחרי חצי שנה.
// ============================================================
export const auditLog = pgTable(
  'audit_log',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    documentId: uuid('document_id')
      .notNull()
      .references(() => documents.id, { onDelete: 'cascade' }),
    userId: uuid('user_id').references(() => users.id),
    field: text('field').notNull(),
    oldValue: text('old_value'),
    newValue: text('new_value'),
    at: timestamp('at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('audit_log_document_idx').on(t.documentId, t.at)],
)

// ============================================================
//  ייצוא חודשי. נשמר כדי שאפשר יהיה להוריד שוב — רואה החשבון
//  יאבד את הקישור, זו לא שאלה.
// ============================================================
export const exports_ = pgTable('exports', {
  id: uuid('id').primaryKey().defaultRandom(),
  period: text('period').notNull(), // yyyy-mm
  status: text('status', { enum: ['running', 'ready', 'failed'] })
    .notNull()
    .default('running'),
  blobPath: text('blob_path'),
  docCount: integer('doc_count').notNull().default(0),
  totalAmount: numeric('total_amount', { precision: 14, scale: 2 }),
  error: text('error'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

// ============================================================
//  מצב קליטת המייל — נקודת החידוש, כדי לא לעבד הודעה פעמיים.
// ============================================================
export const ingestState = pgTable('ingest_state', {
  key: text('key').primaryKey(),
  value: jsonb('value').notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export type User = typeof users.$inferSelect
export type Supplier = typeof suppliers.$inferSelect
export type Document = typeof documents.$inferSelect
export type NewDocument = typeof documents.$inferInsert
