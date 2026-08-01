import UploadPanel from '@/components/UploadPanel'

export const metadata = { title: 'העלאת מסמך' }

export default function UploadPage() {
  return (
    <div>
      <h1 className="text-xl font-bold">העלאת מסמך</h1>
      <p className="mt-1 mb-6 text-sm text-muted">
        חשבונית או קבלה של הוצאה. אפשר לצלם עכשיו או לבחור קובץ קיים.
      </p>
      <UploadPanel />
    </div>
  )
}
