import { z } from 'zod'
import { like } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { handler, requireUser } from '@/lib/session'
import { deletePrefix } from '@/lib/storage'

export const runtime = 'nodejs'
export const maxDuration = 300

// ============================================================
//  איפוס נקי.
//
//  מוחק את כל המסמכים, הישויות שנלמדו מהם והקבצים באחסון,
//  ומאפס את סמני המייל כך שהמשיכה הבאה מתחילה מאפס.
//
//  זו הפעולה ההרסנית היחידה במערכת, ולכן היא דורשת הקלדת
//  מילת אישור מדויקת — לא רק לחיצה.
// ============================================================

const CONFIRM_WORD = 'מחק הכל'

const Body = z.object({ confirm: z.string() })

export const POST = handler(async (req) => {
  const user = await requireUser('admin')
  const parsed = Body.safeParse(await req.json().catch(() => null))
  if (!parsed.success || parsed.data.confirm.trim() !== CONFIRM_WORD) {
    return Response.json({ error: 'confirm_mismatch' }, { status: 400 })
  }

  const db = await getDb()

  // סדר המחיקה מכבד את המפתחות הזרים: מה שמצביע על מסמכים קודם.
  const counted = await db.select({ id: schema.documents.id }).from(schema.documents)
  await db.delete(schema.ingestLog)
  await db.delete(schema.auditLog)
  await db.delete(schema.exports_)
  await db.delete(schema.documents)
  await db.delete(schema.suppliers)
  await db.delete(schema.customers)
  // סמני החידוש של תיבות המייל — בלי איפוסם המשיכה תמשיך מאיפה
  // שהפסיקה ותדלג בדיוק על מה שרוצים למשוך מחדש.
  await db.delete(schema.ingestState).where(like(schema.ingestState.key, 'mailbox:%'))
  await db.delete(schema.ingestState).where(like(schema.ingestState.key, 'inbound:%'))

  const blobs = await deletePrefix('raw/').catch((err) => {
    console.error('[wipe] מחיקת קבצים נכשלה', err)
    return 0
  })
  await deletePrefix('exports/').catch(() => 0)

  console.warn(`[wipe] ${user.email} מחק ${counted.length} מסמכים ו-${blobs} קבצים`)

  return Response.json({ ok: true, documents: counted.length, blobs })
})
