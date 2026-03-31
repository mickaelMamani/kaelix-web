"use client"

import { useState, useTransition } from "react"
import { MoreHorizontal, MailPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { reinviteUser } from "@/actions/admin/users"

interface UserRowActionsProps {
  userId: string
  hasConfirmed: boolean
}

export function UserRowActions({ userId, hasConfirmed }: UserRowActionsProps) {
  const [isPending, startTransition] = useTransition()
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null)

  function handleReinvite() {
    setFeedback(null)
    startTransition(async () => {
      const result = await reinviteUser(userId)
      if (result.error) {
        setFeedback({ type: "error", message: result.error })
      } else {
        setFeedback({ type: "success", message: "Invitation renvoyée" })
      }
    })
  }

  return (
    <div className="flex items-center gap-2">
      {feedback && (
        <span
          className={`text-xs ${feedback.type === "success" ? "text-green-500" : "text-destructive"}`}
        >
          {feedback.message}
        </span>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" size="icon" className="size-8" disabled={isPending} />}
        >
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Actions</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleReinvite} disabled={hasConfirmed || isPending}>
            <MailPlus className="size-4" />
            {isPending ? "Envoi en cours..." : "Renvoyer l'invitation"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
