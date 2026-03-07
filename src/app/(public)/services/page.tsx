import Link from "next/link"
import type { Metadata } from "next"
import {
  Monitor,
  ShoppingCart,
  AppWindow,
  RefreshCw,
  TrendingUp,
  Wrench,
  ArrowRight,
} from "lucide-react"

import { generatePageMetadata } from "@/lib/metadata"
import { services } from "@/lib/data/services"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/public/section-header"
import { CtaSection } from "@/components/public/cta-section"
import { AnimatedSection } from "@/components/shared/animated-section"
import { scaleIn } from "@/lib/animations"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  ShoppingCart,
  AppWindow,
  RefreshCw,
  TrendingUp,
  Wrench,
}

export const metadata: Metadata = generatePageMetadata({
  title: "Nos Services | Kaelix",
  description:
    "Découvrez les services Kaelix : sites vitrines, e-commerce, applications web, refonte de site, SEO et maintenance. Des solutions sur mesure codées à la main.",
  path: "/services",
})

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-muted/50 to-background pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Services"
              title="Des solutions sur mesure pour chaque projet"
              description="Sites vitrines, e-commerce, applications web ou refonte : chaque projet est codé à la main pour des performances optimales et une sécurité sans compromis."
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon]
              return (
                <AnimatedSection
                  key={service.slug}
                  variants={scaleIn}
                  delay={index * 0.1}
                >
                  <Card className="group h-full transition-shadow hover:shadow-lg">
                    <CardHeader>
                      <div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-kaelix-blue/10">
                        {Icon && (
                          <Icon className="size-6 text-kaelix-blue" />
                        )}
                      </div>
                      <CardTitle className="font-heading text-xl font-bold">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col justify-between gap-4">
                      <p className="text-sm text-muted-foreground">
                        {service.shortDescription}
                      </p>
                      <Button
                        render={<Link href={`/services/${service.slug}`} />}
                        variant="ghost"
                        className="w-fit gap-1 px-0 text-kaelix-blue hover:text-kaelix-blue/80 hover:bg-transparent"
                      >
                        En savoir plus
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </>
  )
}
