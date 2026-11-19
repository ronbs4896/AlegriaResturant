// ============================================================
//  אייקון קו מהעיצוב: path אחד, viewBox 48x48, קו בלבד.
//  דקורטיבי תמיד — המשמעות נמסרת בטקסט שלצידו.
// ============================================================
export default function LineIcon({ d, size = 46, strokeWidth = 1.6, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={d} />
    </svg>
  )
}
