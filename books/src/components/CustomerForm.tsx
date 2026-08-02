'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { withBase } from '@/lib/url'

interface Fields {
  name: string
  notes: string | null
}

export default function CustomerForm({ id, initial }: { id: string; initial: Fields }) {
  const router = useRouter()
  const [f, setF] = useState<Fields>(initial)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)

  async function save() {
    setBusy(true)
    setMessage(null)
    try {
      const res = await fetch(withBase('/api/customers'), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, fields: f }),
      })
      if (!res.ok) {
        setMessage({ ok: false, text: 'השמירה נכשלה.' })
        return
      }
      setMessage({ ok: true, text: 'נשמר.' })
      router.refresh()
    } catch {
      setMessage({ ok: false, text: 'אין חיבור לשרת.' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
      <h2 className="mb-4 font-bold">פרטי הלקוח</h2>

      <div className="grid grid-cols-1 gap-3">
        <div>
          <label htmlFor="cus-name" className="mb-1 block text-xs font-semibold text-muted">
            שם
          </label>
          <input
            id="cus-name"
            value={f.name}
            onChange={(e) => setF((p) => ({ ...p, name: e.target.value }))}
            className="w-full rounded-lg border border-line bg-raised px-3 py-2 outline-none focus:border-action"
          />
        </div>
        <div>
          <label htmlFor="cus-notes" className="mb-1 block text-xs font-semibold text-muted">
            הערות
          </label>
          <textarea
            id="cus-notes"
            rows={2}
            value={f.notes ?? ''}
            onChange={(e) => setF((p) => ({ ...p, notes: e.target.value || null }))}
            className="w-full rounded-lg border border-line bg-raised px-3 py-2 outline-none focus:border-action"
          />
        </div>
      </div>

      {message && (
        <p
          role="status"
          className={`mt-4 rounded-lg px-3 py-2 text-sm ${
            message.ok ? 'bg-ok-soft text-ok' : 'bg-danger-soft text-danger'
          }`}
        >
          {message.text}
        </p>
      )}

      <button
        onClick={save}
        disabled={busy || !f.name.trim()}
        className="mt-4 rounded-xl bg-action px-5 py-2.5 font-bold text-white disabled:opacity-45"
      >
        {busy ? 'שומר…' : 'שמירה'}
      </button>
    </div>
  )
}
