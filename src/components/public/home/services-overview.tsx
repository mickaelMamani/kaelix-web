import Link from "next/link"
import { Monitor, ShoppingCart, Globe, RefreshCw, ArrowRight } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/public/section-header"

const services = [
  {
    icon: Monitor,
    title: "Site Vitrine",
    description:
      "Un site sur mesure qui reflète votre image de marque, rapide et optimisé pour convertir vos visiteurs en clients.",
    href: "/services/site-vitrine",
  },
  {
    icon: ShoppingCart,
    title: "Site E-commerce",
    description:
      "Une boutique en ligne performante avec un parcours d'achat fluide, conçue pour maximiser vos ventes.",
    href: "/services/site-ecommerce",
  },
  {
    icon: Globe,
    title: "Application Web",
    description:
      "Des applications web robustes et évolutives, du SaaS au portail client, développées avec les technologies modernes.",
    href: "/services/application-web",
  },
  {
    icon: RefreshCw,
    title: "Refonte de Site",
    description:
      "Modernisez votre site existant avec un design contemporain et des performances optimales.",
    href: "/services/refonte-site",
  },
]

export function ServicesOverview() {
  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Nos Services"
          title="Des solutions adaptées à chaque besoin"
        />

        <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link key={service.href} href={service.href} className="group">
              <Card className="h-full transition-shadow duration-300 hover:ring-kaelix-blue/20 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-kaelix-blue/10 transition-colors group-hover:bg-kaelix-blue/20">
                    <service.icon className="size-5 text-kaelix-blue" />
                  </div>
                  <CardTitle className="font-heading font-semibold">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-kaelix-blue opacity-0 transition-opacity group-hover:opacity-100">
                    Découvrir
                    <ArrowRight className="ml-1 size-3.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
