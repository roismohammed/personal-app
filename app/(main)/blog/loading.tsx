// app/blog/loading.tsx
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import WrapperLayout from "@/components/wrapperLayout"

export default function Loading() {
  return (
    <WrapperLayout>
      <div className="min-h-screen py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="space-y-4">
          <Card className="shadow-none bg-white dark:bg-zinc-700/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </CardHeader>

            <CardContent>
              <Skeleton className="h-3 w-full mb-2" />
              <Skeleton className="h-3 w-5/6" />
            </CardContent>
          </Card>

          <Card className="shadow-none bg-white dark:bg-zinc-700/50 backdrop-blur-sm p-4 space-y-3">
            <Skeleton className="h-4 w-20" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-16 rounded-full" />
              ))}
            </div>
          </Card>
        </aside>

        <main className="lg:col-span-3 space-y-10">
          <Card className="border shadow-none overflow-hidden bg-white/80 dark:bg-zinc-700/50 backdrop-blur-sm">
            <CardHeader className="pb-4 space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-28 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>

              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-2/3" />
            </CardHeader>

            <CardContent className="-mt-4">
              <div className="flex items-center gap-6">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            </CardContent>

            <CardFooter>
              <Skeleton className="h-10 w-48 rounded-lg" />
            </CardFooter>
          </Card>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card
                key={i}
                className="shadow-none bg-white dark:bg-zinc-700/50 backdrop-blur-sm"
              >
                <CardHeader className="space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </CardHeader>

                <CardContent>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </main>
      </div>
    </WrapperLayout>
  )
}
