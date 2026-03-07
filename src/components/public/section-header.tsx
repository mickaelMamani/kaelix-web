import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  label?: string
  title: string
  description?: string
  centered?: boolean
}

export function SectionHeader({
  label,
  title,
  description,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl space-y-3", centered && "mx-auto text-center")}>
      {label && (
        <p className="text-sm font-semibold uppercase tracking-wider text-kaelix-blue">
          {label}
        </p>
      )}
      <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
