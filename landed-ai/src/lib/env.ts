/**
 * Central place for reading environment variables.
 *
 * Every API key lives in an environment variable — never in code.
 * These helpers throw a clear error when something is missing, so you get
 * "SUPABASE_URL is not set" instead of a confusing crash deep inside a library.
 */

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}. Copy .env.example to .env.local and fill it in.`,
    );
  }
  return value;
}

/**
 * Public Supabase settings. These are safe to expose to the browser —
 * Row Level Security in the database is what protects the data.
 *
 * NEXT_PUBLIC_* variables must be read with literal `process.env.X` access
 * so Next.js can inline them into the browser bundle.
 */
export function getSupabasePublicEnv() {
  return {
    url: required("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL),
    publishableKey: required(
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    ),
  };
}

/** True when Supabase has been configured. Used to show a setup notice instead of crashing. */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}
