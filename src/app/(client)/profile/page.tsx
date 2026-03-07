import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

import { getProfile } from "@/lib/queries/profiles"
import { PageHeader } from "@/components/shared/page-header"
import { PersonalInfoTab } from "@/components/client/profile/personal-info-tab"
import { SecurityTab } from "@/components/client/profile/security-tab"
import { NotificationsTab } from "@/components/client/profile/notifications-tab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
  title: "Mon Profil",
}

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const profile = await getProfile(user.id)

  const profileData = {
    full_name: profile?.full_name ?? null,
    phone: profile?.phone ?? null,
    company: profile?.company ?? null,
    address: profile?.address ?? null,
    city: profile?.city ?? null,
    country: profile?.country ?? null,
  }

  const notificationPreferences = {
    notification_project_emails: profile?.notification_project_emails ?? true,
    notification_invoice_alerts: profile?.notification_invoice_alerts ?? true,
    notification_team_messages: profile?.notification_team_messages ?? true,
    notification_deadline_reminders: profile?.notification_deadline_reminders ?? true,
  }

  return (
    <div>
      <PageHeader
        title="Mon Profil"
        description="Gérez vos informations personnelles et vos préférences"
      />

      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Informations</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <PersonalInfoTab profile={profileData} email={user.email ?? ""} />
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <SecurityTab />
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <NotificationsTab preferences={notificationPreferences} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
