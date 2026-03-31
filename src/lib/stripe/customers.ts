import { stripe } from "./client"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

/**
 * Returns an existing Stripe customer ID for the user, or creates a new one.
 * Uses profiles.stripe_customer_id directly.
 */
export async function getOrCreateStripeCustomer(
  userId: string,
  email: string,
  name: string
): Promise<string> {
  const supabase = await createClient()

  // Check if profile already has a Stripe customer ID
  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", userId)
    .single()

  if (profile?.stripe_customer_id) return profile.stripe_customer_id

  // Create Stripe customer
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: { user_id: userId },
  })

  // Store on profile
  await supabase
    .from("profiles")
    .update({ stripe_customer_id: customer.id })
    .eq("id", userId)

  return customer.id
}

/**
 * Creates a Stripe customer and stores the ID on the profile.
 * Uses the admin client to bypass RLS — safe to call from server actions.
 */
export async function createStripeCustomerAdmin(
  userId: string,
  email: string,
  name: string
): Promise<string> {
  const supabase = createAdminClient()

  // Check if profile already has a Stripe customer ID
  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", userId)
    .single()

  if (profile?.stripe_customer_id) return profile.stripe_customer_id

  // Create Stripe customer
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: { user_id: userId },
  })

  // Store on profile
  await supabase
    .from("profiles")
    .update({ stripe_customer_id: customer.id })
    .eq("id", userId)

  return customer.id
}

/**
 * Returns the Stripe customer ID for a user, or null if not found.
 */
export async function getStripeCustomerId(
  userId: string
): Promise<string | null> {
  const supabase = await createClient()

  const { data } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", userId)
    .single()

  return data?.stripe_customer_id ?? null
}
