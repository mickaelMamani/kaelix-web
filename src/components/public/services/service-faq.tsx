"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SectionHeader } from "@/components/public/section-header"
import { AnimatedSection } from "@/components/shared/animated-section"
import type { Service } from "@/lib/data/services"

interface ServiceFaqProps {
  faq: Service["faq"]
}

export function ServiceFaq({ faq }: ServiceFaqProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="FAQ"
            title="Questions fréquentes"
            description="Les réponses aux questions que vous vous posez sûrement."
          />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <div className="mt-12">
            <Accordion>
              {faq.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
