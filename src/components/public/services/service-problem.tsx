import { X } from "lucide-react"

import { AnimatedSection } from "@/components/shared/animated-section"
import { slideInLeft } from "@/lib/animations"
import type { Service } from "@/lib/data/services"

interface ServiceProblemProps {
  problem: Service["problem"]
}

export function ServiceProblem({ problem }: ServiceProblemProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection variants={slideInLeft}>
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-8 dark:border-red-900/30 dark:bg-red-950/20 sm:p-10">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {problem.title}
            </h2>
            <ul className="mt-6 space-y-4">
              {problem.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                    <X className="size-4 text-red-600 dark:text-red-400" />
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
