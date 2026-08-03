'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Brand from './Brand'
import UploadButton from './UploadButton'
import UserMenu from './UserMenu'
import { Icons, type IconName } from './icons'

export interface NavItem {
  href: string
  label: string
  icon: IconName
  /** מספר שמוצג ליד הפריט — תור הבדיקה. 0 לא מוצג. */
  badge?: number
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

/**
 * הסיידבר של הדסקטופ. הפריטים מקובצים ולא רשימה שטוחה: אחת-עשרה
 * שורות ברצף הן קיר, ואותן שורות בארבע קבוצות נסרקות במבט.
 */
export default function Sidebar({
  groups,
  email,
  role,
}: {
  groups: NavGroup[]
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

      <nav className="min-h-0 flex-1 overflow-y-auto px-3 pb-2" aria-label="ניווט ראשי">
        {groups.map((group) => (
          <div key={group.title} className="mb-3 last:mb-0">
            <h2 className="px-3 pb-1 text-[11px] font-bold tracking-wide text-faint">
              {group.title}
            </h2>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(item.href + '/')
                const Icon = Icons[item.icon]
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors duration-150 ${
                        active
                          ? 'bg-action-soft font-bold text-action'
                          : 'font-semibold text-muted hover:bg-raised hover:text-ink'
                      }`}
                    >
                      {/* פס הפעיל: מיקום נקרא מהר יותר מצבע לבד */}
                      <span
                        aria-hidden
                        className={`absolute inset-y-1.5 -start-3 w-1 rounded-full bg-action transition-opacity duration-150 ${
                          active ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                      <Icon />
                      <span className="min-w-0 flex-1 truncate">{item.label}</span>
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
          </div>
        ))}
      </nav>

      <div className="border-t border-line p-3">
        <UserMenu email={email} role={role} />
      </div>
    </aside>
  )
}
