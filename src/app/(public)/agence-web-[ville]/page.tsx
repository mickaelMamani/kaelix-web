import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { generatePageMetadata } from "@/lib/metadata"
import { getCityBySlug } from "@/lib/data/cities"
import { LocalPageLayout } from "@/components/public/local/local-page-layout"

// Only generate pages for 3 cities
const allowedCities = ["montpellier", "paris", "lyon"] as const

type Params = { ville: string }

export function generateStaticParams(): Params[] {
  return allowedCities.map((ville) => ({ ville }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { ville } = await params
  const city = getCityBySlug(ville)

  if (!city) {
    return {}
  }

  return generatePageMetadata({
    title: `Agence Web à ${city.name} — Sites Sur Mesure | Kaelix`,
    description: `Agence web à ${city.name} spécialisée dans la création de sites sur mesure. Sites codés à la main, performances optimales et SEO local. Dès 80 €/mois.`,
    path: `/agence-web-${city.slug}`,
  })
}

export default async function AgenceWebVillePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { ville } = await params

  // Only allow the 3 specified cities
  if (!allowedCities.includes(ville as (typeof allowedCities)[number])) {
    notFound()
  }

  const city = getCityBySlug(ville)

  if (!city) {
    notFound()
  }

  return <LocalPageLayout city={city} keyword="Agence Web" />
}
