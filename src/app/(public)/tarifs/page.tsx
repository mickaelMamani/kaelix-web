import type { Metadata } from "next"

import { generatePageMetadata } from "@/lib/metadata"
import {
  organizationSchema,
  serviceSchema,
  faqSchema,
} from "@/lib/structured-data"
import { JsonLd } from "@/components/shared/json-ld"
import { AnimatedSection } from "@/components/shared/animated-section"
import { SectionHeader } from "@/components/public/section-header"
import { CtaSection } from "@/components/public/cta-section"
import { PricingCards } from "@/components/public/tarifs/pricing-cards"
import { CostComparator } from "@/components/public/tarifs/cost-comparator"
import { PricingFaq } from "@/components/public/tarifs/pricing-faq"
import { faqItems } from "@/lib/data/pricing-faq"

export const metadata: Metadata = generatePageMetadata({
  title: "Tarifs",
  description:
    "Des tarifs transparents et sans surprise. Sites web sur mesure \u00E0 partir de 80\u00A0\u20AC/mois, sans frais d\u2019entr\u00E9e ni engagement longue dur\u00E9e.",
  path: "/tarifs",
})

export default function TarifsPage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd
        data={serviceSchema(
          "Site Vitrine",
          "Conception de site vitrine sur mesure, cod\u00E9 \u00E0 la main, performant et responsive. 80\u00A0\u20AC/mois tout inclus.",
          "/tarifs"
        )}
      />
      <JsonLd
        data={serviceSchema(
          "Optimisation SEO",
          "Audit et optimisation SEO technique continue pour am\u00E9liorer votre visibilit\u00E9 sur Google. 50\u00A0\u20AC/mois.",
          "/services/seo-performance"
        )}
      />
      <JsonLd
        data={serviceSchema(
          "E-commerce / SaaS",
          "D\u00E9veloppement de solutions e-commerce et SaaS sur mesure avec architecture personnalis\u00E9e.",
          "/services/site-ecommerce"
        )}
      />
      <JsonLd
        data={faqSchema(
          faqItems.map((item) => ({
            question: item.question,
            answer: item.answer,
          }))
        )}
      />

      {/* Hero / Pricing Cards */}
      <section className="bg-kaelix-black py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Tarifs"
              title="Des prix clairs, sans surprise"
              description="Pas de frais cach\u00E9s. Pas d\u2019engagement longue dur\u00E9e. Vous payez un abonnement mensuel qui inclut tout."
              centered
            />
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-16">
            <PricingCards />
          </AnimatedSection>
        </div>
      </section>

      {/* Cost Comparator */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Comparatif"
              title="Kaelix vs WordPress : le vrai co\u00FBt"
              description="Comparez le co\u00FBt total sur 3 ans entre un site Kaelix et une solution WordPress classique."
              centered
            />
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-12">
            <CostComparator />
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="FAQ"
              title="Questions fr\u00E9quentes"
              description="Tout ce que vous devez savoir sur nos offres et notre fonctionnement."
              centered
            />
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-12">
            <PricingFaq />
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </>
  )
}
