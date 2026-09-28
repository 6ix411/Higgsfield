"use client";

import { useFormStatus } from "react-dom";
import type { ButtonHTMLAttributes } from "react";
import { buttonClasses, type ButtonVariant } from "./button-styles";

/** Submit button that disables itself and shows a label while the form is sending. */
export function SubmitButton({
  children,
  pendingText,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { pendingText: string; variant?: ButtonVariant }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || props.disabled}
      aria-busy={pending}
      className={buttonClasses(variant, className)}
      {...props}
    >
      {pending ? pendingText : children}
    </button>
  );
}
