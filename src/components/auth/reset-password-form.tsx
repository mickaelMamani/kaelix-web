"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword, type AuthActionState } from "@/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Réinitialisation en cours..." : "Réinitialiser"}
    </Button>
  );
}

export function ResetPasswordForm() {
  const [state, formAction] = useActionState<AuthActionState, FormData>(
    resetPassword,
    {}
  );

  return (
    <AuthCard
      title="Réinitialiser le mot de passe"
      description="Choisissez un nouveau mot de passe pour votre compte"
    >
      <form action={formAction} className="flex flex-col gap-4">
        {state.error && (
          <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {state.error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Nouveau mot de passe</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            autoComplete="new-password"
          />
        </div>

        <SubmitButton />
      </form>
    </AuthCard>
  );
}
