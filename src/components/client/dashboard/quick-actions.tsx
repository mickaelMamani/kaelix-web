import Link from "next/link"
import { Headset, FolderOpen, CreditCard } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const actions = [
  {
    label: "Contacter le support",
    description: "Besoin d'aide ? Notre équipe est là pour vous.",
    href: "/support",
    icon: Headset,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    label: "Mes projets",
    description: "Consultez la progression de vos projets.",
    href: "/projects",
    icon: FolderOpen,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Facturation",
    description: "Gérez vos factures et paiements.",
    href: "/billing",
    icon: CreditCard,
    color: "text-green-600",
    bg: "bg-green-50",
  },
]

export function QuickActions() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {actions.map((action) => (
        <Link key={action.href} href={action.href} className="group">
          <Card className="h-full transition-shadow group-hover:ring-2 group-hover:ring-primary/20">
            <CardContent className="flex items-start gap-4">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${action.bg}`}
              >
                <action.icon className={`h-5 w-5 ${action.color}`} />
              </div>
              <div>
                <h3 className="font-medium group-hover:text-primary">
                  {action.label}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
