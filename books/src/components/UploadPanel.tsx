'use client'

import { useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

// ============================================================
//  הקטנת התמונה רצה ב-Web Worker.
//  על תמונה של 12 מגה-פיקסל הפעולה תוקעת את המסך לשנייה-שתיים
//  אם היא רצה בתהליך הראשי, וזה בדיוק הרגע שבו המשתמש עומד
//  במחסן ומצלם.
//
//  imageOrientation:'from-image' קורא את כיוון ה-EXIF ומיישר.
//  בלי זה כל קבלה שנייה מגיעה שוכבת, והחילוץ קורא אותה גרוע.
// ============================================================
const WORKER_SRC = `
self.onmessage = async (e) => {
  const { buffer, type, maxEdge, quality } = e.data
  try {
    const src = new Blob([buffer], { type })
    const bmp = await createImageBitmap(src, { imageOrientation: 'from-image' })
    const scale = Math.min(1, maxEdge / Math.max(bmp.width, bmp.height))
    const w = Math.max(1, Math.round(bmp.width * scale))
    const h = Math.max(1, Math.round(bmp.height * scale))
    const canvas = new OffscreenCanvas(w, h)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(bmp, 0, 0, w, h)
    bmp.close()
    const out = await canvas.convertToBlob({ type: 'image/jpeg', quality })
    const ab = await out.arrayBuffer()
    self.postMessage({ ok: true, buffer: ab, width: w, height: h }, [ab])
  } catch (err) {
    self.postMessage({ ok: false, error: String(err) })
  }
}
`

const MAX_EDGE = 2000
const QUALITY = 0.8
const MAX_BYTES = 4 * 1024 * 1024

async function downscale(file: File): Promise<File> {
  // PDF וקבצים שאינם תמונה עוברים כמו שהם.
  if (!file.type.startsWith('image/')) return file
  if (typeof Worker === 'undefined' || typeof OffscreenCanvas === 'undefined') return file

  const buffer = await file.arrayBuffer()
  const url = URL.createObjectURL(new Blob([WORKER_SRC], { type: 'text/javascript' }))
  const worker = new Worker(url)

  try {
    const result = await new Promise<{ ok: boolean; buffer?: ArrayBuffer; error?: string }>(
      (resolve) => {
        worker.onmessage = (e) => resolve(e.data)
        worker.onerror = () => resolve({ ok: false, error: 'worker_error' })
        worker.postMessage({ buffer, type: file.type, maxEdge: MAX_EDGE, quality: QUALITY }, [buffer])
      },
    )
    if (!result.ok || !result.buffer) return file
    const name = file.name.replace(/\.[^.]+$/, '') + '.jpg'
    return new File([result.buffer], name, { type: 'image/jpeg' })
  } finally {
    worker.terminate()
    URL.revokeObjectURL(url)
  }
}

type ItemState = 'working' | 'done' | 'duplicate' | 'error'
interface Item {
  key: string
  name: string
  state: ItemState
  detail?: string
  before?: number
  after?: number
}

const kb = (n: number) => `${Math.round(n / 1024)} KB`

export default function UploadPanel() {
  const router = useRouter()
  const [items, setItems] = useState<Item[]>([])
  const cameraRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)

  const handle = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return
      const batch = Array.from(files)

      setItems((prev) => [
        ...batch.map((f, i) => ({
          key: `${Date.now()}-${i}-${f.name}`,
          name: f.name || 'צילום',
          state: 'working' as ItemState,
          before: f.size,
        })),
        ...prev,
      ])

      for (const [i, original] of batch.entries()) {
        const key = `${items.length}-${i}`
        try {
          const file = await downscale(original)

          if (file.size > MAX_BYTES) {
            patch(original, {
              state: 'error',
              detail: 'הקובץ גדול מ-4MB. שלחו אותו במייל במקום.',
            })
            continue
          }

          const form = new FormData()
          form.append('file', file)
          const res = await fetch('/api/documents', { method: 'POST', body: form })
          const data = await res.json().catch(() => ({}))

          if (!res.ok) {
            patch(original, { state: 'error', detail: errorText(data.error) })
            continue
          }
          patch(original, {
            state: data.duplicate ? 'duplicate' : 'done',
            after: file.size,
            detail: data.duplicate ? 'המסמך הזה כבר קיים במערכת' : undefined,
          })
        } catch {
          patch(original, { state: 'error', detail: 'ההעלאה נכשלה. נסו שוב.' })
        }
        void key
      }
      router.refresh()
    },
    [items.length, router],
  )

  function patch(file: File, update: Partial<Item>) {
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.name === (file.name || 'צילום') && it.state === 'working')
      if (idx === -1) return prev
      const next = [...prev]
      const target = next[idx]
      if (target) next[idx] = { ...target, ...update }
      return next
    })
  }

  return (
    <div>
      {/* שני כפתורים ולא אחד: באנדרואיד capture פותח את המצלמה
          ומסתיר את הגלריה, וחצי מהקבלות כבר מצולמות שם. */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          onClick={() => cameraRef.current?.click()}
          className="rounded-2xl bg-action px-5 py-6 text-lg font-bold text-white"
        >
          צלמו קבלה
        </button>
        <button
          onClick={() => galleryRef.current?.click()}
          className="rounded-2xl border border-line bg-surface px-5 py-6 text-lg font-bold"
        >
          מהגלריה או מהמחשב
        </button>
      </div>

      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        hidden
        onChange={(e) => {
          void handle(e.target.files)
          e.target.value = ''
        }}
      />
      <input
        ref={galleryRef}
        type="file"
        accept="image/*,application/pdf"
        multiple
        hidden
        onChange={(e) => {
          void handle(e.target.files)
          e.target.value = ''
        }}
      />

      <p className="mt-3 text-xs text-muted">
        התמונה מוקטנת במכשיר לפני השליחה, כך שאפשר לצלם גם ברשת סלולרית איטית.
        אותה קבלה שתצולם פעמיים לא תיספר פעמיים.
      </p>

      {items.length > 0 && (
        <ul className="mt-6 space-y-2">
          {items.map((it) => (
            <li
              key={it.key}
              className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3"
            >
              <StateDot state={it.state} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{it.name}</div>
                <div className="text-xs text-muted">
                  {it.detail ? (
                    it.detail
                  ) : it.state === 'done' && it.before && it.after ? (
                    <>
                      {'נשמר · '}
                      {/* מחרוזת מעורבת ספרות ולטינית חייבת בידוד, אחרת
                          RTL מפזר אותה: "KB → 32 KB 234" */}
                      <span className="num">{`${kb(it.before)} → ${kb(it.after)}`}</span>
                    </>
                  ) : it.state === 'working' ? (
                    'מעבד…'
                  ) : (
                    'נשמר'
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function StateDot({ state }: { state: ItemState }) {
  const map: Record<ItemState, { cls: string; label: string }> = {
    working: { cls: 'bg-faint animate-pulse', label: 'מעבד' },
    done: { cls: 'bg-ok', label: 'נשמר' },
    duplicate: { cls: 'bg-steel', label: 'כפילות' },
    error: { cls: 'bg-danger', label: 'שגיאה' },
  }
  const s = map[state]
  return <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${s.cls}`} aria-label={s.label} />
}

function errorText(code: unknown): string {
  switch (code) {
    case 'unsupported_type':
      return 'סוג קובץ לא נתמך. מותר PDF או תמונה.'
    case 'too_large':
      return 'הקובץ גדול מדי. שלחו אותו במייל במקום.'
    case 'too_small':
      return 'הקובץ קטן מדי מכדי להיות מסמך.'
    default:
      return 'ההעלאה נכשלה. נסו שוב.'
  }
}
