import type { ReactNode } from "react";

type Tone = "error" | "success" | "info" | "caution";

const tones: Record<Tone, string> = {
  error: "border-loss/20 bg-loss/5 text-loss",
  success: "border-profit/20 bg-brand-50 text-brand-900",
  info: "border-line bg-surface text-ink",
  caution: "border-caution/25 bg-caution/5 text-ink",
};

export function Alert({ tone = "info", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`rounded-xl border px-4 py-3 text-sm ${tones[tone]}`}
    >
      {children}
    </div>
  );
}
