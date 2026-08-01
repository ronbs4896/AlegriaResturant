'use client'

import { useState } from 'react'

// ============================================================
//  תצוגת המסמך במסך הבדיקה.
//  קבלה מקומטת מצולמת בטלפון דורשת זום — בלעדיו אי אפשר לקרוא
//  מספר הקצאה בן 9 ספרות מתחתית הדף.
// ============================================================
export default function DocumentViewer({
  url,
  mime,
  alt,
}: {
  url: string
  mime: string
  alt: string
}) {
  const [zoom, setZoom] = useState(1)

  if (mime === 'application/pdf') {
    return (
      <iframe
        src={url}
        title={alt}
        className="h-[70vh] w-full rounded-xl border border-line bg-surface"
      />
    )
  }

  return (
    <div className="rounded-xl border border-line bg-surface">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <button
          onClick={() => setZoom((z) => Math.max(1, z - 0.5))}
          disabled={zoom <= 1}
          aria-label="הקטנה"
          className="rounded-lg border border-line px-3 py-1 text-sm disabled:opacity-40"
        >
          −
        </button>
        <span className="num text-xs text-muted">{Math.round(zoom * 100)}%</span>
        <button
          onClick={() => setZoom((z) => Math.min(4, z + 0.5))}
          disabled={zoom >= 4}
          aria-label="הגדלה"
          className="rounded-lg border border-line px-3 py-1 text-sm disabled:opacity-40"
        >
          +
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="ms-auto text-xs text-action underline underline-offset-4"
        >
          פתיחה בחלון נפרד
        </a>
      </div>
      <div className="h-[60vh] overflow-auto p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={alt}
          style={{ width: `${zoom * 100}%` }}
          className="mx-auto block max-w-none rounded-lg"
        />
      </div>
    </div>
  )
}
