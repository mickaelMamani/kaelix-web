interface WelcomeHeaderProps {
  fullName: string | null
}

function formatFrenchDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function WelcomeHeader({ fullName }: WelcomeHeaderProps) {
  const today = new Date()
  const firstName = fullName?.split(" ")[0] ?? "Utilisateur"

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold tracking-tight">
        Bonjour, {firstName}
      </h1>
      <p className="mt-1 text-muted-foreground capitalize">
        {formatFrenchDate(today)}
      </p>
    </div>
  )
}
