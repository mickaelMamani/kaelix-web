import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const projectStatusConfig = {
  pending: { label: "En attente", variant: "outline" as const, className: "border-amber-500 text-amber-600" },
  discovery: { label: "Découverte", variant: "secondary" as const },
  proposal: { label: "Proposition", variant: "secondary" as const },
  design: { label: "Design", variant: "outline" as const },
  development: { label: "En développement", variant: "default" as const },
  review: { label: "En revue", variant: "outline" as const },
  launched: { label: "Lancé", variant: "default" as const, className: "bg-kaelix-green text-white hover:bg-kaelix-green/90" },
  maintenance: { label: "Maintenance", variant: "secondary" as const },
} as const

const invoiceStatusConfig = {
  draft: { label: "Brouillon", variant: "secondary" as const },
  open: { label: "En attente", variant: "outline" as const, className: "border-kaelix-blue text-kaelix-blue" },
  paid: { label: "Payée", variant: "default" as const, className: "bg-kaelix-green text-white hover:bg-kaelix-green/90" },
  void: { label: "Annulée", variant: "secondary" as const },
  uncollectible: { label: "Irrécouvrable", variant: "destructive" as const },
} as const

const deliverableStatusConfig = {
  pending: { label: "À venir", variant: "secondary" as const },
  in_progress: { label: "En cours", variant: "outline" as const, className: "border-kaelix-blue text-kaelix-blue" },
  completed: { label: "Terminé", variant: "default" as const, className: "bg-kaelix-green text-white hover:bg-kaelix-green/90" },
} as const

type ProjectStatus = keyof typeof projectStatusConfig
type InvoiceStatus = keyof typeof invoiceStatusConfig
type DeliverableStatus = keyof typeof deliverableStatusConfig

interface StatusBadgeProps {
  type: "project" | "invoice" | "deliverable"
  status: string
}

export function StatusBadge({ type, status }: StatusBadgeProps) {
  let config: { label: string; variant: "default" | "secondary" | "outline" | "destructive"; className?: string }

  switch (type) {
    case "project":
      config = projectStatusConfig[status as ProjectStatus] ?? { label: status, variant: "secondary" }
      break
    case "invoice":
      config = invoiceStatusConfig[status as InvoiceStatus] ?? { label: status, variant: "secondary" }
      break
    case "deliverable":
      config = deliverableStatusConfig[status as DeliverableStatus] ?? { label: status, variant: "secondary" }
      break
  }

  return (
    <Badge variant={config.variant} className={cn(config.className)}>
      {config.label}
    </Badge>
  )
}
