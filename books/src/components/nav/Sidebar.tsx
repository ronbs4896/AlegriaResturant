'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Brand from './Brand'
import UploadButton from './UploadButton'
import UserMenu from './UserMenu'

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
export default function Sidebar({
  items,
  email,
  role,
}: {
  items: NavItem[]
  email: string
  role: string
}) {
  const pathname = usePathname()

  return (
    <aside className="sticky top-0 hidden h-dvh flex-col border-s border-line bg-surface lg:flex">
      <div className="px-4 pt-5 pb-4">
        <Link
          href="/dashboard"
          className="block rounded-xl px-1 py-1 transition-colors hover:bg-raised"
        >
          <Brand />
        </Link>
      </div>

      <div className="px-4 pb-3">
        <UploadButton />
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
                  className={`group relative flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors duration-150 ${
                    active
                      ? 'bg-action-soft font-bold text-action'
                      : 'font-semibold text-muted hover:bg-raised hover:text-ink'
                  }`}
                >
                  {/* פס הפעיל: סימון מיקום שקורא מהר יותר מצבע לבד */}
                  <span
                    aria-hidden
                    className={`absolute inset-y-1.5 -start-3 w-1 rounded-full bg-action transition-opacity duration-150 ${
                      active ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
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

      <div className="border-t border-line p-3">
        <UserMenu email={email} role={role} />
      </div>
    </aside>
  )
}
