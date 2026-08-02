'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { withBase } from '@/lib/url'

interface Result {
  mailbox: string
  scanned: number
  stored: number
  skipped: number
  attachments: number
  passed: number
  filtered: Record<string, number>
  preview: boolean
  error?: string
}

const REASON_LABELS: Record<string, string> = {
  mime_not_accepted: 'סוג קובץ שאינו מסמך',
  images_disabled: 'תמונות (התיבה מוגדרת ל-PDF בלבד)',
  too_small: 'קטן מדי מכדי להיות מסמך',
  inline_logo: 'לוגו או חתימה משובצת',
  blocked_filename: 'שם קובץ חסום',
  self_sent: 'דואר שהתיבה שלחה',
  no_attachment: 'בלי קובץ מצורף מתאים',
  duplicate_content: 'כבר קיים במערכת',
}

// ============================================================
//  משיכה מהמייל בשני צעדים: קודם רואים מה יימשך, ורק אז מייבאים.
//  זה מה שמונע את מה שקרה קודם — מאות קבצים שנכנסו בלי שאיש
//  ראה אותם מראש.
// ============================================================
export default function MailSyncPanel() {
  const router = useRouter()
  const [boxes, setBoxes] = useState<string[] | null>(null)
  const [busy, setBusy] = useState<'preview' | 'import' | null>(null)
  const [results, setResults] = useState<Result[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(withBase('/api/mail/sync'))
      .then((r) => (r.ok ? r.json() : { mailboxes: [] }))
      .then((d) => setBoxes(d.mailboxes ?? []))
      .catch(() => setBoxes([]))
  }, [])

  if (boxes === null || boxes.length === 0) return null

  async function run(mode: 'preview' | 'import') {
    setBusy(mode)
    setError(null)
    if (mode === 'preview') setResults(null)
    try {
      const url = withBase(`/api/mail/sync${mode === 'preview' ? '?mode=preview' : ''}`)
      const res = await fetch(url, { method: 'POST' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(`הפעולה נכשלה. (${data.error ?? res.status})`)
        return
      }
      setResults(data.results ?? [])
      if (mode === 'import') router.refresh()
    } catch {
      setError('אין חיבור לשרת.')
    } finally {
      setBusy(null)
    }
  }

  const isPreview = results?.some((r) => r.preview) ?? false
  const totalPassed = results?.reduce((s, r) => s + r.passed, 0) ?? 0

  return (
    <div className="mb-6 rounded-xl border border-line bg-surface px-4 py-3">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-sm font-semibold">תיבות מחוברות</span>
        <span className="text-xs text-muted" dir="ltr">
          {boxes.join(' · ')}
        </span>
        <div className="ms-auto flex items-center gap-2">
          <button
            onClick={() => run('preview')}
            disabled={busy !== null}
            className="rounded-lg border border-line px-3 py-1.5 text-sm font-semibold hover:bg-raised disabled:opacity-45"
          >
            {busy === 'preview' ? 'סורק…' : 'בדיקה מה יימשך'}
          </button>
          <button
            onClick={() => run('import')}
            disabled={busy !== null}
            className="rounded-lg bg-action px-3 py-1.5 text-sm font-bold text-white disabled:opacity-45"
          >
            {busy === 'import' ? 'מייבא…' : 'ייבוא'}
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-2 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}

      {isPreview && (
        <p className="mt-3 rounded-lg bg-action-soft px-3 py-2 text-sm text-action">
          זו בדיקה בלבד — לא נשמר דבר.{' '}
          {totalPassed > 0 ? (
            <>
              ייבוא יריץ זיהוי על <span className="num font-bold">{totalPassed}</span> קבצים.
              הזיהוי עצמו יקבע כמה מהם באמת חשבוניות.
            </>
          ) : (
            'אין קבצים חדשים שעוברים את הסינון.'
          )}
        </p>
      )}

      {results?.map((r) => (
        <div
          key={r.mailbox}
          className={`mt-2 rounded-lg px-3 py-2 text-sm ${
            r.error ? 'bg-danger-soft text-danger' : 'bg-raised text-muted'
          }`}
        >
          <div>
            <span dir="ltr" className="font-semibold">
              {r.mailbox}
            </span>
            {r.error ? (
              <> — {r.error}</>
            ) : (
              <>
                {' · '}
                <span className="num">{r.scanned}</span> הודעות ·{' '}
                <span className="num">{r.attachments}</span> קבצים ·{' '}
                <span className="num font-bold">{r.passed}</span> עברו סינון
                {!r.preview && (
                  <>
                    {' · '}
                    <span className="num font-bold text-ink">{r.stored}</span> נכנסו
                  </>
                )}
              </>
            )}
          </div>

          {/* הסינון מפורט לפי סיבה — לא מספר אחד עיוור */}
          {Object.keys(r.filtered).length > 0 && (
            <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-faint">
              {Object.entries(r.filtered).map(([code, n]) => (
                <li key={code}>
                  {REASON_LABELS[code] ?? code}: <span className="num">{n}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {results?.length === 0 && (
        <p className="mt-2 text-sm text-muted">לא נמצאו הודעות חדשות.</p>
      )}
    </div>
  )
}
