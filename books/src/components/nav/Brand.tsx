import { BASE_PATH } from '@/lib/url'

/**
 * הלוגו האמיתי של העסק במקום טקסט. המערכת נראית שייכת לאלגריה
 * מהשנייה הראשונה, וגם מבדילה את עצמה מכל טאב אחר שפתוח.
 *
 * next/image לא בשימוש כאן בכוונה: הקובץ סטטי, קטן, ובגודל
 * קבוע — אופטימיזציה בזמן ריצה לא תוסיף לו דבר.
 */
export default function Brand({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const px = size === 'sm' ? 32 : 44
  return (
    <span className="flex items-center gap-2.5">
      <img
        src={`${BASE_PATH}/logo-mark.png`}
        alt=""
        width={px}
        height={px}
        className="shrink-0 rounded-lg object-contain"
        style={{ width: px, height: px }}
      />
      <span className="min-w-0 leading-tight">
        <span className="block truncate font-bold">אלגריה</span>
        <span className="block text-xs text-muted">הנהלת חשבונות</span>
      </span>
    </span>
  )
}
