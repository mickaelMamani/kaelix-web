"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import { cn } from "@/lib/utils"
import type { BlogCategory } from "@/types/blog"
import { categoryLabels } from "@/types/blog"

interface BlogCategoryFilterProps {
  categories: BlogCategory[]
}

export function BlogCategoryFilter({ categories }: BlogCategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get("category")

  const handleFilter = useCallback(
    (category: string | null) => {
      if (category) {
        router.push(`/blog?category=${category}`, { scroll: false })
      } else {
        router.push("/blog", { scroll: false })
      }
    },
    [router]
  )

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleFilter(null)}
        className={cn(
          "rounded-full px-4 py-2 text-sm font-medium transition-colors",
          !activeCategory
            ? "bg-kaelix-blue text-white"
            : "bg-muted text-muted-foreground hover:bg-muted/80"
        )}
      >
        Tous
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleFilter(category)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors",
            activeCategory === category
              ? "bg-kaelix-blue text-white"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          {categoryLabels[category]}
        </button>
      ))}
    </div>
  )
}
