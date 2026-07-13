import { useState } from 'react'

const DEFAULT_FALLBACK = '/images/dishes/alegria-spread.jpg'

// תמונה עם aspect-ratio קבוע (מניעת CLS), lazy-load, ו-fallback חכם
// אם המקור לא נמצא (למשל תמונה שעדיין לא הועלתה) — נופל לתמונת ברירת מחדל.
export default function Img({
  src,
  alt = '',
  ratio = '4/3',
  fallback = DEFAULT_FALLBACK,
  className = '',
  imgClassName = '',
  priority = false,
  rounded = 'rounded-2xl',
}) {
  const [loaded, setLoaded] = useState(false)
  const [current, setCurrent] = useState(src)

  return (
    <div
      className={`relative overflow-hidden bg-cream-300/50 ${rounded} ${className}`}
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
    </div>
  )
}
