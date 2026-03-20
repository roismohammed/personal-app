import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';
import potoProfile from '@/public/assets/images/roisbaru.jpeg';
export interface Post {
  id: string | number;
  title: string;
  slug: string;
  description: string;
  created_at: string;
  image: string | null;
  category: any;
}

interface CardBlogProps {
  posts: Post;
}


export default function CardBlog({ posts }: CardBlogProps) {
    return (
        <div key={posts.id}>
            <Link href={`/blog/${posts.slug}`} key={posts.id} prefetch={false}>
                <Card
                    className="group py-0 cursor-pointer rounded-3xl border border-slate-200 shadow-none transition-colors duration-300 dark:border-zinc-600 dark:bg-zinc-700 overflow-hidden"
                >
                    {/* Gambar */}
                    <div className="relative h-58 w-full overflow-hidden">
                        <Image
                            src={posts.image ?? ""}
                            alt={posts.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-3">
                            <Badge
                                variant="secondary"
                                className="text-xs px-2.5 py-1 rounded-md"
                            >
                                {posts.category?.name ?? "-"}
                            </Badge>

                            <span className='text-sm text-muted-foreground'>
                                {new Intl.DateTimeFormat("id-ID", {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit",
                                }).format(new Date(posts.created_at))}
                            </span>
                        </div>

                        <CardTitle className="text-lg group-hover:text-teal-600 transition-colors">
                            {posts.title.slice(0, 50) + " ..."}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="mb-4">

                        <CardDescription className="mb-4 -mt-4">
                            {posts.description?.slice(0, 70) ?? ""} ...
                        </CardDescription>

                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-2">
                                <Image
                                    src={potoProfile}
                                    alt="Foto profil Roisdev"
                                    width={20}
                                    height={20}
                                    className="rounded-full object-cover"
                                />
                                Roisdev
                            </span>

                            <Button variant="ghost" size="sm" className="h-8 px-3 cursor-pointer">
                                Baca Selengkapnya
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </div>
    )
}
