"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { siteConfig, navItems } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { MobileUserNav } from "@/components/public/user-nav-button"

interface MobileNavProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const pathname = usePathname()

  function handleLinkClick() {
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-sm overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-heading text-lg font-bold tracking-tight">
            {siteConfig.name}
          </SheetTitle>
        </SheetHeader>

        {/* Espace Client section */}
        <MobileUserNav onNavigate={handleLinkClick} />

        <nav className="flex flex-col gap-1 px-4">
          {navItems.map((item) => {
            if (item.children) {
              return (
                <div key={item.href} className="flex flex-col">
                  {/* Services parent link */}
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex h-12 items-center rounded-lg px-3 text-base font-medium transition-colors hover:bg-muted",
                      pathname === item.href
                        ? "text-kaelix-blue"
                        : "text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>

                  {/* Service sub-items */}
                  <div className="ml-4 flex flex-col gap-0.5 border-l border-border pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={handleLinkClick}
                        className={cn(
                          "flex flex-col rounded-lg px-3 py-2.5 transition-colors hover:bg-muted",
                          pathname === child.href
                            ? "text-kaelix-blue"
                            : "text-foreground"
                        )}
                      >
                        <span className="text-sm font-medium">
                          {child.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {child.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  "flex h-12 items-center rounded-lg px-3 text-base font-medium transition-colors hover:bg-muted",
                  pathname === item.href
                    ? "text-kaelix-blue"
                    : "text-foreground"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <SheetFooter>
          <Button render={<Link href="/audit-gratuit" onClick={handleLinkClick} />} className="w-full" size="lg">
            Audit Gratuit
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
