import Stripe from "stripe"
import { stripe } from "./client"
import { createClient } from "@/lib/supabase/server"
import type { PaymentMethodType } from "@/types"

/**
 * Maps a Stripe payment method type to our local PaymentMethodType enum.
 */
function mapPaymentMethodType(
  stripeType: string
): PaymentMethodType {
  if (stripeType === "sepa_debit") return "sepa"
  return "card"
}

/**
 * Fetches payment methods from Stripe for a customer and upserts them locally.
 */
export async function syncPaymentMethods(
  stripeCustomerId: string,
  orgId: string
): Promise<void> {
  const supabase = await createClient()

  // Fetch cards and SEPA payment methods from Stripe
  const [cards, sepa] = await Promise.all([
    stripe.paymentMethods.list({
      customer: stripeCustomerId,
      type: "card",
    }),
    stripe.paymentMethods.list({
      customer: stripeCustomerId,
      type: "sepa_debit",
    }),
  ])

  const allMethods = [...cards.data, ...sepa.data]

  // Retrieve the customer to know the default payment method
  const customer = (await stripe.customers.retrieve(
    stripeCustomerId
  )) as Stripe.Customer

  const defaultPmId =
    typeof customer.invoice_settings?.default_payment_method === "string"
      ? customer.invoice_settings.default_payment_method
      : customer.invoice_settings?.default_payment_method?.id ?? null

  if (allMethods.length === 0) {
    // Remove any orphaned local records
    await supabase
      .from("payment_methods")
      .delete()
      .eq("org_id", orgId)
    return
  }

  const records = allMethods.map((pm: Stripe.PaymentMethod) => ({
    org_id: orgId,
    stripe_payment_method_id: pm.id,
    type: mapPaymentMethodType(pm.type),
    brand: pm.card?.brand ?? pm.sepa_debit?.bank_code ?? null,
    last4: pm.card?.last4 ?? pm.sepa_debit?.last4 ?? null,
    exp_month: pm.card?.exp_month ?? null,
    exp_year: pm.card?.exp_year ?? null,
    is_default: pm.id === defaultPmId,
  }))

  // Upsert by stripe_payment_method_id (unique constraint)
  await supabase.from("payment_methods").upsert(records, {
    onConflict: "stripe_payment_method_id",
    ignoreDuplicates: false,
  })
}

/**
 * Sets a payment method as default on Stripe and updates the local DB.
 */
export async function setDefaultPaymentMethod(
  stripeCustomerId: string,
  paymentMethodId: string
): Promise<void> {
  const supabase = await createClient()

  // Update default on Stripe
  await stripe.customers.update(stripeCustomerId, {
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  })

  // Get the org_id from the local payment method record
  const { data: pm } = await supabase
    .from("payment_methods")
    .select("org_id")
    .eq("stripe_payment_method_id", paymentMethodId)
    .single()

  if (!pm) return

  // Reset all payment methods for this org to non-default
  await supabase
    .from("payment_methods")
    .update({ is_default: false })
    .eq("org_id", pm.org_id)

  // Set the selected one as default
  await supabase
    .from("payment_methods")
    .update({ is_default: true })
    .eq("stripe_payment_method_id", paymentMethodId)
}

/**
 * Detaches a payment method from Stripe and removes it locally.
 */
export async function detachPaymentMethod(
  paymentMethodId: string
): Promise<void> {
  const supabase = await createClient()

  // Detach from Stripe
  await stripe.paymentMethods.detach(paymentMethodId)

  // Remove from local DB
  await supabase
    .from("payment_methods")
    .delete()
    .eq("stripe_payment_method_id", paymentMethodId)
}
