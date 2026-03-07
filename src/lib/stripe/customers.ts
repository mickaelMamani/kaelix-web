import { stripe } from "./client"
import { createClient } from "@/lib/supabase/server"

/**
 * Returns an existing Stripe customer ID for the org, or creates a new one.
 */
export async function getOrCreateStripeCustomer(
  orgId: string,
  email: string,
  name: string
): Promise<string> {
  const supabase = await createClient()

  // Check if mapping already exists
  const { data: existing } = await supabase
    .from("stripe_customers")
    .select("stripe_customer_id")
    .eq("org_id", orgId)
    .single()

  if (existing) return existing.stripe_customer_id

  // Create Stripe customer
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: { org_id: orgId },
  })

  // Store mapping in local DB
  await supabase.from("stripe_customers").insert({
    org_id: orgId,
    stripe_customer_id: customer.id,
  })

  return customer.id
}

/**
 * Returns the Stripe customer ID for an org, or null if not found.
 */
export async function getStripeCustomerId(
  orgId: string
): Promise<string | null> {
  const supabase = await createClient()

  const { data } = await supabase
    .from("stripe_customers")
    .select("stripe_customer_id")
    .eq("org_id", orgId)
    .single()

  return data?.stripe_customer_id ?? null
}
