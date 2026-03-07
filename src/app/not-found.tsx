import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-kaelix-black px-4">
      <Card className="w-full max-w-md border-none bg-kaelix-black text-center shadow-none">
        <CardContent className="flex flex-col items-center gap-6">
          <h1 className="font-heading text-8xl font-bold tracking-tighter text-kaelix-blue sm:text-9xl">
            404
          </h1>
          <div className="space-y-2">
            <h2 className="font-heading text-2xl font-semibold text-white">
              Page introuvable
            </h2>
            <p className="text-muted-foreground">
              La page que vous recherchez n&apos;existe pas ou a été déplacée.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button render={<Link href="/" />}>
              Retour à l&apos;accueil
            </Button>
            <Button variant="outline" render={<Link href="/services" />}>
              Voir nos services
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
