import { createHmac, timingSafeEqual } from 'node:crypto'

// ============================================================
//  אימות חתימת webhook בתקן Standard Webhooks (Svix), שבו
//  Resend משתמש.
//
//  בלי האימות הזה כל אחד שיודע את הכתובת יכול לדחוף מסמכים
//  לתיק ההוצאות. זו לא נקודת קצה שאפשר להשאיר פתוחה.
//
//  החתימה מחושבת על הגוף הגולמי. parse ואז stringify משנה
//  רווחים וסדר מפתחות ושובר אותה — לכן הקוד מקבל מחרוזת.
// ============================================================

const TOLERANCE_SECONDS = 5 * 60

export type VerifyResult =
  | { ok: true }
  | { ok: false; reason: 'no_secret' | 'missing_headers' | 'stale' | 'bad_signature' }

export function verifyWebhook(
  rawBody: string,
  headers: Headers,
  secret: string | undefined,
  nowMs = Date.now(),
): VerifyResult {
  if (!secret) return { ok: false, reason: 'no_secret' }

  const id = headers.get('svix-id') ?? headers.get('webhook-id')
  const timestamp = headers.get('svix-timestamp') ?? headers.get('webhook-timestamp')
  const signature = headers.get('svix-signature') ?? headers.get('webhook-signature')
  if (!id || !timestamp || !signature) return { ok: false, reason: 'missing_headers' }

  // חלון זמן, כדי שהקלטה של בקשה תקפה לא תוכל להישלח שוב מחר.
  const sent = Number(timestamp)
  if (!Number.isFinite(sent)) return { ok: false, reason: 'stale' }
  if (Math.abs(nowMs / 1000 - sent) > TOLERANCE_SECONDS) return { ok: false, reason: 'stale' }

  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64')
  const expected = createHmac('sha256', key).update(`${id}.${timestamp}.${rawBody}`).digest('base64')

  // הכותרת מכילה רשימה מופרדת ברווחים, כל אחת בתבנית "v1,<חתימה>".
  // סיבוב מפתחות מייצר יותר מאחת, וצריך שאחת מהן תתאים.
  for (const part of signature.split(' ')) {
    const value = part.includes(',') ? part.slice(part.indexOf(',') + 1) : part
    if (safeEqual(value, expected)) return { ok: true }
  }
  return { ok: false, reason: 'bad_signature' }
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}
