"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword, type AuthActionState } from "@/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Envoi en cours..." : "Envoyer le lien"}
    </Button>
  );
}

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState<AuthActionState, FormData>(
    forgotPassword,
    {}
  );

  return (
    <AuthCard
      title="Mot de passe oublié"
      description="Entrez votre email pour recevoir un lien de réinitialisation"
      footer={
        <Link
          href="/auth/login"
          className="text-kaelix-blue underline underline-offset-4 hover:text-kaelix-blue/80"
        >
          Retour à la connexion
        </Link>
      }
    >
      {state.success ? (
        <div className="rounded-lg bg-kaelix-green/10 px-4 py-3 text-center text-sm text-kaelix-green">
          {state.success}
        </div>
      ) : (
        <form action={formAction} className="flex flex-col gap-4">
          {state.error && (
            <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {state.error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="vous@exemple.com"
              required
              autoComplete="email"
            />
          </div>

          <SubmitButton />
        </form>
      )}
    </AuthCard>
  );
}
