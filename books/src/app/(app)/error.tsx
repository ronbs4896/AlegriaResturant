'use client'

export default function AppError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="rounded-2xl border border-danger/25 bg-danger-soft px-6 py-12 text-center">
      <p className="font-bold text-danger">משהו השתבש בטעינת העמוד</p>
      <p className="mt-1 text-sm text-muted">אם זה חוזר על עצמו, בדקו את יומני השרת.</p>
      <button
        onClick={reset}
        className="mt-5 rounded-xl border border-line bg-surface px-5 py-2.5 font-semibold"
      >
        נסו שוב
      </button>
    </div>
  )
}
