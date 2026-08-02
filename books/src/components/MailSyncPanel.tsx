'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { withBase } from '@/lib/url'

interface Result {
  mailbox: string
  scanned: number
  stored: number
  skipped: number
  error?: string
}

// ============================================================
//  מצב חיבור התיבות, ומשיכה יזומה.
//  אחרי הזנת סיסמת אפליקציה רוצים לדעת מיד אם היא נכונה.
// ============================================================
export default function MailSyncPanel() {
  const router = useRouter()
  const [boxes, setBoxes] = useState<string[] | null>(null)
  const [busy, setBusy] = useState(false)
  const [results, setResults] = useState<Result[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(withBase('/api/mail/sync'))
      .then((r) => (r.ok ? r.json() : { mailboxes: [] }))
      .then((d) => setBoxes(d.mailboxes ?? []))
      .catch(() => setBoxes([]))
  }, [])

  if (boxes === null || boxes.length === 0) return null

  async function run() {
    setBusy(true)
    setError(null)
    setResults(null)
    try {
      const res = await fetch(withBase('/api/mail/sync'), { method: 'POST' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(`המשיכה נכשלה. (${data.error ?? res.status})`)
        return
      }
      setResults(data.results ?? [])
      router.refresh()
    } catch {
      setError('אין חיבור לשרת.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mb-6 rounded-xl border border-line bg-surface px-4 py-3">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-sm font-semibold">תיבות מחוברות</span>
        <span className="text-xs text-muted" dir="ltr">
          {boxes.join(' · ')}
        </span>
        <button
          onClick={run}
          disabled={busy}
          className="ms-auto rounded-lg border border-line px-3 py-1.5 text-sm font-semibold hover:bg-raised disabled:opacity-45"
        >
          {busy ? 'מושך…' : 'משיכה עכשיו'}
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-2 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}

      {results?.map((r) => (
        <p
          key={r.mailbox}
          className={`mt-2 rounded-lg px-3 py-2 text-sm ${
            r.error ? 'bg-danger-soft text-danger' : 'bg-raised text-muted'
          }`}
        >
          <span dir="ltr">{r.mailbox}</span>
          {r.error ? (
            <> — {r.error}</>
          ) : (
            <>
              {' '}
              · נסרקו <span className="num">{r.scanned}</span> · נשמרו{' '}
              <span className="num">{r.stored}</span> · דולגו{' '}
              <span className="num">{r.skipped}</span>
            </>
          )}
        </p>
      ))}

      {results?.length === 0 && (
        <p className="mt-2 text-sm text-muted">לא נמצאו הודעות חדשות.</p>
      )}
    </div>
  )
}
