'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'

export interface NavItem {
  href: string
  label: string
  /** מספר שמוצג ליד הפריט — תור הבדיקה. 0 לא מוצג. */
  badge?: number
}

/**
 * הסיידבר של הדסקטופ. במובייל הניווט עובר לסרגל תחתון —
 * לא מקטינים את אותו רכיב, בונים לכל גודל את הצורה שלו.
 */
export default function Sidebar({ items, email }: { items: NavItem[]; email: string }) {
  const pathname = usePathname()

  return (
    <aside className="sticky top-0 hidden h-dvh flex-col border-s border-line bg-surface lg:flex">
      <div className="px-5 pt-6 pb-4">
        <Link href="/dashboard" className="block">
          <span className="block text-lg font-bold">אלגריה</span>
          <span className="block text-xs text-muted">הנהלת חשבונות</span>
        </Link>
      </div>

      <div className="px-4 pb-2">
        <Link
          href="/upload"
          className="block rounded-xl bg-action px-4 py-3 text-center font-bold text-white"
        >
          העלאת מסמך
        </Link>
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-2" aria-label="ניווט ראשי">
        <ul className="space-y-0.5">
          {items.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm ${
                    active
                      ? 'bg-action-soft font-bold text-action'
                      : 'font-semibold text-muted hover:bg-raised hover:text-ink'
                  }`}
                >
                  <span>{item.label}</span>
                  {typeof item.badge === 'number' && item.badge > 0 && (
                    <span className="num rounded-full bg-warn-soft px-2 py-0.5 text-xs font-bold text-warn">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-line px-5 py-4">
        <div className="mb-2 truncate text-xs text-faint" dir="ltr">
          {email}
        </div>
        <LogoutButton />
      </div>
    </aside>
  )
}
