// app/blog/BlogPosts.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, TrendingUp, User } from "lucide-react"
import Link from "next/link"
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
  const featured = posts[0]
  const otherPosts = posts

  return (
    <main className="lg:col-span-3 space-y-10">
      {featured && (
        <Card className="border shadow-none overflow-hidden bg-white/80 dark:bg-zinc-700/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="secondary" className="bg-blue-100 text-cyan-700 dark:bg-blue-900 dark:text-cyan-300">
                Latest Post
              </Badge>

              <div className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400">
                <Link href={`/blog/${featured.slug}`} className="flex gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Trending
                </Link>
              </div>
            </div>

            <CardTitle className="text-2xl md:text-3xl leading-tight hover:text-teal-600 dark:hover:text-teal-700 transition-colors cursor-pointer">
              {featured.title}
            </CardTitle>

            <CardDescription className="text-lg leading-relaxed">
              {featured.description?.slice(0, 70)} ...
            </CardDescription>
          </CardHeader>

          <CardContent className="-mt-4">
            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Roisdev
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Intl.DateTimeFormat("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }).format(new Date(featured.created_at))}
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Link href={`/blog/${featured.slug}`}>
              <Button className="group bg-gradient-to-r cursor-pointer from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700">
                Read Full Article
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}

      {/* Post List */}
      {otherPosts.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {otherPosts.map((post: any) => (
            <CardBlog posts={post} />
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