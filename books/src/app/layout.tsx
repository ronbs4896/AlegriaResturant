import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'חשבוניות · קייטרינג אלגריה',
  description: 'מערכת פנימית לאיסוף מסמכי הוצאה',
  robots: { index: false, follow: false },
  // metadata לא מקבל את basePath אוטומטית, לכן הנתיב מפורש.
  manifest: `${process.env.BASE_PATH ?? ''}/manifest.webmanifest`,
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#23201d',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
