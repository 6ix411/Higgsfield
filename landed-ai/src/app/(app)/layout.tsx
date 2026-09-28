import { requireUser } from "@/lib/auth/dal";
import { logout } from "@/app/(auth)/actions";
import { Logo } from "@/components/logo";
import { AppNav } from "@/components/app-nav";
import { SubmitButton } from "@/components/ui/button";

/**
 * Layout for every logged-in page. requireUser() double-checks the session on
 * the server (the proxy check alone is not enough) and redirects to /login if needed.
 */
export default async function AppLayout({ children }: LayoutProps<"/">) {
  const user = await requireUser();

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
          <Logo href="/dashboard" />
          <div className="order-last -mx-1 w-full sm:order-none sm:mx-0 sm:w-auto">
            <AppNav />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden max-w-48 truncate text-sm text-muted md:inline">
              {user.email}
            </span>
            <form action={logout}>
              <SubmitButton variant="secondary" pendingText="Logging out…" className="h-9">
                Log out
              </SubmitButton>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10">{children}</main>
    </div>
  );
}
