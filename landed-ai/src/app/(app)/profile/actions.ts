"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { profileSchema, type FormState } from "@/lib/auth/schemas";

export async function updateProfile(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireUser();

  const values = {
    fullName: String(formData.get("fullName") ?? ""),
    businessName: String(formData.get("businessName") ?? ""),
    defaultCity: String(formData.get("defaultCity") ?? ""),
  };
  const parsed = profileSchema.safeParse(values);
  if (!parsed.success) {
    return { status: "error", fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }

  const supabase = await createClient();
  // Row Level Security also blocks editing anyone else's profile.
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: parsed.data.fullName,
      business_name: parsed.data.businessName,
      default_city: parsed.data.defaultCity,
    })
    .eq("id", user.id);

  if (error) {
    return { status: "error", message: "We couldn't save your profile. Please try again.", values };
  }

  revalidatePath("/", "layout");
  return { status: "success", message: "Profile saved.", values };
}
