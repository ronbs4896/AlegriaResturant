// אדים עולים — סימן החיים היחיד באתר שאינו תמונה.
// שלושה קווים באותה לולאה בהיסט זמן, מכבד prefers-reduced-motion
// (ב-reduce האנימציה מבוטלת והקווים נשארים דהויים וסטטיים).
export default function Steam({ size = 34, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path className="animate-steam opacity-40 motion-reduce:animate-none" d="M18 36c-3-4 3-6 0-10s3-6 0-10" />
      <path className="animate-steam opacity-40 motion-reduce:animate-none [animation-delay:0.9s]" d="M24 36c-3-4 3-6 0-10s3-6 0-10" />
      <path className="animate-steam opacity-40 motion-reduce:animate-none [animation-delay:1.8s]" d="M30 36c-3-4 3-6 0-10s3-6 0-10" />
    </svg>
  )
}
