import { MessageCircle } from 'lucide-react'
import { buildWaLink } from '../../lib/whatsapp.js'
import { trackContact } from '../../lib/analytics.js'

// כפתור וואטסאפ צף — נגיש בכל עמוד.
export default function FloatingWhatsApp() {
  return (
    <a
      href={buildWaLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="שליחת הודעת וואטסאפ"
      onClick={() => trackContact('whatsapp', { source: 'floating_button' })}
      // מוסתר במובייל — שם MobileActionBar משרת (טלפון + וואטסאפ), כדי לא לכפול
      className="fixed bottom-5 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-warm-lg transition-transform hover:scale-110 sm:flex"
      style={{ insetInlineStart: '1rem' }}
    >
      <MessageCircle size={24} className="fill-white/10 sm:hidden" />
      <MessageCircle size={28} className="hidden fill-white/10 sm:block" />
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-20" />
    </a>
  )
}
