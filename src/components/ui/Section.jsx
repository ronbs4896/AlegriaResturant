// ============================================================
//  Section — מקור אמת יחיד לריווח אנכי ולרקע.
//  לפני: 13 וריאציות ריווח מפוזרות בקוד. עכשיו: שלוש מידות מוצהרות.
//  כל סקשן באתר עובר דרך כאן. אין py- ידני בסקשנים.
// ============================================================
const tones = {
  cream: 'bg-cream text-charcoal', //        הרקע הבסיסי
  raised: 'bg-cream-50 text-charcoal', //    משטח מוגבה (כרטיסים/רשימות)
  dark: 'bg-charcoal-950 text-cream', //     "פרק" — לשימוש נדיר ומכוון
}

const sizes = {
  sm: 'py-10 sm:py-14', //                   רצועות דקות (פס אמון)
  md: 'py-14 sm:py-20', //                   ברירת מחדל
  lg: 'py-16 sm:py-24 lg:py-32', //          רגעים גדולים (B2B, סגירה)
}

export default function Section({
  tone = 'cream',
  size = 'md',
  className = '',
  children,
  id,
  ...rest
}) {
  return (
    <section
      id={id}
      className={`relative ${sizes[size] || sizes.md} ${tones[tone] || tones.cream} ${className}`}
      {...rest}
    >
      {children}
    </section>
  )
}
