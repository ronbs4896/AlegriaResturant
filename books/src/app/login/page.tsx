'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Stage = 'email' | 'code'

export default function LoginPage() {
  const router = useRouter()
  const [stage, setStage] = useState<Stage>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [devCode, setDevCode] = useState<string | null>(null)
  const codeRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (stage === 'code') codeRef.current?.focus()
  }, [stage])

  async function requestCode(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError('שליחת הקוד נכשלה. נסו שוב בעוד רגע.')
        return
      }
      if (data.devCode) setDevCode(data.devCode)
      setStage('code')
    } catch {
      setError('אין חיבור לשרת.')
    } finally {
      setBusy(false)
    }
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      })
      if (res.ok) {
        router.push('/documents')
        router.refresh()
        return
      }
      const data = await res.json().catch(() => ({}))
      setError(
        data.error === 'too_many_attempts'
          ? 'יותר מדי ניסיונות. בקשו קוד חדש.'
          : 'הקוד שגוי או שפג תוקפו.',
      )
      setCode('')
      codeRef.current?.focus()
    } catch {
      setError('אין חיבור לשרת.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center p-5">
      <div className="w-full max-w-sm">
        <div className="mb-7">
          <p className="text-xs tracking-wide text-faint">קייטרינג אלגריה</p>
          <h1 className="mt-1 text-2xl font-bold">מערכת חשבוניות</h1>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6">
          {stage === 'email' ? (
            <form onSubmit={requestCode}>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                כתובת המייל שלך
              </label>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-line bg-raised px-4 py-3 text-left outline-none focus:border-action"
                placeholder="you@alegriacatering.co.il"
              />
              <p className="mt-2 text-xs text-muted">
                נשלח קוד בן 6 ספרות. רק כתובות מאושרות מקבלות גישה.
              </p>
              <button
                type="submit"
                disabled={busy || !email}
                className="mt-5 w-full rounded-xl bg-action px-4 py-3 font-bold text-white disabled:opacity-45"
              >
                {busy ? 'שולח…' : 'שלחו לי קוד'}
              </button>
            </form>
          ) : (
            <form onSubmit={verify}>
              <label htmlFor="code" className="mb-2 block text-sm font-semibold">
                הקוד שנשלח אל {email}
              </label>
              <input
                id="code"
                ref={codeRef}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="\d{6}"
                maxLength={6}
                required
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="num w-full rounded-xl border border-line bg-raised px-4 py-3 text-center text-3xl font-bold tracking-[0.35em] outline-none focus:border-action"
                placeholder="000000"
              />
              {devCode && (
                <p className="mt-2 rounded-lg bg-warn-soft px-3 py-2 text-xs text-warn">
                  מצב פיתוח, אין חיבור למייל. הקוד: <span className="num font-bold">{devCode}</span>
                </p>
              )}
              <button
                type="submit"
                disabled={busy || code.length !== 6}
                className="mt-5 w-full rounded-xl bg-action px-4 py-3 font-bold text-white disabled:opacity-45"
              >
                {busy ? 'בודק…' : 'כניסה'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStage('email')
                  setCode('')
                  setError(null)
                }}
                className="mt-3 w-full py-2 text-sm text-muted underline underline-offset-4"
              >
                כתובת אחרת
              </button>
            </form>
          )}

          {error && (
            <p role="alert" className="mt-4 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
              {error}
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
