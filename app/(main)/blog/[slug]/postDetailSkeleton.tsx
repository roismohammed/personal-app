// app/blog/[slug]/PostDetailSkeleton.tsx
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import WrapperLayout from "@/components/wrapperLayout"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import potoProfile from "@/public/assets/images/roisbaru.jpeg"

const staticTags = [
  "ChatGPT", "AI Tools", "Next.js", "Supabase",
  "Web Development", "RoisDev",
]

export default function PostDetailSkeleton() {
  return (
    <WrapperLayout>
      <div className="mx-auto pt-28 py-10">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          {/* SIDEBAR - Muncul instant */}
          <aside className="space-y-4 lg:sticky lg:top-32 self-start">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-lg">
              <ArrowLeft size={18} />
              <span className="text-base font-semibold">Back</span>
            </div>

            <Card className="shadow-none mt-3 hidden lg:block bg-white dark:bg-zinc-700/50 backdrop-blur-sm">
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
                  <small className="-mt-2">Web Developer</small>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mt-2 text-gray-500">
                  Web developer yang selalu ingin berkembang dan mempelajari hal-hal baru.
                </p>
              </CardContent>
            </Card>

            <div className="border rounded-xl p-5 hidden lg:block bg-white dark:bg-zinc-700/50 backdrop-blur-sm">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Tags
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {staticTags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </aside>

          {/* CONTENT SKELETON */}
          <article className="-mt-8 lg:mt-0 lg:space-y-8">
            <header className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-10 w-32" />
              </div>

              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </header>

            <Skeleton className="w-full h-72 md:h-96 rounded-xl" />

            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </article>
        </div>
      </div>
    </WrapperLayout>
  )
}