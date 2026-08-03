'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { withBase } from '@/lib/url'
import { money, formatDate } from '@/lib/format'
import Money from '@/components/ui/Money'
import { PAYMENT_STATUS_HE, PAYMENT_SOURCE_HE, remainingAmount, type PaymentStatus } from '@/lib/payments'

// ============================================================
//  מצב התשלום של מסמך, והפעולה לסמן אותו כשולם.
//
//  אישור ותשלום הם שני צירים נפרדים: אפשר לאשר חשבונית שטרם
//  שולמה, ואפשר לשלם מסמך שעדיין בבדיקה. לכן הפאנל הזה חי לצד
//  טופס הבדיקה ולא בתוכו — הכפתור שלו לא מזיז את המסמך בתור.
// ============================================================

export interface PaymentRow {
  id: string
  amount: string
  paidAt: string
  source: string
  method: string | null
  note: string | null
}

const TONE: Record<PaymentStatus, string> = {
  paid: 'border-ok/25 bg-ok-soft text-ok',
  partial: 'border-warn/25 bg-warn-soft text-warn',
  unpaid: 'border-line bg-raised text-ink',
  'n/a': 'border-line bg-raised text-muted',
}

const today = () => new Date().toISOString().slice(0, 10)

export default function PaymentPanel({
  documentId,
  status,
  total,
  paid,
  dueDate,
  terms,
  payments,
}: {
  documentId: string
  status: PaymentStatus
  total: string | null
  paid: string | null
  dueDate: string | null
  terms: string | null
  payments: PaymentRow[]
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [date, setDate] = useState(today)
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState('')

  const remaining = remainingAmount(total, paid)

  async function mark() {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch(withBase('/api/payments'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentId,
          paidAt: date,
          amount: amount.trim() === '' ? undefined : Number(amount),
          method: method.trim() || null,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(
          data.error === 'nothing_to_pay'
            ? 'המסמך כבר משולם במלואו.'
            : data.error === 'not_payable'
              ? 'זיכוי אינו חוב שנפרע — הוא מתקזז מול המסמך המקורי.'
              : 'רישום התשלום נכשל.',
        )
        return
      }
      setOpen(false)
      setAmount('')
      setMethod('')
      router.refresh()
    } catch {
      setError('אין חיבור לשרת.')
    } finally {
      setBusy(false)
    }
  }

  async function undo(paymentId: string) {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch(withBase('/api/payments'), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId, paymentId }),
      })
      if (!res.ok) {
        setError('ביטול התשלום נכשל.')
        return
      }
      router.refresh()
    } catch {
      setError('אין חיבור לשרת.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className={`mt-6 rounded-xl border px-4 py-3 ${TONE[status]}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-bold">{PAYMENT_STATUS_HE[status]}</h2>
        {status !== 'n/a' && (
          <span className="text-xs text-muted">
            {status === 'paid' ? (
              <>שולם {formatDate(payments.at(-1)?.paidAt ?? null)}</>
            ) : (
              <>
                נותר לתשלום <Money value={remaining} tone="plain" />
                {dueDate && <> · עד {formatDate(dueDate)}</>}
              </>
            )}
            {terms && <> · {terms}</>}
          </span>
        )}
      </div>

      {payments.length > 0 && (
        <ul className="mt-3 space-y-1 border-t border-line/60 pt-3 text-xs">
          {payments.map((p) => (
            <li key={p.id} className="flex items-center justify-between gap-2">
              <span>
                <span className="num font-semibold">{money(p.amount)} ₪</span>
                <span className="text-muted">
                  {' · '}
                  {formatDate(p.paidAt)} ·{' '}
                  {PAYMENT_SOURCE_HE[p.source as 'manual'] ?? p.source}
                  {p.method && ` · ${p.method}`}
                </span>
              </span>
              <button
                type="button"
                onClick={() => undo(p.id)}
                disabled={busy}
                className="shrink-0 text-muted underline underline-offset-4 hover:text-danger disabled:opacity-40"
              >
                ביטול
              </button>
            </li>
          ))}
        </ul>
      )}

      {status !== 'n/a' && status !== 'paid' && !open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-3 rounded-lg bg-action px-4 py-2 text-sm font-bold text-on-action transition-transform active:scale-[.98]"
        >
          סימון כשולם
        </button>
      )}

      {open && (
        <div className="mt-3 border-t border-line/60 pt-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-muted">תאריך התשלום</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="num w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-muted">סכום</span>
              <input
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={remaining > 0 ? money(remaining) : ''}
                className="num w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-muted">אמצעי</span>
              <input
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                placeholder="מזומן"
                className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm"
              />
            </label>
          </div>
          <p className="mt-1 text-xs text-faint">
            בלי סכום נרשם כל מה שנותר. סכום קטן יותר נרשם כתשלום חלקי.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={mark}
              disabled={busy}
              className="rounded-lg bg-action px-4 py-2 text-sm font-bold text-on-action disabled:opacity-50"
            >
              {busy ? 'רושם...' : 'רישום התשלום'}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={busy}
              className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-muted"
            >
              ביטול
            </button>
          </div>
        </div>
      )}

      {error && <p className="mt-2 text-xs text-danger">{error}</p>}
    </section>
  )
}
