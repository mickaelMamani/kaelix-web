import { Skeleton } from "@/components/ui/skeleton"
import { TableRowSkeleton } from "@/components/shared/loading-skeleton"

export default function ProjectsLoading() {
  return (
    <div>
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="mt-2 h-4 w-56" />
          </div>
          <Skeleton className="h-8 w-40" />
        </div>
      </div>

      {/* Table skeleton */}
      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center gap-4 border-b pb-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <TableRowSkeleton key={i} columns={6} />
        ))}
      </div>
    </div>
  )
}
