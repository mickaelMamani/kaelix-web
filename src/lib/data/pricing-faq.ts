export interface FaqItem {
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    question: "Y a-t-il des frais d\u2019entr\u00E9e ou de setup ?",
    answer:
      "Non, aucun frais d\u2019entr\u00E9e. Nous prenons en charge la conception, le d\u00E9veloppement et la mise en ligne de votre site dans le cadre de votre abonnement mensuel. Vous commencez \u00E0 payer uniquement \u00E0 la livraison de votre site.",
  },
  {
    question: "Que se passe-t-il si je r\u00E9silie ?",
    answer:
      "Vous \u00EAtes libre de r\u00E9silier \u00E0 tout moment, sans p\u00E9nalit\u00E9. \u00C0 la r\u00E9siliation, nous vous transf\u00E9rons l\u2019int\u00E9gralit\u00E9 du code source de votre site. Vous restez propri\u00E9taire de votre contenu et de votre nom de domaine.",
  },
  {
    question: "Le forfait inclut-il l\u2019h\u00E9bergement ?",
    answer:
      "Oui, l\u2019h\u00E9bergement premium est inclus dans le forfait Site Vitrine. Nous utilisons une infrastructure moderne et performante (Vercel / Cloudflare) qui garantit des temps de chargement ultra-rapides et une disponibilit\u00E9 de 99,9%.",
  },
  {
    question: "Puis-je modifier mon site moi-m\u00EAme ?",
    answer:
      "Oui, nous mettons en place un syst\u00E8me de gestion de contenu (CMS) simple et intuitif qui vous permet de modifier vos textes, images et contenus en toute autonomie. Pour les modifications structurelles, notre \u00E9quipe s\u2019en charge dans le cadre de la maintenance incluse.",
  },
  {
    question: "Combien de temps pour livrer un site ?",
    answer:
      "En moyenne, un site vitrine est livr\u00E9 en 2 \u00E0 4 semaines apr\u00E8s validation du cahier des charges. Les projets e-commerce ou SaaS n\u00E9cessitent g\u00E9n\u00E9ralement 4 \u00E0 8 semaines selon la complexit\u00E9.",
  },
  {
    question: "Proposez-vous des r\u00E9ductions annuelles ?",
    answer:
      "Oui, nous proposons une r\u00E9duction de 10% pour un engagement annuel. Contactez-nous pour en savoir plus sur nos formules et obtenir un tarif personnalis\u00E9 adapt\u00E9 \u00E0 vos besoins.",
  },
  {
    question: "Que comprend exactement la maintenance ?",
    answer:
      "La maintenance inclut les mises \u00E0 jour de s\u00E9curit\u00E9, le monitoring de performance, les sauvegardes automatiques quotidiennes, les correctifs de bugs et les petites modifications de contenu. Vous b\u00E9n\u00E9ficiez \u00E9galement d\u2019un support r\u00E9actif par email.",
  },
  {
    question: "Comment fonctionne le paiement ?",
    answer:
      "Le paiement s\u2019effectue par pr\u00E9l\u00E8vement automatique mensuel via Stripe, une plateforme de paiement s\u00E9curis\u00E9e. Vous recevez une facture d\u00E9taill\u00E9e chaque mois. Aucun engagement minimum n\u2019est requis.",
  },
]
