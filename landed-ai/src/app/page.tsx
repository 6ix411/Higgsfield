import { isSupabaseConfigured } from "@/lib/env";

/**
 * Temporary home page for the project-setup step.
 * It will become the public landing page once auth and the analyzer exist.
 */
export default function Home() {
  const supabaseReady = isSupabaseConfigured();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold tracking-widest text-brand-700">LANDED AI</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
        Know your true cost before you import.
      </h1>
      <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
        Estimate the full landed cost of bringing a product into Nigeria, in Naira, and see
        whether the numbers make sense before you pay your supplier.
      </p>

      <div className="mt-10 rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-sm font-semibold">Setup status</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <StatusRow ok={supabaseReady} label="Supabase connected" />
          <StatusRow ok={false} label="Import analyzer (next step)" />
          <StatusRow ok={false} label="AI import advisor (later step)" />
        </ul>
        {!supabaseReady && (
          <p className="mt-4 text-sm text-muted">
            Copy <code className="font-mono">.env.example</code> to{" "}
            <code className="font-mono">.env.local</code> and add your Supabase keys. See the
            README.
          </p>
        )}
      </div>
    </main>
  );
}

function StatusRow({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2">
      <span
        aria-hidden
        className={`inline-block size-2 rounded-full ${ok ? "bg-profit" : "bg-line"}`}
      />
      <span className={ok ? "text-ink" : "text-muted"}>{label}</span>
    </li>
  );
}
