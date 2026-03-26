import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import potoProfile from "@/public/assets/images/roisbaru.jpeg";
import WrapperLayout from "@/components/wrapperLayout";
import { createClient } from "@supabase/supabase-js";
import thumnail from "../../../../public/assets/images/bg-artikel.png";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Clipboard,
  Facebook,
  InstagramFreeIcons,
  Linkedin,
  Message,
  TiktokFreeIcons,
  TwitterFreeIcons,
  Youtube,
} from "@hugeicons/core-free-icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CopyLinkButton } from "@/components/copy-button";
import { Metadata } from "next";
import CommentsSection from "./comments-section";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string | null;
  created_at: string;
}

const staticTags = [
  "ChatGPT",
  "AI Tools",
  "Next.js",
  "Supabase",
  "Web Development",
  "RoisDev",
];

async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data: post, error } = await supabase
      .from("posts")
      .select("id, title, slug, description, content, created_at")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("❌ Supabase Error:", error);
      return null;
    }

    if (!post) {
      console.log("⚠️ No post found for slug:", slug);
      return null;
    }

    return post as Post;
  } catch (err) {
    console.error("❌ Catch error:", err);
    return null;
  }
}

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await fetchPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found - RoisDev',
    };
  }

  const baseUrl = "https://roisdev.my.id";
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  
  const ogImage = post.image || `${baseUrl}/assets/images/bg-artikel.png`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: postUrl,
      siteName: 'RoisDev Blog',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
      locale: 'id_ID',
      type: 'article',
      publishedTime: post.created_at,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}


export default async function PostDetailContent({ slug }: { slug: string }) {
  const post = await fetchPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const baseUrl = "https://roisdev.my.id";
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(post.created_at));

  return (
    <div>
      <section className="relative w-full min-h-[270px] lg:min-h-[400px] overflow-hidden">
        <Image
          src={post.image || thumnail}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        <WrapperLayout>
          <div className="relative z-10 mx-auto flex flex-col justify-end pt-24 md:pt-32 lg:pt-40 pb-10 lg:pb-12">
            <div className="space-y-4 text-white">
              <div className="flex items-center gap-3 text-sm text-white/80">
                <Badge variant="secondary">Article</Badge>
                <span>{formattedDate}</span>
                <span>• 12 menit baca</span>
              </div>

              <h1 className="text-[20px] md:text-5xl font-extrabold leading-tight">
                {post.title}
              </h1>
            </div>
            <Breadcrumb className="mt-2">
              <BreadcrumbList>
                <BreadcrumbItem className="text-white">
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="text-white">
                  <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="text-white">
                  <BreadcrumbPage>Blog-detail</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </WrapperLayout>
      </section>

      <WrapperLayout>
        <div className="mx-auto pt- py-6">
          <div className="grid gap-10  lg:grid-cols-[260px_1fr]">
            <aside className="space-y-4 lg:sticky lg:top-26 self-start">
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
                    <CardTitle className="text-lg ">RoisDev</CardTitle>
                    <p className="-mt-1 text-sm text-gray-500">Web Developer</p>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm mt-2 text-gray-500">
                    Web developer yang selalu ingin berkembang dan mempelajari
                    hal-hal baru.
                  </p>

                  <div className="mt-4 flex items-center gap-4">
                    <a
                      href="https://instagram.com/username"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-pink-500 transition"
                      aria-label="Instagram"
                    >
                      <HugeiconsIcon icon={InstagramFreeIcons} size={18} />
                    </a>

                    <a
                      href="https://tiktok.com/@username"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-black dark:hover:text-white transition"
                      aria-label="TikTok"
                    >
                      <HugeiconsIcon icon={TiktokFreeIcons} size={18} />
                    </a>

                    <a
                      href="https://youtube.com/@username"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-red-500 transition"
                      aria-label="YouTube"
                    >
                      <HugeiconsIcon icon={Youtube} size={18} />
                    </a>
                  </div>
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

              <Card className="shadow-none hidden lg:block bg-white dark:bg-zinc-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-base">Bagikan Artikel</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 ">
                  <div className="flex items-center gap-3">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border text-gray-500 hover:bg-blue-500 hover:text-white transition"
                      aria-label="Bagikan ke Facebook"
                    >
                      <HugeiconsIcon icon={Facebook} size={16} />
                    </a>

                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border text-gray-500 hover:bg-sky-500 hover:text-white transition"
                      aria-label="Bagikan ke Twitter"
                    >
                      <HugeiconsIcon icon={TwitterFreeIcons} size={16} />
                    </a>

                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border text-gray-500 hover:bg-blue-700 hover:text-white transition"
                      aria-label="Bagikan ke LinkedIn"
                    >
                      <HugeiconsIcon icon={Linkedin} size={16} />
                    </a>

                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} ${postUrl}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border text-gray-500 hover:bg-green-500 hover:text-white transition"
                      aria-label="Bagikan ke WhatsApp"
                    >
                      <HugeiconsIcon icon={Message} size={16} />
                    </a>
                  </div>
                <CopyLinkButton url={`https://roisdev.my.id/blog/${post.slug}`} />

                </CardContent>
              </Card>
            </aside>

            <article className="-mt-20 lg:-mt-0 space-y-8">
              <div
                className="
                prose max-w-none
                prose-slate dark:prose-invert
                leading-relaxed tracking-normal text-[15.5px]

                [&_h1]:text-2xl [&_h1]:md:text-5xl [&_h1]:font-extrabold
                [&_h1]:text-muted-foreground [&_h1]:dark:text-slate-100
                [&_h1]:mt-8 [&_h1]:mb-4

                [&_h2]:text-xl [&_h2]:font-bold
                [&_h2]:text-muted-foreground [&_h2]:dark:text-gray-200
                [&_h2]:mt-8 [&_h2]:mb-3

                [&_h3]:text-xl [&_h3]:font-semibold
                [&_h3]:text-gray-600 [&_h3]:dark:text-gray-300
                [&_h3]:mt-6 [&_h3]:mb-2

                [&_p]:text-[16px]
                [&_p]:text-gray-500 [&_p]:dark:text-slate-300
                [&_p]:mb-2

                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2
                [&_li]:mb-1.5
                [&_li]:text-muted-foreground [&_li]:dark:text-slate-300

                [&_strong]:text-slate-900 [&_strong]:dark:text-white
                [&_strong]:font-semibold

                [&_img]:rounded-xl [&_img]:shadow [&_img]:my-6

                [&_figure.table]:my-6 [&_figure.table]:w-full [&_figure.table]:overflow-x-auto
                [&_table]:w-full [&_table]:border-collapse [&_table]:text-[15px] [&_table]:my-4
                [&_thead]:bg-slate-100 dark:[&_thead]:bg-slate-800/70
                [&_th]:border [&_th]:border-slate-300 dark:[&_th]:border-slate-700
                [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold
                [&_td]:border [&_td]:border-slate-200 dark:[&_td]:border-slate-700
                [&_td]:px-3 [&_td]:py-2
              "
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              />

              <CommentsSection slug={post.slug} />
            </article>

            {/* SIDEBAR MOBILE */}
            <aside className="space-y-4">
              <div className="block lg:hidden">
                <Card className="shadow-none mt-3  bg-white dark:bg-zinc-700/50 backdrop-blur-sm">
                  <CardHeader className="flex items-center gap-3">
                    <Image
                      src={potoProfile}
                      alt="Foto Penulis"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg ">RoisDev</CardTitle>
                      <p className="-mt-1 text-sm text-gray-500">
                        Web Developer
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm mt-2 text-gray-500">
                      Web developer yang selalu ingin berkembang dan mempelajari
                      hal-hal baru.
                    </p>

                    <div className="mt-4 flex items-center gap-4">
                      <a
                        href="https://instagram.com/username"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-pink-500 transition"
                        aria-label="Instagram"
                      >
                        <HugeiconsIcon icon={InstagramFreeIcons} size={18} />
                      </a>

                      <a
                        href="https://tiktok.com/@username"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-black dark:hover:text-white transition"
                        aria-label="TikTok"
                      >
                        <HugeiconsIcon icon={TiktokFreeIcons} size={18} />
                      </a>

                      <a
                        href="https://youtube.com/@username"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-red-500 transition"
                        aria-label="YouTube"
                      >
                        <HugeiconsIcon icon={Youtube} size={18} />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="border rounded-xl p-5 bg-white dark:bg-zinc-700/50 backdrop-blur-sm block lg:hidden">
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

              <Card className="shadow-none block lg:hidden bg-white dark:bg-zinc-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-base">Bagikan Artikel</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 ">
                  <div className="flex items-center gap-3">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border text-gray-500 hover:bg-blue-500 hover:text-white transition"
                      aria-label="Bagikan ke Facebook"
                    >
                      <HugeiconsIcon icon={Facebook} size={16} />
                    </a>

                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border text-gray-500 hover:bg-sky-500 hover:text-white transition"
                      aria-label="Bagikan ke Twitter"
                    >
                      <HugeiconsIcon icon={TwitterFreeIcons} size={16} />
                    </a>

                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border text-gray-500 hover:bg-blue-700 hover:text-white transition"
                      aria-label="Bagikan ke LinkedIn"
                    >
                      <HugeiconsIcon icon={Linkedin} size={16} />
                    </a>

                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} ${postUrl}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border text-gray-500 hover:bg-green-500 hover:text-white transition"
                      aria-label="Bagikan ke WhatsApp"
                    >
                      <HugeiconsIcon icon={Message} size={16} />
                    </a>
                  </div>
                  <button
                    // onClick={() => navigator.clipboard.writeText(postUrl)}
                    className="flex items-center gap-2 w-full justify-center rounded-lg border py-2 text-sm text-gray-600 hover:bg-gray-100 dark:hover:bg-zinc-600 transition"
                  >
                    <HugeiconsIcon icon={Clipboard} size={16} />
                    Salin Link
                  </button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </WrapperLayout>
    </div>
  );
}
