import type { Metadata } from "next"
import {
  Gauge,
  Code,
  Shield,
  Headphones,
  ThumbsUp,
  Eye,
} from "lucide-react"

import { generatePageMetadata } from "@/lib/metadata"
import { organizationSchema, breadcrumbSchema } from "@/lib/structured-data"
import { JsonLd } from "@/components/shared/json-ld"
import { AnimatedSection } from "@/components/shared/animated-section"
import { SectionHeader } from "@/components/public/section-header"
import { CtaSection } from "@/components/public/cta-section"
import { GuaranteeCard } from "@/components/public/garanties/guarantee-card"

export const metadata: Metadata = generatePageMetadata({
  title: "Nos Garanties",
  description:
    "Des engagements concrets et mesurables : performance Lighthouse 95+, propriété du code, pas de frais cachés, support réactif sous 24h, satisfait ou remboursé.",
  path: "/garanties",
})

const guarantees = [
  {
    icon: Gauge,
    title: "Performance",
    commitment: "Score Lighthouse 95+ garanti",
    description:
      "Votre site sera optimisé pour obtenir un score de performance Lighthouse de 95 ou plus. Nous nous engageons à corriger gratuitement tout point en dessous.",
  },
  {
    icon: Code,
    title: "Propriété du code",
    commitment: "Votre code, à vie",
    description:
      "En cas de résiliation, nous vous transférons l'intégralité du code source. Vous restez propriétaire de votre site, sans restriction.",
  },
  {
    icon: Shield,
    title: "Pas de frais cachés",
    commitment: "Le prix annoncé est le prix payé",
    description:
      "Aucun frais de setup, aucune surprise en cours de route. L'abonnement inclut hébergement, maintenance, mises à jour et support.",
  },
  {
    icon: Headphones,
    title: "Support réactif",
    commitment: "Réponse sous 24h",
    description:
      "Notre équipe s'engage à répondre à toutes vos demandes sous 24 heures ouvrées. Support par email et messagerie intégrée.",
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction",
    commitment: "Satisfait ou remboursé",
    description:
      "Si le site livré ne correspond pas au cahier des charges validé ensemble, nous corrigeons gratuitement ou vous remboursons le premier mois.",
  },
  {
    icon: Eye,
    title: "Transparence",
    commitment: "Suivi en temps réel",
    description:
      "Accédez à votre espace client pour suivre l'avancement de votre projet, consulter vos factures et communiquer avec l'équipe.",
  },
]

export default function GarantiesPage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Nos Garanties", url: "/garanties" },
        ])}
      />

      {/* Guarantees grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Garanties"
              title="Nos engagements concrets"
              description="Pas de belles promesses vagues. Des engagements mesurables et vérifiables."
              centered
            />
          </AnimatedSection>

          <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {guarantees.map((guarantee, index) => (
              <AnimatedSection key={guarantee.title} delay={index * 0.1}>
                <GuaranteeCard
                  icon={guarantee.icon}
                  title={guarantee.title}
                  commitment={guarantee.commitment}
                  description={guarantee.description}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </>
  )
}
