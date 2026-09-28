import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = { title: "Dashboard · LANDED AI" };

/** Placeholder until step 5 builds the real dashboard (totals, recent analyses). */
export default async function DashboardPage() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  const firstName = profile?.full_name?.split(" ")[0];

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {firstName ? `Welcome, ${firstName}` : "Welcome"}
      </h1>
      <p className="mt-1 text-muted">Your import analyses will appear here.</p>

      <Card className="mt-8 border-dashed text-center">
        <p className="font-medium">No analyses yet</p>
        <p className="mt-1 text-sm text-muted">
          The Import Analyzer is coming in the next step.
        </p>
      </Card>
    </div>
  );
}
