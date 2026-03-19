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
    .select('title, description, image, slug') 
    .eq('slug', slug)
    .single()

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const baseUrl = "https://roisdev.my.id"
  const rawImage = post.image as string | null | undefined

  let imageUrl = `${baseUrl}/assets/images/bg-artikel.png`
  if (rawImage) {
    if (rawImage.startsWith('http://') || rawImage.startsWith('https://')) {
      imageUrl = rawImage
    } else if (rawImage.startsWith('/')) {
      imageUrl = `${baseUrl}${rawImage}`
    } else if (rawImage.startsWith('blog-images/')) {
      imageUrl = `${baseUrl}/storage/v1/object/public/${rawImage}`
    } else {
      imageUrl = `${baseUrl}/storage/v1/object/public/blog-images/${rawImage}`
    }
  }

  return {
    title: post.title,
    description: post.description ?? "",
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug || slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description ?? "",
      url: `${baseUrl}/blog/${post.slug || slug}`,
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
