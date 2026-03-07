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
  title: "Agence Web pour TPE-PME | Sites sur mesure dès 80 €/mois | Kaelix",
  description:
    "Votre TPE ou PME mérite un vrai site web, pas un template. Sites codés à la main, tout inclus dès 80 €/mois. Hébergement, maintenance et support compris.",
  path: "/agence-web-tpe-pme",
})

const tableOfContents = [
  { id: "pourquoi", label: "Pourquoi un vrai site web ?" },
  { id: "modele", label: "Le modèle 80 €/mois" },
  { id: "inclus", label: "Ce qui est inclus" },
  { id: "demarrer", label: "Comment démarrer" },
  { id: "faq", label: "FAQ" },
]

const faqItems = [
  {
    question: "Dois-je payer des frais de création en plus de l'abonnement ?",
    answer:
      "Non. Notre modèle est conçu pour être simple : un abonnement mensuel unique qui couvre la conception, le développement, l'hébergement, la maintenance et le support. Aucun frais de création, aucun coût caché, aucune surprise sur votre facture.",
  },
  {
    question: "Que se passe-t-il si je veux arrêter l'abonnement ?",
    answer:
      "Vous êtes libre d'arrêter à tout moment après la période d'engagement initiale de 12 mois. Si vous décidez d'arrêter, nous vous fournissons l'intégralité du code source de votre site. Votre site vous appartient, nous n'en gardons rien.",
  },
  {
    question: "Mon activité est petite, ai-je vraiment besoin d'un site sur mesure ?",
    answer:
      "C'est justement les petites entreprises qui en bénéficient le plus. Un site sur mesure performant et bien référencé peut vous faire gagner des dizaines de clients par mois là où un site WordPress mal optimisé reste invisible. C'est un investissement rentable dès le premier mois.",
  },
]

export default function AgenceWebTpePmePage() {
  return (
    <>
      <JsonLd
        data={articleSchema(
          "Agence Web pour TPE-PME",
          "Guide complet pour les TPE et PME : pourquoi investir dans un site web professionnel, le modèle d'abonnement tout compris et comment démarrer.",
          "/agence-web-tpe-pme",
          "2025-03-01",
          "2025-06-01",
          "Kaelix"
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Agence Web pour TPE-PME", url: "/agence-web-tpe-pme" },
        ])}
      />
      <JsonLd data={organizationSchema()} />
      <JsonLd data={faqSchema(faqItems)} />

      <PillarPageLayout
        label="TPE & PME"
        title="Agence Web pour TPE-PME"
        description="Les petites entreprises méritent de vrais sites web, pas des templates génériques. Découvrez comment obtenir un site professionnel, performant et sur mesure à partir de 80 €/mois."
        tableOfContents={tableOfContents}
      >
        {/* Section 1 */}
        <h2 id="pourquoi">Pourquoi votre TPE/PME mérite un vrai site web</h2>
        <p>
          En France, <strong>37 % des TPE n&apos;ont toujours pas de site web</strong>. Parmi
          celles qui en ont un, la majorité utilisent des solutions low-cost qui nuisent à
          leur image et à leur visibilité. Un site lent construit sur un template Wix ou
          WordPress gratuit envoie un signal négatif à vos prospects : si votre site n&apos;est
          pas professionnel, votre entreprise l&apos;est-elle ?
        </p>
        <p>
          À l&apos;ère où 81 % des consommateurs recherchent une entreprise en ligne avant de
          la contacter, votre site web est souvent le premier point de contact avec vos futurs
          clients. Il doit charger rapidement, s&apos;afficher parfaitement sur mobile, inspirer
          confiance et apparaître dans les premiers résultats de Google.
        </p>
        <p>
          Un site web professionnel n&apos;est pas un luxe réservé aux grandes entreprises.
          C&apos;est un investissement rentable qui génère des prospects, renforce votre
          crédibilité et vous différencie de vos concurrents qui se contentent d&apos;une page
          Facebook ou d&apos;un site vieillissant.
        </p>

        {/* Section 2 */}
        <h2 id="modele">Le modèle à 80 €/mois : comment ça marche ?</h2>
        <p>
          Le principal frein à la création d&apos;un site web pour les TPE et PME est le coût
          initial. Les agences web traditionnelles facturent entre 3 000 et 10 000 € pour un
          site vitrine, un investissement lourd pour une petite entreprise. C&apos;est pourquoi
          nous avons créé un modèle radicalement différent.
        </p>
        <p>
          <strong>Chez Kaelix, vous ne payez aucun frais de création.</strong> Votre site est
          développé sur mesure et mis en ligne dans le cadre d&apos;un abonnement mensuel à
          partir de 80 €/mois. Ce montant couvre tout : la conception, le développement, le
          design, l&apos;hébergement, la maintenance et le support technique.
        </p>
        <p>
          Ce modèle est gagnant pour tout le monde : vous accédez à un site professionnel sans
          mobiliser de trésorerie, et nous construisons une relation de long terme où votre
          succès est notre succès. Si votre site ne vous apporte pas de valeur, vous
          n&apos;avez aucune raison de rester.
        </p>
        <p>
          Consultez tous les détails sur notre{" "}
          <Link href="/tarifs">page tarifs</Link>.
        </p>

        {/* Section 3 */}
        <h2 id="inclus">Ce qui est inclus dans votre abonnement</h2>
        <p>
          Chaque abonnement Kaelix inclut tout ce dont votre entreprise a besoin pour avoir
          une présence en ligne professionnelle et performante :
        </p>
        <ul>
          <li>
            <strong>Design sur mesure :</strong> un design unique créé spécifiquement pour
            votre entreprise, votre secteur d&apos;activité et votre clientèle cible. Pas de
            template, pas de ressemblance avec d&apos;autres sites.
          </li>
          <li>
            <strong>Développement codé à la main :</strong> chaque page est développée avec
            Next.js, React et Tailwind CSS pour des performances optimales. Score Lighthouse
            de 95+ garanti.
          </li>
          <li>
            <strong>Hébergement haute performance :</strong> votre site est hébergé sur un CDN
            global avec un temps de réponse inférieur à 100 ms partout en France.
          </li>
          <li>
            <strong>Nom de domaine et SSL :</strong> votre nom de domaine est inclus
            (ou nous utilisons le vôtre) avec un certificat SSL pour un site sécurisé en HTTPS.
          </li>
          <li>
            <strong>SEO de base :</strong> optimisation technique, balises meta, données
            structurées, sitemap et robots.txt configurés pour un référencement optimal.
          </li>
          <li>
            <strong>Maintenance et mises à jour :</strong> corrections de bugs, mises à jour
            de sécurité, optimisations de performance et petites évolutions incluses.
          </li>
          <li>
            <strong>Support réactif :</strong> une question, un problème ? Notre équipe vous
            répond sous 24h par email ou visio.
          </li>
          <li>
            <strong>Analytics :</strong> un tableau de bord simple pour suivre votre trafic,
            vos sources de visiteurs et vos performances.
          </li>
        </ul>

        {/* Section 4 */}
        <h2 id="demarrer">Comment démarrer en 4 étapes</h2>
        <p>
          Obtenir votre site web professionnel est un processus simple et guidé. Nous
          nous occupons de tout, vous n&apos;avez besoin d&apos;aucune compétence technique :
        </p>
        <ol>
          <li>
            <strong>Prise de contact :</strong> remplissez notre{" "}
            <Link href="/contact">formulaire de contact</Link> ou demandez un{" "}
            <Link href="/audit-gratuit">audit gratuit</Link>. Nous vous
            recontactons sous 24h pour comprendre votre projet et vos objectifs.
          </li>
          <li>
            <strong>Proposition personnalisée :</strong> nous vous envoyons une proposition
            détaillée avec le périmètre du projet, le design envisagé, les fonctionnalités
            et la formule d&apos;abonnement adaptée. Vous validez avant tout développement.
          </li>
          <li>
            <strong>Création du site :</strong> notre équipe conçoit et développe votre site
            en 2 à 4 semaines. Vous avez accès à un environnement de prévisualisation pour
            donner vos retours à chaque étape.
          </li>
          <li>
            <strong>Mise en ligne :</strong> votre site est mis en ligne, configuré et
            optimisé. Nous vous formons à la gestion de vos contenus et restons disponibles
            pour toute question.
          </li>
        </ol>
        <p>
          Découvrez nos{" "}
          <Link href="/realisations">réalisations</Link> pour voir le résultat
          concret de notre travail.
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
          Prêt à franchir le pas ?{" "}
          <Link href="/audit-gratuit">Demandez votre audit gratuit</Link>{" "}
          ou{" "}
          <Link href="/contact">contactez-nous directement</Link>.
        </p>
      </PillarPageLayout>

      <CtaSection />
    </>
  )
}
