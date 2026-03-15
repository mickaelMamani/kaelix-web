import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Client portal routes that should redirect to login after logout
const clientRoutes = ["/dashboard", "/projects", "/billing", "/profile", "/support"];

export async function POST(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const { origin } = new URL(request.url);
  const referer = request.headers.get("referer") || "";

  // If logging out from a client portal page, redirect to login
  // Otherwise (public site), redirect to homepage
  const refererPath = referer.replace(origin, "");
  const fromClientPortal = clientRoutes.some((route) => refererPath.startsWith(route));

  const redirectUrl = fromClientPortal ? `${origin}/auth/login` : origin;
  return NextResponse.redirect(redirectUrl, { status: 302 });
}
