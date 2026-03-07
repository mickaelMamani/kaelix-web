"use client"

import Link from "next/link"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PricingPlan {
  name: string
  price: string
  priceNote?: string
  subtitle: string
  features: string[]
  cta: string
  ctaHref: string
  popular?: boolean
}

const plans: PricingPlan[] = [
  {
    name: "Site Vitrine",
    price: "80 \u20AC/mois",
    subtitle: "Sans frais d\u2019entr\u00E9e \u2014 Sans engagement longue dur\u00E9e",
    features: [
      "Site vitrine sur mesure (jusqu\u2019\u00E0 8 pages)",
      "Design responsive mobile-first",
      "H\u00E9bergement premium inclus",
      "Certificat SSL inclus",
      "Maintenance et mises \u00E0 jour",
      "Support par email sous 24h",
      "Nom de domaine inclus (1\u00E8re ann\u00E9e)",
      "Formulaire de contact",
    ],
    cta: "Demander un audit gratuit",
    ctaHref: "/audit-gratuit",
    popular: true,
  },
  {
    name: "Optimisation SEO",
    price: "50 \u20AC/mois",
    subtitle: "En compl\u00E9ment de votre site",
    features: [
      "Audit SEO technique complet",
      "Optimisation on-page continue",
      "Suivi de positionnement",
      "Rapport mensuel de performance",
      "Optimisation Core Web Vitals",
      "Strat\u00E9gie de contenu SEO",
    ],
    cta: "En savoir plus",
    ctaHref: "/services/seo-performance",
  },
  {
    name: "E-commerce / SaaS",
    price: "Sur devis",
    subtitle: "Solutions sur mesure",
    features: [
      "Architecture personnalis\u00E9e",
      "Int\u00E9gration paiement (Stripe)",
      "Gestion de catalogue / utilisateurs",
      "Dashboard d\u2019administration",
      "API et int\u00E9grations tierces",
      "Support prioritaire",
    ],
    cta: "Nous contacter",
    ctaHref: "/contact",
  },
]

export function PricingCards() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={cn(
            "relative flex flex-col",
            plan.popular &&
              "ring-2 ring-kaelix-blue"
          )}
        >
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-kaelix-blue text-white">Populaire</Badge>
            </div>
          )}

          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-xl font-bold">
              {plan.name}
            </CardTitle>
            <CardDescription>{plan.subtitle}</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col">
            <div className="mb-6">
              <span className="font-heading text-4xl font-bold tracking-tight text-foreground">
                {plan.price}
              </span>
            </div>

            <ul className="mb-8 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-kaelix-green" />
                  <span className="text-sm text-muted-foreground">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              render={<Link href={plan.ctaHref} />}
              size="lg"
              className={cn(
                "w-full border-transparent",
                plan.popular
                  ? "bg-kaelix-blue text-white hover:bg-kaelix-blue/90"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {plan.cta}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
