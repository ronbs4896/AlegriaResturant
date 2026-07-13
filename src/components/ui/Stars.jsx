import { Star } from 'lucide-react'

export default function Stars({ rating = 5, size = 18, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`דירוג ${rating} מתוך 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? 'fill-honey text-honey' : 'text-charcoal/20'}
        />
      ))}
    </div>
  )
}
