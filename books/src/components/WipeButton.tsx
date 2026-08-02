'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { withBase } from '@/lib/url'

const CONFIRM_WORD = 'מחק הכל'

/**
 * איפוס נקי. הפעולה ההרסנית היחידה במערכת, ולכן היא דורשת
 * הקלדה מדויקת ולא רק לחיצה — כפתור לבדו נלחץ בטעות.
 */
export default function WipeButton({ documentCount }: { documentCount: number }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [word, setWord] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  async function run() {
    setBusy(true)
    setMsg(null)
    try {
      const res = await fetch(withBase('/api/admin/wipe'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirm: word }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setMsg(`המחיקה לא בוצעה. (${data.error ?? res.status})`)
        return
      }
      setMsg(`נמחקו ${data.documents} מסמכים. המשיכה הבאה מתחילה מאפס.`)
      setOpen(false)
      setWord('')
      router.refresh()
    } catch {
      setMsg('אין חיבור לשרת.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-2xl border border-danger/25 bg-surface p-4 sm:p-6">
      <h2 className="font-bold text-danger">מחיקת כל המסמכים</h2>
      <p className="mt-1 text-sm text-muted">
        מוחק את כל המסמכים, הספקים והלקוחות שנלמדו מהם, ואת הקבצים באחסון, ומאפס את
        סמני המייל כך שהמשיכה הבאה תתחיל מההתחלה. אין דרך לבטל.
      </p>
      <p className="mt-2 text-sm">
        כרגע במערכת <span className="num font-bold">{documentCount}</span> מסמכים.
      </p>

      {msg && (
        <p role="status" className="mt-3 rounded-lg bg-raised px-3 py-2 text-sm text-muted">
          {msg}
        </p>
      )}

      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="mt-4 rounded-xl border border-danger/40 px-4 py-2.5 text-sm font-bold text-danger hover:bg-danger-soft"
        >
          מחיקת הכל
        </button>
      ) : (
        <div className="mt-4 rounded-xl border border-danger/25 bg-danger-soft p-4">
          <label htmlFor="wipe-confirm" className="block text-sm font-semibold text-danger">
            להמשך, הקלידו: {CONFIRM_WORD}
          </label>
          <input
            id="wipe-confirm"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="mt-2 w-full rounded-lg border border-line bg-surface px-3 py-2 outline-none focus:border-danger"
          />
          <div className="mt-3 flex gap-2">
            <button
              onClick={run}
              disabled={busy || word.trim() !== CONFIRM_WORD}
              className="rounded-xl bg-danger px-4 py-2.5 text-sm font-bold text-white disabled:opacity-40"
            >
              {busy ? 'מוחק…' : 'מחיקה סופית'}
            </button>
            <button
              onClick={() => {
                setOpen(false)
                setWord('')
              }}
              className="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-semibold"
            >
              ביטול
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
