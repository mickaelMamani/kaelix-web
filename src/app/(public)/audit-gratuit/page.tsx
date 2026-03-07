import type { Metadata } from "next"
import { CheckCircle2 } from "lucide-react"

import { generatePageMetadata } from "@/lib/metadata"
import { organizationSchema, breadcrumbSchema } from "@/lib/structured-data"
import { JsonLd } from "@/components/shared/json-ld"
import { AnimatedSection } from "@/components/shared/animated-section"
import { AuditForm } from "@/components/public/audit/audit-form"
import { slideInLeft, slideInRight } from "@/lib/animations"

export const metadata: Metadata = generatePageMetadata({
  title: "Audit Gratuit",
  description:
    "Recevez un audit complet de votre site web en 48h : performance, SEO, accessibilité, sécurité. 100% gratuit, sans engagement. Demandez votre audit site web gratuit.",
  path: "/audit-gratuit",
})

const benefits = [
  "Analyse de performance (Core Web Vitals)",
  "Audit SEO technique complet",
  "Vérification d'accessibilité WCAG",
  "Scan de sécurité",
  "Recommandations prioritaires personnalisées",
]

export default function AuditGratuitPage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Audit Gratuit", url: "/audit-gratuit" },
        ])}
      />

      {/* Hero section */}
      <section className="bg-kaelix-black py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Recevez un audit complet de votre site en 48h
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
              Performance, SEO, accessibilité, sécurité — un rapport détaillé et
              des recommandations concrètes. 100% gratuit, sans engagement.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Two-column layout: form + benefits */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Form */}
            <AnimatedSection variants={slideInLeft}>
              <div className="rounded-xl border bg-card p-6 shadow-sm sm:p-8">
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  Demandez votre audit
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Remplissez le formulaire et recevez votre rapport sous 48h.
                </p>
                <div className="mt-6">
                  <AuditForm />
                </div>
              </div>
            </AnimatedSection>

            {/* Right: Benefits */}
            <AnimatedSection variants={slideInRight}>
              <div className="flex h-full flex-col justify-center">
                <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Ce que vous recevrez
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Un rapport complet et actionnable pour améliorer votre
                  présence en ligne.
                </p>

                <ul className="mt-8 space-y-5">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-kaelix-green" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 rounded-lg border border-kaelix-blue/20 bg-kaelix-blue/5 p-5">
                  <p className="text-sm font-medium text-kaelix-blue">
                    100% gratuit &middot; Sans engagement &middot; Résultats
                    sous 48h
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
