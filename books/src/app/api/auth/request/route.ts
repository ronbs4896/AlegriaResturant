import { z } from 'zod'
import { and, eq, gt, desc } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { findAllowed, generateCode, hashCode, CODE_TTL_MINUTES } from '@/lib/auth'
import { sendLoginCode } from '@/lib/mail'
import { handler } from '@/lib/session'

export const runtime = 'nodejs'

const Body = z.object({ email: z.string().email().max(200) })

export const POST = handler(async (req) => {
  const parsed = Body.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: 'invalid_email' }, { status: 400 })

  const email = parsed.data.email.trim().toLowerCase()
  const allowed = findAllowed(email)

  // תשובה זהה בין אם הכתובת מורשית או לא, כדי שלא ניתן יהיה
  // למפות מכאן מי עובד בחברה.
  const generic = Response.json({ ok: true })
  if (!allowed) return generic

  const db = await getDb()

  // הגבלת קצב: לא יותר מ-3 קודים בחמש דקות לאותה כתובת.
  const since = new Date(Date.now() - 5 * 60_000)
  const recent = await db
    .select({ id: schema.loginCodes.id })
    .from(schema.loginCodes)
    .where(and(eq(schema.loginCodes.email, email), gt(schema.loginCodes.createdAt, since)))
    .orderBy(desc(schema.loginCodes.createdAt))
    .limit(4)
  if (recent.length >= 3) return generic

  const code = generateCode()
  await db.insert(schema.loginCodes).values({
    email,
    codeHash: hashCode(email, code),
    expiresAt: new Date(Date.now() + CODE_TTL_MINUTES * 60_000),
  })

  const sent = await sendLoginCode(email, code)
  if (!sent.ok) return Response.json({ error: 'mail_failed' }, { status: 502 })

  // בפיתוח בלי Resend מחזירים את הקוד, כדי שאפשר יהיה להתחבר.
  return Response.json(sent.devCode ? { ok: true, devCode: sent.devCode } : { ok: true })
})
