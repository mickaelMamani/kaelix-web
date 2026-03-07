import type { Metadata } from "next"
import Link from "next/link"

import { generatePageMetadata } from "@/lib/metadata"
import {
  articleSchema,
  breadcrumbSchema,
  organizationSchema,
  faqSchema,
} from "@/lib/structured-data"
import { JsonLd } from "@/components/shared/json-ld"
import { PillarPageLayout } from "@/components/public/pillar/pillar-page-layout"
import { CtaSection } from "@/components/public/cta-section"

export const metadata: Metadata = generatePageMetadata({
  title: "Développement de Site Web Sur Mesure | Kaelix",
  description:
    "Découvrez les avantages du développement web sur mesure : performances, SEO, flexibilité. Sites codés à la main avec Next.js, React et Tailwind CSS.",
  path: "/developpement-site-sur-mesure",
})

const tableOfContents = [
  { id: "definition", label: "Qu'est-ce qu'un site sur mesure ?" },
  { id: "avantages", label: "Avantages vs CMS" },
  { id: "technologies", label: "Technologies utilisées" },
  { id: "investissement", label: "Modèle tarifaire" },
  { id: "exemples", label: "Exemples de réalisations" },
  { id: "faq", label: "FAQ" },
]

const faqItems = [
  {
    question: "Combien de temps faut-il pour développer un site sur mesure ?",
    answer:
      "En moyenne, un site vitrine sur mesure est livré en 2 à 4 semaines. Pour les applications web plus complexes, comptez 6 à 12 semaines. Nous travaillons en sprints avec des livrables intermédiaires pour que vous puissiez suivre l'avancement en temps réel.",
  },
  {
    question: "Un site sur mesure coûte-t-il plus cher qu'un site WordPress ?",
    answer:
      "Le coût initial est comparable grâce à notre modèle d'abonnement à partir de 80 €/mois. En revanche, le coût total de possession est nettement inférieur : pas de plugins payants, pas de failles de sécurité WordPress à colmater, pas de ralentissements nécessitant des optimisations coûteuses.",
  },
  {
    question: "Puis-je modifier le contenu de mon site moi-même ?",
    answer:
      "Absolument. Nous mettons en place une interface d'administration simple et intuitive qui vous permet de modifier vos textes, images et contenus en toute autonomie. Pour les modifications structurelles, notre équipe intervient dans le cadre de votre abonnement.",
  },
]

export default function DeveloppementSiteSurMesurePage() {
  return (
    <>
      <JsonLd
        data={articleSchema(
          "Développement de Site Web Sur Mesure",
          "Guide complet sur le développement web sur mesure : avantages, technologies, coûts et méthodologie.",
          "/developpement-site-sur-mesure",
          "2025-01-15",
          "2025-06-01",
          "Kaelix"
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          {
            name: "Développement de Site Web Sur Mesure",
            url: "/developpement-site-sur-mesure",
          },
        ])}
      />
      <JsonLd data={organizationSchema()} />
      <JsonLd data={faqSchema(faqItems)} />

      <PillarPageLayout
        label="Guide complet"
        title="Développement de Site Web Sur Mesure"
        description="Tout ce que vous devez savoir sur la création d'un site web codé à la main : pourquoi, comment, avec quelles technologies, et à quel prix."
        tableOfContents={tableOfContents}
      >
        {/* Section 1 */}
        <h2 id="definition">Qu&apos;est-ce qu&apos;un site web sur mesure ?</h2>
        <p>
          Un site web sur mesure est un site dont <strong>chaque ligne de code est écrite
          spécifiquement pour votre projet</strong>. Contrairement aux sites construits sur
          des CMS comme WordPress, Wix ou Squarespace, un site sur mesure ne repose sur aucun
          template préfabriqué. Le design, la structure, les fonctionnalités et les
          performances sont pensés et développés pour répondre exactement à vos besoins.
        </p>
        <p>
          Concrètement, cela signifie que votre site ne contient aucun code superflu, aucun
          plugin inutile et aucune dépendance dont vous n&apos;avez pas besoin. Le résultat
          est un site plus rapide, plus sécurisé et plus facile à maintenir dans la durée.
        </p>
        <p>
          Chez Kaelix, nous utilisons cette approche pour tous nos projets, qu&apos;il
          s&apos;agisse d&apos;un{" "}
          <Link href="/services/site-vitrine">site vitrine</Link> pour un artisan ou d&apos;une{" "}
          <Link href="/services/application-web">application web complexe</Link> pour une
          startup.
        </p>

        {/* Section 2 */}
        <h2 id="avantages">Avantages du sur mesure par rapport aux CMS</h2>
        <p>
          Les CMS traditionnels ont démocratisé la création de sites web, mais ils imposent
          des compromis importants en termes de performance, sécurité et évolutivité. Voici
          pourquoi le développement sur mesure est un meilleur investissement pour les
          entreprises qui veulent se démarquer.
        </p>
        <ul>
          <li>
            <strong>Performance supérieure :</strong> un site sur mesure charge en moins
            d&apos;une seconde, contre 3 à 5 secondes pour un site WordPress moyen. Cette
            différence se traduit directement en meilleur référencement Google et en taux de
            conversion plus élevé.
          </li>
          <li>
            <strong>Sécurité renforcée :</strong> pas de plugins tiers vulnérables, pas de
            base de données SQL exposée, pas de mises à jour critiques à installer en urgence.
            Un site sur mesure réduit la surface d&apos;attaque de plus de 90 %.
          </li>
          <li>
            <strong>SEO natif :</strong> la structure du code est optimisée pour les moteurs
            de recherche dès la conception. Balises sémantiques, données structurées, temps de
            chargement minimal, rendu côté serveur : tout est pensé pour le référencement.
          </li>
          <li>
            <strong>Flexibilité totale :</strong> aucune limitation imposée par un thème ou un
            plugin. Chaque fonctionnalité est développée exactement comme vous la souhaitez.
          </li>
          <li>
            <strong>Coût de maintenance réduit :</strong> pas de licence annuelle de thème,
            pas d&apos;abonnement à des plugins premium, pas de conflits de mise à jour. Le
            coût total de possession est 2x inférieur sur 3 ans.
          </li>
        </ul>

        {/* Section 3 */}
        <h2 id="technologies">Les technologies que nous utilisons</h2>
        <p>
          Notre stack technologique est choisie pour offrir le meilleur équilibre entre
          performance, maintenabilité et expérience développeur. Chaque outil a été sélectionné
          pour des raisons précises.
        </p>
        <ul>
          <li>
            <strong>Next.js :</strong> le framework React de référence pour le web moderne.
            Il offre le rendu côté serveur (SSR), la génération statique (SSG), le routage
            optimisé et un écosystème d&apos;outils de premier plan. Utilisé par Netflix,
            TikTok et Notion.
          </li>
          <li>
            <strong>React :</strong> la bibliothèque d&apos;interface utilisateur la plus
            populaire au monde. Elle permet de construire des interfaces réactives et
            modulaires avec une architecture composant qui facilite la maintenance.
          </li>
          <li>
            <strong>TypeScript :</strong> un sur-ensemble de JavaScript qui ajoute le typage
            statique. Il réduit les bugs de 40 % en moyenne et rend le code plus fiable et
            plus documenté.
          </li>
          <li>
            <strong>Tailwind CSS :</strong> un framework CSS utilitaire qui permet de créer
            des designs sur mesure sans écrire de CSS personnalisé volumineux. Le résultat :
            des fichiers CSS 10x plus légers qu&apos;avec une approche traditionnelle.
          </li>
          <li>
            <strong>Vercel :</strong> la plateforme de déploiement optimisée pour Next.js.
            Elle offre un CDN global, des déploiements automatiques et des performances edge
            computing pour un temps de réponse minimal partout dans le monde.
          </li>
        </ul>

        {/* Section 4 */}
        <h2 id="investissement">Modèle tarifaire : transparent et accessible</h2>
        <p>
          Contrairement aux agences web traditionnelles qui facturent des milliers d&apos;euros
          en amont, nous proposons un <strong>modèle d&apos;abonnement mensuel tout
          compris</strong>. Ce modèle rend le développement sur mesure accessible aux TPE et PME
          qui ne souhaitent pas immobiliser un budget important dès le départ.
        </p>
        <p>
          Notre offre inclut la conception, le développement, l&apos;hébergement, la
          maintenance et le support technique. Pas de frais cachés, pas de surcoûts
          imprévus. Vous connaissez votre budget mensuel dès le premier jour.
        </p>
        <p>
          Pour découvrir nos formules détaillées et trouver celle qui correspond à votre
          projet, consultez notre{" "}
          <Link href="/tarifs">page tarifs</Link>.
        </p>

        {/* Section 5 */}
        <h2 id="exemples">Exemples de réalisations</h2>
        <p>
          Nos clients viennent de secteurs variés : restauration, artisanat, e-commerce,
          startups SaaS. Chaque projet est unique, mais tous partagent les mêmes
          fondamentaux : un code propre, des performances exceptionnelles et un design qui
          reflète l&apos;identité de la marque.
        </p>
        <p>
          Un restaurateur montpelliérain a vu ses réservations en ligne augmenter de 200 %
          après la mise en ligne de son nouveau site. Un artisan plombier a doublé ses
          demandes de devis grâce à un référencement local optimisé. Une startup SaaS a
          réduit son temps de chargement de 4 secondes à 0,8 seconde, améliorant son taux
          d&apos;activation de 35 %.
        </p>
        <p>
          Découvrez tous nos projets sur notre{" "}
          <Link href="/realisations">page réalisations</Link>.
        </p>

        {/* Section 6 - FAQ */}
        <h2 id="faq">Questions fréquentes</h2>
        {faqItems.map((item) => (
          <div key={item.question} className="mb-6">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}

        <p>
          Vous avez d&apos;autres questions ? Demandez un{" "}
          <Link href="/audit-gratuit">audit gratuit</Link> de votre site
          actuel et nous vous répondrons en détail sous 48h.
        </p>
      </PillarPageLayout>

      <CtaSection />
    </>
  )
}
