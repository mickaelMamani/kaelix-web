import { Star } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SectionHeader } from "@/components/public/section-header"

const testimonials = [
  {
    name: "Marie Dupont",
    company: "Le Provençal",
    role: "Gérante",
    initials: "MD",
    quote:
      "Notre nouveau site charge en moins d'une seconde. Les réservations en ligne ont augmenté de 40% dès le premier mois. L'équipe Kaelix a parfaitement compris notre identité.",
    rating: 5,
  },
  {
    name: "Thomas Bernard",
    company: "Maison Claire",
    role: "Fondateur",
    initials: "TB",
    quote:
      "Passer de WordPress à un site codé sur mesure a été la meilleure décision. Nos conversions ont bondi de 150% et nous économisons sur la maintenance chaque mois.",
    rating: 5,
  },
  {
    name: "Sophie Laurent",
    company: "TaskFlow",
    role: "CTO",
    initials: "SL",
    quote:
      "Kaelix a développé notre plateforme SaaS avec une qualité de code exceptionnelle. L'application est rapide, fiable et nos utilisateurs adorent l'interface.",
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star
          key={i}
          className="size-4 fill-amber-400 text-amber-400"
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Témoignages"
          title="Ce que disent nos clients"
        />

        <div className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="h-full">
              <CardContent className="flex h-full flex-col gap-4">
                <StarRating rating={testimonial.rating} />
                <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 border-t pt-4">
                  <Avatar size="lg">
                    <AvatarFallback className="bg-kaelix-blue/10 text-kaelix-blue">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
