import { createClient } from "@/lib/supabase/server";
import { sendToTeams } from "@/lib/teams/webhook";
import { NextResponse } from "next/server";
import { z } from "zod";

const supportSchema = z.object({
  subject: z.string().min(1),
  projectName: z.string().optional(),
  message: z.string().min(1),
});

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = supportSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    await sendToTeams({
      ...parsed.data,
      senderName: user.user_metadata?.full_name ?? "Client",
      senderEmail: user.email ?? "",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Échec de l'envoi du message" },
      { status: 500 }
    );
  }
}
