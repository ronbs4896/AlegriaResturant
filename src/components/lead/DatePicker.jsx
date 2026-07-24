import { useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'

// יומן RTL מודרני לבחירת תאריך — עתידי בלבד (ממחר והלאה), בלי תלויות.
const MONTHS = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר']
const WEEKDAYS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש']

const startOfDay = (d) => {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

export default function DatePicker({ value, onChange }) {
  const today = startOfDay(new Date())
  const minDate = startOfDay(new Date())
  minDate.setDate(minDate.getDate() + 1) // מחר — אי אפשר לבחור היום או תאריך שעבר
  const selected = value ? startOfDay(value) : null

  const [view, setView] = useState(() => {
    const base = selected || minDate
    return { y: base.getFullYear(), m: base.getMonth() }
  })

  const firstWeekday = new Date(view.y, view.m, 1).getDay()
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate()
  const canPrev = new Date(view.y, view.m, 1) > new Date(today.getFullYear(), today.getMonth(), 1)

  const shift = (delta) => {
    const d = new Date(view.y, view.m + delta, 1)
    setView({ y: d.getFullYear(), m: d.getMonth() })
  }

  const cells = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const isDisabled = (d) => new Date(view.y, view.m, d) < minDate
  const isSelected = (d) =>
    selected && selected.getFullYear() === view.y && selected.getMonth() === view.m && selected.getDate() === d

  return (
    <div dir="rtl" className="rounded-2xl border border-charcoal/15 bg-white p-4 shadow-warm">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => shift(-1)}
          disabled={!canPrev}
          aria-label="חודש קודם"
          className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-cream-200 disabled:opacity-25 disabled:hover:bg-transparent"
        >
          <ChevronRight size={18} />
        </button>
        <span className="font-black text-charcoal">
          {MONTHS[view.m]} {view.y}
        </span>
        <button
          type="button"
          onClick={() => shift(1)}
          aria-label="חודש הבא"
          className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-cream-200"
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-charcoal-soft">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((d, i) =>
          d === null ? (
            <div key={`e${i}`} />
          ) : (
            <button
              key={d}
              type="button"
              disabled={isDisabled(d)}
              onClick={() => onChange(new Date(view.y, view.m, d))}
              className={`aspect-square rounded-lg text-sm font-bold transition-colors ${
                isSelected(d)
                  ? 'bg-orange text-white shadow-ribbon'
                  : isDisabled(d)
                    ? 'cursor-not-allowed text-charcoal/25'
                    : 'text-charcoal hover:bg-cream-200'
              }`}
            >
              {d}
            </button>
          )
        )}
      </div>
    </div>
  )
}
