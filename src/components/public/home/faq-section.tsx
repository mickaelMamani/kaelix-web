"use client"

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { SectionHeader } from "@/components/public/section-header"

const faqs = [
  {
    question: "Pourquoi ne pas utiliser WordPress ?",
    answer:
      "WordPress est une solution généraliste qui repose sur des plugins tiers, ce qui entraîne des temps de chargement élevés (3 à 5 secondes en moyenne), des failles de sécurité fréquentes et des coûts de maintenance importants. Notre approche sur mesure utilise des technologies modernes (Next.js, React) pour livrer des sites 3 fois plus rapides, intrinsèquement sécurisés et bien moins coûteux à maintenir sur le long terme.",
  },
  {
    question: "Que comprend le forfait à 80 €/mois ?",
    answer:
      "Le forfait Vitrine à 80 €/mois inclut la conception et le développement de votre site sur mesure, l'hébergement haute performance, la maintenance technique (mises à jour, sauvegardes, monitoring), le certificat SSL et un support réactif. Il n'y a aucun frais d'entrée : le coût de création est lissé dans l'abonnement mensuel.",
  },
  {
    question: "Et si je veux changer d'agence ?",
    answer:
      "Le code source vous appartient à 100%. Si vous souhaitez changer de prestataire, nous vous transmettons l'intégralité du code et vous accompagnons dans la transition. Nous croyons que la qualité de notre travail et de notre service est la meilleure raison de rester, pas un verrouillage contractuel.",
  },
  {
    question: "Combien de temps pour créer un site ?",
    answer:
      "En moyenne, un site vitrine est livré en 3 à 4 semaines. Un site e-commerce nécessite 5 à 8 semaines, et une application web sur mesure 8 à 12 semaines. Ces délais incluent les phases de découverte, design, développement et tests. Chaque projet est unique et nous établissons un planning précis lors de la phase de découverte.",
  },
  {
    question: "Le code m'appartient-il ?",
    answer:
      "Oui, sans aucune ambiguïté. Dès la livraison, vous êtes propriétaire à 100% du code source de votre site ou application. Vous recevez un accès complet au repository Git. C'est un engagement fondamental chez Kaelix : votre investissement vous appartient intégralement.",
  },
  {
    question: "Proposez-vous un accompagnement SEO ?",
    answer:
      "Absolument. Chaque site que nous développons intègre les meilleures pratiques SEO techniques dès la conception : structure sémantique, performance optimale, données structurées, sitemap, et optimisation Core Web Vitals. Nous proposons également un forfait SEO dédié à 50 €/mois pour un suivi continu, l'analyse de positionnement et l'optimisation de votre contenu.",
  },
]

export function FaqSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader label="FAQ" title="Questions fréquentes" />

        <Accordion className="mt-12 sm:mt-16">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-left text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
