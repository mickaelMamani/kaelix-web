import { Metadata } from "next"
import { siteConfig } from "./constants"

type MetadataParams = {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
}

export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
  noIndex,
}: MetadataParams): Metadata {
  const url = `${siteConfig.url}${path}`
  return {
    title,
    description,
    ...(noIndex && { robots: { index: false, follow: false } }),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "fr_FR",
      type: "website",
      ...(image && {
        images: [{ url: image, width: 1200, height: 630, alt: title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [image] }),
    },
  }
}
