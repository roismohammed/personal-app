import CardBlog from "@/components/cardBlog"
import { createClient } from "@/lib/supabase/server"
export default async function ServerBlog() {
  const supabase = await createClient()

  const { data: posts, error } = await supabase
    .from("posts")
    .select(`
      id,
      title,
      slug,
      description,
      image,
      created_at,
      category:category (
        id,
        name
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    return <p className="text-center text-red-500">Gagal memuat data</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <CardBlog key={post.id} posts={post} />
      ))}
    </div>
  )
}
