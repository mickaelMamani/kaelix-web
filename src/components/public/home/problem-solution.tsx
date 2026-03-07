import Link from "next/link"
import { X, Check, ArrowRight } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/public/section-header"

const wordpressIssues = [
  "Chargement lent (3-5 secondes)",
  "Failles de sécurité récurrentes",
  "Maintenance coûteuse et chronophage",
  "SEO limité par la structure",
]

const kaelixBenefits = [
  "Chargement ultra-rapide (< 1 seconde)",
  "Zéro faille de sécurité",
  "2x moins cher sur 3 ans",
  "SEO optimisé dès la conception",
]

export function ProblemSolution() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Pourquoi Kaelix ?"
          title="WordPress vs Code sur mesure"
        />

        <div className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-2">
          {/* WordPress column */}
          <Card className="border-destructive/20 bg-destructive/5 ring-destructive/10">
            <CardHeader>
              <CardTitle className="font-heading text-lg font-semibold text-muted-foreground">
                WordPress traditionnel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {wordpressIssues.map((issue) => (
                  <li key={issue} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                      <X className="size-3 text-destructive" />
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {issue}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Kaelix column */}
          <Card className="border-kaelix-blue/20 bg-kaelix-blue/5 ring-kaelix-blue/10">
            <CardHeader>
              <CardTitle className="font-heading text-lg font-semibold text-kaelix-blue">
                Kaelix — Code sur mesure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {kaelixBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-kaelix-green/10">
                      <Check className="size-3 text-kaelix-green" />
                    </span>
                    <span className="text-sm text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button
            render={<Link href="/alternative-wordpress-performance" />}
            variant="link"
            className="text-kaelix-blue"
          >
            En savoir plus
            <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
