import { generatePageMetadata } from "@/lib/metadata"
import { siteConfig } from "@/lib/constants"

import { AnimatedSection } from "@/components/shared/animated-section"
import { CtaSection } from "@/components/public/cta-section"
import { HeroSection } from "@/components/public/home/hero-section"
import { TrustBanner } from "@/components/public/home/trust-banner"
import { ProblemSolution } from "@/components/public/home/problem-solution"
import { ServicesOverview } from "@/components/public/home/services-overview"
import { PricingPreview } from "@/components/public/home/pricing-preview"
import { ShowcasesSection } from "@/components/public/home/showcases-section"
import { ProcessSection } from "@/components/public/home/process-section"
import { TestimonialsSection } from "@/components/public/home/testimonials-section"
import { FaqSection } from "@/components/public/home/faq-section"
import { fadeIn, slideUp, slideInLeft, slideInRight } from "@/lib/animations"

export const metadata = generatePageMetadata({
  title: "Kaelix — Crafted Code, Proven Performance",
  description:
    "Agence web française spécialisée dans la création de sites sur mesure, 3x plus rapides que WordPress. Design, développement et SEO. À partir de 80 €/mois.",
  path: "/",
})

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Montpellier",
          addressCountry: "FR",
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: siteConfig.contact.email,
          contactType: "customer service",
          availableLanguage: "French",
        },
        sameAs: [
          siteConfig.social.linkedin,
          siteConfig.social.twitter,
          siteConfig.social.github,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: "fr-FR",
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroSection />

      <AnimatedSection variants={fadeIn}>
        <TrustBanner />
      </AnimatedSection>

      <AnimatedSection variants={slideUp}>
        <ProblemSolution />
      </AnimatedSection>

      <AnimatedSection variants={slideUp} delay={0.1}>
        <ServicesOverview />
      </AnimatedSection>

      <AnimatedSection variants={slideInLeft}>
        <PricingPreview />
      </AnimatedSection>

      <AnimatedSection variants={slideInRight}>
        <ShowcasesSection />
      </AnimatedSection>

      <AnimatedSection variants={slideUp}>
        <ProcessSection />
      </AnimatedSection>

      <AnimatedSection variants={fadeIn}>
        <TestimonialsSection />
      </AnimatedSection>

      <AnimatedSection variants={slideUp}>
        <FaqSection />
      </AnimatedSection>

      <AnimatedSection variants={fadeIn}>
        <CtaSection />
      </AnimatedSection>
    </>
  )
}
