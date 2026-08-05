// ============================================================
//  שלד טעינה. בצורת המסך האמיתי ולא פסים גנריים — שלד שנראה
//  כמו התוצאה הוא ההבדל בין "נטען" ל"נתקע".
// ============================================================

export function SkeletonBox({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-raised ${className}`} aria-hidden />
}

export function SkeletonPage({
  tiles = 0,
  rows = 0,
  chart = false,
}: {
  tiles?: number
  rows?: number
  chart?: boolean
}) {
  return (
    <div aria-busy="true" aria-label="טוען">
      <SkeletonBox className="mb-5 h-7 w-48" />

      {tiles > 0 && (
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {Array.from({ length: tiles }, (_, i) => (
            <SkeletonBox key={i} className="h-24 border border-line" />
          ))}
        </div>
      )}

      {chart && <SkeletonBox className="mt-4 h-56 border border-line" />}

      {rows > 0 && (
        <div className="mt-4 space-y-2">
          {Array.from({ length: rows }, (_, i) => (
            <SkeletonBox key={i} className="h-16 border border-line" />
          ))}
        </div>
      )}
    </div>
  )
}
