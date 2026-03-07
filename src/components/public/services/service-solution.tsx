import { Check } from "lucide-react"

import { AnimatedSection } from "@/components/shared/animated-section"
import { slideInRight } from "@/lib/animations"
import type { Service } from "@/lib/data/services"

interface ServiceSolutionProps {
  solution: Service["solution"]
}

export function ServiceSolution({ solution }: ServiceSolutionProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection variants={slideInRight}>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-8 dark:border-emerald-900/30 dark:bg-emerald-950/20 sm:p-10">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {solution.title}
            </h2>
            <ul className="mt-6 space-y-4">
              {solution.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                    <Check className="size-4 text-emerald-600 dark:text-emerald-400" />
                  </span>
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
