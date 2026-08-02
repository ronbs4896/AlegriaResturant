export default function DocumentsLoading() {
  return (
    <div aria-busy="true" aria-label="טוען">
      <div className="mb-4 h-7 w-44 animate-pulse rounded-lg bg-raised" />
      <div className="mb-4 h-10 w-full animate-pulse rounded-xl bg-raised sm:w-72" />
      <div className="space-y-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl border border-line bg-raised" />
        ))}
      </div>
    </div>
  )
}
