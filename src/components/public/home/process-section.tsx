import { Search, Palette, Code, Rocket } from "lucide-react"

import { SectionHeader } from "@/components/public/section-header"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Découverte",
    description: "Audit de l'existant et définition des objectifs",
  },
  {
    number: "02",
    icon: Palette,
    title: "Design",
    description: "Maquettes et prototypage interactif",
  },
  {
    number: "03",
    icon: Code,
    title: "Développement",
    description: "Code sur mesure, tests et optimisation",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Lancement",
    description: "Mise en ligne, formation et suivi",
  },
]

export function ProcessSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Notre Méthode"
          title="4 étapes pour un site d'exception"
        />

        <div className="relative mt-12 sm:mt-16">
          {/* Horizontal connector line (desktop only) */}
          <div className="absolute top-14 right-[12.5%] left-[12.5%] hidden h-px bg-border lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.number} className="relative text-center">
                {/* Vertical connector line (mobile / tablet) */}
                {index < steps.length - 1 && (
                  <div className="absolute top-full left-1/2 h-8 w-px -translate-x-1/2 bg-border sm:hidden" />
                )}

                {/* Step number + icon */}
                <div className="relative mx-auto flex size-[72px] items-center justify-center rounded-2xl border bg-background shadow-sm">
                  <step.icon className="size-6 text-kaelix-blue" />
                  <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-kaelix-blue text-xs font-bold text-white">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-5 font-heading text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
