import { useState, useRef, useEffect, useId } from 'react'
import { cities } from '../../data/cities.js'

// תיבת בחירת עיר עם סינון תוך-כדי-הקלדה, ניווט מקלדת, וקלט חופשי.
export default function CityCombobox({ value, onChange, label = 'עיר' }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  const listId = useId()

  const q = (value || '').trim()
  const matches = q
    ? cities
        .filter((c) => c.startsWith(q))
        .concat(cities.filter((c) => c.includes(q) && !c.startsWith(q)))
        .slice(0, 6)
    : cities.slice(0, 6)

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const pick = (city) => {
    onChange(city)
    setOpen(false)
  }

  const onKey = (e) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) { setOpen(true); return }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, matches.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
    else if (e.key === 'Enter' && open && matches[active]) { e.preventDefault(); pick(matches[active]) }
    else if (e.key === 'Escape') { setOpen(false) }
  }

  return (
    <div className="relative" ref={ref}>
      <label className="mb-1.5 block text-sm font-bold text-charcoal">{label}</label>
      <input
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        autoComplete="off"
        value={value || ''}
        onChange={(e) => { onChange(e.target.value); setOpen(true); setActive(0) }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKey}
        placeholder="הקלד/י עיר…"
        className="w-full rounded-lg border border-charcoal/20 bg-white px-4 py-3 text-charcoal outline-none focus:border-orange"
      />
      {open && matches.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-charcoal/15 bg-white shadow-warm"
        >
          {matches.map((city, i) => (
            <li
              key={city}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => { e.preventDefault(); pick(city) }}
              className={`cursor-pointer px-4 py-2.5 text-charcoal ${
                i === active ? 'bg-cream-200' : 'hover:bg-cream-100'
              }`}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
