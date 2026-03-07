export const siteConfig = {
  name: "Kaelix",
  tagline: "Crafted Code, Proven Performance",
  description:
    "Des sites web codés à la main, 3x plus rapides, 2x moins chers à maintenir que WordPress",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contact: {
    email: "contact@kaelix.com",
    phone: "+33 X XX XX XX XX",
    address: "Montpellier, France",
  },
  social: {
    linkedin: "https://linkedin.com/company/kaelix",
    twitter: "https://twitter.com/kaelix",
    github: "https://github.com/kaelix",
  },
}

export const navItems = [
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Site Vitrine",
        href: "/services/site-vitrine",
        description: "Conception sur mesure, codée à la main",
      },
      {
        label: "Site E-commerce",
        href: "/services/site-ecommerce",
        description: "Boutique en ligne performante",
      },
      {
        label: "Application Web",
        href: "/services/application-web",
        description: "Application web custom / SaaS",
      },
      {
        label: "Refonte de Site",
        href: "/services/refonte-site",
        description: "Modernisation et performance",
      },
      {
        label: "SEO & Performance",
        href: "/services/seo-performance",
        description: "Optimisation technique continue",
      },
      {
        label: "Maintenance",
        href: "/services/maintenance",
        description: "Support et mises à jour",
      },
    ],
  },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Blog", href: "/blog" },
  { label: "À Propos", href: "/a-propos" },
]

export const clientNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Projets", href: "/projects", icon: "FolderKanban" },
  { label: "Facturation", href: "/billing", icon: "CreditCard" },
  { label: "Support", href: "/support", icon: "MessageSquare" },
  { label: "Profil", href: "/profile", icon: "User" },
]

export const serviceSlugs = [
  "site-vitrine",
  "site-ecommerce",
  "application-web",
  "refonte-site",
  "seo-performance",
  "maintenance",
] as const

export const citySlugs = [
  "montpellier",
  "paris",
  "lyon",
  "marseille",
  "toulouse",
  "bordeaux",
  "nantes",
  "lille",
] as const

export const sectorSlugs = [
  "site-web-restaurant",
  "site-ecommerce-mode",
  "site-vitrine-artisan",
  "plateforme-saas-startup",
] as const

export const footerLinks = {
  navigation: [
    { label: "Accueil", href: "/" },
    { label: "Tarifs", href: "/tarifs" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Blog", href: "/blog" },
    { label: "À Propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Site Vitrine", href: "/services/site-vitrine" },
    { label: "Site E-commerce", href: "/services/site-ecommerce" },
    { label: "Application Web", href: "/services/application-web" },
    { label: "Refonte de Site", href: "/services/refonte-site" },
    { label: "SEO & Performance", href: "/services/seo-performance" },
    { label: "Maintenance", href: "/services/maintenance" },
  ],
  legal: [
    { label: "Mentions Légales", href: "/mentions-legales" },
    { label: "Politique de Confidentialité", href: "/politique-confidentialite" },
    { label: "CGV", href: "/cgv" },
  ],
}
