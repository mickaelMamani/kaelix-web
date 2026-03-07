import { Quote } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AnimatedSection } from "@/components/shared/animated-section"
import { scaleIn } from "@/lib/animations"
import type { PortfolioItem } from "@/lib/data/portfolio"

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

interface CaseStudyTestimonialProps {
  testimonial: PortfolioItem["testimonial"]
}

export function CaseStudyTestimonial({
  testimonial,
}: CaseStudyTestimonialProps) {
  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection variants={scaleIn}>
          <div className="flex flex-col items-center text-center">
            <Quote className="size-10 text-kaelix-blue/30" />

            <blockquote className="mt-6 text-lg leading-relaxed text-foreground sm:text-xl">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            <div className="mt-8 flex items-center gap-3">
              <Avatar size="lg">
                <AvatarFallback className="bg-kaelix-blue/10 text-kaelix-blue">
                  {getInitials(testimonial.name)}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
