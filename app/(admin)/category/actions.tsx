"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveCategory(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get("id");
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  if (!name) {
    throw new Error("Name is required");
  }

  if (id) {
    await supabase
      .from("category")
      .update({ name, description })
      .eq("id", Number(id));
  } else {
    await supabase
      .from("category")
      .insert({ name, description });
  }

  revalidatePath("/category");
}


export async function deleteCategory(id: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("category")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Gagal menghapus category");
  }

  revalidatePath("/category");
}