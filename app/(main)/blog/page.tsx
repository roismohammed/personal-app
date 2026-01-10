
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Search,
  Tag,
  TrendingUp,
  User,
} from "lucide-react";
import Image from "next/image";
import potoProfile from "@/public/assets/images/roisbaru.jpeg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import WrapperLayout from "@/components/wrapperLayout";
import ServerBlog from "./partials/server-blog";
export const revalidate = 300;

export default async function IndexBlog() {
  // const [featured, posts] = await Promise.all([fetchFeaturedPost(), fetchPosts(),]);

  const popularTags = [
    "React",
    "TypeScript",
    "NextJS",
    "CSS",
    "Node.js",
    "Python",
    "UX Design",
    "Performance",
    "Testing",
    "DevOps",
    "AI",
    "Startup",
  ];

  return (
    <div>
      {/* HEADER */}
      <div className="bg-transparent relative rounded-lg border-none">
        <GridPattern
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [6, 6],
            [10, 10],
            [12, 15],
            [18, 10],
          ]}
          className={cn(
            "pointer-events-none absolute inset-0 z-10 h-full w-full",
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
            "opacity-50 dark:opacity-30"
          )}
        />

        <div className="relative overflow-hidden pt-14 bg-white dark:bg-zinc-900 border-b">
          <div className="container mx-auto px-4 py-16 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-zinc-700/50 mb-6">
              <BookOpen className="h-4 w-4 text-teal-600" />
              <span className="text-sm font-medium">
                Development Blog
              </span>
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

          {/* SIDEBAR */}
          <aside className="lg:sticky lg:top-34 self-start space-y-4">
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
                  Web developer yang selalu ingin berkembang dan mempelajari hal-hal baru.
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

          {/* CONTENT */}
          <main className="lg:col-span-3 space-y-10">
            {/* {featured && (
              <Card className="border shadow-none overflow-hidden bg-white/80 dark:bg-zinc-700/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-cyan-700 dark:bg-blue-900 dark:text-cyan-300"
                    >
                      {featured.category?.name ?? "-"}
                    </Badge>

                    <div className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400">
                      <TrendingUp className="h-3 w-3" />
                      Trending
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
                    <Button className="group bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700">
                      Read Full Article
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )} */}


            <div>
              <ServerBlog/>
            </div>

          </main>
        </div>
      </WrapperLayout>

    </div>
  );
}
