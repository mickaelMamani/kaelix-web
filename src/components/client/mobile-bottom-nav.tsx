"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FolderKanban,
  CreditCard,
  MessageSquare,
  User,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { clientNavItems } from "@/lib/constants"

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  LayoutDashboard,
  FolderKanban,
  CreditCard,
  MessageSquare,
  User,
}

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around">
        {clientNavItems.map((item) => {
          const Icon = iconMap[item.icon]
          const isActive = pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2 text-xs transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              {Icon && <Icon className="size-6" />}
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
