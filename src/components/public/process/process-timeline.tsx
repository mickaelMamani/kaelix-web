"use client"

import {
  Search,
  FileText,
  Palette,
  Code,
  Rocket,
  type LucideIcon,
} from "lucide-react"

import { AnimatedSection } from "@/components/shared/animated-section"
import { Badge } from "@/components/ui/badge"

interface ProcessStep {
  number: number
  icon: LucideIcon
  title: string
  duration: string
  description: string
  clientProvides?: string[]
  deliverables: string[]
}

const steps: ProcessStep[] = [
  {
    number: 1,
    icon: Search,
    title: "Découverte",
    duration: "1-2 jours",
    description:
      "Appel découverte, audit de l'existant, définition des objectifs et du périmètre.",
    clientProvides: [
      "Brief",
      "Accès au site actuel",
      "Exemples de sites appréciés",
    ],
    deliverables: ["Cahier des charges", "Proposition commerciale"],
  },
  {
    number: 2,
    icon: FileText,
    title: "Proposition",
    duration: "2-3 jours",
    description:
      "Proposition détaillée : périmètre, planning, budget. Vous validez avant que le travail commence.",
    deliverables: ["Devis détaillé", "Planning prévisionnel"],
  },
  {
    number: 3,
    icon: Palette,
    title: "Design",
    duration: "1-2 semaines",
    description:
      "Maquettes et prototypes interactifs. Itérations jusqu'à validation complète du design.",
    clientProvides: [
      "Logo",
      "Charte graphique",
      "Contenus (textes, images)",
    ],
    deliverables: ["Maquettes validées", "Guide de style"],
  },
  {
    number: 4,
    icon: Code,
    title: "Développement",
    duration: "2-4 semaines",
    description:
      "Intégration pixel-perfect, développement des fonctionnalités, optimisation performance et SEO.",
    deliverables: [
      "Site en environnement de test",
      "Accès de prévisualisation",
    ],
  },
  {
    number: 5,
    icon: Rocket,
    title: "Lancement",
    duration: "1-2 jours",
    description:
      "Déploiement en production, configuration DNS, vérifications finales, formation à l'outil de gestion.",
    deliverables: [
      "Site en ligne",
      "Documentation",
      "Accès au CMS",
    ],
  },
]

export function ProcessTimeline() {
  return (
    <div className="relative mx-auto mt-12 max-w-3xl sm:mt-16">
      {/* Vertical connecting line */}
      <div className="absolute top-0 bottom-0 left-6 hidden w-px bg-border sm:left-8 md:block" />

      <div className="space-y-8 md:space-y-12">
        {steps.map((step, index) => {
          const isEven = index % 2 === 1

          return (
            <AnimatedSection key={step.number} delay={index * 0.15}>
              <div
                className={`relative rounded-xl border p-6 sm:p-8 md:ml-20 ${
                  isEven ? "bg-muted/30" : "bg-card"
                }`}
              >
                {/* Numbered circle (connected to vertical line on desktop) */}
                <div className="absolute -top-3 left-4 flex size-12 items-center justify-center rounded-full border-2 border-kaelix-blue bg-background sm:left-6 md:-left-20 md:top-6">
                  <span className="font-heading text-lg font-bold text-kaelix-blue">
                    {step.number}
                  </span>
                </div>

                {/* Header: icon, title, duration */}
                <div className="flex flex-wrap items-center gap-3 pt-4 md:pt-0">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-kaelix-blue/10">
                    <step.icon className="size-5 text-kaelix-blue" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {step.duration}
                  </Badge>
                </div>

                {/* Description */}
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {step.description}
                </p>

                {/* Client provides */}
                {step.clientProvides && (
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-foreground">
                      Ce que vous fournissez :
                    </p>
                    <ul className="mt-2 space-y-1">
                      {step.clientProvides.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <span className="size-1.5 shrink-0 rounded-full bg-kaelix-blue/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Deliverables */}
                <div className="mt-5">
                  <p className="text-sm font-semibold text-foreground">
                    Livrables :
                  </p>
                  <ul className="mt-2 space-y-1">
                    {step.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span className="size-1.5 shrink-0 rounded-full bg-kaelix-green" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          )
        })}
      </div>
    </div>
  )
}
