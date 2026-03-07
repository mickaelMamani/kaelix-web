import Link from "next/link"

import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="bg-gradient-to-br from-kaelix-blue to-blue-700 py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Pr&ecirc;t &agrave; transformer votre pr&eacute;sence en ligne ?
        </h2>
        <p className="mt-4 text-lg text-white/80">
          Obtenez un audit gratuit de votre site actuel en 48h
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            render={<Link href="/audit-gratuit" />}
            size="lg"
            className="bg-white text-kaelix-blue hover:bg-white/90 border-transparent"
          >
            Audit Gratuit
          </Button>
          <Button
            render={<Link href="/tarifs" />}
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10 hover:text-white"
          >
            Voir nos tarifs
          </Button>
        </div>
      </div>
    </section>
  )
}
