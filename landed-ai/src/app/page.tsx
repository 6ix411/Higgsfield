import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/env";
import { Logo } from "@/components/logo";
import { Alert } from "@/components/ui/alert";
import { buttonClasses } from "@/components/ui/button-styles";

const steps = [
  {
    title: "Enter your import",
    body: "Product, quantity, supplier price, shipping and other costs — in any currency.",
  },
  {
    title: "See your landed cost in Naira",
    body: "Total cost, cost per unit, revenue, gross profit and margin, all in one view.",
  },
  {
    title: "Ask the AI advisor",
    body: "“What if I buy 500?” “What's my break-even price?” Answers use your real numbers.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo />
        <Link href="/login" className={buttonClasses("ghost", "h-9")}>
          Log in
        </Link>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-10 sm:px-6 sm:pt-20">
        {!isSupabaseConfigured() && (
          <div className="mb-8 max-w-2xl">
            <Alert tone="caution">
              <strong>Setup needed:</strong> copy <code>.env.example</code> to{" "}
              <code>.env.local</code> and add your Supabase keys. See the README.
            </Alert>
          </div>
        )}

        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-brand-700">For Nigerian importers</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
            Know your true cost before you import.
          </h1>
          <p className="mt-5 text-lg text-muted">
            LANDED AI works out the full landed cost of bringing a product into Nigeria, in
            Naira, and shows whether the resale numbers make sense — before you pay your
            supplier.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/signup" className={buttonClasses("primary", "h-12 px-6")}>
              Start free analysis
            </Link>
            <Link href="/login" className={buttonClasses("secondary", "h-12 px-6")}>
              I have an account
            </Link>
          </div>
        </div>

        <ol className="mt-16 grid gap-4 sm:mt-24 sm:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-line bg-white p-5 shadow-xs">
              <span className="grid size-8 place-items-center rounded-full bg-brand-50 text-sm font-semibold text-brand-700">
                {i + 1}
              </span>
              <h2 className="mt-4 font-semibold">{step.title}</h2>
              <p className="mt-1 text-sm text-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-2xl text-xs text-muted">
          LANDED AI does not provide official Nigerian customs duty rates, HS codes or import
          regulations. Any customs figures are estimates that require verification with the
          Nigeria Customs Service or a licensed customs agent.
        </p>
      </main>
    </div>
  );
}
