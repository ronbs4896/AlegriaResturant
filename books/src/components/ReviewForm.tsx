'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DOC_TYPES, EXPENSE_CATEGORIES } from '@/lib/constants'
import type { ValidationFlag } from '@/lib/validate'

interface Fields {
  docType: string | null
  supplierName: string | null
  supplierTaxId: string | null
  recipientName: string | null
  recipientTaxId: string | null
  docNumber: string | null
  docDate: string | null
  netAmount: string | null
  vatAmount: string | null
  totalAmount: string | null
  allocationNumber: string | null
  paymentMethod: string | null
  expenseCategory: string | null
}

const NUMERIC = new Set(['netAmount', 'vatAmount', 'totalAmount'])

export default function ReviewForm({
  id,
  initial,
  flags: initialFlags,
}: {
  id: string
  initial: Fields
  flags: ValidationFlag[]
}) {
  const router = useRouter()
  const [f, setF] = useState<Fields>(initial)
  const [flags, setFlags] = useState(initialFlags)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (k: keyof Fields, v: string) =>
    setF((prev) => ({ ...prev, [k]: v === '' ? null : v }))

  async function submit(status: 'approved' | 'rejected' | 'not_expense') {
    setBusy(true)
    setError(null)

    const fields: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(f)) {
      fields[k] = NUMERIC.has(k) ? (v == null || v === '' ? null : Number(v)) : v
    }

    try {
      const res = await fetch('/api/documents', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, fields }),
      })
      const data = await res.json()

      if (res.status === 409) {
        // אישור נחסם כי נשאר דגל חוסם. מציגים בדיוק מה חוסם.
        setFlags(data.flags ?? [])
        setError('אי אפשר לאשר עדיין — יש שדה שצריך תיקון.')
        return
      }
      if (!res.ok) {
        setError('השמירה נכשלה.')
        return
      }
      router.push('/review')
      router.refresh()
    } catch {
      setError('אין חיבור לשרת.')
    } finally {
      setBusy(false)
    }
  }

  const errors = flags.filter((x) => x.level === 'error')
  const warns = flags.filter((x) => x.level === 'warn')

  return (
    <div>
      {errors.length > 0 && (
        <ul className="mb-4 space-y-1.5 rounded-xl border border-danger/25 bg-danger-soft p-4">
          {errors.map((x) => (
            <li key={x.code} className="text-sm text-danger">
              {x.message}
            </li>
          ))}
        </ul>
      )}
      {warns.length > 0 && (
        <ul className="mb-4 space-y-1.5 rounded-xl border border-warn/25 bg-warn-soft p-4">
          {warns.map((x) => (
            <li key={x.code} className="text-sm text-warn">
              {x.message}
            </li>
          ))}
        </ul>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Select
          name="docType"
          label="סוג מסמך"
          value={f.docType}
          onChange={(v) => set('docType', v)}
          options={Object.entries(DOC_TYPES).map(([k, v]) => [k, v.he])}
        />
        <Field name="docDate" label="תאריך" value={f.docDate} onChange={(v) => set('docDate', v)} type="date" />
        <Field name="supplierName" label="שם הספק" value={f.supplierName} onChange={(v) => set('supplierName', v)} wide />
        <Field name="supplierTaxId" label="ח.פ. הספק" value={f.supplierTaxId} onChange={(v) => set('supplierTaxId', v)} numeric />
        <Field name="docNumber" label="מספר מסמך" value={f.docNumber} onChange={(v) => set('docNumber', v)} numeric />
        <Field name="recipientName" label="על שם" value={f.recipientName} onChange={(v) => set('recipientName', v)} />
        <Field name="recipientTaxId" label="ח.פ. הנמען" value={f.recipientTaxId} onChange={(v) => set('recipientTaxId', v)} numeric />
        <Field name="netAmount" label="לפני מע״מ" value={f.netAmount} onChange={(v) => set('netAmount', v)} numeric />
        <Field name="vatAmount" label="מע״מ" value={f.vatAmount} onChange={(v) => set('vatAmount', v)} numeric />
        <Field name="totalAmount" label="סה״כ" value={f.totalAmount} onChange={(v) => set('totalAmount', v)} numeric />
        <Field
          name="allocationNumber"
          label="מספר הקצאה"
          value={f.allocationNumber}
          onChange={(v) => set('allocationNumber', v)}
          numeric
          hint="9 ספרות"
        />
        <Field name="paymentMethod" label="אמצעי תשלום" value={f.paymentMethod} onChange={(v) => set('paymentMethod', v)} />
        <Select
          name="expenseCategory"
          label="קטגוריה"
          value={f.expenseCategory}
          onChange={(v) => set('expenseCategory', v)}
          options={Object.entries(EXPENSE_CATEGORIES).map(([k, v]) => [k, v.he])}
          wide
        />
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => submit('approved')}
          disabled={busy}
          className="flex-1 rounded-xl bg-action px-5 py-3 font-bold text-white disabled:opacity-45"
        >
          {busy ? 'שומר…' : 'אישור'}
        </button>
        <button
          onClick={() => submit('not_expense')}
          disabled={busy}
          className="rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold"
        >
          לא הוצאה
        </button>
        <button
          onClick={() => submit('rejected')}
          disabled={busy}
          className="rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold text-danger"
        >
          דחייה
        </button>
      </div>
    </div>
  )
}

function Field({
  name,
  label,
  value,
  onChange,
  type = 'text',
  numeric,
  wide,
  hint,
}: {
  name: string
  label: string
  value: string | null
  onChange: (v: string) => void
  type?: string
  numeric?: boolean
  wide?: boolean
  hint?: string
}) {
  const id = `f-${name}`
  return (
    <div className={wide ? 'col-span-2' : ''}>
      <label htmlFor={id} className="mb-1 block text-xs font-semibold text-muted">
        {label}
        {hint && <span className="font-normal text-faint"> · {hint}</span>}
      </label>
      <input
        id={id}
        type={type}
        inputMode={numeric ? 'decimal' : undefined}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border border-line bg-raised px-3 py-2 outline-none focus:border-action ${
          numeric ? 'num text-left' : ''
        }`}
      />
    </div>
  )
}

function Select({
  name,
  label,
  value,
  onChange,
  options,
  wide,
}: {
  name: string
  label: string
  value: string | null
  onChange: (v: string) => void
  options: [string, string][]
  wide?: boolean
}) {
  const id = `s-${name}`
  return (
    <div className={wide ? 'col-span-2' : ''}>
      <label htmlFor={id} className="mb-1 block text-xs font-semibold text-muted">
        {label}
      </label>
      <select
        id={id}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-line bg-raised px-3 py-2 outline-none focus:border-action"
      >
        <option value="">— לא נקבע —</option>
        {options.map(([k, he]) => (
          <option key={k} value={k}>
            {he}
          </option>
        ))}
      </select>
    </div>
  )
}
