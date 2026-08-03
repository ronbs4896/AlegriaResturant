'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * הפעולה המרכזית של המערכת. מקבלת משקל ויזואלי שמתאים לזה:
 * אייקון, טקסט משנה, ומשוב מגע (הרמה קלה ולחיצה שמשקיעה).
 * ב-/upload עצמו היא נרגעת — כבר הגעת.
 */
export default function UploadButton() {
  const pathname = usePathname()
  const here = pathname.startsWith('/upload')

  return (
    <Link
      href="/upload"
      aria-current={here ? 'page' : undefined}
      className={`group flex items-center gap-3 rounded-xl px-4 py-3 font-bold transition-all duration-150 ${
        here
          ? 'border border-action/30 bg-action-soft text-action'
          : 'bg-action text-white shadow-sm hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-sm'
      }`}
    >
      <CameraIcon />
      <span className="leading-tight">
        <span className="block text-sm">העלאת מסמך</span>
        <span
          className={`block text-xs font-semibold ${here ? 'text-action/70' : 'text-white/75'}`}
        >
          צילום או קובץ
        </span>
      </span>
    </Link>
  )
}

function CameraIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0 transition-transform duration-150 group-hover:scale-110"
      aria-hidden
    >
      <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.2-1.8A1 1 0 0 1 9.5 4.7h5a1 1 0 0 1 .8.5L16.5 7h2A1.5 1.5 0 0 1 20 8.5v8A1.5 1.5 0 0 1 18.5 18h-13A1.5 1.5 0 0 1 4 16.5z" />
      <circle cx="12" cy="12.2" r="3.1" />
    </svg>
  )
}
