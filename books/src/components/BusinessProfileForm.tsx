'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { withBase } from '@/lib/url'

interface Profile {
  legalName: string
  tradeNames: string[]
  taxId: string | null
  vatNumber: string | null
  addresses: string[]
  emails: string[]
  phones: string[]
  bankAccounts: string[]
  defaultCurrency: string
}

/**
 * פרטי העסק הם מה שמאפשר למערכת לדעת איזה צד במסמך הוא אנחנו.
 * ככל שיש כאן יותר עוגנים — שמות מסחריים, כתובות מייל — כך פחות
 * מסמכים ייתקעו ב"לא ברור אם זו הכנסה או הוצאה".
 */
export default function BusinessProfileForm({ initial }: { initial: Profile }) {
  const router = useRouter()
  const [p, setP] = useState<Profile>(initial)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const set = <K extends keyof Profile>(k: K, v: Profile[K]) =>
    setP((prev) => ({ ...prev, [k]: v }))

  async function save() {
    setBusy(true)
    setMsg(null)
    try {
      const res = await fetch(withBase('/api/business'), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(p),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setMsg({
          ok: false,
          text:
            data.error === 'invalid_tax_id'
              ? 'ח.פ. לא עובר בדיקת ספרת ביקורת. בדקו את הספרות.'
              : 'השמירה נכשלה. בדקו את השדות.',
        })
        return
      }
      setMsg({ ok: true, text: 'נשמר. הזיהוי של הכנסה מול הוצאה ישתמש בפרטים האלה.' })
      router.refresh()
    } catch {
      setMsg({ ok: false, text: 'אין חיבור לשרת.' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
      <h2 className="font-bold">פרטי העסק</h2>
      <p className="mt-1 mb-4 text-sm text-muted">
        לפי הפרטים האלה המערכת מזהה איזה צד בכל מסמך הוא אתם. ח.פ. הוא ההכרעה החזקה;
        השמות המסחריים עוזרים כשהוא לא מודפס על המסמך.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Text label="שם רשמי" value={p.legalName} onChange={(v) => set('legalName', v)} wide />
        <Text label="ח.פ. / ע.מ." value={p.taxId ?? ''} onChange={(v) => set('taxId', v || null)} numeric />
        <Text
          label="מספר עוסק למע״מ"
          value={p.vatNumber ?? ''}
          onChange={(v) => set('vatNumber', v || null)}
          numeric
        />
        <Chips
          label="שמות מסחריים"
          hint="כל שם שמופיע על מסמכים חוץ מהשם הרשמי"
          values={p.tradeNames}
          onChange={(v) => set('tradeNames', v)}
        />
        <Chips
          label="כתובות מייל של העסק"
          hint="משמשות כרמז בזיהוי, לא כהכרעה"
          values={p.emails}
          onChange={(v) => set('emails', v)}
          ltr
        />
        <Chips label="טלפונים" values={p.phones} onChange={(v) => set('phones', v)} ltr />
        <Chips label="כתובות" values={p.addresses} onChange={(v) => set('addresses', v)} />
        <Chips
          label="חשבונות בנק"
          hint="לזיהוי מסמכים שהופקו על ידינו"
          values={p.bankAccounts}
          onChange={(v) => set('bankAccounts', v)}
          ltr
        />
      </div>

      {msg && (
        <p
          role="status"
          className={`mt-4 rounded-lg px-3 py-2 text-sm ${
            msg.ok ? 'bg-ok-soft text-ok' : 'bg-danger-soft text-danger'
          }`}
        >
          {msg.text}
        </p>
      )}

      <button
        onClick={save}
        disabled={busy || p.legalName.trim().length < 2}
        className="mt-4 rounded-xl bg-action px-5 py-2.5 font-bold text-white disabled:opacity-45"
      >
        {busy ? 'שומר…' : 'שמירה'}
      </button>
    </div>
  )
}

function Text({
  label,
  value,
  onChange,
  numeric,
  wide,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  numeric?: boolean
  wide?: boolean
}) {
  const id = `bp-${label}`
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="mb-1 block text-xs font-semibold text-muted">
        {label}
      </label>
      <input
        id={id}
        value={value}
        inputMode={numeric ? 'numeric' : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border border-line bg-raised px-3 py-2 outline-none focus:border-action ${
          numeric ? 'num text-left' : ''
        }`}
      />
    </div>
  )
}

/** רשימת ערכים קצרים. Enter מוסיף, × מסיר. */
function Chips({
  label,
  hint,
  values,
  onChange,
  ltr,
}: {
  label: string
  hint?: string
  values: string[]
  onChange: (v: string[]) => void
  ltr?: boolean
}) {
  const [draft, setDraft] = useState('')
  const add = () => {
    const v = draft.trim()
    if (!v || values.includes(v)) return
    onChange([...values, v])
    setDraft('')
  }

  return (
    <div className="sm:col-span-2">
      <label className="mb-1 block text-xs font-semibold text-muted">
        {label}
        {hint && <span className="font-normal text-faint"> · {hint}</span>}
      </label>
      <div className="flex flex-wrap items-center gap-2">
        {values.map((v) => (
          <span
            key={v}
            className="flex items-center gap-1.5 rounded-full bg-raised px-3 py-1 text-xs"
            dir={ltr ? 'ltr' : undefined}
          >
            {v}
            <button
              aria-label={`הסרת ${v}`}
              onClick={() => onChange(values.filter((x) => x !== v))}
              className="font-bold text-muted hover:text-danger"
            >
              ×
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              add()
            }
          }}
          dir={ltr ? 'ltr' : undefined}
          placeholder="הוספה…"
          className="min-h-8 rounded-lg border border-line bg-raised px-3 text-xs outline-none focus:border-action"
        />
        <button onClick={add} className="text-xs font-semibold text-action">
          הוספה
        </button>
      </div>
    </div>
  )
}
