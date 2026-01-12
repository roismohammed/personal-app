"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function saveProject(formData: FormData) {
  const supabase =await createClient();

  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const status = formData.get("status")?.toString() || "";
  const link_demo = formData.get("link_demo")?.toString() || null;
  const link_github = formData.get("link_github")?.toString() || null;
  const image = formData.get("image")?.toString() || null;

  const tech_stack = JSON.parse(
    formData.get("tech_stack") as string
  ) as string[];

  // VALIDATION
  if (!name || !description || tech_stack.length === 0) {
    throw new Error("Invalid input");
  }

  if (id) {
    // UPDATE
    const { error } = await supabase
      .from("projects")
      .update({
        name,
        description,
        status,
        image,
        tech_stack,
        link_demo,
        link_github,
      })
      .eq("id", id);

    if (error) throw error;
  } else {
    // CREATE
    const { error } = await supabase.from("projects").insert({
      name,
      description,
      status,
      image,
      tech_stack,
      link_demo,
      link_github,
    });

    if (error) throw error;
  }

  revalidatePath("/dashboard/projects");
}
