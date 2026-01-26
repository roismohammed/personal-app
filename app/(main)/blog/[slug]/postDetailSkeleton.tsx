import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import WrapperLayout from "@/components/wrapperLayout"
import Image from "next/image"
import potoProfile from "@/public/assets/images/roisbaru.jpeg"

const staticTags = [
  "ChatGPT", "AI Tools", "Next.js", "Supabase",
  "Web Development", "RoisDev",
]

export default function PostDetailSkeleton() {
  return (
    <div>

      <section className="relative w-full h-[270px] md:h-[520px] overflow-hidden bg-muted">
        <Skeleton className="absolute inset-0 w-full h-full" />

        <WrapperLayout>
          <div className="relative z-10 mx-auto h-full flex flex-col justify-end pb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-4 w-40" />
              </div>

              <Skeleton className="h-8 md:h-12 w-full max-w-3xl" />
            </div>
          </div>
        </WrapperLayout>
      </section>

      <WrapperLayout>
        <div className="mx-auto py-10">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
            <aside className="space-y-4 lg:sticky lg:top-26 self-start">
              <Card className="shadow-none mt-3 hidden lg:block bg-white dark:bg-zinc-700/50 backdrop-blur-sm">
                <CardHeader className="flex items-center gap-3">
                  <Image
                    src={potoProfile}
                    alt="Foto Penulis"
                    width={48}
                    height={48}
                    className="rounded-full opacity-40"
                  />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </CardHeader>

                <CardContent>
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6 mt-2" />
                  <div className="mt-4 flex items-center gap-4">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-5 rounded-full" />
                  </div>
                </CardContent>
              </Card>

              <div className="border rounded-xl p-5 hidden lg:block bg-white dark:bg-zinc-700/50 backdrop-blur-sm">
                <Skeleton className="h-4 w-20" />
                <div className="mt-3 flex flex-wrap gap-2">
                  {staticTags.map((_, i) => (
                    <Skeleton key={i} className="h-5 w-16 rounded-full" />
                  ))}
                </div>
              </div>

              <Card className="shadow-none bg-white dark:bg-zinc-700/50 backdrop-blur-sm">
                <CardHeader>
                  <Skeleton className="h-4 w-32" />
                </CardHeader>

                <CardContent className="space-y-4 -mt-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <Skeleton className="h-9 w-9 rounded-full" />
                  </div>

                  <Skeleton className="h-9 w-full rounded-lg" />
                </CardContent>
              </Card>
            </aside>

            <article className="-mt-8 lg:-mt-0 space-y-8">
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
      </WrapperLayout>
    </div>
  )
}
