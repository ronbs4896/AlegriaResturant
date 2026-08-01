import { SESSION_COOKIE } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(): Promise<Response> {
  const res = Response.json({ ok: true })
  res.headers.append('Set-Cookie', `${SESSION_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax; HttpOnly`)
  return res
}
