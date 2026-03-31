"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FolderKanban,
  CreditCard,
  MessageSquare,
  User,
  Users,
  LogOut,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { clientNavItems, adminNavItems } from "@/lib/constants"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  LayoutDashboard,
  FolderKanban,
  CreditCard,
  MessageSquare,
  User,
  Users,
}

interface SidebarProps {
  user: { fullName: string; email: string; avatarUrl?: string; isAdmin?: boolean }
  companyName?: string
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function Sidebar({ user, companyName }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 flex-col border-r bg-white lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="font-heading text-xl font-bold text-kaelix-blue">
          Kaelix
        </Link>
        {user.isAdmin && (
          <span className="ml-2 rounded bg-kaelix-blue/10 px-2 py-0.5 text-xs font-medium text-kaelix-blue">
            Admin
          </span>
        )}
      </div>

      {/* User info */}
      <div className="flex items-center gap-3 border-b px-6 py-4">
        <Avatar>
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.fullName} />}
          <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">{user.fullName}</p>
          {companyName && (
            <p className="truncate text-xs text-muted-foreground">{companyName}</p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {user.isAdmin && (
          <>
            <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Administration
            </p>
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
            <div className="my-3 border-t" />
            <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Espace Client
            </p>
          </>
        )}
        {clientNavItems.map((item) => {
          const Icon = iconMap[item.icon]
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {Icon && <Icon className="size-5 shrink-0" />}
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="border-t px-3 py-4">
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
