'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'
import type { NavItem } from './Sidebar'

/**
 * סרגל תחתון למובייל: שני פריטים מכל צד, והעלאה — הפעולה
 * המרכזית של מי שעומד עם קבלה ביד — כפתור מורם באמצע, בהישג
 * אגודל. מה שלא נכנס יושב מאחורי "עוד".
 */
export default function BottomTabs({
  items,
  moreItems,
  email,
}: {
  items: NavItem[]
  moreItems: NavItem[]
  email: string
}) {
  const pathname = usePathname()
  const [moreOpen, setMoreOpen] = useState(false)

  const first = items.slice(0, 2)
  const rest = items.slice(2)
  const overflow = [...rest.slice(1), ...moreItems]
  const third = rest[0]

  const tab = (item: NavItem) => {
    const active = pathname === item.href || pathname.startsWith(item.href + '/')
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? 'page' : undefined}
        className={`relative flex min-h-12 flex-col items-center justify-center text-xs ${
          active ? 'font-bold text-action' : 'font-semibold text-muted'
        }`}
      >
        {item.label}
        {typeof item.badge === 'number' && item.badge > 0 && (
          <span className="num absolute top-1 end-3 rounded-full bg-warn px-1.5 text-[10px] font-bold text-white">
            {item.badge}
          </span>
        )}
      </Link>
    )
  }

  return (
    <>
      {moreOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink/30 lg:hidden"
          onClick={() => setMoreOpen(false)}
          aria-hidden
        />
      )}
      {moreOpen && (
        <div
          role="dialog"
          aria-label="עוד"
          className="fixed inset-x-0 bottom-0 z-40 rounded-t-2xl border-t border-line bg-surface p-4 pb-[calc(1rem+56px+env(safe-area-inset-bottom))] lg:hidden"
        >
          <ul className="space-y-1">
            {overflow.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-3 font-semibold hover:bg-raised"
                >
                  <span>{item.label}</span>
                  {typeof item.badge === 'number' && item.badge > 0 && (
                    <span className="num rounded-full bg-warn-soft px-2 py-0.5 text-xs font-bold text-warn">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
            <span className="truncate text-xs text-faint" dir="ltr">
              {email}
            </span>
            <LogoutButton />
          </div>
        </div>
      )}

      <nav
        aria-label="ניווט תחתון"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
      >
        <div className="grid grid-cols-5">
          {first.map(tab)}
          <Link
            href="/upload"
            aria-label="העלאת מסמך"
            className="flex items-center justify-center"
          >
            <span className="-mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-action text-2xl font-bold text-white shadow-md">
              +
            </span>
          </Link>
          {third ? tab(third) : <span />}
          {overflow.length > 0 ? (
            <button
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              className="flex min-h-12 flex-col items-center justify-center text-xs font-semibold text-muted"
            >
              עוד
            </button>
          ) : (
            <span />
          )}
        </div>
      </nav>
    </>
  )
}
