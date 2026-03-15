import {
  WidgetSkeleton,
  TableRowSkeleton,
} from "@/components/shared/loading-skeleton"

export default function AdminBillingLoading() {
  return (
    <div className="space-y-6">
      {/* Page header skeleton */}
      <div className="mb-8">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-72 animate-pulse rounded bg-muted" />
      </div>

      {/* KPI cards skeleton */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <WidgetSkeleton key={i} />
        ))}
      </div>

      {/* Invoices table skeleton */}
      <div className="rounded-lg border p-6">
        <div className="flex items-center gap-4 border-b pb-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 flex-1 animate-pulse rounded bg-muted" />
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRowSkeleton key={i} columns={6} />
        ))}
      </div>
    </div>
  )
}
