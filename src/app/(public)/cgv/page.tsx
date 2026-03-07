import type { Metadata } from "next"

import { generatePageMetadata } from "@/lib/metadata"
import { siteConfig } from "@/lib/constants"

export const metadata: Metadata = generatePageMetadata({
  title: "Conditions Générales de Vente",
  description:
    "Conditions générales de vente de Kaelix. Consultez les modalités régissant nos prestations de développement web sur mesure.",
  path: "/cgv",
})

export default function CgvPage() {
  return (
    <section className="pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Conditions Générales de Vente
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Dernière mise à jour : mars 2026
        </p>

        <div className="mt-12 space-y-10 text-base leading-relaxed text-muted-foreground">
          {/* Article 1 */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Article 1 — Objet
            </h2>
            <p className="mt-4">
              Les présentes Conditions Générales de Vente (ci-après « CGV »)
              définissent les droits et obligations des parties dans le cadre de
              la vente des prestations de services proposées par{" "}
              {siteConfig.name} (ci-après « le Prestataire ») à ses clients
              (ci-après « le Client »).
            </p>
            <p className="mt-3">
              Toute commande de services implique l&apos;acceptation sans
              réserve par le Client des présentes CGV. Elles prévalent sur tout
              autre document du Client, sauf accord écrit contraire.
            </p>
          </div>

          {/* Article 2 */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Article 2 — Services
            </h2>
            <p className="mt-4">
              Le Prestataire propose des services de développement web sur
              mesure incluant, sans s&apos;y limiter :
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Conception et développement de sites vitrine, e-commerce et
                applications web.
              </li>
              <li>Refonte et modernisation de sites existants.</li>
              <li>Optimisation SEO et performance technique.</li>
              <li>
                Maintenance, hébergement et support technique continu.
              </li>
              <li>Design UX/UI et création d&apos;identité visuelle web.</li>
            </ul>
            <p className="mt-3">
              Le détail précis des prestations est défini dans le devis ou la
              proposition commerciale acceptée par le Client.
            </p>
          </div>

          {/* Article 3 */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Article 3 — Tarifs
            </h2>
            <p className="mt-4">
              Les services sont proposés selon un modèle d&apos;abonnement
              mensuel. Les tarifs en vigueur sont ceux indiqués sur le site{" "}
              {siteConfig.name} à la date de la commande, sauf accord
              particulier formalisé par écrit.
            </p>
            <p className="mt-3">
              Les prix sont indiqués en euros, hors taxes (HT). La TVA
              applicable sera ajoutée au montant HT selon le taux en vigueur au
              moment de la facturation.
            </p>
            <p className="mt-3">
              Le Prestataire se réserve le droit de modifier ses tarifs à tout
              moment. Les modifications tarifaires ne s&apos;appliquent pas aux
              commandes déjà acceptées et seront communiquées au Client avec un
              préavis minimum de 30 jours avant renouvellement.
            </p>
          </div>

          {/* Article 4 */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Article 4 — Modalités de paiement
            </h2>
            <p className="mt-4">
              Les paiements sont effectués par carte bancaire via la plateforme
              sécurisée Stripe. La facturation s&apos;effectue mensuellement, à
              date anniversaire de la souscription.
            </p>
            <p className="mt-3">
              En cas de retard de paiement, des pénalités de retard seront
              appliquées au taux annuel de trois fois le taux d&apos;intérêt
              légal en vigueur, conformément à l&apos;article L.441-10 du Code
              de commerce. Une indemnité forfaitaire de 40 euros pour frais de
              recouvrement sera également due de plein droit (article D.441-5 du
              Code de commerce).
            </p>
            <p className="mt-3">
              En cas de non-paiement dans un délai de 30 jours suivant la date
              d&apos;échéance, le Prestataire se réserve le droit de suspendre
              l&apos;accès aux services jusqu&apos;à régularisation complète.
            </p>
          </div>

          {/* Article 5 */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Article 5 — Durée et résiliation
            </h2>
            <p className="mt-4">
              Les contrats d&apos;abonnement sont conclus pour une durée
              minimale de [Placeholder — 3/6/12 mois] à compter de la mise en
              ligne du site ou du lancement du service.
            </p>
            <p className="mt-3">
              À l&apos;issue de la période d&apos;engagement initiale,
              l&apos;abonnement se renouvelle automatiquement par tacite
              reconduction pour des périodes d&apos;un mois.
            </p>
            <p className="mt-3">
              Chaque partie peut résilier le contrat à tout moment après la
              période d&apos;engagement, moyennant un préavis de 30 jours
              notifié par email.
            </p>
            <p className="mt-3">
              En cas de manquement grave de l&apos;une des parties à ses
              obligations, l&apos;autre partie peut résilier le contrat de plein
              droit après mise en demeure restée infructueuse pendant 15 jours.
            </p>
            <p className="mt-3">
              En cas de résiliation, le Client conserve l&apos;intégralité du
              code source développé. Le Prestataire fournira l&apos;ensemble des
              fichiers et accès nécessaires à la continuité du service.
            </p>
          </div>

          {/* Article 6 */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Article 6 — Propriété intellectuelle
            </h2>
            <p className="mt-4">
              Le code source développé spécifiquement pour le Client dans le
              cadre de la prestation lui est cédé en pleine propriété à compter
              du paiement intégral des sommes dues.
            </p>
            <p className="mt-3">
              Le Prestataire conserve la propriété intellectuelle sur ses
              méthodologies, outils, frameworks et composants génériques
              réutilisables développés indépendamment de la prestation.
            </p>
            <p className="mt-3">
              Sauf opposition écrite du Client, le Prestataire se réserve le
              droit de mentionner la réalisation dans ses références
              commerciales et son portfolio.
            </p>
          </div>

          {/* Article 7 */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Article 7 — Responsabilité
            </h2>
            <p className="mt-4">
              Le Prestataire s&apos;engage à exécuter ses prestations avec
              diligence et professionnalisme, dans le respect des règles de
              l&apos;art. Il s&apos;agit d&apos;une obligation de moyens et non
              de résultat.
            </p>
            <p className="mt-3">
              La responsabilité du Prestataire est limitée au montant total des
              sommes effectivement perçues au titre du contrat au cours des
              12 derniers mois. Le Prestataire ne saurait être tenu responsable
              des dommages indirects, tels que perte de chiffre d&apos;affaires,
              perte de clientèle ou atteinte à l&apos;image de marque.
            </p>
            <p className="mt-3">
              Le Client est seul responsable du contenu qu&apos;il fournit
              (textes, images, vidéos) et garantit qu&apos;il dispose des droits
              nécessaires à leur utilisation.
            </p>
          </div>

          {/* Article 8 */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Article 8 — Données personnelles
            </h2>
            <p className="mt-4">
              Le Prestataire traite les données personnelles du Client
              conformément à sa{" "}
              <a
                href="/politique-confidentialite"
                className="font-medium text-kaelix-blue underline underline-offset-4 hover:text-kaelix-blue/80"
              >
                Politique de Confidentialité
              </a>
              , accessible sur le site.
            </p>
            <p className="mt-3">
              Les données collectées dans le cadre de la relation commerciale
              sont nécessaires à la bonne exécution du contrat et sont traitées
              conformément au RGPD.
            </p>
          </div>

          {/* Article 9 */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Article 9 — Droit de rétractation
            </h2>
            <p className="mt-4">
              Conformément aux articles L.221-18 et suivants du Code de la
              consommation, le Client consommateur dispose d&apos;un délai de
              14 jours calendaires à compter de la souscription pour exercer son
              droit de rétractation, sans avoir à justifier de motifs ni à payer
              de pénalités.
            </p>
            <p className="mt-3">
              Pour exercer ce droit, le Client doit adresser une notification
              écrite par email à{" "}
              <strong className="text-foreground">
                {siteConfig.contact.email}
              </strong>{" "}
              ou par courrier à l&apos;adresse du Prestataire.
            </p>
            <p className="mt-3">
              Toutefois, si le Client a expressément demandé le commencement de
              la prestation avant l&apos;expiration du délai de rétractation, il
              restera redevable du montant correspondant aux services déjà
              fournis.
            </p>
          </div>

          {/* Article 10 */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Article 10 — Litiges
            </h2>
            <p className="mt-4">
              Les présentes CGV sont régies par le droit français. En cas de
              litige, les parties s&apos;engagent à rechercher une solution
              amiable avant toute action judiciaire.
            </p>
            <p className="mt-3">
              Conformément aux dispositions du Code de la consommation, le
              Client consommateur peut recourir gratuitement à un médiateur de la
              consommation en vue de la résolution amiable de tout litige.
            </p>
            <p className="mt-3">
              À défaut de résolution amiable dans un délai de 30 jours, le
              litige sera soumis aux tribunaux compétents de Montpellier.
            </p>
          </div>

          {/* Article 11 */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Article 11 — Mise à jour des CGV
            </h2>
            <p className="mt-4">
              Le Prestataire se réserve le droit de modifier les présentes CGV à
              tout moment. Les modifications entreront en vigueur dès leur
              publication sur le site. Le Client sera informé de toute
              modification substantielle par email avec un préavis minimum de
              30 jours.
            </p>
            <p className="mt-3">
              La date de dernière mise à jour est indiquée en haut de cette
              page.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
