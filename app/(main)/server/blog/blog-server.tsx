import { createClient } from "@/lib/supabase/server"
import { ProjectData } from "@/types"
import BlogGridClient from "./blog-grid"

export default async function BlogServer() {
  const supabase = await createClient()

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6)

  if (error) {
    return <p className="text-center">Gagal memuat project</p>
  }

  return <BlogGridClient posts={posts as ProjectData[]} />
}
