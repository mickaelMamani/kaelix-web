"use client"

import { useEffect, useState, useMemo } from "react"

import { cn } from "@/lib/utils"

interface TocHeading {
  id: string
  text: string
  level: 2 | 3
}

interface TableOfContentsProps {
  content: string
}

/**
 * Extract h2 and h3 headings from raw MDX content.
 */
function extractHeadings(mdxContent: string): TocHeading[] {
  const headings: TocHeading[] = []
  const regex = /^(#{2,3})\s+(.+)$/gm
  let match

  while ((match = regex.exec(mdxContent)) !== null) {
    const level = match[1].length as 2 | 3
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    headings.push({ id, text, level })
  }

  return headings
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const headings = useMemo(() => extractHeadings(content), [content])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first entry that is intersecting
        const visibleEntries = entries.filter((e) => e.isIntersecting)
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      }
    )

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav
      aria-label="Table des matières"
      className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
        Sommaire
      </p>
      <ul className="space-y-1 border-l border-border">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById(heading.id)
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" })
                  setActiveId(heading.id)
                }
              }}
              className={cn(
                "block border-l-2 py-1 text-sm transition-colors",
                heading.level === 2 ? "pl-4" : "pl-7",
                activeId === heading.id
                  ? "border-kaelix-blue font-medium text-kaelix-blue"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-foreground/30"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
