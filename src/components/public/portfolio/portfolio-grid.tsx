"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { PortfolioCard } from "@/components/public/portfolio/portfolio-card"
import type { PortfolioItem } from "@/lib/data/portfolio"

const filters = [
  { value: "tous", label: "Tous" },
  { value: "vitrine", label: "Vitrine" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "saas", label: "SaaS" },
  { value: "refonte", label: "Refonte" },
] as const

interface PortfolioGridProps {
  items: PortfolioItem[]
}

export function PortfolioGrid({ items }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>("tous")

  const filteredItems =
    activeFilter === "tous"
      ? items
      : items.filter((item) => item.type === activeFilter)

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            variant={activeFilter === filter.value ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(filter.value)}
            className={
              activeFilter === filter.value
                ? "bg-kaelix-blue text-white hover:bg-kaelix-blue/90"
                : ""
            }
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Portfolio grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item, index) => (
          <PortfolioCard key={item.slug} item={item} index={index} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">
          Aucun projet dans cette cat&eacute;gorie pour le moment.
        </p>
      )}
    </div>
  )
}
