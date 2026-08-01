// ============================================================
//  סט איורים בקו אחד — שכבת החום שלא תלויה בתקציב צילום.
//  עד היום כל החום באתר הגיע ממקור אחד, צילומי המנות, ולכן
//  כל מקום בלי תמונה נשאר קר. האיורים יורשים צבע מההקשר
//  (currentColor), ולכן אותו איור עובד על קרם ועל כהה.
//  ניטרלי ל-RTL: אין כאן טקסט ואין כיווניות.
// ============================================================
const ART = {
  // סיר עם ידיות — הבישול עצמו
  pot: (
    <>
      <path d="M10 22h28v10a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6V22Z" />
      <path d="M7 22h34" />
      <path d="M10 26H6.5a2 2 0 0 1 0-4H10" />
      <path d="M38 26h3.5a2 2 0 0 0 0-4H38" />
    </>
  ),
  // אדים — "חם עכשיו"
  steam: (
    <>
      <path d="M18 36c-3-4 3-6 0-10s3-6 0-10" />
      <path d="M24 36c-3-4 3-6 0-10s3-6 0-10" />
      <path d="M30 36c-3-4 3-6 0-10s3-6 0-10" />
    </>
  ),
  // מגש הגשה — אירועים
  tray: (
    <>
      <path d="M8 34h32" />
      <path d="M12 34a12 12 0 0 1 24 0" />
      <path d="M24 22v-3" />
      <circle cx="24" cy="17.5" r="1.8" />
    </>
  ),
  // משאית — האספקה היומית
  truck: (
    <>
      <path d="M26 14H8a2 2 0 0 0-2 2v14h20V14Z" />
      <path d="M26 20h7l5 5v5H26v-10Z" />
      <circle cx="13" cy="34" r="3" />
      <circle cx="31" cy="34" r="3" />
    </>
  ),
  // שיבולת — חומרי גלם, מפריד סקשנים
  wheat: (
    <>
      <path d="M24 40V14" />
      <path d="M24 24c0-4-3-7-7-7 0 4 3 7 7 7Z" />
      <path d="M24 24c0-4 3-7 7-7 0 4-3 7-7 7Z" />
      <path d="M24 32c0-4-3-7-7-7 0 4 3 7 7 7Z" />
      <path d="M24 32c0-4 3-7 7-7 0 4-3 7-7 7Z" />
    </>
  ),
  // שעון — שעת האספקה, הדדליין
  clock: (
    <>
      <circle cx="24" cy="24" r="15" />
      <path d="M24 14.5V24l6.5 4" />
    </>
  ),
}

export const artNames = Object.keys(ART)

export default function Illustration({ name, size = 24, strokeWidth = 2, className = '' }) {
  const art = ART[name]
  if (!art) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {art}
    </svg>
  )
}
