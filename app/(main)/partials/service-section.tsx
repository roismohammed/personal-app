"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Code, Palette, Smartphone } from "lucide-react";
import { motion, Variants } from 'motion/react';
import WrapperLayout from "@/components/wrapperLayout";

export default function ServiceSection() {

    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                // staggerChildren: 0.15,
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
            {/* Services Section */}
            <section className="py-16 bg-white dark:bg-zinc-800">
                <WrapperLayout>
                    <motion.div
                        id="services"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={containerVariants}
                        className="text-center mb-12">
                        <Badge variant="outline" className="mb-4">
                            Services
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white">
                            What I Offer
                        </h2>
                        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                            Complete solutions for your digital development needs
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* Web Development */}
                        <motion.div variants={cardVariants}>
                            <Card className="hover:shadow-lg transition-all duration-300 border-0 dark:bg-zinc-700">
                                <CardHeader>
                                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                                        <Code className="text-blue-600 h-5 w-5" />
                                    </div>
                                    <CardTitle>Web Development</CardTitle>
                                    <CardDescription>
                                        Responsive websites and modern web applications with the latest technology
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center">
                                            <Check className="text-green-500 h-4 w-4 mr-2" /> React/Next.js
                                        </li>
                                        <li className="flex items-center">
                                            <Check className="text-green-500 h-4 w-4 mr-2" /> JavaScript
                                        </li>
                                        <li className="flex items-center">
                                            <Check className="text-green-500 h-4 w-4 mr-2" /> TypeScript
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Tools Used */}
                        <motion.div variants={cardVariants}>
                            <Card className="hover:shadow-lg transition-all duration-300 border-0 dark:bg-zinc-700">
                                <CardHeader>
                                    <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                                        <Smartphone className="text-purple-600 h-5 w-5" />
                                    </div>

                                    <CardTitle>Tools I Use</CardTitle>
                                    <CardDescription>
                                        Key technologies and tools in application development
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center">
                                            <Check className="text-green-500 h-4 w-4 mr-2" />
                                            GitHub
                                        </li>

                                        <li className="flex items-center">
                                            <Check className="text-green-500 h-4 w-4 mr-2" />
                                            VSCode
                                        </li>

                                        <li className="flex items-center">
                                            <Check className="text-green-500 h-4 w-4 mr-2" />
                                            Notion
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* UI Design */}
                        <motion.div variants={cardVariants}>
                            <Card className="hover:shadow-lg transition-all duration-300 border-0 dark:bg-zinc-700">
                                <CardHeader>
                                    <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                                        <Palette className="text-green-600 h-5 w-5" />
                                    </div>
                                    <CardTitle>UI Design</CardTitle>
                                    <CardDescription>
                                        Modern and consistent interface designs for great user experience
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center">
                                            <Check className="text-green-500 h-4 w-4 mr-2" /> Tailwind CSS
                                        </li>
                                        <li className="flex items-center">
                                            <Check className="text-green-500 h-4 w-4 mr-2" /> Bootstrap
                                        </li>
                                        <li className="flex items-center">
                                            <Check className="text-green-500 h-4 w-4 mr-2" /> shadcn/ui
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </WrapperLayout>
            </section>
        </div>
    )
}