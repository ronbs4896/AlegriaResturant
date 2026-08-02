import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { safeSegment, documentFilename, toSheetRow } from '../src/lib/export'
import type { Document } from '../src/db/schema'

// מסמך מינימלי. כל בדיקה משנה ממנו שדה אחד.
const base = {
  id: '00000000-0000-0000-0000-000000000001',
  sha256: 'a'.repeat(64),
  blobPath: 'raw/2026-07/x.pdf',
  mime: 'application/pdf',
  sizeBytes: 1000,
  originalFilename: 'scan.pdf',
  source: 'upload',
  sourceRef: null,
  sourceSender: null,
  uploadedBy: null,
  status: 'approved',
  docType: 'tax_invoice',
  supplierId: null,
  supplierName: 'חברת החשמל לישראל',
  supplierTaxId: '520000118',
  recipientName: 'קייטרינג אלגריה',
  recipientTaxId: '027727817',
  docNumber: '20315',
  docDate: '2026-07-14',
  netAmount: '1000.00',
  vatAmount: '180.00',
  totalAmount: '1180.00',
  currency: 'ILS',
  allocationNumber: null,
  paymentMethod: 'העברה בנקאית',
  expenseCategory: 'utilities',
  confidence: '0.960',
  validationFlags: [],
  classifyReason: null,
  extractedRaw: null,
  extractionModel: null,
  extractedAt: null,
  reviewedBy: null,
  reviewedAt: null,
  createdAt: new Date('2026-07-20T10:00:00Z'),
} as unknown as Document

const doc = (over: Partial<Document> = {}): Document => ({ ...base, ...over })

describe('שמות הקבצים בחבילה', () => {
  test('עברית נשמרת, רווחים הופכים למקף', () => {
    assert.equal(safeSegment('חברת החשמל לישראל', 'x'), 'חברת-החשמל-לישראל')
  })

  test('תווים שמערכות קבצים חונקות עליהם נופלים', () => {
    assert.equal(safeSegment('א/ב:ג*ד?ה"ו<ז>ח|ט', 'x'), 'אבגדהוזחט')
  })

  test('ערך ריק מקבל ברירת מחדל, ולא שם ריק', () => {
    assert.equal(safeSegment(null, 'ספק-לא-ידוע'), 'ספק-לא-ידוע')
    assert.equal(safeSegment('///', 'ללא-מספר'), 'ללא-מספר')
  })

  test('שם מלא בתבנית תאריך__ספק__מספר', () => {
    const name = documentFilename(doc(), new Set())
    assert.equal(name, '2026-07-14__חברת-החשמל-לישראל__20315.pdf')
  })

  test('סיומת נגזרת מסוג הקובץ ולא משם המקור', () => {
    const name = documentFilename(doc({ mime: 'image/jpeg' }), new Set())
    assert.ok(name.endsWith('.jpg'), name)
  })

  test('בלי תאריך מסמך נופלים לתאריך הקליטה, ולא לשם ריק', () => {
    const name = documentFilename(doc({ docDate: null }), new Set())
    assert.ok(name.startsWith('2026-07-20__'), name)
  })

  test('שני מסמכים זהים לא דורסים זה את זה', () => {
    const taken = new Set<string>()
    const a = documentFilename(doc(), taken)
    const b = documentFilename(doc(), taken)
    const c = documentFilename(doc(), taken)
    assert.notEqual(a, b)
    assert.notEqual(b, c)
    assert.equal(b, '2026-07-14__חברת-החשמל-לישראל__20315--2.pdf')
  })
})

describe('שורת הגיליון', () => {
  test('חשבונית מס על חשמל — מזכה בניכוי', () => {
    const row = toSheetRow(doc(), 'f.pdf')
    assert.equal(row.deductible, 'כן')
    assert.equal(row.docType, 'חשבונית מס')
    assert.equal(row.category, 'חשמל, מים, גז')
    assert.equal(row.total, 1180)
  })

  test('קבלה אינה מזכה בניכוי, גם על הוצאה כשרה', () => {
    assert.equal(toSheetRow(doc({ docType: 'receipt' }), 'f.pdf').deductible, 'לא')
  })

  test('חשבונית מס על אירוח אינה מזכה — תקנה 16', () => {
    const row = toSheetRow(doc({ expenseCategory: 'hospitality' }), 'f.pdf')
    assert.equal(row.deductible, 'לא')
    assert.match(row.deductionNote, /תקנה 16/)
  })

  test('ארוחות ומסעדות — תקנה 15א', () => {
    const row = toSheetRow(doc({ expenseCategory: 'meals' }), 'f.pdf')
    assert.equal(row.deductible, 'לא')
    assert.match(row.deductionNote, /15א/)
  })

  test('רכב מזכה, אבל עם אזהרה על ניכוי חלקי', () => {
    const row = toSheetRow(doc({ expenseCategory: 'vehicle' }), 'f.pdf')
    assert.equal(row.deductible, 'כן')
    assert.match(row.deductionNote, /תקנה 18/)
  })

  test('סכומים חוזרים כמספרים, לא כמחרוזות', () => {
    const row = toSheetRow(doc(), 'f.pdf')
    assert.equal(typeof row.net, 'number')
    assert.equal(row.net, 1000)
    assert.equal(row.vat, 180)
  })

  test('שדות חסרים הופכים למחרוזת ריקה ולא ל-null בגיליון', () => {
    const row = toSheetRow(doc({ supplierName: null, docNumber: null, paymentMethod: null }), 'f.pdf')
    assert.equal(row.supplierName, '')
    assert.equal(row.docNumber, '')
    assert.equal(row.payment, '')
  })

  test('סוג מסמך לא מזוהה משאיר את דגל הניכוי ריק ולא "לא"', () => {
    const row = toSheetRow(doc({ docType: null }), 'f.pdf')
    assert.equal(row.deductible, '')
  })
})
