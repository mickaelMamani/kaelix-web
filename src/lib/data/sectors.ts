export interface SectorData {
  slug: string
  name: string
  title: string
  description: string
  problems: string[]
  features: string[]
  associatedService: string
  ctaText: string
  faq: { question: string; answer: string }[]
}

export const sectors: SectorData[] = [
  {
    slug: "site-web-restaurant",
    name: "Restaurant",
    title: "Création de Site Web pour Restaurant",
    description:
      "Un site web sur mesure pour votre restaurant : menu interactif, réservation en ligne et expérience mobile impeccable. Attirez plus de clients et remplissez vos tables.",
    problems: [
      "Vos clients ne trouvent pas votre menu en ligne et appellent pour des informations basiques",
      "Aucune réservation en ligne : vous perdez des clients qui réservent chez vos concurrents en 2 clics",
      "Votre site actuel est lent sur mobile, alors que 75 % de vos visiteurs utilisent leur téléphone",
      "Le design de votre site ne reflète pas l'ambiance et la qualité de votre établissement",
    ],
    features: [
      "Menu interactif avec photos et filtres (allergènes, végétarien, prix)",
      "Module de réservation en ligne intégré, synchronisé avec votre planning",
      "Design mobile-first pensé pour la consultation rapide en déplacement",
      "Intégration Google Maps, avis Google et fiche Google My Business",
      "Calendrier d'événements et soirées spéciales",
      "Galerie photo immersive qui met en valeur vos plats et votre salle",
    ],
    associatedService: "site-vitrine",
    ctaText: "Obtenez un site qui remplit vos tables",
    faq: [
      {
        question: "Puis-je modifier le menu moi-même ?",
        answer:
          "Oui, nous mettons en place un système simple qui vous permet de modifier vos plats, prix et descriptions en toute autonomie, sans compétence technique.",
      },
      {
        question: "Le système de réservation est-il inclus ?",
        answer:
          "Oui, nous intégrons un module de réservation directement dans votre site. Les réservations arrivent dans votre boîte mail et peuvent être synchronisées avec votre outil de gestion existant.",
      },
      {
        question: "Combien coûte un site web pour restaurant ?",
        answer:
          "Nos sites pour restaurants démarrent à 80 €/mois, tout inclus : design sur mesure, hébergement, maintenance et support. Pas de frais cachés ni d'engagement de longue durée.",
      },
      {
        question: "Combien de temps faut-il pour créer le site ?",
        answer:
          "En moyenne, votre site est en ligne sous 3 semaines. Nous travaillons avec vous sur le design, intégrons votre contenu et assurons les tests avant la mise en ligne.",
      },
    ],
  },
  {
    slug: "site-ecommerce-mode",
    name: "Mode",
    title: "Site E-commerce pour la Mode",
    description:
      "Une boutique en ligne sur mesure pour votre marque de mode. Fiches produits immersives, guides de taille intelligents et performances maximales pour convertir vos visiteurs en clients.",
    problems: [
      "Les commissions de Shopify (jusqu'à 2 % par transaction) grignotent vos marges sur chaque vente",
      "La personnalisation limitée des templates ne permet pas de refléter l'identité unique de votre marque",
      "Votre boutique ralentit dès que vous dépassez 500 produits, frustrant vos clients",
      "L'expérience mobile est médiocre : navigation laborieuse, images lentes, checkout compliqué",
    ],
    features: [
      "Pages produits immersives avec zoom haute résolution et vues multiples",
      "Guide de taille intelligent avec recommandations personnalisées",
      "Recherche ultra-rapide avec filtres par couleur, taille, matière et prix",
      "Intégration Instagram et lookbooks pour inspirer vos clients",
      "Système promotionnel avancé : ventes flash, codes promo, remises par palier",
      "Checkout simplifié en 2 étapes pour réduire l'abandon de panier",
    ],
    associatedService: "site-ecommerce",
    ctaText: "Lancez votre boutique en ligne sur mesure",
    faq: [
      {
        question: "Puis-je migrer depuis Shopify sans perdre mes données ?",
        answer:
          "Oui, nous assurons la migration complète de vos produits, clients, historique de commandes et avis. La transition se fait en douceur, sans interruption de vente.",
      },
      {
        question: "Comment gérer le stock et les variantes de taille/couleur ?",
        answer:
          "Nous développons un back-office adapté à la mode avec gestion des variantes (taille, couleur, matière), suivi de stock en temps réel et alertes automatiques de réapprovisionnement.",
      },
      {
        question: "Le site peut-il supporter les pics de trafic (soldes, Black Friday) ?",
        answer:
          "Absolument. L'architecture est conçue pour gérer des pics importants sans ralentissement. Vos clients bénéficient d'une expérience fluide même en période de forte affluence.",
      },
    ],
  },
  {
    slug: "site-vitrine-artisan",
    name: "Artisan",
    title: "Site Vitrine pour Artisan",
    description:
      "Un site vitrine professionnel qui met en valeur votre savoir-faire artisanal. Portfolio de réalisations, demande de devis en ligne et référencement local optimisé pour que vos futurs clients vous trouvent.",
    problems: [
      "Vous n'avez aucune présence en ligne : vos futurs clients ne vous trouvent pas sur Google",
      "Vous comptez uniquement sur le bouche-à-oreille, ce qui limite votre zone de chalandise",
      "Vous ne pouvez pas montrer vos réalisations autrement qu'en rendez-vous physique",
      "Vos concurrents qui ont un site web captent les clients avant vous",
    ],
    features: [
      "Galerie portfolio avec photos avant/après et descriptions de chaque réalisation",
      "Formulaire de demande de devis structuré avec description du projet et budget",
      "Section avis clients intégrée pour rassurer les prospects",
      "Optimisation Google My Business et référencement local",
      "Carte interactive de votre zone d'intervention",
      "Page de présentation de votre parcours, certifications et savoir-faire",
    ],
    associatedService: "site-vitrine",
    ctaText: "Montrez votre savoir-faire en ligne",
    faq: [
      {
        question: "Ai-je besoin de compétences techniques pour gérer le site ?",
        answer:
          "Aucune. Nous vous livrons un site clé en main et vous montrons comment ajouter vos réalisations et modifier vos textes en quelques clics. C'est aussi simple que poster sur les réseaux sociaux.",
      },
      {
        question: "Le site m'aidera-t-il à apparaître sur Google ?",
        answer:
          "Oui, c'est l'un des objectifs principaux. Nous optimisons votre site pour les recherches locales (ex : « plombier Montpellier ») et configurons votre fiche Google My Business pour maximiser votre visibilité.",
      },
      {
        question: "Puis-je recevoir des demandes de devis directement depuis le site ?",
        answer:
          "Oui. Un formulaire de demande de devis structuré permet à vos prospects de décrire leur projet. Vous recevez les demandes par email avec toutes les informations nécessaires pour répondre rapidement.",
      },
      {
        question: "Un site vitrine, ça coûte combien ?",
        answer:
          "Nos sites vitrines pour artisans démarrent à 80 €/mois, avec design sur mesure, hébergement, maintenance et support inclus. Pas de frais de création initiaux.",
      },
    ],
  },
  {
    slug: "plateforme-saas-startup",
    name: "Startup SaaS",
    title: "Plateforme SaaS pour Startup",
    description:
      "Développez votre plateforme SaaS sur mesure avec une architecture scalable, un onboarding fluide et des analytics intégrés. Du MVP au scale-up, nous construisons le produit qui accélère votre croissance.",
    problems: [
      "Votre MVP doit être livré rapidement pour valider votre marché avant que la concurrence ne vous rattrape",
      "Vous vous inquiétez de la scalabilité : votre architecture tiendra-t-elle avec 10 000 utilisateurs ?",
      "L'onboarding utilisateur est complexe et votre taux d'activation reste trop bas",
      "Vous manquez de visibilité sur l'usage de votre produit : pas de dashboards analytics fiables",
    ],
    features: [
      "Authentification complète avec gestion des rôles, permissions et SSO",
      "Facturation par abonnement avec Stripe : essais gratuits, plans, surclassements",
      "Dashboard d'administration avec métriques clés (MRR, churn, activation)",
      "Intégrations API tierces : CRM, email marketing, outils de productivité",
      "Fonctionnalités temps réel : notifications, chat, mises à jour collaboratives",
      "Infrastructure scalable avec déploiement continu et monitoring",
    ],
    associatedService: "application-web",
    ctaText: "Construisons votre plateforme SaaS",
    faq: [
      {
        question: "En combien de temps pouvez-vous livrer un MVP ?",
        answer:
          "Un MVP fonctionnel peut être livré en 6 à 8 semaines. Nous priorisons les fonctionnalités essentielles pour valider votre marché rapidement, avec une base technique solide pour les itérations suivantes.",
      },
      {
        question: "Quelles technologies utilisez-vous pour le SaaS ?",
        answer:
          "Nous construisons sur Next.js, React, TypeScript et Supabase. Cette stack offre performance, temps réel natif, authentification intégrée et une scalabilité éprouvée par des milliers de SaaS en production.",
      },
      {
        question: "Pouvez-vous reprendre un projet existant ?",
        answer:
          "Oui. Nous réalisons un audit technique de votre codebase existante, identifions les points de blocage et proposons un plan d'action pour stabiliser, optimiser et faire évoluer votre produit.",
      },
      {
        question: "Comment gérez-vous la scalabilité ?",
        answer:
          "L'architecture est conçue dès le départ pour scaler : base de données avec read replicas, cache intelligent, workers asynchrones et déploiement sur infrastructure edge pour des temps de réponse minimaux partout dans le monde.",
      },
    ],
  },
]

export function getSectorBySlug(slug: string): SectorData | undefined {
  return sectors.find((sector) => sector.slug === slug)
}
