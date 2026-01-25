// app/blog/loading.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import WrapperLayout from "@/components/wrapperLayout"

export default function Loading() {
  return (
    <div>
      {/* Header tetap muncul instant */}
      <div className="relative overflow-hidden pt-14 bg-white dark:bg-zinc-900 border-b">
        <div className="container mx-auto px-4 py-16 text-center max-w-4xl">
          <Skeleton className="h-8 w-48 mx-auto mb-6" />
          <Skeleton className="h-12 w-96 mx-auto mb-6" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-8" />
          <Skeleton className="h-12 w-full max-w-md mx-auto" />
        </div>
      </div>

      <WrapperLayout>
        <div className="min-h-screen py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar skeleton */}
          <aside className="space-y-4">
            <Card>
              <CardHeader>
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </aside>

          {/* Content skeleton */}
          <main className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
            </Card>
          </main>
        </div>
      </WrapperLayout>
    </div>
  )
}