"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqItems } from "@/lib/data/pricing-faq"

export function PricingFaq() {
  return (
    <Accordion className="mx-auto max-w-3xl">
      {faqItems.map((item, index) => (
        <AccordionItem key={index} value={`faq-${index}`}>
          <AccordionTrigger className="text-base font-medium text-foreground">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
