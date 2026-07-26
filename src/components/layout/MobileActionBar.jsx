import { Phone, MessageCircle } from 'lucide-react'
import { site } from '../../data/site.js'
import { buildWaLink } from '../../lib/whatsapp.js'
import { trackContact } from '../../lib/analytics.js'

// ============================================================
//  רצועת פעולה תחתונה — מובייל בלבד.
//  המחקר: sticky CTA מנצח ~29% מהבדיקות במובייל מול ~15% בדסקטופ,
//  ו-57% מדרג ההנהלה מעדיפים שיחת טלפון. לכן שתי הפעולות במקביל
//  ובמשקל שווה — לא כפתור אחד ולא תפריט.
//  בדסקטופ הרצועה מוסתרת ו-FloatingWhatsApp ממשיך לשרת.
// ============================================================
export default function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-charcoal-950/95 backdrop-blur-md sm:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-2 gap-2 p-2.5">
        <a
          href={`tel:${site.phone.dial}`}
          onClick={() => trackContact('phone', { source: 'mobile_bar' })}
          className="flex items-center justify-center gap-2 rounded-xl bg-orange px-4 py-3 font-bold text-white"
        >
          <Phone size={18} /> חייגו אלינו
        </a>
        <a
          href={buildWaLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContact('whatsapp', { source: 'mobile_bar' })}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-bold text-white"
        >
          <MessageCircle size={18} /> וואטסאפ
        </a>
      </div>
    </div>
  )
}
