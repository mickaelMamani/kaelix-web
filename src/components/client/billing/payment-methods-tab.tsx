"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, Star, Trash2, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { EmptyState } from "@/components/shared/empty-state"
import {
  removePaymentMethod,
  setDefaultPaymentMethod,
} from "@/actions/billing"
import type { PaymentMethod } from "@/types"

function getCardBrandDisplay(brand: string | null): string {
  if (!brand) return "Carte"
  switch (brand.toLowerCase()) {
    case "visa":
      return "Visa"
    case "mastercard":
      return "Mastercard"
    case "amex":
      return "American Express"
    default:
      return brand.charAt(0).toUpperCase() + brand.slice(1)
  }
}

interface PaymentMethodsTabProps {
  paymentMethods: PaymentMethod[]
}

export function PaymentMethodsTab({
  paymentMethods,
}: PaymentMethodsTabProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [actionError, setActionError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleSetDefault(pmId: string) {
    setActionError(null)
    startTransition(async () => {
      const result = await setDefaultPaymentMethod(pmId)
      if (result.error) {
        setActionError(result.error)
      } else {
        router.refresh()
      }
    })
  }

  async function handleRemove(pmId: string) {
    setActionError(null)
    setDeletingId(null)
    startTransition(async () => {
      const result = await removePaymentMethod(pmId)
      if (result.error) {
        setActionError(result.error)
      } else {
        router.refresh()
      }
    })
  }

  if (paymentMethods.length === 0) {
    return (
      <EmptyState
        icon={<CreditCard className="h-8 w-8 text-muted-foreground" />}
        title="Aucune m\u00e9thode de paiement"
        description="Vous n'avez pas encore ajout\u00e9 de m\u00e9thode de paiement. Ajoutez une carte pour faciliter vos paiements."
      />
    )
  }

  return (
    <div className="space-y-4">
      {actionError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {actionError}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {paymentMethods.map((pm) => (
          <Card key={pm.id}>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {getCardBrandDisplay(pm.brand)}
                    </span>
                    {pm.is_default && (
                      <Badge variant="secondary">
                        <Star className="mr-1 h-3 w-3" />
                        Par d\u00e9faut
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    **** **** **** {pm.last4 ?? "????"}
                  </p>
                  {pm.exp_month && pm.exp_year && (
                    <p className="text-xs text-muted-foreground">
                      Expire {String(pm.exp_month).padStart(2, "0")}/
                      {String(pm.exp_year).slice(-2)}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {!pm.is_default && (
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isPending}
                    onClick={() => handleSetDefault(pm.id)}
                  >
                    D\u00e9finir par d\u00e9faut
                  </Button>
                )}
                <Dialog
                  open={deletingId === pm.id}
                  onOpenChange={(open) =>
                    setDeletingId(open ? pm.id : null)
                  }
                >
                  <DialogTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        disabled={isPending}
                      />
                    }
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Supprimer la carte</DialogTitle>
                      <DialogDescription>
                        \u00cates-vous s\u00fbr de vouloir supprimer la carte{" "}
                        {getCardBrandDisplay(pm.brand)} se terminant par{" "}
                        {pm.last4 ?? "????"} ? Cette action est irr\u00e9versible.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose
                        render={<Button variant="outline" />}
                      >
                        Annuler
                      </DialogClose>
                      <Button
                        variant="destructive"
                        disabled={isPending}
                        onClick={() => handleRemove(pm.id)}
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Supprimer
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Shield className="h-3 w-3" />
        <span>Vos informations de paiement sont s\u00e9curis\u00e9es par Stripe</span>
      </div>
    </div>
  )
}
