import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/public/section-header"
import { AnimatedSection } from "@/components/shared/animated-section"
import { scaleIn } from "@/lib/animations"
import type { Service } from "@/lib/data/services"

interface ServiceFeaturesProps {
  features: Service["features"]
}

export function ServiceFeatures({ features }: ServiceFeaturesProps) {
  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="Inclus"
            title="Ce qui est inclus"
            description="Chaque service est pensé dans les moindres détails pour vous garantir un résultat à la hauteur de vos ambitions."
          />
        </AnimatedSection>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {features.map((feature, index) => (
            <AnimatedSection key={index} variants={scaleIn} delay={index * 0.1}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className="font-heading text-lg font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
