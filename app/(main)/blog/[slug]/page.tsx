// app/blog/[slug]/page.tsx
import { Suspense } from "react"
import { Metadata } from "next"
import PostDetailContent from "./postDetailContent"
import PostDetailSkeleton from "./postDetailSkeleton"
import { createClient } from "@supabase/supabase-js" // ✅ Import langsung

export const revalidate = 300

type Props = {
  params: Promise<{ slug: string }> 
}

export async function generateStaticParams() {
  // ✅ Create client langsung di sini
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: posts } = await supabase
    .from('posts')
    .select('slug')
    .limit(50)

  return posts?.map((post) => ({
    slug: post.slug,
  })) || []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params 
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: post } = await supabase
    .from('posts')
    .select('title, description') 
    .eq('slug', slug)
    .single()

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const baseUrl = "https://roisdev.my.id"
  const imageUrl = `${baseUrl}/og-default.jpg`

  return {
    title: post.title,
    description: post.description ?? "",
    openGraph: {
      title: post.title,
      description: post.description ?? "",
      url: `${baseUrl}/blog/${slug}`,
      siteName: "RoisDev",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description ?? "",
      images: [imageUrl],
    },
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params 
  
  return (
    <Suspense fallback={<PostDetailSkeleton />}>
      <PostDetailContent slug={slug} />
    </Suspense>
  )
}
