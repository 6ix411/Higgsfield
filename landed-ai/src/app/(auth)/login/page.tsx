import type { Metadata } from "next";
import Link from "next/link";
import { Alert } from "@/components/ui/alert";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Log in · LANDED AI" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "";
  const confirmFailed = params.error === "confirm_failed";

  return (
    <>
      <h1 className="text-xl font-semibold">Welcome back</h1>
      <p className="mt-1 text-sm text-muted">Log in to see your import analyses.</p>

      {confirmFailed && (
        <div className="mt-5">
          <Alert tone="error">
            That confirmation link is invalid or has expired. Try logging in, or sign up again
            to get a new link.
          </Alert>
        </div>
      )}

      <LoginForm next={next} />

      <p className="mt-6 text-center text-sm text-muted">
        New to LANDED AI?{" "}
        <Link href="/signup" className="font-semibold text-brand-700 hover:underline">
          Create an account
        </Link>
      </p>
    </>
  );
}
