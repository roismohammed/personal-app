"use client"
import { Badge } from "@/components/ui/badge"
import { motion, Variants } from "motion/react"

export default function ProjectHeader() {
  const variants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      className="text-center mb-12"
    >
      <Badge variant="outline" className="mb-4">
        Portofolio
      </Badge>

      <h2 className="text-3xl md:text-4xl font-bold">
        Proyek Terbaru
      </h2>

      <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
        Beberapa karya terbaik yang telah saya selesaikan untuk klien
      </p>
    </motion.div>
  )
}
