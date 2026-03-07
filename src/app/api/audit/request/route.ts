import { NextResponse } from "next/server";
import { z } from "zod";

const auditSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  websiteUrl: z.string().url(),
  sector: z.string().min(1),
  objective: z.string().min(1),
  companySize: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = auditSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // TODO: Store audit request in Supabase
  // TODO: Send notification to Kaelix team (email or Teams)
  // TODO: Send confirmation email to prospect

  return NextResponse.json({ success: true });
}
