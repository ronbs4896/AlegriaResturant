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
      className="fixed bottom-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-warm-lg transition-transform hover:scale-110 sm:bottom-5 sm:h-14 sm:w-14"
      style={{ insetInlineStart: '1rem' }}
    >
      <MessageCircle size={24} className="fill-white/10 sm:hidden" />
      <MessageCircle size={28} className="hidden fill-white/10 sm:block" />
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-20" />
    </a>
  )
}
