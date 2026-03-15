import Stripe from "stripe"
import { stripe } from "./client"
import { createClient } from "@/lib/supabase/server"
import type { PaymentMethodType } from "@/types"

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
  userId: string
): Promise<void> {
  const supabase = await createClient()

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

  const customer = (await stripe.customers.retrieve(
    stripeCustomerId
  )) as Stripe.Customer

  const defaultPmId =
    typeof customer.invoice_settings?.default_payment_method === "string"
      ? customer.invoice_settings.default_payment_method
      : customer.invoice_settings?.default_payment_method?.id ?? null

  if (allMethods.length === 0) {
    await supabase
      .from("payment_methods")
      .delete()
      .eq("user_id", userId)
    return
  }

  const records = allMethods.map((pm: Stripe.PaymentMethod) => ({
    user_id: userId,
    stripe_payment_method_id: pm.id,
    type: mapPaymentMethodType(pm.type),
    brand: pm.card?.brand ?? pm.sepa_debit?.bank_code ?? null,
    last4: pm.card?.last4 ?? pm.sepa_debit?.last4 ?? null,
    exp_month: pm.card?.exp_month ?? null,
    exp_year: pm.card?.exp_year ?? null,
    is_default: pm.id === defaultPmId,
  }))

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

  await stripe.customers.update(stripeCustomerId, {
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  })

  // Get the user_id from the local payment method record
  const { data: pm } = await supabase
    .from("payment_methods")
    .select("user_id")
    .eq("stripe_payment_method_id", paymentMethodId)
    .single()

  if (!pm) return

  // Reset all payment methods for this user to non-default
  await supabase
    .from("payment_methods")
    .update({ is_default: false })
    .eq("user_id", pm.user_id)

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

  await stripe.paymentMethods.detach(paymentMethodId)

  await supabase
    .from("payment_methods")
    .delete()
    .eq("stripe_payment_method_id", paymentMethodId)
}
