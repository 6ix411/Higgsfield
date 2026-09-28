"use client";

import { useActionState } from "react";
import { updateProfile } from "./actions";
import { initialFormState } from "@/lib/auth/schemas";
import { Field } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";
import { SubmitButton } from "@/components/ui/button";

// Suggestions only — users can type any city.
const NIGERIAN_CITIES = [
  "Lagos", "Abuja", "Kano", "Port Harcourt", "Ibadan", "Onitsha", "Aba",
  "Kaduna", "Benin City", "Enugu", "Jos", "Ilorin", "Warri", "Owerri", "Abeokuta",
];

type Values = { fullName: string; businessName: string; defaultCity: string };

export function ProfileForm({ email, initial }: { email: string; initial: Values }) {
  const [state, action] = useActionState(updateProfile, initialFormState);
  const values = { ...initial, ...state.values };

  return (
    <form action={action} className="space-y-5" noValidate>
      {state.message && (
        <Alert tone={state.status === "error" ? "error" : "success"}>{state.message}</Alert>
      )}

      <Field label="Email" name="email" value={email} disabled readOnly hint="Your login email." />
      <Field
        label="Full name"
        name="fullName"
        autoComplete="name"
        defaultValue={values.fullName}
        errors={state.fieldErrors?.fullName}
      />
      <Field
        label="Business name"
        name="businessName"
        autoComplete="organization"
        placeholder="e.g. Adaeze Electronics"
        defaultValue={values.businessName}
        errors={state.fieldErrors?.businessName}
      />
      <Field
        label="Default destination city"
        name="defaultCity"
        list="nigerian-cities"
        placeholder="e.g. Lagos"
        hint="Pre-filled on new analyses. You can change it each time."
        defaultValue={values.defaultCity}
        errors={state.fieldErrors?.defaultCity}
      />
      <datalist id="nigerian-cities">
        {NIGERIAN_CITIES.map((city) => (
          <option key={city} value={city} />
        ))}
      </datalist>

      <SubmitButton pendingText="Saving…">Save profile</SubmitButton>
    </form>
  );
}
