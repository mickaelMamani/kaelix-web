import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { generatePageMetadata } from "@/lib/metadata"
import { portfolioItems, getPortfolioBySlug } from "@/lib/data/portfolio"
import { Button } from "@/components/ui/button"
import { CaseStudyHero } from "@/components/public/portfolio/case-study-hero"
import { CaseStudyContent } from "@/components/public/portfolio/case-study-content"
import { CaseStudyTestimonial } from "@/components/public/portfolio/case-study-testimonial"
import { CtaSection } from "@/components/public/cta-section"

export function generateStaticParams() {
  return portfolioItems.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = getPortfolioBySlug(slug)

  if (!item) {
    return generatePageMetadata({
      title: "Projet non trouvé",
      description: "Ce projet n'existe pas.",
      path: `/realisations/${slug}`,
      noIndex: true,
    })
  }

  return generatePageMetadata({
    title: item.metadata.title,
    description: item.metadata.description,
    path: `/realisations/${slug}`,
  })
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getPortfolioBySlug(slug)

  if (!item) {
    notFound()
  }

  return (
    <>
      {/* Back link */}
      <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 lg:px-8">
        <Button
          render={<Link href="/realisations" />}
          variant="ghost"
          size="sm"
        >
          <ArrowLeft className="mr-1 size-4" />
          Toutes les r&eacute;alisations
        </Button>
      </div>

      <CaseStudyHero item={item} />
      <CaseStudyContent item={item} />
      <CaseStudyTestimonial testimonial={item.testimonial} />
      <CtaSection />
    </>
  )
}
