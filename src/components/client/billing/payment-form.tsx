"use client"

import { useState, useEffect, useCallback } from "react"
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createPaymentIntent } from "@/actions/billing"
import { StripeProvider } from "./stripe-provider"

function formatEur(amountInCents: number): string {
  return (amountInCents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  })
}

interface PaymentFormInnerProps {
  invoiceId: string
  amount: number
}

function PaymentFormInner({ invoiceId, amount }: PaymentFormInnerProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setErrorMessage(null)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/billing/${invoiceId}?success=true`,
      },
    })

    // If we reach here, there was an error (successful payments redirect)
    if (error) {
      setErrorMessage(
        error.message ?? "Une erreur est survenue lors du paiement."
      )
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />

      {errorMessage && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isProcessing || !stripe || !elements}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Traitement en cours...
          </>
        ) : (
          `Payer ${formatEur(amount)}`
        )}
      </Button>
    </form>
  )
}

interface PaymentFormProps {
  invoiceId: string
  amount: number
}

export function PaymentForm({ invoiceId, amount }: PaymentFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const initPaymentIntent = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    const result = await createPaymentIntent(invoiceId)

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
      return
    }

    if (result.clientSecret) {
      setClientSecret(result.clientSecret)
    }

    setIsLoading(false)
  }, [invoiceId])

  useEffect(() => {
    initPaymentIntent()
  }, [initPaymentIntent])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="mt-4 text-sm text-muted-foreground">
          Pr\u00e9paration du paiement...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-sm text-red-700">{error}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={initPaymentIntent}
        >
          R\u00e9essayer
        </Button>
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">
        Impossible d&apos;initialiser le paiement. Veuillez r\u00e9essayer.
      </div>
    )
  }

  return (
    <StripeProvider clientSecret={clientSecret}>
      <PaymentFormInner invoiceId={invoiceId} amount={amount} />
    </StripeProvider>
  )
}
