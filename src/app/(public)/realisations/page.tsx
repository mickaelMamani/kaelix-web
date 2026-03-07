import type { Metadata } from "next"

import { generatePageMetadata } from "@/lib/metadata"
import { portfolioItems } from "@/lib/data/portfolio"
import { SectionHeader } from "@/components/public/section-header"
import { PortfolioGrid } from "@/components/public/portfolio/portfolio-grid"
import { CtaSection } from "@/components/public/cta-section"
import { AnimatedSection } from "@/components/shared/animated-section"

export const metadata: Metadata = generatePageMetadata({
  title: "Nos Réalisations",
  description:
    "Découvrez nos projets : sites vitrine, e-commerce, applications SaaS et refontes. Des résultats concrets et mesurables pour chaque client.",
  path: "/realisations",
})

export default function RealisationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Portfolio"
              title="Des projets qui parlent d'eux-m&ecirc;mes"
              description="Chaque projet est unique. D&eacute;couvrez comment nous avons aid&eacute; nos clients &agrave; atteindre leurs objectifs avec des solutions web sur mesure."
            />
          </AnimatedSection>

          <div className="mt-12 sm:mt-16">
            <PortfolioGrid items={portfolioItems} />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
