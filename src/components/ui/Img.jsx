import { useState } from 'react'

const DEFAULT_FALLBACK = '/images/dishes/alegria-spread.jpg'

// ============================================================
//  תמונה עם aspect-ratio קבוע (מניעת CLS), lazy-load, ו-fallback
//  אם המקור לא נמצא (למשל תמונה שעדיין לא הועלתה).
//
//  frame="arch" — קשת עליונה במקום מלבן מעוגל. הצורה אומרת
//  שמישהו החליט, וזה מה שמבדיל תמונת מלאי מתמונה ממותגת.
//
//  caption + captionKicker — רצועת קשר בתחתית התמונה.
//  זו הדרך הזולה ביותר להפוך צילום מנה ל"ראיה תפעולית":
//  אותה תמונה עם 05:30 עליה מפסיקה להיות אוכל יפה.
// ============================================================
const frames = {
  default: 'rounded-2xl',
  arch: 'rounded-t-[14rem] rounded-b-2xl',
}

export default function Img({
  src,
  alt = '',
  ratio = '4/3',
  fallback = DEFAULT_FALLBACK,
  className = '',
  imgClassName = '',
  priority = false,
  rounded, //                 עוקף את frame כשצריך שליטה מלאה (למשל rounded-none)
  frame = 'default',
  caption,
  captionKicker,
}) {
  const [loaded, setLoaded] = useState(false)
  const [current, setCurrent] = useState(src)
  const shape = rounded ?? frames[frame] ?? frames.default

  return (
    <div
      className={`relative overflow-hidden bg-cream-300/50 ${shape} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <img
        src={current}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (current !== fallback) setCurrent(fallback)
        }}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal-950/90 to-transparent px-5 pb-4 pt-10 text-cream">
          {captionKicker && (
            <span className="stat-num block text-meta text-honey">{captionKicker}</span>
          )}
          <span className="text-meta font-bold">{caption}</span>
        </figcaption>
      )}
    </div>
  )
}
