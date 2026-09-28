"use client";

import { useActionState } from "react";
import { signup } from "../actions";
import { initialFormState } from "@/lib/auth/schemas";
import { Field } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";
import { SubmitButton } from "@/components/ui/button";

export function SignupForm() {
  const [state, action] = useActionState(signup, initialFormState);

  if (state.status === "success") {
    return (
      <div className="mt-6">
        <Alert tone="success">
          <p className="font-semibold">Check your email</p>
          <p className="mt-1">{state.message}</p>
        </Alert>
      </div>
    );
  }

  return (
    <form action={action} className="mt-6 space-y-4" noValidate>
      {state.message && <Alert tone="error">{state.message}</Alert>}
      <Field
        label="Your name"
        name="fullName"
        autoComplete="name"
        required
        defaultValue={state.values?.fullName}
        errors={state.fieldErrors?.fullName}
      />
      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        required
        defaultValue={state.values?.email}
        errors={state.fieldErrors?.email}
      />
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        hint="At least 8 characters, with letters and numbers."
        errors={state.fieldErrors?.password}
      />
      <SubmitButton pendingText="Creating account…" className="w-full">
        Create account
      </SubmitButton>
    </form>
  );
}
