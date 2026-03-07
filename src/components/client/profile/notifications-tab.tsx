"use client"

import { useActionState, useCallback, useRef, useState } from "react"
import {
  updateNotificationPreferences,
  type ProfileActionState,
} from "@/actions/profile"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface NotificationsTabProps {
  preferences: {
    notification_project_emails: boolean | null
    notification_invoice_alerts: boolean | null
    notification_team_messages: boolean | null
    notification_deadline_reminders: boolean | null
  }
}

type PreferenceKey = keyof NotificationsTabProps["preferences"]

const notificationSettings: {
  key: PreferenceKey
  label: string
  description: string
}[] = [
  {
    key: "notification_project_emails",
    label: "Emails de projet",
    description:
      "Recevez des notifications par email sur l'avancement de vos projets",
  },
  {
    key: "notification_invoice_alerts",
    label: "Alertes de factures",
    description:
      "Soyez notifié lors de la réception de nouvelles factures",
  },
  {
    key: "notification_team_messages",
    label: "Messages de l'équipe",
    description: "Recevez les messages de votre équipe projet",
  },
  {
    key: "notification_deadline_reminders",
    label: "Rappels d'échéance",
    description:
      "Rappels automatiques avant les dates limites de vos projets",
  },
]

export function NotificationsTab({ preferences }: NotificationsTabProps) {
  const initialState: ProfileActionState = {}
  const [state, formAction] = useActionState(
    updateNotificationPreferences,
    initialState
  )
  const formRef = useRef<HTMLFormElement>(null)

  const [values, setValues] = useState<Record<PreferenceKey, boolean>>({
    notification_project_emails: preferences.notification_project_emails ?? true,
    notification_invoice_alerts: preferences.notification_invoice_alerts ?? true,
    notification_team_messages: preferences.notification_team_messages ?? true,
    notification_deadline_reminders: preferences.notification_deadline_reminders ?? true,
  })

  const handleToggle = useCallback(
    (key: PreferenceKey) => (checked: boolean) => {
      setValues((prev) => {
        const next = { ...prev, [key]: checked }
        // Auto-save: submit form after state update
        requestAnimationFrame(() => {
          if (formRef.current) {
            const formData = new FormData(formRef.current)
            formAction(formData)
          }
        })
        return next
      })
    },
    [formAction]
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences de notification</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-6">
          {notificationSettings.map((setting) => (
            <div
              key={setting.key}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-0.5">
                <Label htmlFor={setting.key}>{setting.label}</Label>
                <p className="text-sm text-muted-foreground">
                  {setting.description}
                </p>
              </div>
              <div>
                <input
                  type="hidden"
                  name={setting.key}
                  value={values[setting.key] ? "true" : "false"}
                />
                <Switch
                  id={setting.key}
                  checked={values[setting.key]}
                  onCheckedChange={handleToggle(setting.key)}
                />
              </div>
            </div>
          ))}

          {state.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
          {state.success && (
            <p className="text-sm text-green-600">{state.success}</p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
