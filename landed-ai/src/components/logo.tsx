import Link from "next/link";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2" aria-label="LANDED AI home">
      <span
        aria-hidden
        className="grid size-8 place-items-center rounded-lg bg-brand-600 text-sm font-bold text-white"
      >
        L
      </span>
      <span className="text-sm font-bold tracking-widest text-ink">LANDED AI</span>
    </Link>
  );
}
