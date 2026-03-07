import Link from "next/link"
import {
  Globe,
  Smartphone,
  Search,
  Gauge,
  Code,
  Headphones,
  CheckCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/shared/animated-section"
import { SectionHeader } from "@/components/public/section-header"
import { CtaSection } from "@/components/public/cta-section"
import { JsonLd } from "@/components/shared/json-ld"
import { localBusinessSchema, breadcrumbSchema } from "@/lib/structured-data"
import { siteConfig } from "@/lib/constants"
import type { CityData } from "@/lib/data/cities"

interface LocalPageLayoutProps {
  city: CityData
  keyword: string
}

const services = [
  {
    icon: Globe,
    title: "Site Vitrine",
    description: "Un site professionnel qui présente votre activité et attire des clients.",
  },
  {
    icon: Smartphone,
    title: "Design Responsive",
    description: "Une expérience parfaite sur mobile, tablette et desktop.",
  },
  {
    icon: Search,
    title: "SEO Local",
    description: "Optimisation pour les recherches locales et Google Maps.",
  },
  {
    icon: Gauge,
    title: "Performance",
    description: "Temps de chargement ultra-rapides pour un meilleur référencement.",
  },
  {
    icon: Code,
    title: "Code Sur Mesure",
    description: "Aucun template : chaque ligne de code est écrite pour votre projet.",
  },
  {
    icon: Headphones,
    title: "Support Inclus",
    description: "Maintenance, mises à jour et support technique inclus dans votre abonnement.",
  },
]

const advantages = [
  "Sites codés à la main, sans WordPress ni CMS générique",
  "Performances Core Web Vitals optimales dès la mise en ligne",
  "SEO technique avancé pour dominer les résultats locaux",
  "Abonnement tout inclus à partir de 80 €/mois, sans frais cachés",
  "Équipe réactive basée en France, à votre écoute",
]

export function LocalPageLayout({ city, keyword }: LocalPageLayoutProps) {
  const localBusiness = {
    ...localBusinessSchema(),
    address: {
      "@type": "PostalAddress" as const,
      addressLocality: city.name,
      addressRegion: city.region,
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates" as const,
      latitude: city.coordinates.lat,
      longitude: city.coordinates.lng,
    },
    areaServed: {
      "@type": "City" as const,
      name: city.name,
    },
  }

  return (
    <>
      <JsonLd data={localBusiness} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: `${keyword} ${city.name}`, url: `/${keyword.toLowerCase().replace(/\s+/g, "-")}-${city.slug}` },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-kaelix-black py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,102,255,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-kaelix-green">
                {city.region}
              </p>
              <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Agence Web à {city.name} — Sites sur mesure, codés à la main
              </h1>
              <p className="mt-6 text-lg text-white/70 leading-relaxed">
                {city.description}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  render={<Link href="/audit-gratuit" />}
                  size="lg"
                  className="bg-kaelix-blue text-white hover:bg-kaelix-blue/90 border-transparent"
                >
                  Audit Gratuit
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

      {/* Local context */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label={city.name}
              title={`Le contexte économique à ${city.name}`}
              description={`Avec une population de ${city.population} habitants, ${city.name} offre un marché dynamique pour les entreprises qui investissent dans leur présence digitale.`}
              centered
            />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="mx-auto mt-8 max-w-3xl text-center">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {city.economicContext}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services overview */}
      <section className="bg-muted/50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Nos services"
              title={`Ce que nous proposons à ${city.name}`}
              description="Des solutions web complètes pour développer votre activité en ligne."
              centered
            />
          </AnimatedSection>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <AnimatedSection key={service.title} delay={0.1 * i}>
                <div className="rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-md">
                  <service.icon className="size-8 text-kaelix-blue" />
                  <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Kaelix */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <AnimatedSection>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-kaelix-blue">
                  Pourquoi Kaelix
                </p>
                <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Pourquoi choisir Kaelix à {city.name} ?
                </h2>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  Nous ne sommes pas une agence web classique. Chaque site est
                  codé à la main avec les technologies les plus performantes du
                  marché. Le résultat : des sites 3x plus rapides que WordPress,
                  un référencement optimisé dès le premier jour, et un coût de
                  maintenance réduit.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <ul className="mt-8 space-y-4 lg:mt-0">
                {advantages.map((advantage) => (
                  <li key={advantage} className="flex gap-3">
                    <CheckCircle className="mt-0.5 size-5 shrink-0 text-kaelix-green" />
                    <span className="text-muted-foreground">{advantage}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </>
  )
}
