'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { EXPENSE_CATEGORIES } from '@/lib/constants'
import { withBase } from '@/lib/url'

interface Fields {
  name: string
  defaultCategory: string | null
  defaultPaymentTerms: string | null
  vatDeductible: boolean
  notes: string | null
  knownSenders: string[]
}

/** התנאים השכיחים, ואפשרות לכתוב כל דבר אחר. */
const TERMS = ['מזומן', 'שוטף', 'שוטף+30', 'שוטף+60', 'שוטף+90', 'נטו 30']

/**
 * הגדרות הספק — מה שהצנרת קוראת בכל מסמך חדש: הקטגוריה כאן
 * גוברת על ניחוש המודל, ו"מוכר לניכוי" משפיע ישירות על דוח
 * המע״מ. שינוי אחד כאן מסווג את כל המסמכים הבאים.
 */
export default function SupplierForm({ id, initial }: { id: string; initial: Fields }) {
  const router = useRouter()
  const [f, setF] = useState<Fields>(initial)
  const [senderInput, setSenderInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)

  async function save() {
    setBusy(true)
    setMessage(null)
    try {
      const res = await fetch(withBase('/api/suppliers'), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, fields: f }),
      })
      if (!res.ok) {
        setMessage({ ok: false, text: 'השמירה נכשלה. בדקו את השדות ונסו שוב.' })
        return
      }
      setMessage({ ok: true, text: 'נשמר. מסמכים חדשים מהספק יסווגו לפי ההגדרות האלה.' })
      router.refresh()
    } catch {
      setMessage({ ok: false, text: 'אין חיבור לשרת.' })
    } finally {
      setBusy(false)
    }
  }

  function addSender() {
    const value = senderInput.trim().toLowerCase().replace(/^@/, '')
    if (!value || f.knownSenders.includes(value)) return
    setF((prev) => ({ ...prev, knownSenders: [...prev.knownSenders, value] }))
    setSenderInput('')
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
      <h2 className="mb-4 font-bold">הגדרות הספק</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="sup-name" className="mb-1 block text-xs font-semibold text-muted">
            שם
          </label>
          <input
            id="sup-name"
            value={f.name}
            onChange={(e) => setF((p) => ({ ...p, name: e.target.value }))}
            className="w-full rounded-lg border border-line bg-raised px-3 py-2 outline-none focus:border-action"
          />
        </div>

        <div>
          <label htmlFor="sup-cat" className="mb-1 block text-xs font-semibold text-muted">
            קטגוריית ברירת מחדל
          </label>
          <select
            id="sup-cat"
            value={f.defaultCategory ?? ''}
            onChange={(e) => setF((p) => ({ ...p, defaultCategory: e.target.value || null }))}
            className="w-full rounded-lg border border-line bg-raised px-3 py-2 outline-none focus:border-action"
          >
            <option value="">— לפי המסמך —</option>
            {Object.entries(EXPENSE_CATEGORIES).map(([k, v]) => (
              <option key={k} value={k}>
                {v.he}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-faint">גוברת על מה שהחילוץ מזהה במסמך.</p>
        </div>

        <div>
          <label htmlFor="sup-terms" className="mb-1 block text-xs font-semibold text-muted">
            תנאי תשלום
          </label>
          <input
            id="sup-terms"
            list="terms-options"
            value={f.defaultPaymentTerms ?? ''}
            onChange={(e) => setF((p) => ({ ...p, defaultPaymentTerms: e.target.value || null }))}
            placeholder="שוטף+30"
            className="w-full rounded-lg border border-line bg-raised px-3 py-2 outline-none focus:border-action"
          />
          <datalist id="terms-options">
            {TERMS.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
          <p className="mt-1 text-xs text-faint">
            שוטף+30 נספר מסוף חודש המסמך. משמש כשהחשבונית עצמה לא כותבת תנאים.
          </p>
        </div>

        <div className="flex items-start gap-2 pt-6">
          <input
            id="sup-vat"
            type="checkbox"
            checked={f.vatDeductible}
            onChange={(e) => setF((p) => ({ ...p, vatDeductible: e.target.checked }))}
            className="mt-1 h-4 w-4 accent-action"
          />
          <label htmlFor="sup-vat" className="text-sm">
            <span className="font-semibold">מוכר לניכוי מס תשומות</span>
            <span className="block text-xs text-faint">
              נכנס ישירות לחישוב המע״מ בדוחות.
            </span>
          </label>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-muted">שולחים מוכרים</label>
          <div className="flex flex-wrap items-center gap-2">
            {f.knownSenders.map((s) => (
              <span
                key={s}
                className="num flex items-center gap-1.5 rounded-full bg-raised px-3 py-1 text-xs"
              >
                {s}
                <button
                  aria-label={`הסרת ${s}`}
                  onClick={() =>
                    setF((p) => ({ ...p, knownSenders: p.knownSenders.filter((x) => x !== s) }))
                  }
                  className="font-bold text-muted hover:text-danger"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              value={senderInput}
              onChange={(e) => setSenderInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addSender()
                }
              }}
              placeholder="דומיין, למשל tnuva.co.il"
              dir="ltr"
              className="min-h-8 rounded-lg border border-line bg-raised px-3 text-xs outline-none focus:border-action"
            />
            <button onClick={addSender} className="text-xs font-semibold text-action">
              הוספה
            </button>
          </div>
          <p className="mt-1 text-xs text-faint">
            נלמדים אוטומטית ממסמכים שמגיעים במייל. אפשר גם להוסיף ידנית.
          </p>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="sup-notes" className="mb-1 block text-xs font-semibold text-muted">
            הערות
          </label>
          <textarea
            id="sup-notes"
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
