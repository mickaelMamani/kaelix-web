"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CreditCard,
  LogOut,
  ArrowLeft,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { adminNavItems } from "@/lib/constants"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  LayoutDashboard,
  Users,
  FolderKanban,
  CreditCard,
}

interface AdminSidebarProps {
  user: { fullName: string; email: string; avatarUrl?: string }
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 flex-col border-r bg-white lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/admin/dashboard" className="font-heading text-xl font-bold text-kaelix-blue">
          Kaelix
        </Link>
        <span className="ml-2 rounded bg-kaelix-blue/10 px-2 py-0.5 text-xs font-medium text-kaelix-blue">
          Admin
        </span>
      </div>

      {/* User info */}
      <div className="flex items-center gap-3 border-b px-6 py-4">
        <Avatar>
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.fullName} />}
          <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">{user.fullName}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {adminNavItems.map((item) => {
          const Icon = iconMap[item.icon]
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-kaelix-blue/10 font-medium text-kaelix-blue"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {Icon && <Icon className="size-5 shrink-0" />}
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="space-y-1 border-t px-3 py-4">
        <Link
          href="/dashboard"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted"
        >
          <ArrowLeft className="size-5 shrink-0" />
          Espace Client
        </Link>
        <form action="/auth/logout" method="POST">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted"
          >
            <LogOut className="size-5 shrink-0" />
            Se déconnecter
          </button>
        </form>
      </div>
    </aside>
  )
}
