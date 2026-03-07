import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/public/section-header"

const showcases = [
  {
    slug: "restaurant-le-provencal",
    client: "Le Provençal",
    type: "Site Vitrine",
    description:
      "Refonte complète du site d'un restaurant gastronomique à Montpellier. Design immersif et réservation en ligne intégrée.",
    metric: "PageSpeed: 98/100",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    slug: "boutique-maison-claire",
    client: "Maison Claire",
    type: "E-commerce",
    description:
      "Boutique en ligne sur mesure pour une marque de décoration intérieure. Parcours d'achat optimisé et gestion de stock automatisée.",
    metric: "+150% de conversions",
    gradient: "from-kaelix-blue/20 to-blue-400/20",
  },
  {
    slug: "saas-taskflow",
    client: "TaskFlow",
    type: "Application Web",
    description:
      "Plateforme SaaS de gestion de projet pour équipes agiles. Interface intuitive et performances temps réel.",
    metric: "2 000+ utilisateurs actifs",
    gradient: "from-kaelix-green/20 to-emerald-400/20",
  },
]

export function ShowcasesSection() {
  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Réalisations"
          title="Des résultats concrets pour nos clients"
        />

        <div className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-3">
          {showcases.map((showcase) => (
            <Link
              key={showcase.slug}
              href={`/realisations/${showcase.slug}`}
              className="group"
            >
              <Card className="h-full transition-shadow duration-300 hover:shadow-lg">
                {/* Placeholder image area */}
                <div
                  className={`flex h-48 items-center justify-center bg-gradient-to-br ${showcase.gradient}`}
                >
                  <span className="text-sm font-medium text-muted-foreground/60">
                    1200 x 630
                  </span>
                </div>
                <CardContent className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-base font-semibold text-foreground">
                      {showcase.client}
                    </h3>
                    <Badge variant="secondary">{showcase.type}</Badge>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {showcase.description}
                  </p>
                  <p className="text-sm font-medium text-kaelix-blue">
                    {showcase.metric}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            render={<Link href="/realisations" />}
            variant="outline"
            size="lg"
          >
            Toutes nos réalisations
            <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
