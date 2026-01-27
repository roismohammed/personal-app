"use client";
import CardBlog from "@/components/cardBlog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import WrapperLayout from "@/components/wrapperLayout";
import { Wrench, Loader2 } from "lucide-react";
import { motion, Variants } from "motion/react";
import Link from "next/link";
import { useState, useEffect } from "react"; 
import { useLanguage } from "@/lib/language-context";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
interface Post {
  id: string | number;
  title: string;
  slug: string;
  description: string;
  created_at: string;
  image: string;
  category: { name: string } | { name: string }[];
}
export default function BlogSection() {
  const { t } = useLanguage();
const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select(`
            id, 
            title, 
            slug, 
            description, 
            created_at,
            image,
            category:category_id (name)
          `)
          .order('created_at', { ascending: false })
          .limit(20);

        if (error) throw error;
        setPosts(data);
      } catch (error) {
        console.error('Supabase error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const gridContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const gridItemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

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
            {t("blog_badge")}
          </Badge>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white">
            {t("blog_title")}
          </h2>

          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t("blog_desc")}
          </p>
        </motion.div>

        {/* 3. Logic Tampilan: Loading -> Empty -> Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
            <p className="text-sm text-muted-foreground mt-2">Fetching articles...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-3 py-10">
            <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <Wrench className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-foreground">
                {t("blog_maintenance_title")}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t("blog_maintenance_desc")}
              </p>
            </div>
          </div>
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

        <div className="text-center mt-12">
          <Link href="/blog">
            <Button
              variant="outline"
              className="gap-2 cursor-pointer dark:bg-zinc-700/50 dark:text-white"
              size="lg"
            >
              {t("blog_view_all")}
            </Button>
          </Link>
        </div>
      </WrapperLayout>
    </section>
  );
}