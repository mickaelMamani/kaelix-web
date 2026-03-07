import type { Metadata } from "next"

import { generatePageMetadata } from "@/lib/metadata"
import {
  organizationSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/structured-data"
import { JsonLd } from "@/components/shared/json-ld"
import { getSectorBySlug } from "@/lib/data/sectors"
import { SectorPageLayout } from "@/components/public/sector/sector-page-layout"

const sector = getSectorBySlug("site-web-restaurant")!

export const metadata: Metadata = generatePageMetadata({
  title: "Création de Site Web pour Restaurant | Menu & Réservation | Kaelix",
  description:
    "Site web sur mesure pour votre restaurant : menu interactif, réservation en ligne, design mobile-first. Attirez plus de clients dès 80 €/mois.",
  path: "/site-web-restaurant",
})

export default function SiteWebRestaurantPage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Site Web Restaurant", url: "/site-web-restaurant" },
        ])}
      />
      <JsonLd data={faqSchema(sector.faq)} />

      <SectorPageLayout sector={sector} />
    </>
  )
}
