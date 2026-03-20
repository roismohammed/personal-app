// app/blog/BlogPosts.tsx
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import maintenence from "../../../public/assets/images/maintenence.png"
import { createClient } from "@supabase/supabase-js"
import CardBlog from "@/components/cardBlog"
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getPosts() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      id, 
      title, 
      slug, 
      description, 
      created_at,
      image,
      category:category_id (
      name
    )
    `)
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('Supabase error:', error)
    return []
  }

  return posts || []
}

export default async function BlogPosts() {
  const posts = await getPosts()
  const otherPosts = posts
  const categories = Array.from(
    new Set(
      posts
        .map((post: any) => post.category?.name)
        .filter((category: string | undefined) => Boolean(category))
    )
  ) as string[]

  return (
    <main className="lg:col-span-3 space-y-3 -mt-6">
      <section>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              New Article
            </h2>
          </div>

          <Badge variant="outline" className="rounded-full px-3 py-1 text-sm font-medium">
            {posts.length} {posts.length === 1 ? "Article" : "Articles"}
          </Badge>
        </div>

        <div className="mt-4 h-px w-full bg-border" />
      </section>

      {otherPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherPosts.map((post: any) => (
            <CardBlog key={post.id} posts={post} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="relative w-full">
            <Image
              src={maintenence}
              alt="Website Under Maintenance"
              width={400}
              height={300}
              priority
              className="w-full h-auto object-contain"
              placeholder="blur"
            />
            <div className="mt-8 text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
                We'll Be Back Soon!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                We're currently performing scheduled maintenance to improve
                your experience. Thank you for your patience.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                Estimated time: 2-3 hours
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}