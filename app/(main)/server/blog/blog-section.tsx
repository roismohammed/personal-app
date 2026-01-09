import WrapperLayout from "@/components/wrapperLayout"
import BlogHeader from "./blog-header"
import BlogServer from "./blog-server"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BlogSection() {
  return (
    <section
      id="articles"
      className="mx-auto py-16 bg-white dark:bg-zinc-800"
    >
      <WrapperLayout>
        <BlogHeader />
        <BlogServer />

        <div className="text-center mt-12">
          <Link href="/posts">
            <Button
              variant="outline"
              className="gap-2 cursor-pointer dark:bg-zinc-700/50 dark:text-white"
            >
              Lihat Semua Artikel
            </Button>
          </Link>
        </div>
      </WrapperLayout>
    </section>
  )
}
