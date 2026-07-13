import { useState, useMemo } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Container from '../ui/Container.jsx'
import Img from '../ui/Img.jsx'
import { gallery, galleryCategories } from '../../data/gallery.js'

export default function GalleryGrid() {
  const [filter, setFilter] = useState('all')
  const [index, setIndex] = useState(-1)

  const items = useMemo(
    () => (filter === 'all' ? gallery : gallery.filter((g) => g.cat === filter)),
    [filter]
  )
  const slides = items.map((g) => ({ src: g.src, alt: g.alt }))

  // מציגים רק קטגוריות שיש בהן תמונות (אין טאבים ריקים)
  const visibleCategories = galleryCategories.filter(
    (c) => c.key === 'all' || gallery.some((g) => g.cat === c.key)
  )

  return (
    <section className="bg-cream py-16 sm:py-20">
      <Container>
        {/* טאבים לסינון — רק אם יש יותר מקטגוריה אחת בפועל */}
        {visibleCategories.length > 2 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {visibleCategories.map((c) => (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
                filter === c.key
                  ? 'bg-orange text-white shadow-ribbon'
                  : 'bg-cream-50 text-charcoal hover:bg-cream-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        )}

        {items.length === 0 ? (
          <p className="py-16 text-center text-charcoal-soft">בקרוב — תמונות נוספות בקטגוריה זו.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {items.map((g, i) => (
              <button
                key={g.src + i}
                onClick={() => setIndex(i)}
                className="group overflow-hidden rounded-2xl focus-visible:outline-orange"
                aria-label={`הגדלת תמונה: ${g.alt}`}
              >
                <Img
                  src={g.src}
                  alt={g.alt}
                  ratio="1/1"
                  rounded="rounded-2xl"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        )}

        <Lightbox
          open={index >= 0}
          index={Math.max(index, 0)}
          close={() => setIndex(-1)}
          slides={slides}
          controller={{ closeOnBackdropClick: true }}
        />
      </Container>
    </section>
  )
}
