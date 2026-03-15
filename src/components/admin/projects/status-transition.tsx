"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { updateProjectStatus } from "@/actions/admin/projects"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

const STATUS_PIPELINE = [
  { value: "pending", label: "En attente" },
  { value: "discovery", label: "Découverte" },
  { value: "proposal", label: "Proposition" },
  { value: "design", label: "Design" },
  { value: "development", label: "Développement" },
  { value: "review", label: "Revue" },
  { value: "launched", label: "Lancé" },
  { value: "maintenance", label: "Maintenance" },
] as const

interface StatusTransitionProps {
  projectId: string
  currentStatus: string
}

export function StatusTransition({
  projectId,
  currentStatus,
}: StatusTransitionProps) {
  const [isPending, startTransition] = useTransition()

  const currentIndex = STATUS_PIPELINE.findIndex(
    (s) => s.value === currentStatus
  )
  const canGoBack = currentIndex > 0
  const canGoForward = currentIndex < STATUS_PIPELINE.length - 1

  function handleStatusChange(direction: "prev" | "next") {
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1
    if (newIndex < 0 || newIndex >= STATUS_PIPELINE.length) return

    const newStatus = STATUS_PIPELINE[newIndex].value
    startTransition(async () => {
      await updateProjectStatus(projectId, newStatus)
    })
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      {/* Pipeline visualization */}
      <div className="mb-4 flex items-center gap-1 overflow-x-auto">
        {STATUS_PIPELINE.map((step, index) => {
          const isCurrent = step.value === currentStatus
          const isPast = index < currentIndex
          const isFuture = index > currentIndex

          return (
            <div key={step.value} className="flex items-center">
              {index > 0 && (
                <div
                  className={cn(
                    "h-0.5 w-4 sm:w-6",
                    isPast ? "bg-kaelix-green" : "bg-muted"
                  )}
                />
              )}
              <div
                className={cn(
                  "flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors",
                  isCurrent &&
                    "bg-kaelix-blue text-white ring-2 ring-kaelix-blue/30",
                  isPast && "bg-kaelix-green/20 text-kaelix-green",
                  isFuture && "bg-muted text-muted-foreground"
                )}
              >
                {step.label}
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          disabled={!canGoBack || isPending}
          onClick={() => handleStatusChange("prev")}
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ChevronLeft className="size-4" />
          )}
          Reculer
        </Button>

        <p className="text-sm text-muted-foreground">
          Étape {currentIndex + 1} / {STATUS_PIPELINE.length}
        </p>

        <Button
          size="sm"
          disabled={!canGoForward || isPending}
          onClick={() => handleStatusChange("next")}
        >
          Avancer
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ChevronRight className="size-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
