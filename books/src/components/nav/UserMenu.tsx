'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { withBase } from '@/lib/url'

const ROLE_LABEL: Record<string, string> = {
  admin: 'מנהל',
  uploader: 'מעלה מסמכים',
}

/** ראשי התיבות של הכתובת — זהות קצרה בלי תמונת פרופיל. */
function initials(email: string): string {
  const name = email.split('@')[0] ?? ''
  const parts = name.split(/[._-]/).filter(Boolean)
  const letters = parts.length >= 2 ? [parts[0]![0], parts[1]![0]] : [name[0], name[1]]
  return letters.filter(Boolean).join('').toUpperCase()
}

/**
 * מי מחובר, ובאיזו הרשאה. ההרשאה מוצגת ולא מוסתרת: מי שרואה
 * "מעלה מסמכים" מבין למה אין לו כפתור אישור, במקום לחשוב שמשהו
 * שבור.
 */
export default function UserMenu({ email, role }: { email: string; role: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onEsc)
    }
  }, [open])

  async function logout() {
    await fetch(withBase('/api/auth/logout'), { method: 'POST' }).catch(() => {})
    window.location.href = withBase('/login')
  }

  return (
    <div ref={ref} className="relative">
      {open && (
        <div
          role="menu"
          className="absolute bottom-full mb-2 w-full overflow-hidden rounded-xl border border-line bg-surface shadow-lg"
        >
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            role="menuitem"
            className="block px-4 py-2.5 text-sm font-semibold hover:bg-raised"
          >
            הפרופיל שלי
          </Link>
          {role === 'admin' && (
            <Link
              href="/users"
              onClick={() => setOpen(false)}
              role="menuitem"
              className="block px-4 py-2.5 text-sm font-semibold hover:bg-raised"
            >
              ניהול משתמשים
            </Link>
          )}
          <button
            onClick={logout}
            role="menuitem"
            className="block w-full border-t border-line px-4 py-2.5 text-start text-sm font-semibold text-danger hover:bg-danger-soft"
          >
            יציאה
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-start transition-colors hover:bg-raised"
      >
        <span className="num flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-steel-soft text-xs font-bold text-steel">
          {initials(email)}
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-xs font-semibold" dir="ltr">
            {email}
          </span>
          <span className="block text-xs text-faint">{ROLE_LABEL[role] ?? role}</span>
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={`h-4 w-4 shrink-0 text-faint transition-transform duration-150 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </div>
  )
}
