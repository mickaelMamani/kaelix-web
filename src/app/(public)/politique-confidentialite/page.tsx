import type { Metadata } from "next"

import { generatePageMetadata } from "@/lib/metadata"
import { siteConfig } from "@/lib/constants"

export const metadata: Metadata = generatePageMetadata({
  title: "Politique de Confidentialité",
  description:
    "Politique de confidentialité de Kaelix. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD.",
  path: "/politique-confidentialite",
})

export default function PolitiqueConfidentialitePage() {
  return (
    <section className="pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Politique de Confidentialité
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Dernière mise à jour : mars 2026
        </p>

        <div className="mt-12 space-y-10 text-base leading-relaxed text-muted-foreground">
          {/* Introduction */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              1. Introduction
            </h2>
            <p className="mt-4">
              {siteConfig.name} s&apos;engage à protéger la vie privée de ses
              utilisateurs. La présente politique de confidentialité décrit
              comment nous collectons, utilisons, stockons et protégeons vos
              données personnelles lorsque vous utilisez notre site internet
              et nos services, conformément au Règlement Général sur la
              Protection des Données (RGPD) et à la loi Informatique et
              Libertés.
            </p>
          </div>

          {/* Donnees collectees */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              2. Données collectées
            </h2>
            <p className="mt-4">
              Nous collectons les catégories de données suivantes :
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">
                  Données du formulaire de contact :
                </strong>{" "}
                nom, prénom, adresse email, numéro de téléphone (facultatif),
                message.
              </li>
              <li>
                <strong className="text-foreground">
                  Données de navigation (analytics) :
                </strong>{" "}
                données anonymisées relatives à votre navigation (pages visitées,
                durée de visite, type d&apos;appareil, navigateur). Ces données
                ne permettent pas de vous identifier personnellement.
              </li>
              <li>
                <strong className="text-foreground">Cookies :</strong> cookies
                essentiels au fonctionnement du site et cookies analytiques
                (soumis à votre consentement). Voir la section dédiée ci-dessous.
              </li>
            </ul>
          </div>

          {/* Finalites */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              3. Finalités du traitement
            </h2>
            <p className="mt-4">
              Vos données personnelles sont collectées pour les finalités
              suivantes :
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Répondre à vos demandes de contact et d&apos;information.
              </li>
              <li>
                Fournir et améliorer nos services de développement web.
              </li>
              <li>
                Établir et gérer la relation commerciale (devis, facturation,
                suivi de projet).
              </li>
              <li>
                Améliorer l&apos;expérience utilisateur sur notre site grâce aux
                données analytiques anonymisées.
              </li>
              <li>
                Envoyer des communications commerciales (uniquement avec votre
                consentement explicite).
              </li>
            </ul>
          </div>

          {/* Base legale */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              4. Base légale du traitement
            </h2>
            <p className="mt-4">
              Nous traitons vos données personnelles sur les bases légales
              suivantes :
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Consentement :</strong> pour
                l&apos;envoi de communications commerciales et l&apos;utilisation
                de cookies analytiques.
              </li>
              <li>
                <strong className="text-foreground">
                  Exécution contractuelle :
                </strong>{" "}
                pour le traitement des demandes de devis et la gestion des
                projets clients.
              </li>
              <li>
                <strong className="text-foreground">Intérêt légitime :</strong>{" "}
                pour l&apos;amélioration de nos services et la sécurisation de
                notre site.
              </li>
            </ul>
          </div>

          {/* Duree de conservation */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              5. Durée de conservation
            </h2>
            <p className="mt-4">
              Vos données personnelles sont conservées pendant les durées
              suivantes :
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">
                  Données de contact :
                </strong>{" "}
                3 ans à compter du dernier échange, conformément aux
                recommandations de la CNIL.
              </li>
              <li>
                <strong className="text-foreground">Données clients :</strong>{" "}
                pendant la durée de la relation contractuelle, puis archivées
                pendant 5 ans à des fins comptables et fiscales.
              </li>
              <li>
                <strong className="text-foreground">
                  Données analytiques :
                </strong>{" "}
                13 mois maximum.
              </li>
            </ul>
          </div>

          {/* Vos droits */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              6. Vos droits
            </h2>
            <p className="mt-4">
              Conformément au RGPD (articles 15 à 21), vous disposez des droits
              suivants concernant vos données personnelles :
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Droit d&apos;accès :</strong>{" "}
                obtenir la confirmation que vos données sont traitées et en
                recevoir une copie.
              </li>
              <li>
                <strong className="text-foreground">
                  Droit de rectification :
                </strong>{" "}
                demander la correction de données inexactes ou incomplètes.
              </li>
              <li>
                <strong className="text-foreground">
                  Droit à l&apos;effacement :
                </strong>{" "}
                demander la suppression de vos données dans les conditions
                prévues par la loi.
              </li>
              <li>
                <strong className="text-foreground">
                  Droit à la portabilité :
                </strong>{" "}
                recevoir vos données dans un format structuré et couramment
                utilisé.
              </li>
              <li>
                <strong className="text-foreground">
                  Droit d&apos;opposition :
                </strong>{" "}
                vous opposer au traitement de vos données pour des motifs
                légitimes.
              </li>
              <li>
                <strong className="text-foreground">
                  Droit à la limitation :
                </strong>{" "}
                demander la limitation du traitement dans certains cas.
              </li>
            </ul>
            <p className="mt-4">
              Pour exercer l&apos;un de ces droits, vous pouvez nous contacter à
              l&apos;adresse{" "}
              <strong className="text-foreground">
                {siteConfig.contact.email}
              </strong>
              . Nous nous engageons à répondre dans un délai d&apos;un mois.
            </p>
            <p className="mt-3">
              Vous avez également le droit d&apos;introduire une réclamation
              auprès de la CNIL (Commission Nationale de l&apos;Informatique et
              des Libertés) : www.cnil.fr.
            </p>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              7. Cookies
            </h2>
            <p className="mt-4">Notre site utilise les cookies suivants :</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">
                  Cookies essentiels :
                </strong>{" "}
                nécessaires au fonctionnement technique du site (session,
                préférences de navigation). Ils ne nécessitent pas votre
                consentement.
              </li>
              <li>
                <strong className="text-foreground">
                  Cookies analytiques :
                </strong>{" "}
                utilisés pour mesurer l&apos;audience du site et améliorer
                l&apos;expérience utilisateur. Ils sont déposés uniquement avec
                votre consentement préalable.
              </li>
            </ul>
            <p className="mt-4">
              Vous pouvez à tout moment gérer vos préférences en matière de
              cookies via le bandeau de consentement ou les paramètres de votre
              navigateur.
            </p>
          </div>

          {/* Securite */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              8. Sécurité des données
            </h2>
            <p className="mt-4">
              Nous mettons en œuvre des mesures techniques et organisationnelles
              appropriées pour protéger vos données personnelles contre tout
              accès non autorisé, toute modification, divulgation ou destruction.
              Le site utilise le protocole HTTPS pour sécuriser les échanges de
              données.
            </p>
          </div>

          {/* Transfert de donnees */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              9. Transfert de données hors UE
            </h2>
            <p className="mt-4">
              Certains de nos sous-traitants (hébergement, analytics) peuvent
              être situés en dehors de l&apos;Union européenne. Dans ce cas, nous
              veillons à ce que des garanties appropriées soient mises en place
              (clauses contractuelles types, décision d&apos;adéquation) pour
              assurer un niveau de protection adéquat de vos données.
            </p>
          </div>

          {/* Contact DPO */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              10. Contact — Délégué à la protection des données
            </h2>
            <p className="mt-4">
              Pour toute question relative à la protection de vos données
              personnelles ou pour exercer vos droits, vous pouvez nous
              contacter :
            </p>
            <div className="mt-3 space-y-1">
              <p>
                <strong className="text-foreground">Email :</strong>{" "}
                {siteConfig.contact.email}
              </p>
              <p>
                <strong className="text-foreground">Adresse :</strong>{" "}
                {siteConfig.contact.address}
              </p>
            </div>
          </div>

          {/* Mise a jour */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              11. Mise à jour de la politique
            </h2>
            <p className="mt-4">
              La présente politique de confidentialité peut être mise à jour à
              tout moment. En cas de modification substantielle, nous vous en
              informerons par le biais de notre site internet. La date de
              dernière mise à jour est indiquée en haut de cette page.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
