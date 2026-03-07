import Link from "next/link"
import { X, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { AnimatedSection } from "@/components/shared/animated-section"
import { SectionHeader } from "@/components/public/section-header"
import { CtaSection } from "@/components/public/cta-section"
import type { SectorData } from "@/lib/data/sectors"

interface SectorPageLayoutProps {
  sector: SectorData
}

export function SectorPageLayout({ sector }: SectorPageLayoutProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-kaelix-black py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,212,106,0.1),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-kaelix-green">
                {sector.name}
              </p>
              <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {sector.title}
              </h1>
              <p className="mt-6 text-lg text-white/70 leading-relaxed">
                {sector.description}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  render={<Link href="/audit-gratuit" />}
                  size="lg"
                  className="bg-kaelix-green text-kaelix-black hover:bg-kaelix-green/90 border-transparent font-semibold"
                >
                  {sector.ctaText}
                </Button>
                <Button
                  render={<Link href="/tarifs" />}
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white"
                >
                  Voir nos tarifs
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Problems */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Le constat"
              title="Les problèmes que vous rencontrez"
              description="Si vous vous reconnaissez dans l'une de ces situations, il est temps d'agir."
              centered
            />
          </AnimatedSection>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {sector.problems.map((problem, i) => (
              <AnimatedSection key={i} delay={0.1 * i}>
                <div className="flex gap-4 rounded-xl border border-destructive/20 bg-destructive/5 p-6">
                  <X className="mt-0.5 size-5 shrink-0 text-destructive" />
                  <p className="text-muted-foreground">{problem}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Solution / Features */}
      <section className="bg-muted/50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="La solution"
              title="Ce que nous construisons pour vous"
              description="Chaque fonctionnalité est pensée pour votre secteur d'activité."
              centered
            />
          </AnimatedSection>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {sector.features.map((feature, i) => (
              <AnimatedSection key={i} delay={0.1 * i}>
                <div className="flex gap-4 rounded-xl border border-kaelix-green/20 bg-background p-6">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-kaelix-green" />
                  <p className="text-muted-foreground">{feature}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.3}>
            <div className="mt-12 text-center">
              <Button
                render={<Link href={`/services/${sector.associatedService}`} />}
                size="lg"
                className="bg-kaelix-blue text-white hover:bg-kaelix-blue/90 border-transparent"
              >
                En savoir plus sur ce service
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="FAQ"
              title="Questions fréquentes"
              description={`Tout ce que vous devez savoir sur la création de site pour ${sector.name.toLowerCase()}.`}
              centered
            />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="mx-auto mt-12 max-w-3xl">
              <Accordion>
                {sector.faq.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-base text-foreground">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </>
  )
}
