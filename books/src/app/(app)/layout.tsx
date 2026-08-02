import Link from 'next/link'

import { redirect } from 'next/navigation'
import { currentUser } from '@/lib/session'
import LogoutButton from '@/components/LogoutButton'
import MobileCta from '@/components/MobileCta'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser()
  if (!user) redirect('/login')

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur">
        {/* חמישה פריטים ויציאה לא נכנסים ל-390px. הניווט מקבל
            גלילה משלו, כדי שהעמוד עצמו לעולם לא יזוז לצדדים. */}
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-3 sm:gap-4">
          <Link href="/documents" className="shrink-0 font-bold">
            חשבוניות
          </Link>
          <nav className="-mx-1 flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto px-1 text-sm [scrollbar-width:none] sm:gap-1 [&::-webkit-scrollbar]:hidden">
            <Link href="/documents" className="shrink-0 rounded-lg px-2 py-1.5 hover:bg-raised sm:px-3">
              מסמכים
            </Link>
            <Link href="/upload" className="shrink-0 rounded-lg px-2 py-1.5 hover:bg-raised sm:px-3">
              העלאה
            </Link>
            {user.role === 'admin' && (
              <>
                <Link href="/review" className="shrink-0 rounded-lg px-2 py-1.5 hover:bg-raised sm:px-3">
                  בדיקה
                </Link>
                <Link href="/exports" className="shrink-0 rounded-lg px-2 py-1.5 hover:bg-raised sm:px-3">
                  ייצוא
                </Link>
              </>
            )}
          </nav>
          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden text-xs text-faint sm:inline" dir="ltr">
              {user.email}
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 pb-24 sm:pb-6">{children}</main>

      <MobileCta />
    </div>
  )
}
