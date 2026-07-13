import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Container from '../ui/Container.jsx'
import { faq } from '../../data/faq.js'

export default function FAQAccordion({ items = faq }) {
  const [open, setOpen] = useState(0)
  return (
    <Container className="max-w-3xl py-4">
      <div className="space-y-3">
        {items.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={i} className="overflow-hidden rounded-2xl border-2 border-charcoal/10 bg-cream-50">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
              >
                <span className="text-lg font-black text-charcoal">{item.q}</span>
                <ChevronDown
                  size={22}
                  className={`shrink-0 text-orange transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
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
            </div>
          )
        })}
      </div>
    </Container>
  )
}
