import CardBlog from "@/components/cardBlog"
import { createClient } from "@/lib/supabase/server"
import { PostData } from "@/types/index"

export default async function ServerBlog() {
  const supabase = await createClient()

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) return <p>Gagal memuat data</p>

  return (
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post: PostData) => (
        <CardBlog key={post.id} posts={post} />
      ))}
    </div>
  )
}
