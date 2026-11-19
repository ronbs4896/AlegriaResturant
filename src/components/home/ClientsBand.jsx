import SectionHeading from '../brand/SectionHeading.jsx'
import Marquee from '../brand/Marquee.jsx'
import LineIcon from '../brand/LineIcon.jsx'
import { clients } from '../../data/clients.js'
import { clientsBand } from '../../data/home.js'

// ============================================================
//  רצועת הלקוחות. מוצגת רק כשיש לקוחות אמיתיים ב-clients.js —
//  בעיצוב יש כאן "[לוגו לקוח 1]", ושמות ממולאים היו המצאה.
// ============================================================
const factoryIcon = 'M6 42V20l10 6v-6l10 6V12l16 8v22zM6 42h36'

export default function ClientsBand() {
  if (!clients.length) return null

  return (
    <section aria-labelledby="clients-title" className="py-16 lg:pb-20 lg:pt-[72px]">
      <SectionHeading id="clients-title" title={clientsBand.title} subtitle={clientsBand.subtitle} className="shell" />
      <div className="mt-9">
        <Marquee
          label="הלקוחות שלנו"
          items={clients}
          getKey={(c) => c.name}
          renderItem={(c) => (
            <div className="flex h-[104px] w-[210px] items-center justify-center gap-2.5 rounded-[18px] border border-olive-100 bg-white px-4 text-charcoal-600">
              {c.logo ? (
                <img src={c.logo} alt={c.name} className="max-h-14 max-w-[160px] object-contain" />
              ) : (
                <>
                  <LineIcon d={factoryIcon} size={30} strokeWidth={2} />
                  <span className="text-[15px] font-extrabold tracking-[0.02em]">{c.name}</span>
                </>
              )}
            </div>
          )}
        />
      </div>
    </section>
  )
}
