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
  title: "Alternative à WordPress : Performance et Modernité | Kaelix",
  description:
    "WordPress ralentit votre site ? Découvrez pourquoi Next.js est l'alternative moderne : 3x plus rapide, plus sécurisé, mieux référencé. Comparatif détaillé.",
  path: "/alternative-wordpress-performance",
})

const tableOfContents = [
  { id: "limites-wordpress", label: "Les limites de WordPress" },
  { id: "pourquoi-migrer", label: "Pourquoi migrer ?" },
  { id: "comparatif", label: "Next.js vs WordPress" },
  { id: "processus-migration", label: "Processus de migration" },
  { id: "faq", label: "FAQ" },
]

const faqItems = [
  {
    question: "La migration depuis WordPress est-elle risquée ?",
    answer:
      "Non. Nous procédons par étapes avec un site de pré-production accessible pour validation. Votre site WordPress reste en ligne jusqu'à ce que le nouveau site soit validé et prêt. La transition se fait en quelques heures, avec redirection automatique des anciennes URLs pour préserver votre référencement.",
  },
  {
    question: "Vais-je perdre mon référencement Google en migrant ?",
    answer:
      "Au contraire. Nous mettons en place des redirections 301 systématiques pour conserver votre historique SEO. En parallèle, les performances nettement supérieures du nouveau site améliorent vos Core Web Vitals, un facteur de classement important pour Google. Nos clients constatent en moyenne une amélioration de 20 à 40 % de leur trafic organique après migration.",
  },
  {
    question: "Dois-je recréer tout mon contenu ?",
    answer:
      "Non. Nous migrons l'intégralité de votre contenu existant : textes, images, articles de blog, pages. C'est l'occasion de restructurer et d'optimiser votre contenu pour le SEO, mais rien n'est perdu dans la transition.",
  },
]

export default function AlternativeWordPressPage() {
  return (
    <>
      <JsonLd
        data={articleSchema(
          "Alternative à WordPress : Performance et Modernité",
          "Comparatif complet WordPress vs Next.js : performances, sécurité, SEO, coûts. Guide de migration vers une solution moderne.",
          "/alternative-wordpress-performance",
          "2025-02-10",
          "2025-06-01",
          "Kaelix"
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          {
            name: "Alternative à WordPress",
            url: "/alternative-wordpress-performance",
          },
        ])}
      />
      <JsonLd data={organizationSchema()} />
      <JsonLd data={faqSchema(faqItems)} />

      <PillarPageLayout
        label="Comparatif"
        title="Alternative à WordPress : Performance et Modernité"
        description="WordPress propulse 43 % du web, mais est-ce encore le bon choix pour votre entreprise ? Découvrez pourquoi de plus en plus d'entreprises migrent vers des solutions modernes."
        tableOfContents={tableOfContents}
      >
        {/* Section 1 */}
        <h2 id="limites-wordpress">Les limites de WordPress en 2025</h2>
        <p>
          WordPress a été créé en 2003 comme un outil de blog. Vingt ans plus tard, il
          propulse toujours des millions de sites, mais son architecture n&apos;a pas été
          conçue pour les exigences du web moderne. Les utilisateurs attendent des pages qui
          chargent en moins d&apos;une seconde, Google pénalise les sites lents, et les
          cyberattaques ciblent massivement les installations WordPress.
        </p>
        <p>
          Voici les principaux problèmes que rencontrent les propriétaires de sites WordPress :
        </p>
        <ul>
          <li>
            <strong>Lenteur chronique :</strong> chaque page nécessite une requête à la base
            de données MySQL, l&apos;exécution de PHP côté serveur, et le chargement de
            dizaines de fichiers CSS et JavaScript. Résultat : un temps de chargement moyen
            de 3 à 5 secondes, là où Google recommande moins de 2,5 secondes.
          </li>
          <li>
            <strong>Failles de sécurité :</strong> 90 % des sites piratés en 2024 tournaient
            sous WordPress. Les plugins tiers, souvent mal maintenus, constituent la
            principale porte d&apos;entrée pour les attaquants.
          </li>
          <li>
            <strong>Dépendance aux plugins :</strong> un site WordPress moyen utilise 20 à
            30 plugins. Chacun ajoute du poids, des risques de conflit et des coûts
            d&apos;abonnement (SEO, cache, sécurité, formulaires, sauvegarde...).
          </li>
          <li>
            <strong>Maintenance lourde :</strong> mises à jour WordPress, mises à jour de
            thème, mises à jour de plugins, sauvegardes, monitoring de sécurité... La
            maintenance d&apos;un site WordPress demande un effort constant et coûteux.
          </li>
          <li>
            <strong>Design limité :</strong> même avec des page builders comme Elementor ou
            Divi, le design reste contraint par les possibilités du thème. Le code généré est
            souvent bloated et nuit aux performances.
          </li>
        </ul>

        {/* Section 2 */}
        <h2 id="pourquoi-migrer">Pourquoi migrer vers une solution moderne ?</h2>
        <p>
          Migrer depuis WordPress ne signifie pas simplement changer d&apos;outil : c&apos;est
          adopter une <strong>architecture fondamentalement différente</strong> qui résout
          les problèmes à la racine. Les frameworks modernes comme Next.js génèrent des pages
          HTML statiques ou les rendent côté serveur, éliminant le besoin d&apos;une base de
          données pour chaque affichage.
        </p>
        <p>
          Les bénéfices concrets d&apos;une migration sont mesurables dès la mise en ligne :
        </p>
        <ul>
          <li>
            <strong>Score Lighthouse de 95+/100</strong> contre 50 à 70 pour un site
            WordPress moyen, ce qui améliore directement votre positionnement Google.
          </li>
          <li>
            <strong>Temps de chargement divisé par 3 à 5</strong>, passant de 3-5 secondes à
            moins d&apos;une seconde. Chaque seconde gagnée augmente le taux de conversion
            de 7 %.
          </li>
          <li>
            <strong>Zéro faille de sécurité WordPress</strong> : plus de plugins vulnérables,
            plus de mises à jour critiques urgentes, plus de base de données SQL à protéger.
          </li>
          <li>
            <strong>Coût de maintenance réduit de moitié</strong> : pas de licences de plugins,
            pas de conflits de mise à jour, pas de serveur PHP à administrer.
          </li>
        </ul>
        <p>
          Découvrez comment nous accompagnons cette transition sur notre{" "}
          <Link href="/process">page processus</Link>.
        </p>

        {/* Section 3 - Comparison table */}
        <h2 id="comparatif">Comparatif : Next.js vs WordPress</h2>
        <p>
          Ce tableau compare les deux approches sur les critères qui comptent le plus pour
          votre entreprise :
        </p>
        <table>
          <thead>
            <tr>
              <th>Critère</th>
              <th>WordPress</th>
              <th>Next.js (Kaelix)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Temps de chargement</td>
              <td>3 - 5 secondes</td>
              <td>&lt; 1 seconde</td>
            </tr>
            <tr>
              <td>Score Lighthouse</td>
              <td>50 - 70</td>
              <td>95 - 100</td>
            </tr>
            <tr>
              <td>Sécurité</td>
              <td>Plugins vulnérables, mises à jour fréquentes</td>
              <td>Pas de surface d&apos;attaque CMS</td>
            </tr>
            <tr>
              <td>SEO technique</td>
              <td>Dépend des plugins (Yoast, Rank Math)</td>
              <td>Natif, optimisé au niveau du code</td>
            </tr>
            <tr>
              <td>Coût mensuel (hébergement + maintenance)</td>
              <td>50 - 200 €/mois</td>
              <td>À partir de 80 €/mois tout inclus</td>
            </tr>
            <tr>
              <td>Design</td>
              <td>Limité par le thème</td>
              <td>100 % sur mesure</td>
            </tr>
            <tr>
              <td>Mobile</td>
              <td>Responsive basique</td>
              <td>Mobile-first, performances optimisées</td>
            </tr>
            <tr>
              <td>Mise à jour contenu</td>
              <td>Back-office WordPress</td>
              <td>Interface admin simplifiée</td>
            </tr>
          </tbody>
        </table>

        {/* Section 4 */}
        <h2 id="processus-migration">Le processus de migration en 5 étapes</h2>
        <p>
          Migrer depuis WordPress ne se fait pas en un clic, mais notre processus rodé garantit
          une transition fluide et sans risque pour votre activité :
        </p>
        <ol>
          <li>
            <strong>Audit de l&apos;existant :</strong> nous analysons votre site WordPress
            actuel (contenu, structure, URLs, performance, SEO) pour définir le périmètre de
            la migration. Cet audit est{" "}
            <Link href="/audit-gratuit">disponible gratuitement</Link>.
          </li>
          <li>
            <strong>Design et maquettes :</strong> nous concevons le nouveau design en tenant
            compte de votre identité de marque et des bonnes pratiques UX/UI. Vous validez
            les maquettes avant le développement.
          </li>
          <li>
            <strong>Développement :</strong> nous codons votre nouveau site avec Next.js,
            React et Tailwind CSS. Le code est propre, performant et documenté. Vous accédez
            à un environnement de pré-production pour suivre l&apos;avancement.
          </li>
          <li>
            <strong>Migration du contenu :</strong> textes, images, articles de blog, métadonnées
            SEO... tout est transféré et optimisé. Nous mettons en place des redirections 301
            pour chaque URL qui change.
          </li>
          <li>
            <strong>Mise en ligne et suivi :</strong> la transition se fait en quelques heures.
            Nous surveillons les performances, le référencement et le bon fonctionnement
            pendant les semaines qui suivent.
          </li>
        </ol>
        <p>
          Pour en savoir plus, consultez nos{" "}
          <Link href="/tarifs">tarifs de migration</Link> ou demandez directement un{" "}
          <Link href="/audit-gratuit">audit gratuit</Link>.
        </p>

        {/* Section 5 - FAQ */}
        <h2 id="faq">Questions fréquentes</h2>
        {faqItems.map((item) => (
          <div key={item.question} className="mb-6">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}

        <p>
          Consultez nos{" "}
          <Link href="/realisations">réalisations</Link> pour voir des
          exemples concrets de migrations WordPress réussies.
        </p>
      </PillarPageLayout>

      <CtaSection />
    </>
  )
}
