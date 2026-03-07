"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { clientNavItems } from "@/lib/constants"

interface ClientHeaderProps {
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

function getPageTitle(pathname: string): string {
  const navItem = clientNavItems.find(
    (item) => pathname === item.href || pathname.startsWith(item.href + "/")
  )
  return navItem?.label ?? "Dashboard"
}

export function ClientHeader({ user }: ClientHeaderProps) {
  const pathname = usePathname()
  const pageTitle = getPageTitle(pathname)

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-white px-4 lg:px-6">
      <h1 className="text-lg font-semibold text-foreground">{pageTitle}</h1>

      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          <Avatar size="sm">
            {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.fullName} />}
            <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={8}>
          <DropdownMenuItem render={<Link href="/profile" />}>
            <User className="size-4" />
            Mon Profil
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => {
            const form = document.createElement("form")
            form.method = "POST"
            form.action = "/auth/logout"
            document.body.appendChild(form)
            form.submit()
          }}>
            <LogOut className="size-4" />
            Se déconnecter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
