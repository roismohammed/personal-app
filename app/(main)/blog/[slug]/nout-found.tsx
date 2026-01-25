// app/blog/[slug]/not-found.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileQuestion, Home, ArrowLeft } from "lucide-react"
import WrapperLayout from "@/components/wrapperLayout"

export default function NotFound() {
  return (
    <WrapperLayout>
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full">
                <FileQuestion className="h-12 w-12 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <CardTitle className="text-3xl mb-2">Post Not Found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-600 dark:text-slate-400">
              Sorry, we couldn't find the blog post you're looking for.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link href="/blog" className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button className="w-full gap-2 bg-teal-600 hover:bg-teal-700">
                  <Home className="h-4 w-4" />
                  Go Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </WrapperLayout>
  )
}