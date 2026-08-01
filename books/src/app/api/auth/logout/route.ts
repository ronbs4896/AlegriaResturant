import { SESSION_COOKIE, SESSION_COOKIE_PATH } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(): Promise<Response> {
  const res = Response.json({ ok: true })
  // הנתיב חייב להיות זהה לזה שבו העוגייה נוצרה, אחרת הדפדפן
  // מוסיף עוגייה ריקה שנייה ומשאיר את הישנה בתוקף.
  res.headers.append(
    'Set-Cookie',
    `${SESSION_COOKIE}=; Path=${SESSION_COOKIE_PATH}; Max-Age=0; SameSite=Lax; HttpOnly`,
  )
  return res
}
