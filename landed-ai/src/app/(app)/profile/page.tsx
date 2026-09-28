import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { ProfileForm } from "./profile-form";

export const metadata: Metadata = { title: "Profile · LANDED AI" };

export default async function ProfilePage() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, business_name, default_city")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Your profile</h1>
      <p className="mt-1 text-muted">These details help personalise your analyses.</p>

      <Card className="mt-8">
        <ProfileForm
          email={user.email}
          initial={{
            fullName: profile?.full_name ?? "",
            businessName: profile?.business_name ?? "",
            defaultCity: profile?.default_city ?? "",
          }}
        />
      </Card>
    </div>
  );
}
