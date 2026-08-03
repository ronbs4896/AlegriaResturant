import Link from 'next/link'
import { redirect } from 'next/navigation'
import { eq, sql } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { currentUser } from '@/lib/session'
import Sidebar, { type NavGroup, type NavItem } from '@/components/nav/Sidebar'
import BottomTabs from '@/components/nav/BottomTabs'
import Brand from '@/components/nav/Brand'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser()
  if (!user) redirect('/login')

  const admin = user.role === 'admin'

  // תג אחד משרת את הסיידבר ואת הסרגל התחתון: כמה מחכה לבדיקה.
  let reviewCount = 0
  if (admin) {
    const db = await getDb()
    const rows = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.documents)
      .where(eq(schema.documents.status, 'review'))
    reviewCount = Number(rows[0]?.count ?? 0)
  }

  // ארבע קבוצות במקום רשימה שטוחה — כל קבוצה עונה על שאלה אחרת:
  // מה קורה · מה נכנס · איפה הכסף · מי ומה מוגדר.
  const groups: NavGroup[] = [
    {
      title: 'בקרה',
      items: [{ href: '/dashboard', label: 'מרכז בקרה', icon: 'control' }],
    },
    {
      title: 'תנועה',
      items: [
        { href: '/documents', label: 'מסמכים', icon: 'documents' },
        ...(admin
          ? [{ href: '/review', label: 'בדיקה', icon: 'review' as const, badge: reviewCount }]
          : []),
      ],
    },
    ...(admin
      ? [
          {
            title: 'ספר',
            items: [
              { href: '/suppliers', label: 'ספקים', icon: 'suppliers' as const },
              { href: '/customers', label: 'לקוחות', icon: 'customers' as const },
              { href: '/reports', label: 'דוחות וייצוא', icon: 'reports' as const },
            ],
          },
          {
            title: 'מערכת',
            items: [
              { href: '/users', label: 'משתמשים', icon: 'users' as const },
              { href: '/settings', label: 'הגדרות', icon: 'settings' as const },
            ],
          },
        ]
      : []),
  ]

  // ארבעה יעדים בסרגל התחתון; השאר במגירת "עוד".
  const primary: NavItem[] = [
    { href: '/dashboard', label: 'בקרה', icon: 'control' },
    { href: '/documents', label: 'מסמכים', icon: 'documents' },
    ...(admin
      ? [{ href: '/review', label: 'בדיקה', icon: 'review' as const, badge: reviewCount }]
      : [{ href: '/profile', label: 'פרופיל', icon: 'users' as const }]),
  ]

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[232px_minmax(0,1fr)]">
      <Sidebar groups={groups} email={user.email} role={user.role} />

      <div className="flex min-h-dvh flex-col">
        {/* מובייל: סרגל עליון עם הלוגו והפרופיל; הניווט למטה */}
        <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-3 px-4 py-2.5">
            <Link href="/dashboard">
              <Brand size="sm" />
            </Link>
            <Link
              href="/profile"
              aria-label="הפרופיל שלי"
              className="num flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-steel-soft text-xs font-bold text-steel"
            >
              {user.email.slice(0, 2).toUpperCase()}
            </Link>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 pb-[calc(96px+env(safe-area-inset-bottom))] lg:px-8 lg:py-8 lg:pb-8">
          {children}
        </main>
      </div>

      <BottomTabs primary={primary} groups={groups} email={user.email} />
    </div>
  )
}
