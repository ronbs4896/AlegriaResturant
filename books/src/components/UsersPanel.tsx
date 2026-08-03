'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { withBase } from '@/lib/url'

export interface UserRow {
  id: string
  email: string
  role: string
  lastSeenAt: string | null
  uploads: number
  approvals: number
}

const ROLE_LABEL: Record<string, string> = { admin: 'מנהל', uploader: 'מעלה מסמכים' }

const fmtDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('he-IL', { day: 'numeric', month: 'short' }) : 'טרם נכנס'

export default function UsersPanel({ users, meId }: { users: UserRow[]; meId: string }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'admin' | 'uploader'>('uploader')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  async function call(method: string, body?: unknown, query = '') {
    setBusy(true)
    setMsg(null)
    try {
      const res = await fetch(withBase(`/api/users${query}`), {
        method,
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setMsg({ ok: false, text: errorText(data) })
        return false
      }
      router.refresh()
      return true
    } catch {
      setMsg({ ok: false, text: 'אין חיבור לשרת.' })
      return false
    } finally {
      setBusy(false)
    }
  }

  async function add() {
    const ok = await call('POST', { email: email.trim().toLowerCase(), role })
    if (ok) {
      setMsg({
        ok: true,
        text: 'נוסף. חשוב: צריך גם להוסיף את הכתובת ל-AUTH_ALLOWLIST ב-Vercel, אחרת הכניסה תיחסם.',
      })
      setEmail('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
        <h2 className="font-bold">הוספת משתמש</h2>
        <p className="mt-1 mb-4 text-sm text-muted">
          מנהל מאשר מסמכים ורואה הכול. מעלה מסמכים יכול לצלם ולהעלות, ולראות את רשימת החודש.
        </p>

        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-56 flex-1">
            <label htmlFor="new-user-email" className="mb-1 block text-xs font-semibold text-muted">
              כתובת מייל
            </label>
            <input
              id="new-user-email"
              type="email"
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@alegriacatering.co.il"
              className="w-full rounded-lg border border-line bg-raised px-3 py-2 outline-none focus:border-action"
            />
          </div>
          <div>
            <label htmlFor="new-user-role" className="mb-1 block text-xs font-semibold text-muted">
              הרשאה
            </label>
            <select
              id="new-user-role"
              value={role}
              onChange={(e) => setRole(e.target.value as 'admin' | 'uploader')}
              className="rounded-lg border border-line bg-raised px-3 py-2 outline-none focus:border-action"
            >
              <option value="uploader">מעלה מסמכים</option>
              <option value="admin">מנהל</option>
            </select>
          </div>
          <button
            onClick={add}
            disabled={busy || !email.includes('@')}
            className="rounded-xl bg-action px-5 py-2.5 font-bold text-white transition-all hover:-translate-y-px disabled:translate-y-0 disabled:opacity-45"
          >
            הוספה
          </button>
        </div>

        {msg && (
          <p
            role="status"
            className={`mt-3 rounded-lg px-3 py-2 text-sm ${
              msg.ok ? 'bg-ok-soft text-ok' : 'bg-danger-soft text-danger'
            }`}
          >
            {msg.text}
          </p>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-xs text-faint">
              <th className="px-4 py-2.5 text-right font-semibold">משתמש</th>
              <th className="px-4 py-2.5 text-right font-semibold">הרשאה</th>
              <th className="px-4 py-2.5 text-left font-semibold">העלה</th>
              <th className="px-4 py-2.5 text-left font-semibold">אישר</th>
              <th className="px-4 py-2.5 text-left font-semibold">נכנס לאחרונה</th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-line/60 last:border-0 hover:bg-raised">
                <td className="px-4 py-3">
                  <span className="font-semibold" dir="ltr">
                    {u.email}
                  </span>
                  {u.id === meId && <span className="ms-2 text-xs text-faint">(אתם)</span>}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={u.role}
                    disabled={busy || u.id === meId}
                    onChange={(e) => call('PATCH', { id: u.id, role: e.target.value })}
                    aria-label={`הרשאה של ${u.email}`}
                    className="rounded-lg border border-line bg-raised px-2 py-1 text-xs outline-none focus:border-action disabled:opacity-60"
                  >
                    <option value="uploader">{ROLE_LABEL.uploader}</option>
                    <option value="admin">{ROLE_LABEL.admin}</option>
                  </select>
                </td>
                <td className="num px-4 py-3 text-left">{u.uploads}</td>
                <td className="num px-4 py-3 text-left">{u.approvals}</td>
                <td className="px-4 py-3 text-left text-xs text-muted">{fmtDate(u.lastSeenAt)}</td>
                <td className="px-4 py-3 text-left">
                  {u.id !== meId && (
                    <button
                      onClick={() => call('DELETE', undefined, `?id=${u.id}`)}
                      disabled={busy}
                      className="text-xs font-semibold text-danger hover:underline disabled:opacity-45"
                    >
                      הסרה
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function errorText(data: { error?: string; count?: number }): string {
  switch (data.error) {
    case 'cannot_demote_self':
      return 'אי אפשר להוריד לעצמכם הרשאה — המערכת תישאר בלי מנהל.'
    case 'cannot_remove_self':
      return 'אי אפשר להסיר את עצמכם.'
    case 'has_documents':
      return `למשתמש הזה ${data.count} מסמכים במערכת. הסרה הייתה מוחקת את העקבות של מי העלה מה — שנו לו הרשאה במקום.`
    default:
      return 'הפעולה נכשלה.'
  }
}
