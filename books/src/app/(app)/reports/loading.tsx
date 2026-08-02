export default function ReportsLoading() {
  return (
    <div aria-busy="true" aria-label="טוען">
      <div className="mb-5 h-7 w-40 animate-pulse rounded-lg bg-raised" />
      <div className="mb-6 h-10 w-72 animate-pulse rounded-xl bg-raised" />
      <div className="grid gap-4 xl:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-52 animate-pulse rounded-2xl border border-line bg-raised" />
        ))}
      </div>
    </div>
  )
}
