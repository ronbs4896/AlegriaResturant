// סקשן עם ריווח נדיב ותמיכה בטונים (cream / charcoal / warm)
const tones = {
  cream: 'bg-cream text-charcoal',
  white: 'bg-cream-50 text-charcoal',
  charcoal: 'bg-charcoal-950 text-cream',
  orange: 'bg-orange text-white',
}

export default function Section({ tone = 'cream', className = '', children, id }) {
  return (
    <section id={id} className={`relative py-14 sm:py-20 lg:py-28 ${tones[tone]} ${className}`}>
      {children}
    </section>
  )
}
