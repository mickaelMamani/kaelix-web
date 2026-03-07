import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/shared/animated-section"
import { slideUp } from "@/lib/animations"
import type { PortfolioItem } from "@/lib/data/portfolio"

const typeGradients: Record<PortfolioItem["type"], string> = {
  vitrine: "from-amber-500/20 to-orange-500/20",
  ecommerce: "from-kaelix-blue/20 to-blue-400/20",
  saas: "from-kaelix-green/20 to-emerald-400/20",
  refonte: "from-violet-500/20 to-purple-400/20",
}

const typeBadgeColors: Record<PortfolioItem["type"], string> = {
  vitrine: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  ecommerce: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  saas: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  refonte: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
}

function getInitials(title: string): string {
  return title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function getKeyMetric(item: PortfolioItem): string {
  if (item.metrics.pagespeed >= 96) {
    return `PageSpeed: ${item.metrics.pagespeed}/100`
  }
  return `Chargement: ${item.metrics.loadTime}`
}

interface PortfolioCardProps {
  item: PortfolioItem
  index: number
}

export function PortfolioCard({ item, index }: PortfolioCardProps) {
  return (
    <AnimatedSection variants={slideUp} delay={index * 0.1}>
      <Link href={`/realisations/${item.slug}`} className="group block h-full">
        <Card className="h-full transition-shadow duration-300 hover:shadow-lg">
          {/* Placeholder image area */}
          <div
            className={`relative flex aspect-video items-center justify-center bg-gradient-to-br ${typeGradients[item.type]}`}
          >
            <span className="font-heading text-3xl font-bold text-muted-foreground/40">
              {getInitials(item.title)}
            </span>
            <div className="absolute top-3 right-3">
              <Badge
                className={`border-transparent ${typeBadgeColors[item.type]}`}
              >
                {item.typeLabel}
              </Badge>
            </div>
          </div>

          <CardContent className="space-y-3 pt-1">
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                {item.client}
              </p>
              <h3 className="font-heading text-base font-semibold text-foreground">
                {item.title}
              </h3>
            </div>

            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>

            <div className="flex items-center justify-between">
              <Badge variant="secondary">{getKeyMetric(item)}</Badge>
              <span className="flex items-center gap-1 text-xs font-medium text-kaelix-blue opacity-0 transition-opacity group-hover:opacity-100">
                Voir l&apos;&eacute;tude de cas
                <ArrowRight className="size-3" />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </AnimatedSection>
  )
}
