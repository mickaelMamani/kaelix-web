import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  const type = searchParams.get("type");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      // Determine the base URL for redirects
      let baseUrl: string;
      if (isLocalEnv) {
        baseUrl = origin;
      } else if (forwardedHost) {
        baseUrl = `https://${forwardedHost}`;
      } else {
        baseUrl = origin;
      }

      // Handle password reset flow
      if (type === "recovery") {
        return NextResponse.redirect(`${baseUrl}/auth/reset-password`);
      }

      return NextResponse.redirect(`${baseUrl}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth_error`);
}
