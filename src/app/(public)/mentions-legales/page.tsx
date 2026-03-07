import type { Metadata } from "next"

import { generatePageMetadata } from "@/lib/metadata"
import { siteConfig } from "@/lib/constants"

export const metadata: Metadata = generatePageMetadata({
  title: "Mentions Légales",
  description:
    "Mentions légales du site Kaelix. Informations sur l'éditeur, l'hébergement, la propriété intellectuelle et les conditions d'utilisation.",
  path: "/mentions-legales",
})

export default function MentionsLegalesPage() {
  return (
    <section className="pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Mentions Légales
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Dernière mise à jour : mars 2026
        </p>

        <div className="mt-12 space-y-10 text-base leading-relaxed text-muted-foreground">
          {/* Editeur */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              1. Éditeur du site
            </h2>
            <div className="mt-4 space-y-1">
              <p>
                <strong className="text-foreground">Raison sociale :</strong>{" "}
                {siteConfig.name}
              </p>
              <p>
                <strong className="text-foreground">Forme juridique :</strong>{" "}
                [Placeholder — SAS / SARL / auto-entrepreneur]
              </p>
              <p>
                <strong className="text-foreground">SIRET :</strong>{" "}
                [Placeholder — XXX XXX XXX XXXXX]
              </p>
              <p>
                <strong className="text-foreground">Adresse :</strong>{" "}
                {siteConfig.contact.address}
              </p>
              <p>
                <strong className="text-foreground">Téléphone :</strong>{" "}
                {siteConfig.contact.phone}
              </p>
              <p>
                <strong className="text-foreground">Email :</strong>{" "}
                {siteConfig.contact.email}
              </p>
              <p>
                <strong className="text-foreground">
                  Numéro de TVA intracommunautaire :
                </strong>{" "}
                [Placeholder — FR XX XXX XXX XXX]
              </p>
            </div>
          </div>

          {/* Directeur de la publication */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              2. Directeur de la publication
            </h2>
            <p className="mt-4">
              Le directeur de la publication est{" "}
              <strong className="text-foreground">
                [Placeholder — Nom du dirigeant]
              </strong>
              , en qualité de [Placeholder — gérant / président].
            </p>
          </div>

          {/* Hebergement */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              3. Hébergement
            </h2>
            <div className="mt-4 space-y-1">
              <p>
                Le site est hébergé par{" "}
                <strong className="text-foreground">Vercel Inc.</strong>
              </p>
              <p>440 N Bashaw St, San Francisco, CA 94107, États-Unis</p>
              <p>Site web : https://vercel.com</p>
            </div>
          </div>

          {/* Propriete intellectuelle */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              4. Propriété intellectuelle
            </h2>
            <p className="mt-4">
              L&apos;ensemble du contenu de ce site (textes, images, logos,
              graphismes, icônes, code source, etc.) est la propriété exclusive
              de {siteConfig.name} ou de ses partenaires et est protégé par les
              lois françaises et internationales relatives à la propriété
              intellectuelle.
            </p>
            <p className="mt-3">
              Toute reproduction, représentation, modification, publication,
              distribution ou exploitation, totale ou partielle, du contenu de
              ce site est strictement interdite sans autorisation écrite
              préalable de {siteConfig.name}.
            </p>
          </div>

          {/* Limitation de responsabilite */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              5. Limitation de responsabilité
            </h2>
            <p className="mt-4">
              {siteConfig.name} s&apos;efforce de fournir sur ce site des
              informations aussi précises que possible. Toutefois,{" "}
              {siteConfig.name} ne pourra être tenu responsable des omissions,
              inexactitudes ou carences dans la mise à jour de ces informations,
              qu&apos;elles soient de son fait ou du fait de tiers.
            </p>
            <p className="mt-3">
              Toutes les informations proposées sur ce site sont données à titre
              indicatif et sont susceptibles d&apos;évoluer. Par ailleurs,{" "}
              {siteConfig.name} ne saurait être tenu responsable de
              l&apos;utilisation et de l&apos;interprétation de
              l&apos;information contenue dans ce site.
            </p>
          </div>

          {/* Liens hypertextes */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              6. Liens hypertextes
            </h2>
            <p className="mt-4">
              Le site peut contenir des liens hypertextes vers d&apos;autres
              sites internet. {siteConfig.name} ne dispose d&apos;aucun moyen de
              contrôle du contenu des sites tiers et décline toute
              responsabilité quant à leur contenu.
            </p>
          </div>

          {/* Droit applicable */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              7. Droit applicable et juridiction compétente
            </h2>
            <p className="mt-4">
              Les présentes mentions légales sont régies par le droit français.
              En cas de litige, et après tentative de résolution amiable, les
              tribunaux compétents de Montpellier seront seuls compétents.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
