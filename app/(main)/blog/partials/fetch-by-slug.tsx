"use server"
import { PostData } from "@/types";
import { createClient } from "@/lib/supabase/server";

export default async function fetchPostBySlug(slug: string): Promise<PostData | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("posts")
    .select(`
      id,
      title,
      image,
      slug,
      description,
      content,
      created_at,
      category:category (
        id,
        name
      )
    `)
    .eq("slug", slug)
    .maybeSingle<PostData>();

  if (error) {
    console.error("Fetch slug error:", error);
    return null;
  }

  return data;
}