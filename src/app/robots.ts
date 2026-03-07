import type { MetadataRoute } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kaelix.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/projects",
        "/billing",
        "/profile",
        "/support",
        "/auth",
        "/api",
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
