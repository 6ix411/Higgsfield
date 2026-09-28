import type { InputHTMLAttributes } from "react";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  hint?: string;
  errors?: string[];
};

/** A labelled text input with an optional hint and error message. */
export function Field({ label, name, hint, errors, className = "", ...props }: FieldProps) {
  const id = props.id ?? name;
  const describedBy = errors?.length ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        name={name}
        aria-invalid={errors?.length ? true : undefined}
        aria-describedby={describedBy}
        className="mt-1.5 block h-11 w-full rounded-xl border border-line bg-white px-3.5 text-base text-ink shadow-xs outline-none transition placeholder:text-muted/70 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 aria-invalid:border-loss aria-invalid:focus:ring-loss/10 disabled:bg-surface disabled:text-muted sm:text-sm"
        {...props}
      />
      {errors?.length ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-loss">
          {errors[0]}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
