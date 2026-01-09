"use client"

import { Badge } from "@/components/ui/badge";
import { motion, Variants } from 'motion/react';
import WrapperLayout from "../../wrapperLayout";
import Link from "next/link";
import { Button } from "../../ui/button";
import ProjectServer from "./project-server";
export default function ProjectSection() {
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

    return (
        <div className="bg-gray-50 dark:bg-zinc-900">
            <WrapperLayout>
                <section id="projects" className="container mx-auto py-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={containerVariants}
                        className="text-center mb-12">
                        <Badge variant="outline" className="mb-4">Portofolio</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white">
                            Proyek Terbaru
                        </h2>
                        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                            Beberapa karya terbaik yang telah saya selesaikan untuk klien
                        </p>
                    </motion.div>

                  {/* <ProjectServer/> */}

                    <div className="text-center mt-12">
                        <Link href="/project">
                            <Button variant="outline" className="cursor-pointer dark:bg-zinc-700/50 dark:text-white">
                                Lihat Semua Proyek
                            </Button>
                        </Link>
                    </div>
                </section>
            </WrapperLayout>
        </div>
    )
}
