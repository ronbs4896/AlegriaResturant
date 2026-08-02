import { redirect } from 'next/navigation'
import { eq, sql } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { currentUser } from '@/lib/session'
import Sidebar, { type NavItem } from '@/components/nav/Sidebar'
import BottomTabs from '@/components/nav/BottomTabs'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser()
  if (!user) redirect('/login')

  // תג אחד משרת את הסיידבר ואת הסרגל התחתון: כמה מחכה לבדיקה.
  let reviewCount = 0
  if (user.role === 'admin') {
    const db = await getDb()
    const rows = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.documents)
      .where(eq(schema.documents.status, 'review'))
    reviewCount = Number(rows[0]?.count ?? 0)
  }

  const items: NavItem[] = [
    { href: '/dashboard', label: 'דשבורד' },
    { href: '/documents', label: 'מסמכים' },
    ...(user.role === 'admin'
      ? [
          { href: '/review', label: 'בדיקה', badge: reviewCount },
          { href: '/suppliers', label: 'ספקים' },
          { href: '/customers', label: 'לקוחות' },
          { href: '/reports', label: 'דוחות וייצוא' },
          { href: '/settings', label: 'הגדרות' },
        ]
      : []),
  ]

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[232px_minmax(0,1fr)]">
      <Sidebar items={items} email={user.email} />

      <div className="flex min-h-dvh flex-col">
        {/* מובייל: סרגל עליון דק לזהות בלבד; הניווט למטה */}
        <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="font-bold">
              אלגריה <span className="text-xs font-semibold text-muted">· הנהלת חשבונות</span>
            </span>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 pb-[calc(88px+env(safe-area-inset-bottom))] lg:px-8 lg:py-8 lg:pb-8">
          {children}
        </main>
      </div>

      <BottomTabs
        items={items}
        moreItems={[]}
        email={user.email}
      />
    </div>
  )
}
