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
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
          <Link href="/documents" className="font-bold">
            חשבוניות
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <Link href="/documents" className="rounded-lg px-3 py-1.5 hover:bg-raised">
              מסמכים
            </Link>
            <Link href="/upload" className="rounded-lg px-3 py-1.5 hover:bg-raised">
              העלאה
            </Link>
            {user.role === 'admin' && (
              <Link href="/review" className="rounded-lg px-3 py-1.5 hover:bg-raised">
                בדיקה
              </Link>
            )}
          </nav>
          <div className="ms-auto flex items-center gap-3">
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
