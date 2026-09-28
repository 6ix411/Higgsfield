import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabasePublicEnv, isSupabaseConfigured } from "@/lib/env";

/** Pages that require a logged-in user. Anything else is public. */
const PROTECTED_PREFIXES = ["/dashboard", "/analyses", "/analyzer", "/profile"];

/** Auth pages that a logged-in user should be sent away from. */
const AUTH_PAGES = ["/login", "/signup"];

/**
 * Runs before every page request (called from src/proxy.ts):
 *  1. Refreshes the user's Supabase session cookie if it's about to expire.
 *  2. Redirects logged-out users away from protected pages.
 *
 * This is only a fast "optimistic" check. Every page and server action that
 * touches data still verifies the user, and the database enforces Row Level
 * Security, so this is never the only line of defence.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  // Before Supabase is configured, let the app run so the setup notice can show.
  if (!isSupabaseConfigured()) return response;

  const { url, publishableKey } = getSupabasePublicEnv();
  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
        // Stops CDNs from caching a response that contains someone's session.
        Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
      },
    },
  });

  // Do not put code between createServerClient and getClaims(): it refreshes the session.
  const { data } = await supabase.auth.getClaims();
  const isLoggedIn = Boolean(data?.claims);

  const path = request.nextUrl.pathname;
  const isProtected = PROTECTED_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
  const isAuthPage = AUTH_PAGES.includes(path);

  if (isProtected && !isLoggedIn) {
    return redirectPreservingCookies(request, response, "/login", path);
  }
  if (isAuthPage && isLoggedIn) {
    return redirectPreservingCookies(request, response, "/dashboard");
  }

  return response;
}

function redirectPreservingCookies(
  request: NextRequest,
  from: NextResponse,
  to: string,
  next?: string,
) {
  const target = request.nextUrl.clone();
  target.pathname = to;
  target.search = next ? `?next=${encodeURIComponent(next)}` : "";
  const redirect = NextResponse.redirect(target);
  from.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
  ["cache-control", "expires", "pragma"].forEach((header) => {
    const value = from.headers.get(header);
    if (value) redirect.headers.set(header, value);
  });
  return redirect;
}
