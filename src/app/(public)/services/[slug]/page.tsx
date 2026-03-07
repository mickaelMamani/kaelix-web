import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { generatePageMetadata } from "@/lib/metadata"
import { serviceSlugs } from "@/lib/constants"
import { getServiceBySlug } from "@/lib/data/services"
import { ServiceHero } from "@/components/public/services/service-hero"
import { ServiceProblem } from "@/components/public/services/service-problem"
import { ServiceSolution } from "@/components/public/services/service-solution"
import { ServiceFeatures } from "@/components/public/services/service-features"
import { ServiceTestimonial } from "@/components/public/services/service-testimonial"
import { ServiceFaq } from "@/components/public/services/service-faq"
import { ServiceCta } from "@/components/public/services/service-cta"

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return {}
  }

  return generatePageMetadata({
    title: service.metadata.title,
    description: service.metadata.description,
    path: `/services/${service.slug}`,
  })
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  return (
    <>
      <ServiceHero service={service} />
      <ServiceProblem problem={service.problem} />
      <ServiceSolution solution={service.solution} />
      <ServiceFeatures features={service.features} />
      <ServiceTestimonial testimonial={service.testimonial} />
      <ServiceFaq faq={service.faq} />
      <ServiceCta service={service} />
    </>
  )
}
