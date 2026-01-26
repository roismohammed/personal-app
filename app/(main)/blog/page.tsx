// app/blog/page.tsx
import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, Tag } from "lucide-react"
import Image from "next/image"
import potoProfile from "@/public/assets/images/roisbaru.jpeg"
import { GridPattern } from "@/components/ui/grid-pattern"
import { cn } from "@/lib/utils"
import WrapperLayout from "@/components/wrapperLayout"
import BlogPosts from "./blogPost"
import { Skeleton } from "@/components/ui/skeleton"

export const revalidate = 300

export default function IndexBlog() {
  const popularTags = [
    "React", "TypeScript", "NextJS", "CSS", "Node.js", "Python",
    "UX Design", "Performance", "Testing", "DevOps", "AI", "Startup",
  ]

  return (
    <div>
      <div className="bg-transparent relative rounded-lg border-none">
        <GridPattern
          squares={[
            [4, 4], [5, 1], [8, 2], [5, 3], [6, 6], 
            [10, 10], [12, 15], [18, 10],
          ]}
          className={cn(
            "pointer-events-none absolute inset-0 z-10 h-full w-full",
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
            "opacity-50 dark:opacity-30",
          )}
        />

        <div className="relative overflow-hidden pt-14 bg-white dark:bg-zinc-900 border-b">
          <div className="container mx-auto px-4 py-12 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-zinc-700/50 mb-6">
              <BookOpen className="h-4 w-4 text-teal-600" />
              <span className="text-sm font-medium">Development Blog</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Code & Creative
            </h1>

            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Exploring the intersection of technology and creativity.
            </p>

            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" />
              <Input
                placeholder="Search articles..."
                className="pl-12 py-3 rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <WrapperLayout>
        <div className="min-h-screen py-8 grid grid-cols-1 lg:grid-cols-4 gap-8 overflow-visible">
          <aside className="lg:sticky lg:top-28 self-start space-y-4">
            <Card className="shadow-none bg-white dark:bg-zinc-700/50 backdrop-blur-sm">
              <CardHeader className="flex items-center gap-3">
                <Image
                  src={potoProfile}
                  alt="Foto Penulis"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <CardTitle className="text-lg">RoisDev</CardTitle>
                  <small>Web Developer</small>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Web developer yang selalu ingin berkembang dan mempelajari
                  hal-hal baru.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-none bg-white dark:bg-zinc-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Tag className="h-4 w-4" />
                  Popular Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </aside>

          <Suspense fallback={<BlogPostsSkeleton />}>
            <BlogPosts />
          </Suspense>
        </div>
      </WrapperLayout>
    </div>
  )
}


function BlogPostsSkeleton() {
  return (
    <main className="lg:col-span-3 space-y-6">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-24 mb-3" />
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-2/3" />
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </CardContent>
        </Card>
      ))}
    </main>
  )
}