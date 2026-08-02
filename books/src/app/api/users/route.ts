import { z } from 'zod'
import { eq, sql } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { handler, requireUser } from '@/lib/session'

export const runtime = 'nodejs'

// ============================================================
//  ניהול משתמשים.
//
//  שינוי כאן משפיע על מי שכבר קיים במסד. רשימת ההרשאה הראשונית
//  ממשיכה לחיות ב-AUTH_ALLOWLIST: מי שאינו שם לא יוכל לבקש קוד
//  כניסה מלכתחילה, וזו ההגנה שלא תלויה במסד.
// ============================================================

const Create = z.object({
  email: z.string().trim().toLowerCase().email().max(200),
  role: z.enum(['admin', 'uploader']),
})

const Update = z.object({
  id: z.string().uuid(),
  role: z.enum(['admin', 'uploader']),
})

export const POST = handler(async (req) => {
  await requireUser('admin')
  const parsed = Create.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: 'invalid_body' }, { status: 400 })

  const db = await getDb()
  await db
    .insert(schema.users)
    .values(parsed.data)
    .onConflictDoUpdate({ target: schema.users.email, set: { role: parsed.data.role } })

  return Response.json({ ok: true })
})

export const PATCH = handler(async (req) => {
  const me = await requireUser('admin')
  const parsed = Update.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: 'invalid_body' }, { status: 400 })

  // הורדת ההרשאה של עצמך נחסמת: אחרת אפשר להישאר בלי אף מנהל.
  if (parsed.data.id === me.uid && parsed.data.role !== 'admin') {
    return Response.json({ error: 'cannot_demote_self' }, { status: 409 })
  }

  const db = await getDb()
  await db
    .update(schema.users)
    .set({ role: parsed.data.role })
    .where(eq(schema.users.id, parsed.data.id))

  return Response.json({ ok: true })
})

export const DELETE = handler(async (req) => {
  const me = await requireUser('admin')
  const id = new URL(req.url).searchParams.get('id')
  if (!id) return Response.json({ error: 'missing_id' }, { status: 400 })
  if (id === me.uid) return Response.json({ error: 'cannot_remove_self' }, { status: 409 })

  const db = await getDb()

  // משתמש שהעלה מסמכים לא נמחק: המחיקה הייתה מוחקת את עקבות
  // מי העלה מה. במקום זה מורידים אותו להרשאת צפייה בלבד.
  const uploads = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(schema.documents)
    .where(eq(schema.documents.uploadedBy, id))

  if ((uploads[0]?.n ?? 0) > 0) {
    return Response.json({ error: 'has_documents', count: uploads[0]?.n }, { status: 409 })
  }

  await db.delete(schema.users).where(eq(schema.users.id, id))
  return Response.json({ ok: true })
})
