"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Rocket } from "lucide-react"
import { startProject } from "@/actions/admin/projects"
import { toast } from "sonner"

export function StartProjectButton({ projectId }: { projectId: string }) {
  const [isPending, startTransition] = useTransition()

  function handleStart() {
    startTransition(async () => {
      const result = await startProject(projectId)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Projet démarré avec succès")
      }
    })
  }

  return (
    <Button
      size="sm"
      onClick={handleStart}
      disabled={isPending}
    >
      <Rocket className="size-4" data-icon="inline-start" />
      {isPending ? "Démarrage…" : "Démarrer"}
    </Button>
  )
}
