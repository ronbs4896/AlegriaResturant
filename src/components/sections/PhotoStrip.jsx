// פס תמונות רץ — מחליף את מרקיז הטקסט. גלילה אוטומטית איטית,
// נעצר ב-hover, מכבד prefers-reduced-motion. RTL-safe (אנימציה פיזית).
// מוכן לקלוט תמונות נוספות: פשוט להוסיף ל-STRIP.
const STRIP = [
  { src: '/images/dishes/alegria-spread.jpg', alt: 'מגש אירוח של אלגריה' },
  { src: '/images/dishes/friday.jpg', alt: 'ארוחת שישי' },
  { src: '/images/catering/factory-catering.jpg', alt: 'הסעדה למפעלים' },
  { src: '/images/catering/event.jpg', alt: 'קייטרינג לאירוע' },
  { src: '/images/ambience/kitchen.jpg', alt: 'המטבח בקרית גת' },
  { src: '/images/ambience/team.jpg', alt: 'הצוות' },
]

const FALLBACK = '/images/dishes/alegria-spread.jpg'

export default function PhotoStrip() {
  const row = [...STRIP, ...STRIP] // שכפול x2 ללופ חלק (translateX -50%)
  return (
    <section className="overflow-hidden border-y border-charcoal/10 bg-charcoal-950 py-3" aria-hidden="true">
      <div
        className="no-scrollbar flex w-max gap-3 animate-marquee hover:[animation-play-state:paused]"
        style={{ direction: 'ltr', animationDuration: '48s' }}
      >
        {row.map((img, i) => (
          <div key={i} className="h-40 w-60 shrink-0 overflow-hidden rounded-xl sm:h-48 sm:w-72">
            <img
              src={img.src}
              onError={(e) => { e.currentTarget.src = FALLBACK }}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
