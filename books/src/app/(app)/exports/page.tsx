import { redirect } from 'next/navigation'

// הייצוא החודשי עבר לעמוד הדוחות. הקישורים הישנים ממשיכים לעבוד.
export default function ExportsPage() {
  redirect('/reports')
}
