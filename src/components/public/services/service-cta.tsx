import Link from "next/link"

import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/shared/animated-section"
import type { Service } from "@/lib/data/services"

interface ServiceCtaProps {
  service: Service
}

export function ServiceCta({ service }: ServiceCtaProps) {
  return (
    <section className="bg-gradient-to-br from-kaelix-blue to-blue-700 py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <AnimatedSection>
          <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
            {service.shortTitle}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Prêt à passer à l&apos;action ?
          </h2>
          <p className="mt-4 text-xl font-semibold text-white">
            {service.pricing.label}
          </p>
          <p className="mt-2 text-white/80">
            {service.pricing.detail}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              render={<Link href="/audit-gratuit" />}
              size="lg"
              className="bg-white text-kaelix-blue hover:bg-white/90 border-transparent"
            >
              Demander un audit
            </Button>
            <Button
              render={<Link href="/contact" />}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 hover:text-white"
            >
              Nous contacter
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
