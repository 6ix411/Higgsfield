/**
 * Only allow redirects to pages on our own site (e.g. "/dashboard").
 * Without this, a link like /login?next=https://evil.com could send a user
 * to another website after they log in (an "open redirect").
 */
export function safeRedirectPath(next: unknown, fallback = "/dashboard"): string {
  if (typeof next !== "string") return fallback;
  if (!next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return fallback;
  return next;
}
