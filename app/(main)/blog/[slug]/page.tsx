// import { notFound } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import {
//     Card,
//     CardHeader,
//     CardContent,
//     CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import potoProfile from "@/public/assets/images/roisbaru.jpeg";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { Metadata } from "next";
// import WrapperLayout from "@/components/wrapperLayout";
// import ShareButtons from "./share-button";
// // import fetchPostBySlug from "../partials/fetch-by-slug";
// import { ArrowLeft } from "lucide-react";

// const staticTags = [
//     "ChatGPT",
//     "AI Tools",
//     "Next.js",
//     "Supabase",
//     "Web Development",
//     "RoisDev",
// ];


// export async function generateMetadata(
//     { params }: { params: Promise<{ slug: string }> }
// ): Promise<Metadata> {
//     const { slug } = await params;

//     const post = await fetchPostBySlug(slug);
//     if (!post) return {};


//     const baseUrl = "https://roisdev.my.id";

//     const imageUrl = post.image
//         ? post.image.startsWith("http")
//             ? post.image
//             : `${baseUrl}${post.image}`
//         : `${baseUrl}/og-default.jpg`;

//     return {
//         title: post.title,
//         description: post.description ?? "",

//         openGraph: {
//             title: post.title,
//             description: post.description ?? "",
//             url: `${baseUrl}/blog/${post.slug}`,
//             siteName: "RoisDev",
//             images: [
//                 {
//                     url: imageUrl,
//                     width: 1200,
//                     height: 630,
//                     alt: post.title,
//                 },
//             ],
//             type: "article",
//             locale: "id_ID",
//         },

//         twitter: {
//             card: "summary_large_image",
//             title: post.title,
//             description: post.description ?? "",
//             images: [imageUrl],
//         },
//     };
// }

// export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
//     const { slug } = await params;
//     const post = await fetchPostBySlug(slug);
//     if (!post) {
//         notFound();
//     }
//     const baseUrl = "https://roisdev.my.id";
//     const postUrl = `${baseUrl}/blog/${post.slug}`;

//     const formattedDate = new Intl.DateTimeFormat("id-ID", {
//         year: "numeric",
//         month: "long",
//         day: "2-digit",
//     }).format(new Date(post.created_at));



//     return (
//         <WrapperLayout>
//             <div className="mx-auto pt-28 py-10">
//                 <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
//                     <aside className="space-y-4 lg:sticky lg:top-32 self-start">
//                         {/* Back Button */}
//                         <Link
//                             href="/blog"
//                             className="inline-flex items-center gap-3 px-5 py-3 rounded-lg hover:text-gray-500 transition"
//                         >
//                             <ArrowLeft size={18} />
//                             <span className="text-base font-semibold">Back </span>
//                         </Link>
//                         {/* Tentang Saya */}
//                         <Card className="shadow-none mt-3 hidden lg:block bg-white dark:bg-zinc-700/50 backdrop-blur-sm">
//                             <CardHeader className="flex items-center gap-3">
//                                 <Image
//                                     src={potoProfile}
//                                     alt="Foto Penulis"
//                                     width={48}
//                                     height={48}
//                                     className="rounded-full"
//                                 />
//                                 <div>
//                                     <CardTitle className="text-lg">RoisDev</CardTitle>
//                                     <small className="-mt-2">Web Developer</small>
//                                 </div>
//                             </CardHeader>
//                             <CardContent>
//                                 <p className="text-sm mt-2 text-gray-500">
//                                     Web developer yang selalu ingin berkembang dan mempelajari hal-hal baru.
//                                 </p>
//                             </CardContent>
//                         </Card>

//                         {/* Tags */}
//                         <div className="border not-only: rounded-xl p-5 hidden lg:block md:block bg-white dark:bg-zinc-700/50 backdrop-blur-sm">
//                             <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
//                                 Tags
//                             </h2>
//                             <div className="mt-3 flex flex-wrap gap-2">
//                                 {staticTags.map((tag) => (
//                                     <Badge key={tag} variant="outline" className="text-xs">
//                                         #{tag}
//                                     </Badge>
//                                 ))}
//                             </div>
//                         </div>
//                     </aside>

//                     {/* KONTEN ARTIKEL */}
//                     <article className="-mt-8 lg:mt-0 lg:space-y-8">
//                         <header className="space-y-4">
//                             {/* Meta + Share */}
//                             <div className="flex flex-wrap items-center justify-between gap-4">
//                                 <div className="flex items-center gap-3 text-sm text-muted-foreground">
//                                     {post.category?.name && (
//                                         <Badge variant="secondary">{post.category?.name}</Badge>
//                                     )}
//                                     <span>{formattedDate}</span>
//                                 </div>

//                                 {/* Share Buttons - Client Component */}
//                                 <ShareButtons
//                                     title={post.title}
//                                     url={postUrl}
//                                 />
//                             </div>

//                             <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>

//                             {post.description && (
//                                 <p className="text-lg text-muted-foreground">{post.description}</p>
//                             )}
//                         </header>

//                         {post.image && (
//                             <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden">
//                                 <Image
//                                     src={post.image}
//                                     alt={post.title}
//                                     fill
//                                     className="object-cover"
//                                 />
//                             </div>
//                         )}

//                         <div
//                             className="
//                                 prose max-w-none
//                                 prose-slate dark:prose-invert
//                                 leading-relaxed tracking-normal text-[15.5px]
                                
//                                 [&_h1]:text-2xl [&_h1]:md:text-5xl [&_h1]:font-extrabold
//                                 [&_h1]:text-slate-800 [&_h1]:dark:text-slate-100
//                                 [&_h1]:mt-8 [&_h1]:mb-4

//                                 [&_h2]:text-xl [&_h2]:font-bold
//                                 [&_h2]:text-slate-800 [&_h2]:dark:text-slate-200
//                                 [&_h2]:mt-8 [&_h2]:mb-3

//                                 [&_h3]:text-xl [&_h3]:font-semibold
//                                 [&_h3]:text-slate-700 [&_h3]:dark:text-slate-300
//                                 [&_h3]:mt-6 [&_h3]:mb-2

//                                 [&_p]:text-[16px]
//                                 [&_p]:text-slate-700 [&_p]:dark:text-slate-300
//                                 [&_p]:mb-4

//                                 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3
//                                 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3
//                                 [&_li]:mb-1.5
//                                 [&_li]:text-slate-700 [&_li]:dark:text-slate-300

//                                 [&_strong]:text-slate-900 [&_strong]:dark:text-white
//                                 [&_strong]:font-semibold

//                                 [&_img]:rounded-xl [&_img]:shadow [&_img]:my-6
//                             "
//                             dangerouslySetInnerHTML={{ __html: post.content || "" }}
//                         />

//                         {/* Comment Section */}
//                         <section className="mt-16 space-y-6">
//                             <h2 className="text-xl font-semibold">Tinggalkan Komentar</h2>
//                             <form className="space-y-4">
//                                 <Input placeholder="Nama kamu" className="max-w-md" />
//                                 <Textarea
//                                     placeholder="Tulis komentar kamu di sini..."
//                                     rows={4}
//                                     className="max-w-2xl"
//                                 />
//                                 <Button type="submit">Kirim Komentar</Button>
//                             </form>
//                             <p className="text-sm text-muted-foreground">
//                                 Komentar akan tampil setelah dimoderasi.
//                             </p>
//                         </section>
//                     </article>

//                     <aside className="space-y-4 lg:sticky lg:top-32 self-start">
//                         <div className="block lg:hidden">
//                             <Card className="border shadow-none bg-white dark:bg-zinc-700/50 backdrop-blur-sm">
//                                 <CardHeader className="flex items-center gap-3">
//                                     <div className="relative w-12 h-12 rounded-full overflow-hidden border">
//                                         <Image
//                                             src={potoProfile}
//                                             alt="Foto Penulis"
//                                             width={48}
//                                             height={48}
//                                             className="object-cover"
//                                         />
//                                     </div>
//                                     <div>
//                                         <CardTitle className="text-lg font-semibold dark:text-white">
//                                             RoisDev
//                                         </CardTitle>
//                                         <small className="text-gray-500 -mt-3">Web Developer</small>
//                                     </div>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <p className="text-sm text-slate-600 -mt-2 dark:text-slate-400 leading-relaxed">
//                                         Web developer yang selalu ingin berkembang dan belajar hal-hal baru.
//                                     </p>
//                                 </CardContent>
//                             </Card>
//                         </div>

//                         <div className="border rounded-xl p-5 bg-card block lg:hidden md:hidden">
//                             <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
//                                 Tags
//                             </h2>
//                             <div className="mt-3 flex flex-wrap gap-2">
//                                 {staticTags.map((tag) => (
//                                     <Badge key={tag} variant="outline" className="text-xs">
//                                         #{tag}
//                                     </Badge>
//                                 ))}
//                             </div>
//                         </div>
//                     </aside>
//                 </div>
//             </div>
//         </WrapperLayout>
//     );
// }


import React from 'react'

export default function Page() {
  return (
    <div>
      
    </div>
  )
}
