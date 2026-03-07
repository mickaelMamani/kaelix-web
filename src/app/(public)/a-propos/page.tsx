import type { Metadata } from "next"
import Link from "next/link"
import {
  Gauge,
  Eye,
  Code,
  Award,
  ArrowRight,
  Search,
  Palette,
  Wrench,
  Rocket,
} from "lucide-react"

import { generatePageMetadata } from "@/lib/metadata"
import { AnimatedSection } from "@/components/shared/animated-section"
import { SectionHeader } from "@/components/public/section-header"
import { CtaSection } from "@/components/public/cta-section"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = generatePageMetadata({
  title: "À Propos",
  description:
    "Découvrez la mission, les valeurs et l'équipe de Kaelix. Agence web à Montpellier spécialisée dans la création de sites sur mesure, codés à la main pour une performance maximale.",
  path: "/a-propos",
})

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const values = [
  {
    icon: Gauge,
    title: "Performance",
    description:
      "Chaque milliseconde compte. Nous optimisons chaque ligne de code pour offrir des temps de chargement ultrarapides.",
  },
  {
    icon: Eye,
    title: "Transparence",
    description:
      "Pas de frais cachés, pas de surprises. Vous savez exactement ce que vous payez et ce que vous obtenez.",
  },
  {
    icon: Code,
    title: "Propriété",
    description:
      "Votre code vous appartient. Pas de dépendance, pas de lock-in. Vous restez libre à 100\u00A0%.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Nous ne livrons que ce dont nous sommes fiers. La qualité n'est pas négociable.",
  },
]

const team = [
  {
    initials: "AM",
    name: "Alexandre Martin",
    role: "Fondateur & Lead Dev",
    bio: "Passionné par le code propre et les architectures performantes. Plus de 8 ans d'expérience en développement web full-stack.",
  },
  {
    initials: "SL",
    name: "Sophie Laurent",
    role: "Designer UX/UI",
    bio: "Spécialiste de l'expérience utilisateur, elle transforme des idées complexes en interfaces intuitives et élégantes.",
  },
  {
    initials: "TD",
    name: "Thomas Durand",
    role: "Développeur Full-Stack",
    bio: "Expert React et Next.js, il construit des applications robustes et maintenables avec une attention particulière à l'accessibilité.",
  },
]

const stats = [
  { value: "50+", label: "projets livrés" },
  { value: "95+", label: "score Lighthouse moyen" },
  { value: "98%", label: "taux de satisfaction" },
  { value: "< 24h", label: "temps de réponse support" },
]

const steps = [
  { icon: Search, label: "Découverte" },
  { icon: Palette, label: "Design" },
  { icon: Wrench, label: "Développement" },
  { icon: Rocket, label: "Lancement" },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Code artisanal, performance prouvée
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Nous croyons que chaque entreprise mérite un site web conçu avec
              soin, sans compromis sur la qualité.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Notre Histoire"
              title="Pourquoi le code sur mesure ?"
            />
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-12 space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              Tout a commencé par une frustration partagée par de nombreux
              entrepreneurs : des sites WordPress lents, surchargés de plugins,
              impossibles à faire évoluer sans casser quelque chose. Les agences
              classiques proposaient des templates génériques, facturaient des
              sommes astronomiques pour des modifications mineures et laissaient
              leurs clients dépendants d&apos;un écosystème fragile.
            </p>
            <p>
              Nous avons décidé de faire autrement. En codant chaque projet
              à la main avec les technologies les plus modernes — Next.js,
              React, Tailwind CSS — nous obtenons des sites jusqu&apos;à 3 fois
              plus rapides, parfaitement optimisés pour le référencement et
              d&apos;une fiabilité à toute épreuve. Pas de plugins, pas de
              mises à jour qui cassent tout, pas de failles de sécurité.
            </p>
            <p>
              Notre mission est simple : donner aux PME et aux indépendants
              l&apos;accès à une qualité web de niveau entreprise, à un prix
              juste et transparent. Basés à Montpellier, nous accompagnons des
              clients partout en France avec la même exigence et la même
              proximité.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Nos Valeurs"
              title="Ce qui nous guide au quotidien"
            />
          </AnimatedSection>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={0.1 * i}>
                <Card className="h-full">
                  <CardContent className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-kaelix-blue/10 text-kaelix-blue">
                      <v.icon className="size-6" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        {v.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {v.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="L'Équipe"
              title="Les artisans derrière le code"
            />
          </AnimatedSection>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <AnimatedSection key={member.name} delay={0.1 * i}>
                <Card className="h-full text-center">
                  <CardContent className="flex flex-col items-center gap-4">
                    <Avatar
                      size="lg"
                      className="size-16 text-lg"
                    >
                      <AvatarFallback className="bg-kaelix-blue/10 text-kaelix-blue text-base font-semibold">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-sm font-medium text-kaelix-blue">
                        {member.role}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {member.bio}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Key Figures */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-heading text-4xl font-bold text-kaelix-blue sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Notre Méthode"
              title="Un processus éprouvé"
              description="De la découverte au lancement, chaque étape est pensée pour vous garantir un résultat à la hauteur de vos ambitions."
            />
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-14">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {steps.map((step, i) => (
                <div key={step.label} className="flex flex-col items-center gap-3 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-kaelix-blue/10 text-kaelix-blue">
                    <step.icon className="size-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Étape {i + 1}
                    </span>
                    <p className="font-heading text-base font-semibold text-foreground">
                      {step.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button
                render={<Link href="/process" />}
                variant="outline"
                size="lg"
              >
                Découvrez notre processus en détail
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </>
  )
}
