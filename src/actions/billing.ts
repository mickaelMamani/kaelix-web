"use server"

import { createClient } from "@/lib/supabase/server"
import { stripe } from "@/lib/stripe/client"
import { getOrCreateStripeCustomer, getStripeCustomerId } from "@/lib/stripe/customers"
import {
  setDefaultPaymentMethod as setDefaultPM,
  detachPaymentMethod as detachPM,
} from "@/lib/stripe/payment-methods"

export type BillingActionState = {
  error?: string
  success?: string
  clientSecret?: string
}

/**
 * Creates a Stripe PaymentIntent for a given invoice.
 */
export async function createPaymentIntent(
  invoiceId: string
): Promise<BillingActionState> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Vous devez être connecté" }
  }

  // Fetch invoice and verify user ownership
  const { data: invoice, error: invoiceError } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", invoiceId)
    .eq("user_id", user.id)
    .single()

  if (invoiceError || !invoice) {
    return { error: "Facture introuvable" }
  }

  if (invoice.status === "paid") {
    return { error: "Cette facture est déjà payée" }
  }

  if (invoice.amount <= 0) {
    return { error: "Le montant de la facture est invalide" }
  }

  // Fetch profile for name
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single()

  // Get or create Stripe customer
  const stripeCustomerId = await getOrCreateStripeCustomer(
    user.id,
    user.email!,
    profile?.full_name ?? user.email!
  )

  // Create PaymentIntent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: invoice.amount,
    currency: invoice.currency || "eur",
    customer: stripeCustomerId,
    metadata: {
      invoice_id: invoiceId,
      user_id: user.id,
    },
  })

  return {
    success: "Intent de paiement créé",
    clientSecret: paymentIntent.client_secret ?? undefined,
  }
}

/**
 * Creates a Stripe SetupIntent so the client can add a new payment method.
 */
export async function addPaymentMethod(): Promise<BillingActionState> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Vous devez être connecté" }
  }

  // Fetch profile for name
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single()

  // Get or create Stripe customer
  const stripeCustomerId = await getOrCreateStripeCustomer(
    user.id,
    user.email!,
    profile?.full_name ?? user.email!
  )

  // Create SetupIntent
  const setupIntent = await stripe.setupIntents.create({
    customer: stripeCustomerId,
    payment_method_types: ["card", "sepa_debit"],
  })

  return {
    success: "Prêt à ajouter un moyen de paiement",
    clientSecret: setupIntent.client_secret ?? undefined,
  }
}

/**
 * Removes a payment method from Stripe and the local DB.
 */
export async function removePaymentMethod(
  paymentMethodId: string
): Promise<BillingActionState> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Vous devez être connecté" }
  }

  // Verify the payment method belongs to this user
  const { data: pm, error: pmError } = await supabase
    .from("payment_methods")
    .select("stripe_payment_method_id")
    .eq("id", paymentMethodId)
    .eq("user_id", user.id)
    .single()

  if (pmError || !pm) {
    return { error: "Moyen de paiement introuvable" }
  }

  try {
    await detachPM(pm.stripe_payment_method_id)
  } catch {
    return { error: "Erreur lors de la suppression du moyen de paiement" }
  }

  return { success: "Moyen de paiement supprimé" }
}

/**
 * Sets a payment method as the default for the user.
 */
export async function setDefaultPaymentMethod(
  paymentMethodId: string
): Promise<BillingActionState> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Vous devez être connecté" }
  }

  // Verify the payment method belongs to this user
  const { data: pm, error: pmError } = await supabase
    .from("payment_methods")
    .select("stripe_payment_method_id")
    .eq("id", paymentMethodId)
    .eq("user_id", user.id)
    .single()

  if (pmError || !pm) {
    return { error: "Moyen de paiement introuvable" }
  }

  // Get the Stripe customer ID
  const stripeCustomerId = await getStripeCustomerId(user.id)
  if (!stripeCustomerId) {
    return { error: "Client Stripe introuvable" }
  }

  try {
    await setDefaultPM(stripeCustomerId, pm.stripe_payment_method_id)
  } catch {
    return { error: "Erreur lors de la mise à jour du moyen de paiement par défaut" }
  }

  return { success: "Moyen de paiement par défaut mis à jour" }
}
