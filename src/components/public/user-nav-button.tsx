"use client"

import Link from "next/link"
import {
  LayoutDashboard,
  FolderKanban,
  CreditCard,
  User,
  LogIn,
  LogOut,
  ChevronRight,
} from "lucide-react"

import { useUser } from "@/hooks/use-user"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function handleLogout() {
  const form = document.createElement("form")
  form.method = "POST"
  form.action = "/auth/logout"
  document.body.appendChild(form)
  form.submit()
}

// ---------------------------------------------------------------------------
// Desktop version — button or avatar dropdown
// ---------------------------------------------------------------------------
interface UserNavButtonProps {
  scrolled: boolean
}

export function UserNavButton({ scrolled }: UserNavButtonProps) {
  const { user, loading } = useUser()

  if (loading) {
    return <Skeleton className="h-8 w-8 rounded-full" />
  }

  // Not logged in — show "Espace Client" outline button
  if (!user) {
    return (
      <Button
        variant="outline"
        size="sm"
        className={
          scrolled
            ? "border-kaelix-blue/30 text-foreground hover:bg-kaelix-blue/5 hover:text-kaelix-blue"
            : "border-white/30 text-white hover:bg-white/10"
        }
        render={<Link href="/auth/login" />}
      >
        <LogIn className="size-4" />
        Espace Client
      </Button>
    )
  }

  // Logged in — show avatar dropdown
  const displayName = user.user_metadata?.full_name || user.email || ""
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
        <Avatar size="sm">
          {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
          <AvatarFallback>
            {getInitials(displayName || "U")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-48">
        <DropdownMenuItem render={<Link href="/dashboard" />}>
          <LayoutDashboard className="size-4" />
          Mon Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/projects" />}>
          <FolderKanban className="size-4" />
          Mes Projets
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/billing" />}>
          <CreditCard className="size-4" />
          Facturation
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href="/profile" />}>
          <User className="size-4" />
          Mon Profil
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          <LogOut className="size-4" />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ---------------------------------------------------------------------------
// Mobile version — card-style for Sheet menu
// ---------------------------------------------------------------------------
interface MobileUserNavProps {
  onNavigate: () => void
}

export function MobileUserNav({ onNavigate }: MobileUserNavProps) {
  const { user, loading } = useUser()

  if (loading) {
    return (
      <div className="px-4 pb-2">
        <Skeleton className="h-14 w-full rounded-lg" />
        <Separator className="mt-3" />
      </div>
    )
  }

  // Not logged in
  if (!user) {
    return (
      <div className="px-4 pb-2">
        <Link
          href="/auth/login"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted"
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
            <LogIn className="size-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              Espace Client
            </p>
            <p className="text-xs text-muted-foreground">
              Se connecter à votre espace
            </p>
          </div>
          <ChevronRight className="size-4 text-muted-foreground" />
        </Link>
        <Separator className="mt-3" />
      </div>
    )
  }

  // Logged in
  const displayName = user.user_metadata?.full_name || user.email || ""
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined

  const clientLinks = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Projets", href: "/projects", icon: FolderKanban },
    { label: "Facturation", href: "/billing", icon: CreditCard },
    { label: "Profil", href: "/profile", icon: User },
  ]

  return (
    <div className="px-4 pb-2">
      {/* User card */}
      <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
        <Avatar size="sm">
          {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
          <AvatarFallback>{getInitials(displayName || "U")}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">
            {displayName}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {user.email}
          </p>
        </div>
      </div>

      {/* Client nav links */}
      <nav className="mt-2 flex flex-col gap-0.5">
        {clientLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
          >
            <item.icon className="size-4 text-muted-foreground" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <button
        type="button"
        onClick={() => {
          onNavigate()
          handleLogout()
        }}
        className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
      >
        <LogOut className="size-4" />
        Se déconnecter
      </button>

      <Separator className="mt-3" />
    </div>
  )
}
