export interface PortfolioItem {
  slug: string
  title: string
  client: string
  sector: string
  type: "vitrine" | "ecommerce" | "saas" | "refonte"
  typeLabel: string
  description: string
  challenge: string
  solution: string
  results: { label: string; value: string }[]
  technologies: string[]
  testimonial: { name: string; role: string; company: string; quote: string }
  metrics: { pagespeed: number; loadTime: string; uptime: string }
  metadata: { title: string; description: string }
}

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "boulangerie-martin",
    title: "Boulangerie Martin",
    client: "Boulangerie Martin",
    sector: "Artisanat / Alimentation",
    type: "vitrine",
    typeLabel: "Site Vitrine",
    description:
      "Site vitrine sur mesure pour une boulangerie artisanale à Montpellier, mettant en valeur le savoir-faire et les produits du jour avec un design chaleureux.",
    challenge:
      "La Boulangerie Martin, institution montpelliéraine depuis 1987, n'avait aucune présence en ligne. Les clients ne pouvaient pas consulter les horaires, les produits du jour ou passer des précommandes. Le bouche-à-oreille seul ne suffisait plus à attirer une nouvelle clientèle, notamment les jeunes actifs du quartier.",
    solution:
      "Nous avons conçu un site vitrine épuré et performant, optimisé pour le mobile. La page d'accueil met en avant les produits phares avec des visuels soignés. Un système de mise à jour simple permet au boulanger de publier les produits du jour en quelques clics. Le référencement local a été travaillé pour apparaître en premier sur les recherches « boulangerie Montpellier ».",
    results: [
      { label: "Augmentation des visites en boutique", value: "+35%" },
      { label: "Précommandes en ligne / semaine", value: "120" },
      { label: "Position Google « boulangerie Montpellier »", value: "Top 3" },
      { label: "Temps de chargement", value: "0.8s" },
    ],
    technologies: ["Next.js", "Tailwind CSS", "Supabase", "Vercel"],
    testimonial: {
      name: "Pierre Martin",
      role: "Gérant",
      company: "Boulangerie Martin",
      quote:
        "Depuis la mise en ligne, nous recevons des précommandes chaque jour. Nos nouveaux clients nous disent qu'ils nous ont trouvés sur Google. Le site est rapide, beau et facile à mettre à jour. Kaelix a compris l'âme de notre boulangerie.",
    },
    metrics: { pagespeed: 98, loadTime: "0.8s", uptime: "99.99%" },
    metadata: {
      title: "Boulangerie Martin — Site Vitrine Artisan | Kaelix",
      description:
        "Découvrez comment nous avons créé un site vitrine performant pour la Boulangerie Martin à Montpellier. PageSpeed 98/100, +35% de visites en boutique.",
    },
  },
  {
    slug: "mode-ethique",
    title: "Mode Éthique",
    client: "Mode Éthique",
    sector: "Mode / E-commerce",
    type: "ecommerce",
    typeLabel: "E-commerce",
    description:
      "Boutique en ligne éco-responsable avec un parcours d'achat optimisé, un système de filtres avancés et une gestion de stock en temps réel.",
    challenge:
      "Mode Éthique, marque de vêtements durables basée à Lyon, utilisait une solution e-commerce générique qui ralentissait leur croissance. Le site mettait plus de 5 secondes à charger, le taux d'abandon de panier atteignait 78% et l'expérience mobile était médiocre. La gestion du stock entre la boutique physique et en ligne était source d'erreurs constantes.",
    solution:
      "Nous avons développé une boutique en ligne sur mesure avec un parcours d'achat simplifié en 3 étapes. Les filtres intelligents (taille, couleur, matière, certification) permettent de trouver le bon produit en quelques clics. La synchronisation du stock entre boutique physique et en ligne est désormais automatisée en temps réel grâce à une API personnalisée.",
    results: [
      { label: "Augmentation du taux de conversion", value: "+40%" },
      { label: "Réduction de l'abandon de panier", value: "-52%" },
      { label: "Chiffre d'affaires en ligne / mois", value: "+85%" },
      { label: "Erreurs de stock éliminées", value: "100%" },
    ],
    technologies: [
      "Next.js",
      "Stripe",
      "Supabase",
      "Tailwind CSS",
      "API REST",
      "Vercel",
    ],
    testimonial: {
      name: "Camille Rousseau",
      role: "Fondatrice",
      company: "Mode Éthique",
      quote:
        "Notre ancien site nous faisait perdre des ventes chaque jour. Depuis la refonte par Kaelix, nos conversions ont bondi de 40% et nous n'avons plus jamais eu de problème de stock. L'investissement a été rentabilisé en 3 mois.",
    },
    metrics: { pagespeed: 95, loadTime: "1.2s", uptime: "99.98%" },
    metadata: {
      title: "Mode Éthique — Boutique E-commerce Éco-responsable | Kaelix",
      description:
        "Étude de cas : boutique en ligne sur mesure pour Mode Éthique. +40% de conversions, -52% d'abandon de panier, stock synchronisé en temps réel.",
    },
  },
  {
    slug: "logistik-pro",
    title: "LogistikPro",
    client: "LogistikPro",
    sector: "Logistique / SaaS",
    type: "saas",
    typeLabel: "SaaS",
    description:
      "Dashboard logistique temps réel avec suivi de colis, gestion de flottes et tableaux de bord analytiques pour optimiser les opérations.",
    challenge:
      "LogistikPro, startup montpelliéraine spécialisée dans la logistique du dernier kilomètre, gérait ses opérations via des tableurs Excel et des échanges d'emails. Avec plus de 500 livraisons par jour, les erreurs de routage, les retards et le manque de visibilité en temps réel coûtaient cher en satisfaction client et en efficacité opérationnelle.",
    solution:
      "Nous avons conçu et développé une application web SaaS complète avec un dashboard en temps réel. Le suivi GPS des livreurs, la planification automatique des itinéraires et les notifications instantanées aux destinataires ont transformé leurs opérations. L'architecture serverless assure une scalabilité sans friction pour accompagner leur croissance.",
    results: [
      { label: "Réduction des erreurs de livraison", value: "-70%" },
      { label: "Livraisons gérées / jour", value: "2 000+" },
      { label: "Satisfaction client", value: "4.8/5" },
      { label: "Temps de formation des équipes", value: "-60%" },
    ],
    technologies: [
      "Next.js",
      "Supabase",
      "WebSocket",
      "Mapbox",
      "Tailwind CSS",
      "Vercel",
    ],
    testimonial: {
      name: "Julien Moreau",
      role: "CEO",
      company: "LogistikPro",
      quote:
        "Kaelix a transformé une idée en un produit SaaS solide en seulement 4 mois. Notre dashboard est devenu l'outil central de nos opérations. La qualité du code et la réactivité de l'équipe ont dépassé toutes nos attentes.",
    },
    metrics: { pagespeed: 92, loadTime: "1.5s", uptime: "99.95%" },
    metadata: {
      title: "LogistikPro — Dashboard SaaS Logistique | Kaelix",
      description:
        "Étude de cas : application SaaS de gestion logistique pour LogistikPro. Suivi temps réel, -70% d'erreurs, 2000+ livraisons/jour.",
    },
  },
  {
    slug: "cabinet-dupont",
    title: "Cabinet Dupont",
    client: "Cabinet Dupont & Associés",
    sector: "Juridique / Services",
    type: "refonte",
    typeLabel: "Refonte",
    description:
      "Refonte complète du site d'un cabinet d'avocats : design professionnel, performances triplées et référencement optimisé pour le secteur juridique.",
    challenge:
      "Le Cabinet Dupont & Associés, cabinet d'avocats installé à Montpellier depuis 20 ans, possédait un site WordPress datant de 2016. Le temps de chargement dépassait 6 secondes, le design n'inspirait plus confiance et le site n'était pas adapté au mobile. Les nouveaux clients potentiels quittaient le site avant même de consulter les domaines d'expertise du cabinet.",
    solution:
      "Nous avons réalisé une refonte complète en conservant l'identité du cabinet tout en la modernisant. Le nouveau site, codé sur mesure, charge 3 fois plus vite. Chaque domaine d'expertise dispose de sa page dédiée optimisée pour le SEO. Un formulaire de prise de rendez-vous qualifié permet de filtrer les demandes et de gagner du temps côté secrétariat.",
    results: [
      { label: "Temps de chargement", value: "3x plus rapide" },
      { label: "Demandes de rendez-vous / mois", value: "+120%" },
      { label: "Taux de rebond réduit", value: "-45%" },
      { label: "Coût de maintenance annuel", value: "-60%" },
    ],
    technologies: ["Next.js", "Tailwind CSS", "Supabase", "Vercel", "SEO"],
    testimonial: {
      name: "Maître Claire Dupont",
      role: "Associée fondatrice",
      company: "Cabinet Dupont & Associés",
      quote:
        "Notre ancien site WordPress nous coûtait cher en maintenance et ne reflétait plus l'image de notre cabinet. La refonte par Kaelix nous a apporté un site rapide, élégant et qui génère réellement des rendez-vous qualifiés. Un investissement qui a changé notre visibilité.",
    },
    metrics: { pagespeed: 96, loadTime: "1.0s", uptime: "99.99%" },
    metadata: {
      title: "Cabinet Dupont — Refonte Site Cabinet d'Avocats | Kaelix",
      description:
        "Étude de cas : refonte du site du Cabinet Dupont & Associés. Temps de chargement 3x plus rapide, +120% de rendez-vous, -60% de coût de maintenance.",
    },
  },
]

export function getPortfolioBySlug(
  slug: string
): PortfolioItem | undefined {
  return portfolioItems.find((item) => item.slug === slug)
}
