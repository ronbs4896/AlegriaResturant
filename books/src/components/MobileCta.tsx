'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// פעולה ראשית בהישג אגודל — אבל לא בעמוד ההעלאה עצמו, שם היא
// כפילות של הכפתור הגדול שכבר על המסך.
export default function MobileCta() {
  const pathname = usePathname()
  if (pathname === '/upload') return null
  return (
    <Link
      href="/upload"
      className="fixed inset-x-4 bottom-4 z-20 flex items-center justify-center gap-2 rounded-2xl bg-action px-5 py-4 font-bold text-white shadow-lg sm:hidden"
    >
      צלמו קבלה
    </Link>
  )
}
