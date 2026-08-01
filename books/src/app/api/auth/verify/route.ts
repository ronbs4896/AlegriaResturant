import { z } from 'zod'
import { and, desc, eq, gt, isNull, sql } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import {
  SESSION_COOKIE,
  codeMatches,
  encodeSession,
  findAllowed,
  sessionCookieOptions,
  MAX_CODE_ATTEMPTS,
} from '@/lib/auth'
import { handler, upsertUser } from '@/lib/session'

export const runtime = 'nodejs'

const Body = z.object({
  email: z.string().email().max(200),
  code: z.string().regex(/^\d{6}$/),
})

export const POST = handler(async (req) => {
  const parsed = Body.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: 'invalid_code' }, { status: 400 })

  const email = parsed.data.email.trim().toLowerCase()
  const allowed = findAllowed(email)
  if (!allowed) return Response.json({ error: 'invalid_code' }, { status: 401 })

  const db = await getDb()
  const rows = await db
    .select()
    .from(schema.loginCodes)
    .where(
      and(
        eq(schema.loginCodes.email, email),
        isNull(schema.loginCodes.consumedAt),
        gt(schema.loginCodes.expiresAt, new Date()),
      ),
    )
    .orderBy(desc(schema.loginCodes.createdAt))
    .limit(1)

  const row = rows[0]
  if (!row) return Response.json({ error: 'invalid_code' }, { status: 401 })

  if (row.attempts >= MAX_CODE_ATTEMPTS) {
    return Response.json({ error: 'too_many_attempts' }, { status: 429 })
  }

  if (!codeMatches(email, parsed.data.code, row.codeHash)) {
    await db
      .update(schema.loginCodes)
      .set({ attempts: sql`${schema.loginCodes.attempts} + 1` })
      .where(eq(schema.loginCodes.id, row.id))
    return Response.json({ error: 'invalid_code' }, { status: 401 })
  }

  // חד-פעמי: נצרך ברגע שהצליח, כך שלא ניתן לשימוש חוזר.
  await db
    .update(schema.loginCodes)
    .set({ consumedAt: new Date() })
    .where(eq(schema.loginCodes.id, row.id))

  const user = await upsertUser(email, allowed.role)
  const token = encodeSession({ uid: user.id, email: user.email, role: allowed.role })

  const res = Response.json({ ok: true, role: allowed.role })
  res.headers.append(
    'Set-Cookie',
    serializeCookie(SESSION_COOKIE, token, sessionCookieOptions),
  )
  return res
})

function serializeCookie(
  name: string,
  value: string,
  o: { httpOnly: boolean; secure: boolean; sameSite: 'lax'; path: string; maxAge: number },
): string {
  const parts = [
    `${name}=${value}`,
    `Path=${o.path}`,
    `Max-Age=${o.maxAge}`,
    `SameSite=${o.sameSite === 'lax' ? 'Lax' : o.sameSite}`,
  ]
  if (o.httpOnly) parts.push('HttpOnly')
  if (o.secure) parts.push('Secure')
  return parts.join('; ')
}
