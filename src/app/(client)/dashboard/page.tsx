import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Tableau de Bord",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Bonjour{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ""}
      </h1>
      <p className="mt-2 text-gray-600">Bienvenue dans votre espace client.</p>
    </div>
  );
}
