import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen">
      {/* TODO: Client sidebar */}
      <aside className="hidden w-64 border-r bg-white lg:block">
        <nav className="p-4">
          <p className="text-sm font-semibold text-gray-400">Espace Client</p>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
}
