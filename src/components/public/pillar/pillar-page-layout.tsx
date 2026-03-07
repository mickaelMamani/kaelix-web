"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  label: string
}

interface PillarPageLayoutProps {
  title: string
  description: string
  label: string
  children: React.ReactNode
  tableOfContents: TocItem[]
}

export function PillarPageLayout({
  title,
  description,
  label,
  children,
  tableOfContents,
}: PillarPageLayoutProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    )

    for (const item of tableOfContents) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [tableOfContents])

  return (
    <article className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-kaelix-blue">
            {label}
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </header>

        {/* Content grid */}
        <div className="mt-16 lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Sidebar TOC (desktop only) */}
          <nav
            className="hidden lg:block lg:col-span-1"
            aria-label="Table des matières"
          >
            <div className="sticky top-24">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Sommaire
              </p>
              <ul className="mt-4 space-y-2 border-l border-border">
                {tableOfContents.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        document
                          .getElementById(item.id)
                          ?.scrollIntoView({ behavior: "smooth" })
                      }}
                      className={cn(
                        "block border-l-2 py-1 pl-4 text-sm transition-colors",
                        activeId === item.id
                          ? "border-kaelix-blue text-kaelix-blue font-medium"
                          : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="max-w-none text-lg leading-relaxed text-muted-foreground [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:sm:text-3xl [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_strong]:text-foreground [&_a]:text-kaelix-blue [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-kaelix-blue/80 [&_table]:w-full [&_table]:border-collapse [&_table]:mb-6 [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:text-sm [&_th]:font-semibold [&_th]:text-foreground [&_td]:border [&_td]:border-border [&_td]:px-4 [&_td]:py-2 [&_td]:text-sm">
              {children}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
