import { motion, Variants } from "motion/react"
import { PostData } from "@/types"
import CardBlog from "@/components/cardBlog"

export default function BlogGridClient({
  posts,
}: {
  posts: PostData[]
}) {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  if (posts.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        Tidak ada artikel
      </p>
    )
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {posts.map((post) => (
        <motion.div key={post.id} variants={item}>
          <CardBlog posts={post} />
        </motion.div>
      ))}
    </motion.div>
  )
}
