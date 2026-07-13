import { MessageCircle } from 'lucide-react'
import { buildWaLink } from '../../lib/whatsapp.js'

// כפתור וואטסאפ צף — נגיש בכל עמוד.
export default function FloatingWhatsApp() {
  return (
    <a
      href={buildWaLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="שליחת הודעת וואטסאפ"
      className="fixed bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-warm-lg transition-transform hover:scale-110 inset-inline-start-5"
      style={{ insetInlineStart: '1.25rem' }}
    >
      <MessageCircle size={28} className="fill-white/10" />
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-20" />
    </a>
  )
}
