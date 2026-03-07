import { stripe } from "@/lib/stripe/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "invoice.payment_succeeded":
        // TODO: Update invoice status in database
        break;
      case "invoice.payment_failed":
        // TODO: Notify client of failed payment
        break;
      case "customer.subscription.updated":
        // TODO: Sync subscription status
        break;
      case "customer.subscription.deleted":
        // TODO: Handle subscription cancellation
        break;
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
