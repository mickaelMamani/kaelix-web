import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/shared/animated-section"
import type { Service } from "@/lib/data/services"

interface ServiceHeroProps {
  service: Service
}

export function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <section className="bg-gradient-to-b from-muted/50 to-background pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex flex-col items-center text-center">
            <Badge variant="secondary" className="mb-4">
              {service.shortTitle}
            </Badge>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              {service.description}
            </p>
            <div className="mt-4">
              <p className="text-lg font-semibold text-kaelix-blue">
                {service.pricing.label}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {service.pricing.detail}
              </p>
            </div>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <Button
                render={<Link href="/audit-gratuit" />}
                size="lg"
                className="bg-kaelix-blue text-white hover:bg-kaelix-blue/90"
              >
                Demander un audit gratuit
              </Button>
              <Button
                render={<Link href="/contact" />}
                variant="outline"
                size="lg"
              >
                Nous contacter
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
