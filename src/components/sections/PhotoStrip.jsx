// פס תמונות רץ — מחליף את מרקיז הטקסט. גלילה אוטומטית איטית,
// נעצר ב-hover, מכבד prefers-reduced-motion. RTL-safe (אנימציה פיזית).
// מוכן לקלוט תמונות נוספות: פשוט להוסיף ל-STRIP.
const STRIP = [
  { src: '/images/gallery/tagine-beef-couscous.jpg', alt: 'טאג׳ין בקר עם קוסקוס וחומוס' },
  { src: '/images/gallery/shabbat-chicken-olives.jpg', alt: 'עוף בזיתים עם חלה וסלטים' },
  { src: '/images/gallery/tagine-blue-beef.jpg', alt: 'טאג׳ין בקר עם ירקות' },
  { src: '/images/gallery/beef-chickpeas-matbucha.jpg', alt: 'בשר עם גרגרי חומוס ומטבוחה' },
  { src: '/images/gallery/tagine-couscous-orange.jpg', alt: 'טאג׳ין קוסקוס עם פירות יבשים' },
  { src: '/images/gallery/daily-lunch-plate.jpg', alt: 'מנת צהריים: בשר, אורז ושעועית ירוקה' },
  { src: '/images/gallery/glazed-chicken-rice.jpg', alt: 'עוף מזוגג עם אורז' },
  { src: '/images/gallery/tagine-blue-vegetables.jpg', alt: 'טאג׳ין ירקות עם קוסקוס' },
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
