export interface Service {
  slug: string
  title: string
  shortTitle: string
  description: string
  shortDescription: string
  icon: string
  features: { title: string; description: string }[]
  benefits: string[]
  pricing: { label: string; detail: string }
  problem: { title: string; points: string[] }
  solution: { title: string; points: string[] }
  testimonial: { name: string; company: string; quote: string }
  faq: { question: string; answer: string }[]
  metadata: { title: string; description: string }
}

export const services: Service[] = [
  {
    slug: "site-vitrine",
    title: "Site Vitrine Sur Mesure",
    shortTitle: "Site Vitrine",
    description:
      "Un site vitrine codé à la main, rapide, sécurisé et optimisé pour le référencement. Fini les sites WordPress lents et vulnérables : chaque ligne de code est écrite pour performer.",
    shortDescription:
      "Conception sur mesure, codée à la main. Rapide, sécurisé et optimisé SEO.",
    icon: "Monitor",
    features: [
      {
        title: "Design sur mesure",
        description:
          "Chaque page est conçue selon votre identité visuelle. Pas de template générique : un design unique qui vous ressemble.",
      },
      {
        title: "Performance optimale",
        description:
          "Temps de chargement inférieur à 1 seconde grâce à un code optimisé, sans plugins inutiles ni frameworks lourds.",
      },
      {
        title: "SEO technique intégré",
        description:
          "Balisage sémantique, données structurées, sitemap, robots.txt et Core Web Vitals optimisés dès la mise en ligne.",
      },
      {
        title: "Responsive & accessible",
        description:
          "Adapté à tous les écrans (mobile, tablette, desktop) et conforme aux normes d'accessibilité WCAG 2.1.",
      },
    ],
    benefits: [
      "Temps de chargement < 1 seconde",
      "Score Lighthouse 95+ sur les 4 métriques",
      "Zéro vulnérabilité connue à la livraison",
      "Hébergement et maintenance inclus",
      "Accompagnement personnalisé de A à Z",
    ],
    pricing: {
      label: "À partir de 80 €/mois",
      detail:
        "Sans engagement de durée. Inclut l'hébergement, la maintenance et le support technique.",
    },
    problem: {
      title: "Votre site WordPress vous freine",
      points: [
        "Temps de chargement supérieur à 3 secondes qui fait fuir vos visiteurs",
        "Mises à jour de plugins qui cassent régulièrement votre site",
        "Vulnérabilités de sécurité récurrentes liées à WordPress et ses extensions",
        "Coûts cachés : thèmes premium, plugins payants, hébergement spécialisé",
      ],
    },
    solution: {
      title: "Un site codé à la main, sans compromis",
      points: [
        "Code sur mesure : aucun plugin, aucune dépendance inutile, performance maximale",
        "Chargement en moins d'une seconde sur mobile comme sur desktop",
        "Sécurité renforcée : zéro vulnérabilité liée aux CMS ou extensions tierces",
        "Maintenance simplifiée et coûts prévisibles chaque mois",
      ],
    },
    testimonial: {
      name: "Sophie Durand",
      company: "Atelier Fleur de Sel",
      quote:
        "Notre ancien site WordPress mettait 5 secondes à charger. Depuis la refonte par Kaelix, c'est instantané. Nos demandes de devis ont augmenté de 40% en trois mois.",
    },
    faq: [
      {
        question: "Pourquoi ne pas utiliser WordPress ?",
        answer:
          "WordPress est un excellent outil pour certains usages, mais il impose des compromis sur la performance, la sécurité et la maintenabilité. En codant votre site à la main, nous éliminons ces contraintes pour vous offrir un site plus rapide, plus sûr et plus économique à long terme.",
      },
      {
        question: "Combien de temps prend la création d'un site vitrine ?",
        answer:
          "En moyenne, comptez 2 à 4 semaines entre le brief initial et la mise en ligne. Ce délai inclut le design, le développement, les retours et les ajustements.",
      },
      {
        question: "Puis-je modifier le contenu moi-même ?",
        answer:
          "Oui. Nous intégrons un système de gestion de contenu headless qui vous permet de modifier textes et images en toute autonomie, sans toucher au code.",
      },
      {
        question: "Que se passe-t-il si je veux arrêter l'abonnement ?",
        answer:
          "Vous êtes libre d'arrêter à tout moment, sans frais de résiliation. Nous vous fournissons l'intégralité du code source et vous accompagnons dans la transition si nécessaire.",
      },
    ],
    metadata: {
      title: "Site Vitrine Sur Mesure | Kaelix",
      description:
        "Création de sites vitrine codés à la main, rapides et sécurisés. Performance optimale, SEO intégré et design sur mesure. À partir de 80 €/mois.",
    },
  },
  {
    slug: "site-ecommerce",
    title: "Site E-commerce",
    shortTitle: "E-commerce",
    description:
      "Une boutique en ligne sur mesure, sans les limitations de WooCommerce ou Shopify. Checkout personnalisé, intégration Stripe et flexibilité totale pour maximiser vos conversions.",
    shortDescription:
      "Boutique en ligne performante, sans les limitations des plateformes classiques.",
    icon: "ShoppingCart",
    features: [
      {
        title: "Checkout sur mesure",
        description:
          "Un tunnel de conversion optimisé et personnalisé pour votre activité, sans les frictions des solutions clé-en-main.",
      },
      {
        title: "Intégration Stripe",
        description:
          "Paiements sécurisés par carte, Apple Pay, Google Pay et bien plus. Gestion des abonnements et des factures automatisée.",
      },
      {
        title: "Gestion produits avancée",
        description:
          "Variantes, stocks, promotions, codes promo : un back-office complet adapté à vos besoins spécifiques.",
      },
      {
        title: "Performance e-commerce",
        description:
          "Pages produits ultra-rapides, images optimisées automatiquement et navigation fluide pour réduire l'abandon de panier.",
      },
    ],
    benefits: [
      "Zéro commission sur les ventes (contrairement à Shopify)",
      "Checkout optimisé pour maximiser les conversions",
      "Intégration avec vos outils existants (ERP, CRM, logistique)",
      "Scalabilité illimitée sans surcoût de plateforme",
      "Design unique qui reflète votre marque",
    ],
    pricing: {
      label: "Sur devis",
      detail:
        "Chaque projet e-commerce est unique. Nous établissons un devis personnalisé après analyse de vos besoins.",
    },
    problem: {
      title: "Les plateformes e-commerce vous coûtent cher",
      points: [
        "Commissions sur chaque vente qui grignotent vos marges (2 à 5%)",
        "Personnalisation limitée qui empêche de se démarquer de la concurrence",
        "Checkout générique qui ne convertit pas assez",
        "Dépendance à une plateforme qui peut augmenter ses tarifs du jour au lendemain",
      ],
    },
    solution: {
      title: "Une boutique vraiment à vous",
      points: [
        "Zéro commission : vous gardez 100% de vos marges",
        "Tunnel de vente sur mesure, optimisé pour votre audience",
        "Intégration native avec Stripe, vos outils logistiques et votre CRM",
        "Code source qui vous appartient, sans dépendance à une plateforme",
      ],
    },
    testimonial: {
      name: "Marc Lefèvre",
      company: "Maison Provence",
      quote:
        "Depuis que nous avons quitté Shopify pour notre site Kaelix, nous économisons plus de 800€ par mois en commissions. Et notre taux de conversion a augmenté de 25%.",
    },
    faq: [
      {
        question: "Quels moyens de paiement sont supportés ?",
        answer:
          "Via Stripe, nous supportons les cartes bancaires (Visa, Mastercard, Amex), Apple Pay, Google Pay, les virements SEPA et bien d'autres méthodes de paiement locales.",
      },
      {
        question: "Puis-je migrer depuis Shopify ou WooCommerce ?",
        answer:
          "Absolument. Nous assurons la migration complète de vos produits, clients et historique de commandes. La transition se fait sans interruption de service.",
      },
      {
        question: "Comment gérer les stocks et les commandes ?",
        answer:
          "Nous développons un back-office sur mesure adapté à votre flux de travail. Vous pouvez également connecter votre ERP ou outil de gestion existant via API.",
      },
      {
        question: "Le site peut-il gérer un fort trafic (soldes, promotions) ?",
        answer:
          "Oui. L'architecture est conçue pour scaler automatiquement. Pas de ralentissement ni de crash, même lors de pics de trafic importants.",
      },
    ],
    metadata: {
      title: "Site E-commerce Sur Mesure | Kaelix",
      description:
        "Création de boutiques en ligne sur mesure. Zéro commission, checkout optimisé, intégration Stripe. Libérez-vous des plateformes limitantes.",
    },
  },
  {
    slug: "application-web",
    title: "Application Web",
    shortTitle: "Application Web",
    description:
      "Des applications web sur mesure : plateformes SaaS, tableaux de bord, outils internes. Une architecture taillée pour vos processus, avec des fonctionnalités temps réel et des intégrations API.",
    shortDescription:
      "Plateformes SaaS, dashboards et outils internes sur mesure.",
    icon: "AppWindow",
    features: [
      {
        title: "Architecture sur mesure",
        description:
          "Une architecture technique pensée pour votre métier, scalable et maintenable. Pas de compromis imposés par un framework no-code.",
      },
      {
        title: "Temps réel & collaboration",
        description:
          "Notifications instantanées, mises à jour en direct et fonctionnalités collaboratives pour une expérience utilisateur moderne.",
      },
      {
        title: "Intégrations API",
        description:
          "Connexion avec vos outils existants : CRM, ERP, services de paiement, outils de communication et bases de données externes.",
      },
      {
        title: "Sécurité & authentification",
        description:
          "Authentification multi-facteurs, gestion des rôles et permissions, chiffrement des données et conformité RGPD.",
      },
    ],
    benefits: [
      "Solution parfaitement adaptée à vos processus métier",
      "Fonctionnalités temps réel pour une UX moderne",
      "Intégrations API illimitées avec vos outils existants",
      "Scalabilité horizontale pour accompagner votre croissance",
      "Code source et données qui vous appartiennent",
    ],
    pricing: {
      label: "Sur devis",
      detail:
        "Chaque application est un projet unique. Nous définissons ensemble le périmètre et le budget adapté.",
    },
    problem: {
      title: "Les outils standards ne correspondent pas à votre métier",
      points: [
        "Les outils SaaS génériques imposent des workflows qui ne correspondent pas à vos processus",
        "Expérience utilisateur médiocre qui freine l'adoption par vos équipes",
        "Données éparpillées entre plusieurs outils sans connexion entre eux",
        "Coûts d'abonnement qui explosent avec le nombre d'utilisateurs",
      ],
    },
    solution: {
      title: "Une application taillée pour votre métier",
      points: [
        "Architecture conçue autour de vos processus, pas l'inverse",
        "Interface intuitive pensée pour vos utilisateurs réels",
        "Centralisation des données avec des intégrations API sur mesure",
        "Coût fixe et prévisible, indépendant du nombre d'utilisateurs",
      ],
    },
    testimonial: {
      name: "Thomas Bernard",
      company: "LogiTrack Solutions",
      quote:
        "Kaelix a développé notre plateforme de gestion logistique en 3 mois. Nos équipes ont adopté l'outil immédiatement grâce à une UX pensée pour notre métier. On a gagné 2h par jour sur la gestion des livraisons.",
    },
    faq: [
      {
        question: "Quelles technologies utilisez-vous ?",
        answer:
          "Nous utilisons principalement Next.js, React, TypeScript et Supabase. Ces technologies modernes garantissent performance, maintenabilité et une large communauté de développeurs.",
      },
      {
        question: "Combien de temps faut-il pour développer une application ?",
        answer:
          "Cela dépend de la complexité. Un MVP peut être livré en 6 à 8 semaines. Nous travaillons en sprints de 2 semaines avec des livraisons régulières pour que vous puissiez suivre l'avancement.",
      },
      {
        question: "Assurez-vous la maintenance après la livraison ?",
        answer:
          "Oui, nous proposons des contrats de maintenance incluant les mises à jour de sécurité, les corrections de bugs et les évolutions fonctionnelles. Votre application reste performante et à jour.",
      },
      {
        question: "Puis-je faire évoluer l'application après le lancement ?",
        answer:
          "Absolument. L'architecture est conçue pour évoluer. Nous pouvons ajouter de nouvelles fonctionnalités, intégrations ou modules à tout moment.",
      },
    ],
    metadata: {
      title: "Application Web Sur Mesure | Kaelix",
      description:
        "Développement d'applications web sur mesure : SaaS, dashboards, outils internes. Architecture scalable, temps réel et intégrations API.",
    },
  },
  {
    slug: "refonte-site",
    title: "Refonte de Site",
    shortTitle: "Refonte de Site",
    description:
      "Modernisez votre site existant pour qu'il soit plus rapide, plus beau et plus performant. Migration progressive, zéro downtime et résultats mesurables dès les premières semaines.",
    shortDescription:
      "Modernisation et performance. Donnez une seconde vie à votre site web.",
    icon: "RefreshCw",
    features: [
      {
        title: "Audit complet",
        description:
          "Analyse approfondie de votre site actuel : performance, SEO, accessibilité, UX et sécurité. Un diagnostic clair avant toute action.",
      },
      {
        title: "Migration progressive",
        description:
          "Transition en douceur sans interruption de service. Votre site reste en ligne pendant toute la durée de la refonte.",
      },
      {
        title: "Design moderne",
        description:
          "Une nouvelle identité visuelle qui reflète l'évolution de votre entreprise, tout en conservant les éléments qui fonctionnent.",
      },
      {
        title: "Optimisation SEO",
        description:
          "Préservation de votre référencement existant avec redirections 301, et amélioration technique pour gagner en visibilité.",
      },
    ],
    benefits: [
      "Zéro downtime pendant la migration",
      "Conservation de votre référencement existant",
      "Amélioration mesurable des performances (avant/après)",
      "Design responsive et moderne",
      "Formation à la gestion du nouveau site",
    ],
    pricing: {
      label: "À partir de 80 €/mois",
      detail:
        "Le tarif dépend de la complexité de votre site actuel. Audit gratuit pour évaluer le périmètre.",
    },
    problem: {
      title: "Votre site est devenu un frein à votre activité",
      points: [
        "Design daté qui ne reflète plus l'image de votre entreprise",
        "Expérience mobile catastrophique qui fait fuir 60% de vos visiteurs",
        "Temps de chargement qui pénalisent votre référencement Google",
        "Technologies obsolètes qui rendent chaque modification coûteuse et risquée",
      ],
    },
    solution: {
      title: "Une refonte maîtrisée, sans prise de risque",
      points: [
        "Migration progressive : votre site reste en ligne à chaque étape",
        "Stack technique moderne pour des performances durables",
        "Redirections automatiques pour préserver votre SEO existant",
        "Résultats mesurables dès les premières semaines (avant/après documenté)",
      ],
    },
    testimonial: {
      name: "Claire Martin",
      company: "Cabinet Juridique Martin & Associés",
      quote:
        "La refonte de notre site par Kaelix a été transparente pour nos clients. Aucune interruption, et les résultats sont impressionnants : +60% de trafic organique en 2 mois.",
    },
    faq: [
      {
        question: "Mon site sera-t-il hors ligne pendant la refonte ?",
        answer:
          "Non. Nous travaillons sur un environnement de développement séparé. Votre site actuel reste en ligne jusqu'au basculement final, qui se fait en quelques minutes.",
      },
      {
        question: "Vais-je perdre mon référencement actuel ?",
        answer:
          "Non. Nous mettons en place des redirections 301 systématiques et conservons la structure d'URL quand c'est pertinent. Votre référencement est préservé, voire amélioré.",
      },
      {
        question: "Puis-je garder certains éléments de mon site actuel ?",
        answer:
          "Bien sûr. Nous analysons ce qui fonctionne et ce qui doit évoluer. Les contenus performants, les pages bien référencées et les éléments de marque sont conservés et valorisés.",
      },
      {
        question: "Combien de temps dure une refonte complète ?",
        answer:
          "Comptez 3 à 6 semaines selon la taille et la complexité de votre site actuel. Nous vous communiquons un planning détaillé après l'audit initial.",
      },
    ],
    metadata: {
      title: "Refonte de Site Web | Kaelix",
      description:
        "Refonte de site web professionnelle. Migration progressive, zéro downtime, SEO préservé. Modernisez votre présence en ligne. À partir de 80 €/mois.",
    },
  },
  {
    slug: "seo-performance",
    title: "SEO & Performance",
    shortTitle: "SEO & Performance",
    description:
      "Optimisation technique SEO, amélioration des Core Web Vitals et stratégie de contenu pour augmenter votre trafic organique. Des résultats mesurables chaque mois.",
    shortDescription:
      "Optimisation technique continue pour grimper dans les résultats Google.",
    icon: "TrendingUp",
    features: [
      {
        title: "Audit SEO technique",
        description:
          "Analyse complète de votre site : indexation, balisage, vitesse, mobile-friendliness, liens internes et données structurées.",
      },
      {
        title: "Optimisation Core Web Vitals",
        description:
          "Amélioration du LCP, FID et CLS pour atteindre les seuils recommandés par Google et améliorer votre positionnement.",
      },
      {
        title: "Stratégie de contenu",
        description:
          "Recherche de mots-clés, plan éditorial et optimisation des pages existantes pour cibler les requêtes à fort potentiel.",
      },
      {
        title: "Reporting mensuel",
        description:
          "Un rapport clair chaque mois avec l'évolution de vos positions, votre trafic et les actions réalisées.",
      },
    ],
    benefits: [
      "Visibilité accrue sur Google dès les premiers mois",
      "Core Web Vitals dans le vert sur toutes les pages",
      "Trafic organique en croissance continue",
      "Reporting mensuel transparent et actionnable",
      "Pas de jargon : des résultats concrets",
    ],
    pricing: {
      label: "50 €/mois",
      detail:
        "Suivi mensuel, optimisations continues et reporting inclus. Sans engagement de durée.",
    },
    problem: {
      title: "Google ne sait pas que vous existez",
      points: [
        "Votre site n'apparaît pas dans les premiers résultats de recherche",
        "Core Web Vitals dans le rouge : Google vous pénalise",
        "Aucun trafic organique : vous dépendez entièrement de la publicité payante",
        "Pas de suivi ni de visibilité sur vos performances SEO",
      ],
    },
    solution: {
      title: "Un SEO technique qui produit des résultats",
      points: [
        "Audit technique complet et plan d'action prioritaire",
        "Optimisation des Core Web Vitals pour passer dans le vert",
        "Stratégie de contenu ciblée sur les requêtes à fort potentiel commercial",
        "Reporting mensuel avec métriques claires et recommandations actionnables",
      ],
    },
    testimonial: {
      name: "Julie Moreau",
      company: "Yoga Zen Studio",
      quote:
        "En 4 mois de collaboration avec Kaelix, notre trafic organique a triplé. Nous recevons maintenant 15 à 20 demandes par semaine directement depuis Google, sans dépenser un euro en publicité.",
    },
    faq: [
      {
        question: "En combien de temps voit-on des résultats en SEO ?",
        answer:
          "Les premières améliorations techniques (vitesse, Core Web Vitals) sont visibles en quelques jours. Pour le positionnement sur les mots-clés, comptez 2 à 4 mois selon la concurrence dans votre secteur.",
      },
      {
        question: "Faites-vous du SEO off-page (backlinks) ?",
        answer:
          "Nous nous concentrons sur le SEO technique et on-page, qui sont les fondations. Nous pouvons vous conseiller sur une stratégie de netlinking, mais nous ne vendons pas de liens artificiels.",
      },
      {
        question: "Le SEO fonctionne-t-il pour tous les secteurs ?",
        answer:
          "Oui, mais la stratégie varie. Pour un commerce local, nous ciblons le SEO local. Pour un e-commerce, nous optimisons les pages catégories et produits. L'approche est toujours adaptée à votre marché.",
      },
      {
        question: "Que contient le reporting mensuel ?",
        answer:
          "Évolution des positions sur vos mots-clés cibles, trafic organique, Core Web Vitals, pages les plus performantes, et recommandations pour le mois suivant. Tout est présenté de manière claire, sans jargon.",
      },
    ],
    metadata: {
      title: "SEO & Performance Web | Kaelix",
      description:
        "Optimisation SEO technique et Core Web Vitals. Augmentez votre trafic organique avec un suivi mensuel. À partir de 50 €/mois.",
    },
  },
  {
    slug: "maintenance",
    title: "Maintenance & Support",
    shortTitle: "Maintenance",
    description:
      "Un service de maintenance proactif pour garder votre site performant, sécurisé et à jour. Monitoring continu, mises à jour régulières et support réactif inclus dans chaque forfait.",
    shortDescription:
      "Support technique, mises à jour et monitoring continu pour votre sérénité.",
    icon: "Wrench",
    features: [
      {
        title: "Monitoring 24/7",
        description:
          "Surveillance continue de la disponibilité, des performances et de la sécurité de votre site. Alertes en temps réel en cas de problème.",
      },
      {
        title: "Mises à jour régulières",
        description:
          "Mises à jour de sécurité, dépendances et fonctionnalités appliquées régulièrement pour garder votre site à jour.",
      },
      {
        title: "Sauvegardes automatiques",
        description:
          "Sauvegardes quotidiennes automatiques avec possibilité de restauration en quelques minutes en cas de besoin.",
      },
      {
        title: "Support réactif",
        description:
          "Une équipe disponible pour répondre à vos questions et résoudre vos problèmes. Réponse garantie sous 24h ouvrées.",
      },
    ],
    benefits: [
      "Inclus dans chaque forfait Kaelix",
      "Monitoring 24/7 avec alertes en temps réel",
      "Réponse garantie sous 24h ouvrées",
      "Sauvegardes quotidiennes automatiques",
      "Tranquillité d'esprit totale",
    ],
    pricing: {
      label: "Inclus dans chaque forfait",
      detail:
        "La maintenance est incluse dans tous nos forfaits. Pas de surcoût caché, pas de surprise sur votre facture.",
    },
    problem: {
      title: "Personne ne s'occupe de votre site",
      points: [
        "Aucun interlocuteur à contacter quand un problème survient",
        "Dépendances et technologies obsolètes qui créent des failles de sécurité",
        "Aucune sauvegarde : un crash pourrait tout effacer",
        "Performances qui se dégradent progressivement sans que personne ne s'en aperçoive",
      ],
    },
    solution: {
      title: "Une maintenance proactive, pas réactive",
      points: [
        "Monitoring continu : les problèmes sont détectés et résolus avant que vous ne les remarquiez",
        "Mises à jour régulières de sécurité et de dépendances",
        "Sauvegardes quotidiennes avec restauration rapide",
        "Un interlocuteur dédié qui connaît votre projet et répond sous 24h",
      ],
    },
    testimonial: {
      name: "Antoine Petit",
      company: "Brasserie du Midi",
      quote:
        "Avant Kaelix, notre site tombait en panne tous les mois et personne ne savait le réparer. Maintenant, je ne m'en occupe plus du tout. Tout est géré, mis à jour et sauvegardé automatiquement.",
    },
    faq: [
      {
        question: "La maintenance est-elle vraiment incluse ?",
        answer:
          "Oui, sans surcoût. Chaque forfait Kaelix inclut la maintenance technique, les mises à jour de sécurité, le monitoring et le support. C'est notre engagement qualité.",
      },
      {
        question: "Que se passe-t-il en cas de panne ?",
        answer:
          "Notre monitoring détecte les pannes en temps réel. Nous intervenons immédiatement, généralement avant même que vous ne vous en aperceviez. En cas de problème majeur, nous restaurons une sauvegarde en quelques minutes.",
      },
      {
        question: "Puis-je demander des modifications sur mon site ?",
        answer:
          "Les modifications mineures (textes, images, ajustements) sont incluses dans la maintenance. Pour des évolutions plus importantes, nous établissons un devis séparé.",
      },
      {
        question: "Quel est le délai de réponse du support ?",
        answer:
          "Nous garantissons une première réponse sous 24h ouvrées. Pour les urgences (site hors ligne, faille de sécurité), l'intervention est immédiate.",
      },
    ],
    metadata: {
      title: "Maintenance & Support Web | Kaelix",
      description:
        "Maintenance proactive incluse dans chaque forfait : monitoring 24/7, mises à jour, sauvegardes et support réactif. Votre site entre de bonnes mains.",
    },
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}
