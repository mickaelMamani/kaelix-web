"use server";

import { createClient } from "@/lib/supabase/server";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@/lib/validations/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export type AuthActionState = {
  error?: string;
  success?: string;
};

export async function login(
  prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: "Email ou mot de passe incorrect" };
  }

  redirect("/dashboard");
}

export async function loginWithGoogle(): Promise<void> {
  const headersList = await headers();
  const origin = headersList.get("origin") || headersList.get("x-forwarded-host") || "";
  const siteUrl = origin.startsWith("http") ? origin : `https://${origin}`;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${siteUrl}/auth/callback`,
    },
  });

  if (error) {
    redirect("/auth/login?error=google_auth_error");
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function register(
  prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const raw = {
    full_name: formData.get("full_name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.full_name,
      },
    },
  });

  if (error) {
    return { error: "Une erreur est survenue lors de la création du compte" };
  }

  redirect("/auth/login?success=account_created");
}

export async function logout(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function forgotPassword(
  prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const raw = {
    email: formData.get("email") as string,
  };

  const parsed = forgotPasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const headersList = await headers();
  const origin = headersList.get("origin") || headersList.get("x-forwarded-host") || "";
  const siteUrl = origin.startsWith("http") ? origin : `https://${origin}`;

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(
    parsed.data.email,
    {
      redirectTo: `${siteUrl}/auth/callback?type=recovery`,
    }
  );

  if (error) {
    return { error: "Une erreur est survenue. Veuillez réessayer." };
  }

  return {
    success:
      "Si un compte existe avec cette adresse email, vous recevrez un lien de réinitialisation.",
  };
}

export async function resetPassword(
  prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const raw = {
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const parsed = resetPasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    return { error: "Une erreur est survenue. Veuillez réessayer." };
  }

  redirect("/auth/login?success=password_reset");
}
