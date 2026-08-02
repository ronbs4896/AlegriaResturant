'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { withBase } from '@/lib/url'

/**
 * הרצה מרוכזת של כל המסמכים שנכשלו בחילוץ. מופיע רק כשיש כאלה.
 * העיבוד רץ ברקע בשרת; הרענון אחרי כמה שניות מציג את מה שהספיק.
 */
export default function RetryFailedButton({ count }: { count: number }) {
  const router = useRouter()
  const [state, setState] = useState<'idle' | 'busy' | 'started'>('idle')

  async function run() {
    setState('busy')
    try {
      const res = await fetch(withBase('/api/extract'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scope: 'failed' }),
      })
      if (!res.ok) {
        setState('idle')
        return
      }
      setState('started')
      // ריצה של מסמך אחת אורכת עשרות שניות; רענון ראשון אחרי חצי
      // דקה כבר מראה תוצאות ראשונות.
      setTimeout(() => router.refresh(), 30_000)
    } catch {
      setState('idle')
    }
  }

  if (state === 'started') {
    return (
      <p className="mb-4 rounded-xl border border-line bg-raised px-4 py-3 text-sm text-muted">
        החילוץ רץ ברקע על {count} מסמכים. העמוד יתרענן בעוד רגע.
      </p>
    )
  }

  return (
    <button
      onClick={run}
      disabled={state === 'busy'}
      className="mb-4 w-full rounded-xl border border-warn/25 bg-warn-soft px-4 py-3 text-sm font-semibold text-warn disabled:opacity-45 sm:w-auto"
    >
      {state === 'busy' ? 'מפעיל…' : `הרצת חילוץ מחדש ל-${count} מסמכים שנכשלו`}
    </button>
  )
}
