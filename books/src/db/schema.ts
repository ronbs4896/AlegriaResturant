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
    /** תנאי התשלום המוסכמים מול הספק, כשהמסמך עצמו שותק */
    defaultPaymentTerms: text('default_payment_terms'),
    /** דומייני מייל שראינו שולחים מסמכים של הספק הזה. */
    knownSenders: jsonb('known_senders').$type<string[]>().notNull().default([]),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex('suppliers_tax_id_idx').on(t.taxId)],
)

// ============================================================
//  פרופיל העסק — שורה אחת, מקור האמת לשאלה "מי אנחנו".
//
//  ח.פ. לבדו לא מספיק: בקבלות רבות הוא לא מודפס, ובצילום הוא
//  נקרא שגוי. השמות המסחריים, כתובות המייל והטלפונים משמשים
//  כעוגנים נוספים לזיהוי איזה צד במסמך הוא אנחנו.
// ============================================================
export const businessProfile = pgTable('business_profile', {
  id: uuid('id').primaryKey().defaultRandom(),
  legalName: text('legal_name').notNull(),
  /** שמות מסחריים נוספים שמופיעים על מסמכים */
  tradeNames: jsonb('trade_names').$type<string[]>().notNull().default([]),
  taxId: text('tax_id'),
  vatNumber: text('vat_number'),
  addresses: jsonb('addresses').$type<string[]>().notNull().default([]),
  /** כתובות המייל של העסק — רמז לזיהוי, לא הכרעה */
  emails: jsonb('emails').$type<string[]>().notNull().default([]),
  phones: jsonb('phones').$type<string[]>().notNull().default([]),
  bankAccounts: jsonb('bank_accounts').$type<string[]>().notNull().default([]),
  defaultCurrency: text('default_currency').notNull().default('ILS'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// ============================================================
//  יומן קליטה — כל קובץ מצורף שנראה, גם כזה שלא נכנס.
//
//  audit_log לא יכול לשרת את זה: יש לו FK חובה ל-documents,
//  ולכן קובץ שסוננו לפני היצירה לא ניתן לרישום שם. בלי היומן
//  הזה אי אפשר לענות על "למה החשבונית שלי לא נמשכה".
// ============================================================
export const ingestLog = pgTable(
  'ingest_log',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    source: text('source', { enum: ['email', 'upload', 'webhook'] }).notNull(),
    mailbox: text('mailbox'),
    /** UID של ההודעה או מזהה ה-webhook */
    messageRef: text('message_ref'),
    sender: text('sender'),
    subject: text('subject'),
    filename: text('filename'),
    mime: text('mime'),
    sizeBytes: integer('size_bytes'),
    decision: text('decision', {
      enum: ['imported', 'filtered', 'duplicate', 'error'],
    }).notNull(),
    /** קוד קצר לסינון לפי סיבה */
    reasonCode: text('reason_code').notNull(),
    reason: text('reason').notNull(),
    documentId: uuid('document_id').references(() => documents.id, { onDelete: 'set null' }),
    at: timestamp('at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('ingest_log_at_idx').on(t.at), index('ingest_log_decision_idx').on(t.decision, t.at)],
)

// ============================================================
//  לקוחות. הצד השני של המטבע: מי שאלגריה הנפיקה לו מסמך.
//  אותו עיקרון כמו ספקים — התאמה לפי ח.פ., שורה נוצרת רק
//  כשיש מספר תקין.
// ============================================================
export const customers = pgTable(
  'customers',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    taxId: text('tax_id'),
    /** תנאי התשלום המוסכמים מול הלקוח */
    defaultPaymentTerms: text('default_payment_terms'),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex('customers_tax_id_idx').on(t.taxId)],
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
    //  not_financial  — נדחה: אינו מסמך פיננסי (עם סיבה)
    //  awaiting_final — פיננסי אך לא סופי (חשבון עסקה, דרישת תשלום)
    //  duplicate      — חשד לכפילות מול מסמך קיים
    //  רק approved נספר בדוחות.
    status: text('status', {
      enum: [
        'pending',
        'review',
        'approved',
        'rejected',
        'not_financial',
        'awaiting_final',
        'duplicate',
      ],
    })
      .notNull()
      .default('pending'),

    /**
     * צד הספר: הוצאה שקיבלנו או הכנסה שהנפקנו. null עד שהצנרת
     * או אדם מכריעים; אישור בלי הכרעה נחסם ב-API.
     */
    direction: text('direction', { enum: ['expense', 'income'] }),

    // ── שדות המסמך ─────────────────────────────────────────
    docType: text('doc_type'),
    /**
     * מה המסמך הזה בכלל — טקסונומיה רחבה שכוללת גם מה שאינו
     * פיננסי (הצעת מחיר, חוזה, תעודת משלוח). doc_type נשאר
     * לסוג המס בלבד, ומתמלא רק כשזה מסמך מס.
     */
    docKind: text('doc_kind'),
    /** למה המערכת החליטה שזה מה שזה — מוצג כשמסמך נדחה */
    kindReason: text('kind_reason'),
    /** ודאות פר-שדה, כדי לסמן במסך בדיוק מה חשוד */
    fieldConfidence: jsonb('field_confidence').$type<Record<string, number>>(),
    docLanguage: text('doc_language'),
    /** כשזוהתה כפילות: המסמך שאליו זו כפילות */
    duplicateOfId: uuid('duplicate_of_id'),
    supplierId: uuid('supplier_id').references(() => suppliers.id),
    customerId: uuid('customer_id').references(() => customers.id),
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

    // ── תשלום ──────────────────────────────────────────────
    //  מצב התשלום נגזר מטבלת document_payments ואינו נכתב
    //  ישירות. הוא יושב כאן כדי שמיון וסינון על אלפי מסמכים
    //  לא ידרשו צירוף וסכימה בכל שאילתה.
    /** תאריך לתשלום. null = אין תאריך, וזה מצב שהתזרים מציג ככזה. */
    dueDate: text('due_date'),
    /** הטקסט מהמסמך: "שוטף+30", "מזומן" */
    paymentTerms: text('payment_terms'),
    paymentStatus: text('payment_status', {
      enum: ['unpaid', 'partial', 'paid', 'n/a'],
    })
      .notNull()
      .default('unpaid'),
    paidAmount: numeric('paid_amount', { precision: 14, scale: 2 }).notNull().default('0'),
    /** תאריך התשלום האחרון שסגר את החוב */
    paidAt: text('paid_at'),

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
    // הדשבורד והדוחות שולפים לפי צד, סטטוס ותאריך — ביחד.
    index('documents_direction_idx').on(t.direction, t.status, t.docDate),
    // מפתח הכפילות הדומה: אותה חשבונית שהגיעה גם כ-PDF וגם כצילום.
    index('documents_dup_idx').on(t.supplierTaxId, t.docNumber, t.totalAmount),
    // התזרים שואל תמיד את אותה שאלה: מה פתוח, ומתי הוא לתשלום.
    index('documents_payment_idx').on(t.paymentStatus, t.dueDate),
  ],
)

// ============================================================
//  תשלומים.
//
//  שורה לכל תנועת כסף מול מסמך. תשלום חלקי הוא שתי שורות, ולא
//  מספר שנדרס — כך אפשר לענות על "מתי בדיוק שילמנו ומה מקור
//  המידע", וכך ביטול של תשלום אחד לא מוחק את השני.
//
//  source:
//    implied — משתמע מסוג המסמך. קבלה כבר שולמה בהגדרה.
//    manual  — אדם סימן. זה המסלול של מזומן.
//    auto    — התאמה מול תנועת בנק.
// ============================================================
export const documentPayments = pgTable(
  'document_payments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    documentId: uuid('document_id')
      .notNull()
      .references(() => documents.id, { onDelete: 'cascade' }),
    amount: numeric('amount', { precision: 14, scale: 2 }).notNull(),
    /** תאריך בלבד, ISO — כמו doc_date, כדי שלא יזוז באזורי זמן */
    paidAt: text('paid_at').notNull(),
    source: text('source', { enum: ['implied', 'manual', 'auto'] }).notNull(),
    method: text('method'),
    /** אסמכתא: מספר המחאה, מזהה העברה, או מזהה תנועת הבנק */
    reference: text('reference'),
    note: text('note'),
    createdBy: uuid('created_by').references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('document_payments_document_idx').on(t.documentId, t.paidAt),
    index('document_payments_paid_at_idx').on(t.paidAt),
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
export type Customer = typeof customers.$inferSelect
export type BusinessProfile = typeof businessProfile.$inferSelect
export type IngestLog = typeof ingestLog.$inferSelect
export type Document = typeof documents.$inferSelect
export type NewDocument = typeof documents.$inferInsert
export type DocumentPayment = typeof documentPayments.$inferSelect
