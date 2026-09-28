import "server-only";
import { headers } from "next/headers";

/**
 * The public address of this site, e.g. "http://localhost:3000" or
 * "https://landed-ai.vercel.app". Used to build links in auth emails.
 *
 * Set NEXT_PUBLIC_SITE_URL in production. Otherwise we work it out from the request.
 */
export async function getSiteUrl(): Promise<string> {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");

  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}
