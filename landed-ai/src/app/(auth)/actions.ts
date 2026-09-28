"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { loginSchema, signupSchema, type FormState } from "@/lib/auth/schemas";
import { safeRedirectPath } from "@/lib/auth/safe-redirect";
import { getSiteUrl } from "@/lib/site-url";

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "");
  const parsed = loginSchema.safeParse({ email, password: formData.get("password") });
  if (!parsed.success) {
    return {
      status: "error",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values: { email },
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    const message =
      error.code === "email_not_confirmed"
        ? "Please confirm your email first. Check your inbox for the link we sent."
        : "Email or password is incorrect.";
    return { status: "error", message, values: { email } };
  }

  redirect(safeRedirectPath(formData.get("next")));
}

export async function signup(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = {
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
  };
  const parsed = signupSchema.safeParse({ ...values, password: formData.get("password") });
  if (!parsed.success) {
    return { status: "error", fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      // Saved on the user and copied into public.profiles by a database trigger.
      data: { full_name: parsed.data.fullName },
      emailRedirectTo: `${await getSiteUrl()}/auth/confirm?next=/dashboard`,
    },
  });

  if (error) {
    const message =
      error.code === "weak_password"
        ? "That password is too weak. Try a longer one with letters and numbers."
        : error.code === "over_email_send_rate_limit"
          ? "Too many sign-up emails were sent. Please wait a few minutes and try again."
          : "We couldn't create your account. Please try again.";
    return { status: "error", message, values };
  }

  // Email confirmation turned off → the user is signed in straight away.
  if (data.session) redirect("/dashboard");

  // Otherwise they must click the link in their email. (For privacy, Supabase
  // gives the same response whether or not the email is already registered.)
  return {
    status: "success",
    message: `We've sent a confirmation link to ${parsed.data.email}. Open it to activate your account.`,
  };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
