'use client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  return (
    <button
      onClick={async () => {
        await fetch('/api/auth/logout', { method: 'POST' })
        router.push('/login')
        router.refresh()
      }}
      className="rounded-lg border border-line px-3 py-1.5 text-xs text-muted hover:bg-raised"
    >
      יציאה
    </button>
  )
}
