import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/public/section-header"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Vitrine",
    price: "80",
    unit: "€/mois",
    description: "Site vitrine sur mesure, hébergement et maintenance inclus",
    featured: true,
    features: [
      "Design sur mesure",
      "Hébergement inclus",
      "Maintenance mensuelle",
      "Support prioritaire",
    ],
  },
  {
    name: "SEO",
    price: "50",
    unit: "€/mois",
    description: "Optimisation SEO continue pour un trafic organique en hausse",
    featured: false,
    features: [
      "Audit SEO complet",
      "Optimisation technique",
      "Suivi de positionnement",
      "Rapport mensuel",
    ],
  },
  {
    name: "E-commerce / SaaS",
    price: "Sur devis",
    unit: "",
    description: "Solutions complexes adaptées à vos besoins spécifiques",
    featured: false,
    features: [
      "Architecture sur mesure",
      "Intégrations avancées",
      "Scalabilité garantie",
      "Accompagnement dédié",
    ],
  },
]

export function PricingPreview() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Tarifs"
          title="Des prix transparents, sans surprise"
        />

        <div className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "relative h-full",
                plan.featured &&
                  "ring-2 ring-kaelix-blue shadow-lg shadow-kaelix-blue/10"
              )}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-kaelix-blue text-white">
                    Populaire
                  </Badge>
                </div>
              )}
              <CardHeader className="pt-2">
                <CardTitle className="font-heading text-lg font-semibold">
                  {plan.name}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="font-heading text-3xl font-bold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  {plan.unit && (
                    <span className="ml-1 text-sm text-muted-foreground">
                      {plan.unit}
                    </span>
                  )}
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5">
                      <Check className="size-4 shrink-0 text-kaelix-green" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            render={<Link href="/tarifs" />}
            variant="outline"
            size="lg"
          >
            Voir tous les détails
            <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
