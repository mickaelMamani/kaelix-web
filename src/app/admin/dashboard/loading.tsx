import {
  WidgetSkeleton,
  TableRowSkeleton,
} from "@/components/shared/loading-skeleton"

export default function AdminDashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Page header skeleton */}
      <div className="mb-8">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-72 animate-pulse rounded bg-muted" />
      </div>

      {/* KPI cards skeleton */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <WidgetSkeleton key={i} />
        ))}
      </div>

      {/* Pending projects skeleton */}
      <div className="rounded-xl border p-6">
        <div className="mb-4 h-5 w-40 animate-pulse rounded bg-muted" />
        {Array.from({ length: 3 }).map((_, i) => (
          <TableRowSkeleton key={`pending-${i}`} columns={4} />
        ))}
      </div>

      {/* Active projects table skeleton */}
      <div className="rounded-xl border p-6">
        <div className="mb-4 h-5 w-36 animate-pulse rounded bg-muted" />
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRowSkeleton key={`active-${i}`} columns={6} />
        ))}
      </div>

      {/* Recent invoices table skeleton */}
      <div className="rounded-xl border p-6">
        <div className="mb-4 h-5 w-36 animate-pulse rounded bg-muted" />
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRowSkeleton key={`invoice-${i}`} columns={5} />
        ))}
      </div>
    </div>
  )
}
