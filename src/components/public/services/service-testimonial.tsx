import { Quote } from "lucide-react"

import { AnimatedSection } from "@/components/shared/animated-section"
import { fadeIn } from "@/lib/animations"
import type { Service } from "@/lib/data/services"

interface ServiceTestimonialProps {
  testimonial: Service["testimonial"]
}

export function ServiceTestimonial({ testimonial }: ServiceTestimonialProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection variants={fadeIn}>
          <div className="relative rounded-xl bg-muted/50 p-8 sm:p-12">
            <Quote className="absolute top-6 left-6 size-10 text-kaelix-blue/20 sm:top-8 sm:left-8 sm:size-12" />
            <blockquote className="relative z-10">
              <p className="text-lg leading-relaxed text-foreground italic sm:text-xl">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="mt-6">
                <p className="font-heading font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.company}
                </p>
              </footer>
            </blockquote>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
