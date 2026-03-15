"use client"

import { useActionState, useTransition, useState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/shared/status-badge"
import {
  createDeliverable,
  updateDeliverable,
  deleteDeliverable,
  type DeliverableActionState,
} from "@/actions/admin/deliverables"
import {
  Plus,
  Trash2,
  Loader2,
  ChevronRight,
  X,
  Calendar,
} from "lucide-react"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

// Cycle through deliverable statuses
const STATUS_CYCLE: Record<string, string> = {
  pending: "in_progress",
  in_progress: "completed",
  completed: "pending",
}

interface DeliverableItem {
  id: string
  title: string
  description: string | null
  status: string
  due_date: string | null
  sort_order: number | null
  created_at: string
  updated_at: string
}

interface DeliverablesManagerProps {
  deliverables: DeliverableItem[]
  projectId: string
}

export function DeliverablesManager({
  deliverables,
  projectId,
}: DeliverablesManagerProps) {
  const [showForm, setShowForm] = useState(false)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Livrables</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? (
            <>
              <X className="size-4" />
              Annuler
            </>
          ) : (
            <>
              <Plus className="size-4" />
              Ajouter un livrable
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {/* Inline create form */}
        {showForm && (
          <CreateDeliverableForm
            projectId={projectId}
            onDone={() => setShowForm(false)}
            nextSortOrder={deliverables.length}
          />
        )}

        {/* Deliverables list */}
        {deliverables.length === 0 && !showForm ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Aucun livrable pour ce projet
          </p>
        ) : (
          <div className="space-y-2">
            {deliverables.map((d) => (
              <DeliverableRow key={d.id} deliverable={d} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Inline create form
// ---------------------------------------------------------------------------

function CreateDeliverableForm({
  projectId,
  onDone,
  nextSortOrder,
}: {
  projectId: string
  onDone: () => void
  nextSortOrder: number
}) {
  const [state, formAction] = useActionState<DeliverableActionState, FormData>(
    async (prevState, formData) => {
      const result = await createDeliverable(prevState, formData)
      if (result.success) onDone()
      return result
    },
    {}
  )

  return (
    <form action={formAction} className="mb-4 rounded-lg border bg-muted/30 p-4">
      <input type="hidden" name="project_id" value={projectId} />
      <input type="hidden" name="sort_order" value={nextSortOrder} />

      {state.error && (
        <div className="mb-3 rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {state.error}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="del-title">Titre *</Label>
          <Input
            id="del-title"
            name="title"
            placeholder="Nom du livrable"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="del-due-date">Date d&apos;échéance</Label>
          <Input id="del-due-date" name="due_date" type="date" />
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-1.5">
        <Label htmlFor="del-description">Description</Label>
        <Textarea
          id="del-description"
          name="description"
          placeholder="Description du livrable..."
          className="min-h-12"
        />
      </div>

      <div className="mt-3 flex justify-end">
        <SubmitDeliverableButton />
      </div>
    </form>
  )
}

function SubmitDeliverableButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? "Ajout..." : "Ajouter"}
    </Button>
  )
}

// ---------------------------------------------------------------------------
// Single deliverable row
// ---------------------------------------------------------------------------

function DeliverableRow({ deliverable }: { deliverable: DeliverableItem }) {
  const [isDeleting, startDeleteTransition] = useTransition()
  const [isUpdating, startUpdateTransition] = useTransition()

  function handleCycleStatus() {
    const nextStatus = STATUS_CYCLE[deliverable.status] ?? "pending"
    const formData = new FormData()
    formData.set("id", deliverable.id)
    formData.set("status", nextStatus)

    startUpdateTransition(async () => {
      await updateDeliverable({}, formData)
    })
  }

  function handleDelete() {
    startDeleteTransition(async () => {
      await deleteDeliverable(deliverable.id)
    })
  }

  return (
    <div className="flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors hover:bg-muted/30">
      {/* Status toggle button */}
      <button
        type="button"
        onClick={handleCycleStatus}
        disabled={isUpdating}
        className="shrink-0"
        title="Changer le statut"
      >
        {isUpdating ? (
          <Loader2 className="size-4 animate-spin text-muted-foreground" />
        ) : (
          <StatusBadge type="deliverable" status={deliverable.status} />
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{deliverable.title}</p>
        {deliverable.description && (
          <p className="text-xs text-muted-foreground truncate">
            {deliverable.description}
          </p>
        )}
      </div>

      {/* Due date */}
      {deliverable.due_date && (
        <div className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
          <Calendar className="size-3" />
          {dateFormatter.format(new Date(deliverable.due_date))}
        </div>
      )}

      {/* Next status arrow */}
      <button
        type="button"
        onClick={handleCycleStatus}
        disabled={isUpdating}
        className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
        title="Avancer le statut"
      >
        <ChevronRight className="size-4" />
      </button>

      {/* Delete button */}
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        title="Supprimer le livrable"
      >
        {isDeleting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Trash2 className="size-4" />
        )}
      </button>
    </div>
  )
}
