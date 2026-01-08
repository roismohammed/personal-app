"use client"
import { Badge } from "@/components/ui/badge";
import { motion, Variants } from 'motion/react';
import WrapperLayout from "../wrapperLayout";
import Link from "next/link";
import { Button } from "../ui/button";
export default function BlogSection() {
    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                // staggerChildcren: 0.15,
            },
        },
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };
    return (
        <div>
            {/* Articles Section - TAMBAHKAN POSTS DI SINI */}
            <section id="articles" className="mx-auto py-16 bg-white dark:bg-zinc-800">
                <WrapperLayout>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={containerVariants}
                        className="text-center mb-12">
                        <Badge variant="outline" className="mb-4">Artikel</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white">
                            Artikel Terbaru tentang Coding
                        </h2>
                        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                            Tips, trik, dan panduan terbaru dalam dunia pengembangan software
                        </p>
                    </motion.div>

                    {/* Jika posts masih loading, tampilkan skeleton */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {/* {posts.length === 0 ? (
                                <p className="col-span-full text-center text-muted-foreground">
                                    Tidak ada artikel
                                </p>
                            ) : (
                                posts.map((post) => (
                                    <motion.div key={post.id} variants={cardVariants}>
                                        <CardBlog posts={post} />
                                    </motion.div>
                                ))
                            )} */}
                    </motion.div>


                    <div className="text-center mt-12">
                        <Link href="/posts">
                            <Button variant="outline" className="gap-2 cursor-pointer dark:bg-zinc-700/50 dark:text-white">
                                <i className="fas fa-book-open"></i>
                                Lihat Semua Artikel
                            </Button>
                        </Link>
                    </div>
                </WrapperLayout>
            </section>
        </div>
    )
}
