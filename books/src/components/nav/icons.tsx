// ============================================================
//  אייקוני הניווט. סט אחד, קו יחיד, currentColor — בלי תלות
//  בספריית אייקונים.
//
//  חמישה-עשר פריטי טקסט נסרקים לאט; אותם פריטים עם סמל של 18px
//  נמצאים במבט. זו הסיבה היחידה שהם כאן.
// ============================================================

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

const cls = 'h-[18px] w-[18px] shrink-0'

export const Icons = {
  control: () => (
    <svg {...base} className={cls}>
      <path d="M3 12h4l3-8 4 16 3-8h4" />
    </svg>
  ),
  documents: () => (
    <svg {...base} className={cls}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  ),
  review: () => (
    <svg {...base} className={cls}>
      <path d="M9 11l2 2 4-4" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  cashflow: () => (
    <svg {...base} className={cls}>
      <path d="M4 18V9M10 18v-6M16 18v-9M20 18V6" />
      <path d="M3 21h18" />
    </svg>
  ),
  bank: () => (
    <svg {...base} className={cls}>
      <path d="M3 10 12 4l9 6" />
      <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18" />
    </svg>
  ),
  reports: () => (
    <svg {...base} className={cls}>
      <path d="M4 4v16h16" />
      <path d="M8 15l3-4 3 2 4-6" />
    </svg>
  ),
  suppliers: () => (
    <svg {...base} className={cls}>
      <path d="M3 8h13v9H3zM16 11h3l2 3v3h-5" />
      <circle cx="7" cy="18.5" r="1.6" />
      <circle cx="17.5" cy="18.5" r="1.6" />
    </svg>
  ),
  customers: () => (
    <svg {...base} className={cls}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 11.2a3 3 0 0 0 0-5.9M17 19a5 5 0 0 0-2.2-3.6" />
    </svg>
  ),
  users: () => (
    <svg {...base} className={cls}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 19.5a7 7 0 0 1 14 0" />
    </svg>
  ),
  settings: () => (
    <svg {...base} className={cls}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7.9 19.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3 15.4H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 7.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3h.1A1.6 1.6 0 0 0 10.3 3V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8v.1a1.6 1.6 0 0 0 1.5 1h.1a2 2 0 1 1 0 4H21a1.6 1.6 0 0 0-1.5 1z" />
    </svg>
  ),
  upload: () => (
    <svg {...base} className={cls}>
      <path d="M12 16V4M8 8l4-4 4 4" />
      <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  ),
  more: () => (
    <svg {...base} className={cls}>
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
    </svg>
  ),
} as const

export type IconName = keyof typeof Icons
