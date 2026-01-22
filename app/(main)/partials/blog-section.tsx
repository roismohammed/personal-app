"use client"
import CardBlog from "@/components/cardBlog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import WrapperLayout from "@/components/wrapperLayout"
import { PostData } from "@/types"
import { motion, Variants } from "motion/react"
import Link from "next/link"
import {  useState } from "react"




export default function BlogSection() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const gridContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  }

  const gridItemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }


  // easync function fetchData()  {
  //   const { data, error } = await supabase
  //     .from("posts")
  //     .select(` *,category:category (id,name)`)
  //     .order("created_at", { ascending: false });

  //   if (error) {
  //     console.error("Error fetching posts:", error);
  //   } else {
  //     setPosts(data);
  //   }
  // }


  // useEffect(() => {
  //   fetchData();
  // }, [])

  return (
    <section id="articles" className="mx-auto py-16 bg-white dark:bg-zinc-800">
      <WrapperLayout>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={headerVariants}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">
            Articles
          </Badge>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white">
            Latest Coding Articles
          </h2>

          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Latest tips, tricks and guides in the world of software development
          </p>
        </motion.div>

        {/* Blog Grid */}
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No articles available
          </p>
        ) : (
          <motion.div
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {posts.map((post) => (
              <motion.div key={post.id} variants={gridItemVariants}>
                <CardBlog posts={post} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All Articles Button */}
        <div className="text-center mt-12">
          <Link href="/blog">
            <Button
              variant="outline"
              className="gap-2 cursor-pointer dark:bg-zinc-700/50 dark:text-white"
              size="lg"
            >
              View All Articles
            </Button>
          </Link>
        </div>
      </WrapperLayout>
    </section>
  )
}