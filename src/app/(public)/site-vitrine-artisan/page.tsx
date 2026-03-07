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

const sector = getSectorBySlug("site-vitrine-artisan")!

export const metadata: Metadata = generatePageMetadata({
  title: "Site Vitrine pour Artisan | Portfolio & Devis en Ligne | Kaelix",
  description:
    "Site vitrine professionnel pour artisan : galerie de réalisations, demande de devis, SEO local optimisé. Montrez votre savoir-faire en ligne dès 80 €/mois.",
  path: "/site-vitrine-artisan",
})

export default function SiteVitrineArtisanPage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Site Vitrine Artisan", url: "/site-vitrine-artisan" },
        ])}
      />
      <JsonLd data={faqSchema(sector.faq)} />

      <SectorPageLayout sector={sector} />
    </>
  )
}
