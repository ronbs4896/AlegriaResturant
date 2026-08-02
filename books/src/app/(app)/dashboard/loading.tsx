export default function DashboardLoading() {
  return (
    <div aria-busy="true" aria-label="טוען">
      <div className="mb-6 h-7 w-40 animate-pulse rounded-lg bg-raised" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl border border-line bg-raised" />
        ))}
      </div>
      <div className="mt-6 h-56 animate-pulse rounded-2xl border border-line bg-raised" />
    </div>
  )
}
