import { createHmac, randomInt, timingSafeEqual, createHash } from 'node:crypto'

// ============================================================
//  התחברות בקוד בן 6 ספרות, לא בקישור קסם.
//
//  קישור קסם נשבר באייפון: הודעה שנפתחת מתוך Gmail או וואטסאפ
//  נפתחת בדפדפן הפנימי של האפליקציה, ה-session נוחת שם, והמשתמש
//  חוזר לספארי ומגלה שהוא עדיין מנותק. קוד לא סובל מזה, והוא גם
//  קל יותר למי שלא טכני.
// ============================================================

export const SESSION_COOKIE = 'alg_session'
const SESSION_TTL_DAYS = 30
export const CODE_TTL_MINUTES = 15
export const MAX_CODE_ATTEMPTS = 5

export type Role = 'admin' | 'uploader'

export interface SessionPayload {
  uid: string
  email: string
  role: Role
  exp: number // שניות אפוך
}

function secret(): string {
  const s = process.env.SESSION_SECRET
  if (!s || s.length < 24) {
    throw new Error('SESSION_SECRET חסר או קצר מדי. צרו עם: openssl rand -base64 48')
  }
  return s
}

const b64url = (b: Buffer) => b.toString('base64url')

function sign(data: string): string {
  return b64url(createHmac('sha256', secret()).update(data).digest())
}

/** עוגייה חתומה. אין כאן ספרייה חיצונית כי אין כאן צורך בה. */
export function encodeSession(p: Omit<SessionPayload, 'exp'>): string {
  const payload: SessionPayload = {
    ...p,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_DAYS * 86_400,
  }
  const body = b64url(Buffer.from(JSON.stringify(payload), 'utf8'))
  return `${body}.${sign(body)}`
}

export function decodeSession(token: string | undefined): SessionPayload | null {
  if (!token) return null
  const dot = token.lastIndexOf('.')
  if (dot < 1) return null

  const body = token.slice(0, dot)
  const mac = token.slice(dot + 1)
  const expected = sign(body)

  // השוואה בזמן קבוע — אחרת אפשר לגלות את החתימה בייט אחר בייט.
  const a = Buffer.from(mac)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null

  try {
    const p = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as SessionPayload
    if (typeof p.exp !== 'number' || p.exp * 1000 < Date.now()) return null
    if (!p.uid || !p.email || (p.role !== 'admin' && p.role !== 'uploader')) return null
    return p
  } catch {
    return null
  }
}

// הנתיב מגיע מ-basePath. המערכת חולקת דומיין עם אתר השיווק, ובלי
// ההגבלה הזו עוגיית ההתחברות הייתה נשלחת בכל בקשה לעמוד ציבורי.
export const SESSION_COOKIE_PATH = process.env.BASE_PATH || '/'

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: SESSION_COOKIE_PATH,
  maxAge: SESSION_TTL_DAYS * 86_400,
}

// ============================================================
//  רשימת המורשים. נקראת מ-env ולא ממסד, כדי שגם אם מישהו יקבל
//  גישה למסד הוא לא יוכל להוסיף את עצמו.
//  פורמט: "a@x.com:admin, b@x.com"  (ברירת מחדל: uploader)
// ============================================================
export interface AllowedUser {
  email: string
  role: Role
}

export function parseAllowlist(raw: string | undefined): AllowedUser[] {
  if (!raw) return []
  return raw
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [email, role] = entry.split(':').map((s) => s.trim())
      return {
        email: (email ?? '').toLowerCase(),
        role: role === 'admin' ? ('admin' as const) : ('uploader' as const),
      }
    })
    .filter((u) => u.email.includes('@'))
}

export function findAllowed(email: string): AllowedUser | null {
  const target = email.trim().toLowerCase()
  return parseAllowlist(process.env.AUTH_ALLOWLIST).find((u) => u.email === target) ?? null
}

// ============================================================
//  הקוד עצמו
// ============================================================

/** שש ספרות אקראיות קריפטוגרפית. אפסים מובילים נשמרים. */
export function generateCode(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, '0')
}

/** נשמר hash בלבד — הקוד עצמו לא נכתב לשום מקום מלבד המייל. */
export function hashCode(email: string, code: string): string {
  return createHash('sha256').update(`${email.toLowerCase()}:${code}:${secret()}`).digest('hex')
}

export function codeMatches(email: string, code: string, storedHash: string): boolean {
  const a = Buffer.from(hashCode(email, code))
  const b = Buffer.from(storedHash)
  return a.length === b.length && timingSafeEqual(a, b)
}
