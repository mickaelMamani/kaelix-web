"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register, type AuthActionState } from "@/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Création en cours..." : "Créer mon compte"}
    </Button>
  );
}

export function RegisterForm() {
  const [state, formAction] = useActionState<AuthActionState, FormData>(register, {});

  return (
    <AuthCard
      title="Créer un compte"
      description="Complétez vos informations pour accéder à votre espace"
      footer={
        <>
          Déjà un compte ?{" "}
          <Link
            href="/auth/login"
            className="text-kaelix-blue underline underline-offset-4 hover:text-kaelix-blue/80"
          >
            Se connecter
          </Link>
        </>
      }
    >
      <form action={formAction} className="flex flex-col gap-4">
        {state.error && (
          <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {state.error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="full_name">Nom complet</Label>
          <Input
            id="full_name"
            name="full_name"
            type="text"
            placeholder="Jean Dupont"
            required
            autoComplete="name"
          />
        </div>

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

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Mot de passe</Label>
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
