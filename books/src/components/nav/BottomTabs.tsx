'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'
import { Icons } from './icons'
import type { NavItem, NavGroup } from './Sidebar'

/**
 * סרגל תחתון למובייל: ארבעה יעדים והעלאה באמצע. חמש משבצות זה
 * המקסימום שאפשר ללחוץ עליו באגודל; כל השאר נכנס ל"עוד" שנפתח
 * כמגירה עם אותן קבוצות של הדסקטופ.
 */
export default function BottomTabs({
  primary,
  groups,
  email,
}: {
  /** ארבעת היעדים בסרגל עצמו */
  primary: NavItem[]
  /** הרשימה המלאה למגירת "עוד" */
  groups: NavGroup[]
  email: string
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // ניווט סוגר את המגירה — אחרת היא נשארת פתוחה מעל העמוד החדש
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [open])

  const tab = (item: NavItem) => {
    const active = pathname === item.href || pathname.startsWith(item.href + '/')
    const Icon = Icons[item.icon]
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? 'page' : undefined}
        className={`relative flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] transition-colors ${
          active ? 'font-bold text-action' : 'font-semibold text-muted'
        }`}
      >
        <Icon />
        {item.label}
        {typeof item.badge === 'number' && item.badge > 0 && (
          <span className="num absolute top-1.5 end-4 rounded-full bg-warn px-1.5 text-[10px] font-bold text-white">
            {item.badge}
          </span>
        )}
      </Link>
    )
  }

  return (
    <>
      {open && (
        <>
          <div
            className="fixed inset-0 z-30 bg-ink/30 lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-label="ניווט"
            className="fixed inset-x-0 bottom-0 z-40 max-h-[75dvh] overflow-y-auto rounded-t-2xl border-t border-line bg-surface p-4 pb-[calc(1rem+64px+env(safe-area-inset-bottom))] shadow-overlay lg:hidden"
          >
            {groups.map((g) => (
              <div key={g.title} className="mb-4 last:mb-0">
                <h2 className="mb-1 text-[11px] font-bold tracking-wide text-faint">{g.title}</h2>
                <ul className="grid grid-cols-2 gap-1.5">
                  {g.items.map((item) => {
                    const Icon = Icons[item.icon]
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="flex min-h-11 items-center gap-2.5 rounded-xl border border-line px-3 py-2 text-sm font-semibold transition-colors hover:bg-raised"
                        >
                          <Icon />
                          <span className="min-w-0 flex-1 truncate">{item.label}</span>
                          {typeof item.badge === 'number' && item.badge > 0 && (
                            <span className="num rounded-full bg-warn-soft px-1.5 text-xs font-bold text-warn">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
              <span className="truncate text-xs text-faint" dir="ltr">
                {email}
              </span>
              <LogoutButton />
            </div>
          </div>
        </>
      )}

      <nav
        aria-label="ניווט תחתון"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
      >
        <div className="grid grid-cols-5">
          {primary.slice(0, 2).map(tab)}

          <Link href="/upload" aria-label="העלאת מסמך" className="flex items-center justify-center">
            <span className="-mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-action text-white shadow-overlay">
              <Icons.upload />
            </span>
          </Link>

          {primary.slice(2, 3).map(tab)}

          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold text-muted"
          >
            <Icons.more />
            עוד
          </button>
        </div>
      </nav>
    </>
  )
}
