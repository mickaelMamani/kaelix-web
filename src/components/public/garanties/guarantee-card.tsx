import type { LucideIcon } from "lucide-react"

interface GuaranteeCardProps {
  icon: LucideIcon
  title: string
  commitment: string
  description: string
}

export function GuaranteeCard({
  icon: Icon,
  title,
  commitment,
  description,
}: GuaranteeCardProps) {
  return (
    <div className="group rounded-xl border bg-card p-6 transition-shadow hover:shadow-md">
      {/* Icon in colored circle */}
      <div className="flex size-12 items-center justify-center rounded-full bg-kaelix-blue/10">
        <Icon className="size-6 text-kaelix-blue" />
      </div>

      {/* Title */}
      <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
        {title}
      </h3>

      {/* Commitment (bold highlight) */}
      <p className="mt-2 text-sm font-bold text-kaelix-blue">
        {commitment}
      </p>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
