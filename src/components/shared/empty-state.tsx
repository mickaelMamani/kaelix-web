import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}

export function EmptyState({ icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      {actionLabel && actionHref && (
        <Button nativeButton={false} render={<Link href={actionHref} />} className="mt-6">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
