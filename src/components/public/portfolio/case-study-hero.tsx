import { Gauge, Clock, Shield } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/shared/animated-section"
import { fadeIn, slideUp } from "@/lib/animations"
import type { PortfolioItem } from "@/lib/data/portfolio"

const typeBadgeColors: Record<PortfolioItem["type"], string> = {
  vitrine: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  ecommerce: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  saas: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  refonte: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
}

const typeGradients: Record<PortfolioItem["type"], string> = {
  vitrine: "from-amber-500/20 to-orange-500/20",
  ecommerce: "from-kaelix-blue/20 to-blue-400/20",
  saas: "from-kaelix-green/20 to-emerald-400/20",
  refonte: "from-violet-500/20 to-purple-400/20",
}

interface CaseStudyHeroProps {
  item: PortfolioItem
}

export function CaseStudyHero({ item }: CaseStudyHeroProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection variants={slideUp}>
          <div className="space-y-4 text-center">
            <Badge
              className={`border-transparent ${typeBadgeColors[item.type]}`}
            >
              {item.typeLabel}
            </Badge>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {item.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              Client : {item.client} &mdash; {item.sector}
            </p>
          </div>
        </AnimatedSection>

        {/* Key metrics row */}
        <AnimatedSection variants={slideUp} delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2">
              <Gauge className="size-5 text-kaelix-blue" />
              <div>
                <p className="text-xs text-muted-foreground">PageSpeed</p>
                <p className="text-lg font-bold text-foreground">
                  {item.metrics.pagespeed}/100
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-5 text-kaelix-blue" />
              <div>
                <p className="text-xs text-muted-foreground">Chargement</p>
                <p className="text-lg font-bold text-foreground">
                  {item.metrics.loadTime}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="size-5 text-kaelix-blue" />
              <div>
                <p className="text-xs text-muted-foreground">Uptime</p>
                <p className="text-lg font-bold text-foreground">
                  {item.metrics.uptime}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Placeholder hero image */}
        <AnimatedSection variants={fadeIn} delay={0.3}>
          <div
            className={`mt-12 flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br ${typeGradients[item.type]}`}
          >
            <span className="text-sm font-medium text-muted-foreground/60">
              1200 x 630
            </span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
