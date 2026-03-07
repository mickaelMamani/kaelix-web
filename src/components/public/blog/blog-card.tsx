import Link from "next/link"
import { CalendarDays, Clock, User } from "lucide-react"

import { cn } from "@/lib/utils"
import type { BlogPost } from "@/types/blog"
import { categoryLabels } from "@/types/blog"

// Map each category to a color scheme for the badge
const categoryColors: Record<string, string> = {
  guides: "bg-kaelix-blue/10 text-kaelix-blue",
  tendances: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "etudes-de-cas": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  seo: "bg-kaelix-green/10 text-green-700 dark:text-kaelix-green",
  comparatifs: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString))
}

interface BlogCardProps {
  post: BlogPost
  className?: string
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition-all duration-300 hover:shadow-lg hover:ring-foreground/20 hover:-translate-y-1",
        className
      )}
    >
      {/* Category badge */}
      <div className="px-5 pt-5">
        <span
          className={cn(
            "inline-block rounded-full px-3 py-1 text-xs font-semibold",
            categoryColors[post.category] ?? "bg-muted text-muted-foreground"
          )}
        >
          {categoryLabels[post.category]}
        </span>
      </div>

      {/* Title and excerpt */}
      <div className="flex flex-1 flex-col px-5 pt-3 pb-5">
        <h3 className="font-heading text-lg font-semibold text-foreground transition-colors group-hover:text-kaelix-blue line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>

        {/* Meta row */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="size-3.5" />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="size-3.5" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {post.readTime}
          </span>
        </div>
      </div>
    </Link>
  )
}
