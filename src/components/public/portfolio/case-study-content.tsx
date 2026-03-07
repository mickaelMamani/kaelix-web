import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/public/section-header"
import { AnimatedSection } from "@/components/shared/animated-section"
import { slideUp, slideInLeft, slideInRight } from "@/lib/animations"
import type { PortfolioItem } from "@/lib/data/portfolio"

interface CaseStudyContentProps {
  item: PortfolioItem
}

export function CaseStudyContent({ item }: CaseStudyContentProps) {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Challenge section */}
        <AnimatedSection variants={slideInLeft}>
          <div className="space-y-4">
            <SectionHeader
              label="Le contexte"
              title="Le D&eacute;fi"
              centered={false}
            />
            <p className="text-base leading-relaxed text-muted-foreground">
              {item.challenge}
            </p>
          </div>
        </AnimatedSection>

        {/* Solution section */}
        <AnimatedSection variants={slideInRight} className="mt-16">
          <div className="space-y-4">
            <SectionHeader
              label="Notre approche"
              title="Notre Solution"
              centered={false}
            />
            <p className="text-base leading-relaxed text-muted-foreground">
              {item.solution}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {item.technologies.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Results section */}
        <AnimatedSection variants={slideUp} className="mt-16">
          <div className="space-y-6">
            <SectionHeader
              label="Les chiffres"
              title="R&eacute;sultats"
              centered={false}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {item.results.map((result) => (
                <Card key={result.label}>
                  <CardContent className="flex flex-col items-center py-2 text-center">
                    <p className="font-heading text-2xl font-bold text-kaelix-blue">
                      {result.value}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {result.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
