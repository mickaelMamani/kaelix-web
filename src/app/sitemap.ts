import type { MetadataRoute } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kaelix.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // Static public pages
  const staticPages: MetadataRoute.Sitemap = [
    // Homepage
    { url: `${BASE_URL}`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },

    // Services
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/site-vitrine`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/site-ecommerce`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/application-web`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/refonte-site`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/seo-performance`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/maintenance`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    // Tarifs
    { url: `${BASE_URL}/tarifs`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    // Pillar pages
    { url: `${BASE_URL}/developpement-site-sur-mesure`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/alternative-wordpress-performance`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/agence-web-tpe-pme`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // Realisations
    { url: `${BASE_URL}/realisations`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // Blog index
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },

    // Blog articles
    { url: `${BASE_URL}/blog/pourquoi-coder-site-a-la-main`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog/seo-technique-checklist`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog/wordpress-vs-nextjs-performance`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Local SEO pages
    { url: `${BASE_URL}/agence-web-montpellier`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/agence-web-paris`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/agence-web-lyon`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },

    // Sector pages
    { url: `${BASE_URL}/site-web-restaurant`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/site-vitrine-artisan`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },

    // Other public pages
    { url: `${BASE_URL}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/audit-gratuit`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/process`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/garanties`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },

    // Legal pages
    { url: `${BASE_URL}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/politique-confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/cgv`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ]

  return staticPages
}
