import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import potoProfile from "@/public/assets/images/roisbaru.jpeg"

const staticTags = [
  "ChatGPT", "AI Tools", "Next.js", "Supabase",
  "Web Development", "RoisDev",
]

export default function PostDetailSkeleton() {
  return (
    <div className="py-10 md:py-16">
      <section className="relative w-full h-[300px] md:h-[520px] overflow-hidden bg-muted mb-10 rounded-b-3xl">
        <Skeleton className="absolute inset-0 w-full h-full" />

        <div className="max-w-6xl mx-auto px-4 h-full text-gray-900 dark:text-gray-200">
          <div className="relative z-10 mx-auto h-full flex flex-col justify-end pb-12">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-4 w-40" />
              </div>

              <Skeleton className="h-8 md:h-12 w-full max-w-3xl" />
            </div>
          </div>
        </div>
      </section>

      <div className="text-gray-900 dark:text-gray-200 mt-6 md:mt-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid gap-8 md:gap-10 lg:grid-cols-[260px_1fr]">
            <aside className="space-y-4 lg:sticky lg:top-24 self-start">
              <Card className="shadow-none border-zinc-100 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30">
                <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                  <div className="relative">
                    <Image
                      src={potoProfile}
                      alt="Foto Penulis"
                      width={48}
                      height={48}
                      className="rounded-full opacity-20 grayscale"
                    />
                    <Skeleton className="absolute inset-0 rounded-full opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 bg-zinc-200/50 dark:bg-zinc-800/50" />
                    <Skeleton className="h-3 w-20 bg-zinc-200/40 dark:bg-zinc-800/40" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-2">
                  <Skeleton className="h-3 w-full bg-zinc-200/40 dark:bg-zinc-800/40" />
                  <Skeleton className="h-3 w-5/6 bg-zinc-200/40 dark:bg-zinc-800/40" />
                  <div className="mt-4 flex items-center gap-4">
                    <Skeleton className="h-5 w-5 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50" />
                    <Skeleton className="h-5 w-5 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50" />
                    <Skeleton className="h-5 w-5 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50" />
                  </div>
                </CardContent>
              </Card>

              <div className="border border-zinc-100 dark:border-zinc-800 rounded-xl p-5 hidden lg:block bg-white/50 dark:bg-zinc-900/30 backdrop-blur-sm">
                <Skeleton className="h-4 w-20 bg-zinc-200/50 dark:bg-zinc-800/50" />
                <div className="mt-3 flex flex-wrap gap-2">
                  {staticTags.map((_, i) => (
                    <Skeleton key={i} className="h-6 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800/60" />
                  ))}
                </div>
              </div>

              <Card className="shadow-none border-zinc-100 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30">
                <CardHeader>
                  <Skeleton className="h-4 w-32 bg-zinc-200/50 dark:bg-zinc-800/50" />
                </CardHeader>

                <CardContent className="space-y-4 -mt-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50" />
                    <Skeleton className="h-9 w-9 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50" />
                    <Skeleton className="h-9 w-9 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50" />
                    <Skeleton className="h-9 w-9 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50" />
                  </div>

                  <Skeleton className="h-10 w-full rounded-xl bg-indigo-100/30 dark:bg-indigo-900/20" />
                </CardContent>
              </Card>
            </aside>

            <article className="space-y-8 max-w-3xl">
              <header className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>

                <Skeleton className="h-5 w-full max-w-2xl" />
              </header>

              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>

              <section className="mt-16 space-y-6">
                <Skeleton className="h-6 w-48" />

                <div className="space-y-4">
                  <Skeleton className="h-10 w-72" />
                  <Skeleton className="h-28 w-full max-w-2xl" />
                  <Skeleton className="h-10 w-40" />
                </div>
              </section>
            </article>

            <aside className="space-y-4 block lg:hidden">
              <Card className="border shadow-none bg-white dark:bg-zinc-700/50 backdrop-blur-sm">
                <CardHeader className="flex items-center gap-3">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </CardHeader>

                <CardContent>
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6 mt-2" />
                </CardContent>
              </Card>

              <div className="border rounded-xl p-5 bg-white dark:bg-zinc-700/50 backdrop-blur-sm">
                <Skeleton className="h-4 w-20" />
                <div className="mt-3 flex flex-wrap gap-2">
                  {staticTags.map((_, i) => (
                    <Skeleton key={i} className="h-5 w-16 rounded-full" />
                  ))}
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </div>
  )
}