"use client"

import { useActionState, useState } from "react"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  sendSupportMessage,
  type SupportActionState,
} from "@/actions/support"
import { sujetLabels } from "@/lib/validations/support"
import { SupportConfirmation } from "./support-confirmation"

interface SupportFormProps {
  projects: { id: string; name: string }[]
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Envoi en cours...
        </>
      ) : (
        "Envoyer le message"
      )}
    </Button>
  )
}

export function SupportForm({ projects }: SupportFormProps) {
  const [state, formAction] = useActionState<SupportActionState, FormData>(
    sendSupportMessage,
    {}
  )
  const [key, setKey] = useState(0)

  // Show confirmation on success
  if (state.success) {
    return (
      <SupportConfirmation
        onReset={() => {
          // Reset the form by remounting with a new key
          setKey((prev) => prev + 1)
          // We need to clear the state - remount triggers fresh useActionState
          window.location.reload()
        }}
      />
    )
  }

  return (
    <Card key={key}>
      <CardHeader>
        <CardTitle>Envoyer un message</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-5">
          {state.error && (
            <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {state.error}
            </div>
          )}

          {/* Subject */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="sujet">
              Sujet <span className="text-destructive">*</span>
            </Label>
            <Select name="sujet" required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez un sujet" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(sujetLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Project */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="projectId">Projet concerné</Label>
            <Select name="projectId">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Aucun projet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Aucun projet</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="message">
              Message <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Décrivez votre demande en détail..."
              required
              rows={6}
            />
          </div>

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  )
}
