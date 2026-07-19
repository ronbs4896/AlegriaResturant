import { useState, useMemo } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Container from '../ui/Container.jsx'
import { faq, faqCategories } from '../../data/faq.js'

// אקורדיון שאלות עם טאבי קטגוריות (מפעלים / קייטרינג / שישי / כללי).
// withTabs=false + items — לרשימה שטוחה מותאמת.
export default function FAQAccordion({ items, withTabs = true, maxPerCategory }) {
  const [cat, setCat] = useState(faqCategories[0].key)
  const [open, setOpen] = useState(0)

  const list = useMemo(() => {
    if (items) return items
    if (!withTabs) return faq
    const filtered = faq.filter((f) => f.cat === cat)
    return maxPerCategory ? filtered.slice(0, maxPerCategory) : filtered
  }, [items, withTabs, cat, maxPerCategory])

  const pick = (key) => {
    setCat(key)
    setOpen(0) // פותחים את השאלה הראשונה בקטגוריה החדשה
  }

  return (
    <Container className="max-w-3xl py-4">
      {/* טאבי קטגוריות */}
      {withTabs && !items && (
        <div className="mb-7 flex flex-wrap justify-center gap-2">
          {faqCategories.map((c) => (
            <button
              key={c.key}
              onClick={() => pick(c.key)}
              aria-pressed={cat === c.key}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
                cat === c.key
                  ? 'bg-orange text-white shadow-ribbon'
                  : 'bg-cream-50 text-charcoal hover:bg-cream-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((item, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={item.q}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden rounded-2xl border-2 border-charcoal/10 bg-cream-50"
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
                >
                  <span className="text-lg font-black text-charcoal">{item.q}</span>
                  <ChevronDown
                    size={22}
                    className={`shrink-0 text-charcoal-soft transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <p className="px-6 pb-5 leading-relaxed text-charcoal-soft">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </Container>
  )
}
