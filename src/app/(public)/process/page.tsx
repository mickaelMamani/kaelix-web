import type { Metadata } from "next"
import Link from "next/link"

import { generatePageMetadata } from "@/lib/metadata"
import { organizationSchema, breadcrumbSchema } from "@/lib/structured-data"
import { JsonLd } from "@/components/shared/json-ld"
import { AnimatedSection } from "@/components/shared/animated-section"
import { SectionHeader } from "@/components/public/section-header"
import { ProcessTimeline } from "@/components/public/process/process-timeline"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = generatePageMetadata({
  title: "Notre Processus",
  description:
    "Découvrez notre processus de création de site web en 5 étapes : découverte, proposition, design, développement et lancement. Un accompagnement transparent de A à Z.",
  path: "/process",
})

export default function ProcessPage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Notre Processus", url: "/process" },
        ])}
      />

      {/* Header */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Processus"
              title="De l'idée au lancement en 5 étapes"
              description="Un processus clair et transparent pour que vous sachiez exactement où en est votre projet à chaque instant."
              centered
            />
          </AnimatedSection>

          <ProcessTimeline />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-kaelix-blue to-blue-700 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Prêt à démarrer ?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Commencez par un audit gratuit de votre site actuel
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              render={<Link href="/audit-gratuit" />}
              size="lg"
              className="bg-white text-kaelix-blue hover:bg-white/90 border-transparent"
            >
              Demander un audit gratuit
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
        </div>
      </section>
    </>
  )
}
