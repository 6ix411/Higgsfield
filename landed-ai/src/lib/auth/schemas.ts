import { z } from "zod";

/** Form validation rules, shared by the forms and the server actions. */

const email = z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address."));

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Enter your password."),
});

export const signupSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your name.").max(100, "Name is too long."),
  email,
  password: z
    .string()
    .min(8, "Use at least 8 characters.")
    .regex(/[A-Za-z]/, "Include at least one letter.")
    .regex(/[0-9]/, "Include at least one number."),
});

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Keep this under ${max} characters.`)
    .transform((v) => (v === "" ? null : v));

export const profileSchema = z.object({
  fullName: optionalText(100),
  businessName: optionalText(120),
  defaultCity: optionalText(80),
});

/** What every form action returns, so forms can show errors. */
export type FormState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  /** Values to put back into the form after an error. */
  values?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle" };
