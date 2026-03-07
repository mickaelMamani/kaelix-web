import { Gauge, Zap, Shield, Code } from "lucide-react"

const metrics = [
  {
    icon: Gauge,
    value: "95+",
    label: "PageSpeed",
  },
  {
    icon: Zap,
    value: "< 1s",
    label: "Chargement",
  },
  {
    icon: Shield,
    value: "0",
    label: "Faille sécurité",
  },
  {
    icon: Code,
    value: "100%",
    label: "Propriété du code",
  },
]

export function TrustBanner() {
  return (
    <section className="border-y bg-muted/30 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-kaelix-blue/10">
                <metric.icon className="size-6 text-kaelix-blue" />
              </div>
              <p className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {metric.value}
              </p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
