import type { Metadata } from "next"

import { generatePageMetadata } from "@/lib/metadata"
import { SectionHeader } from "@/components/public/section-header"
import { ContactForm } from "@/components/public/contact/contact-form"
import { ContactInfo } from "@/components/public/contact/contact-info"
import { AnimatedSection } from "@/components/shared/animated-section"
import { slideInLeft } from "@/lib/animations"

export const metadata: Metadata = generatePageMetadata({
  title: "Contact",
  description:
    "Contactez Kaelix pour discuter de votre projet web. Devis gratuit sous 24h pour sites vitrine, e-commerce, applications web et refontes.",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="Contact"
            title="Discutons de votre projet"
            description="Remplissez le formulaire ci-dessous ou contactez-nous directement. Nous vous r&eacute;pondons sous 24 heures."
          />
        </AnimatedSection>

        <div className="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-2 lg:gap-16">
          {/* Left: Contact form */}
          <AnimatedSection variants={slideInLeft}>
            <ContactForm />
          </AnimatedSection>

          {/* Right: Contact info & map */}
          <ContactInfo />
        </div>
      </div>
    </section>
  )
}
