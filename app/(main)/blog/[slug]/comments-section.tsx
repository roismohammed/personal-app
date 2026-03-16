"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageCircleMore } from "lucide-react";

const commentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama minimal 2 karakter")
    .max(40, "Nama maksimal 40 karakter"),
  content: z
    .string()
    .trim()
    .min(8, "Komentar minimal 8 karakter")
    .max(500, "Komentar maksimal 500 karakter"),
});

type CommentFormData = z.infer<typeof commentSchema>;

type StoredComment = {
  id: string;
  name: string;
  content: string;
  createdAt: string;
};

interface CommentsSectionProps {
  slug: string;
}

export default function CommentsSection({ slug }: CommentsSectionProps) {
  const [comments, setComments] = useState<StoredComment[]>([]);
  const storageKey = useMemo(() => `roisdev-comments-${slug}`, [slug]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      name: "",
      content: "",
    },
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (!saved) return;

      const parsed = JSON.parse(saved) as StoredComment[];
      if (Array.isArray(parsed)) {
        setComments(parsed);
      }
    } catch (error) {
      console.error("Failed to load comments:", error);
    }
  }, [storageKey]);

  const onSubmit = async (values: CommentFormData) => {
    const nextComment: StoredComment = {
      id: crypto.randomUUID(),
      name: values.name.trim(),
      content: values.content.trim(),
      createdAt: new Date().toISOString(),
    };

    const nextComments = [nextComment, ...comments];
    setComments(nextComments);

    try {
      localStorage.setItem(storageKey, JSON.stringify(nextComments));
    } catch (error) {
      console.error("Failed to save comments:", error);
    }

    reset();
  };

  return (
    <section className="mt-16 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Komentar</h2>
        <Badge variant="outline" className="text-xs">
          {comments.length} Komentar
        </Badge>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
        <div className="space-y-2">
          <Input placeholder="Nama kamu" {...register("name")} />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Textarea
            placeholder="Tulis komentar kamu di sini..."
            rows={4}
            {...register("content")}
          />
          {errors.content && (
            <p className="text-xs text-red-500">{errors.content.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Mengirim..." : "Kirim Komentar"}
        </Button>
      </form>

      <p className="text-sm text-muted-foreground">
        Komentar disimpan di browser Anda untuk demo interaksi.
      </p>

      <div className="space-y-4 pt-2">
        {comments.length === 0 ? (
          <div className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground flex items-center gap-2">
            <MessageCircleMore className="h-4 w-4" />
            Belum ada komentar. Jadilah yang pertama berkomentar.
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-xl border bg-background p-4 space-y-2"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-sm">{comment.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Intl.DateTimeFormat("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(comment.createdAt))}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
