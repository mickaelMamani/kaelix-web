"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { siteConfig, navItems } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { MobileNav } from "@/components/public/mobile-nav"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const servicesItem = navItems.find((item) => item.children)
  const regularItems = navItems.filter((item) => !item.children)

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading text-xl font-bold tracking-tight text-foreground"
        >
          {siteConfig.name}
        </Link>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Services dropdown */}
              {servicesItem && (
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      pathname.startsWith("/services") &&
                        "text-kaelix-blue"
                    )}
                  >
                    {servicesItem.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[540px] grid-cols-2 gap-1 p-2">
                      {servicesItem.children!.map((child) => (
                        <li key={child.href}>
                          <NavigationMenuLink
                            href={child.href}
                            className={cn(
                              "block rounded-md p-3 leading-none no-underline transition-colors hover:bg-muted",
                              pathname === child.href && "bg-muted"
                            )}
                          >
                            <div className="text-sm font-medium leading-none">
                              {child.label}
                            </div>
                            <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
                              {child.description}
                            </p>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )}

              {/* Regular nav items */}
              {regularItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    href={item.href}
                    className={cn(
                      "inline-flex h-9 items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-muted",
                      pathname === item.href
                        ? "text-kaelix-blue"
                        : "text-foreground"
                    )}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button render={<Link href="/audit-gratuit" />}>
            Audit Gratuit
          </Button>
        </div>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <Menu className="size-5" />
        </Button>

        {/* Mobile navigation sheet */}
        <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
      </nav>
    </header>
  )
}
