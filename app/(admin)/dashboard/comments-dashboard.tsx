"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, RefreshCw, Trash2 } from "lucide-react";

type StoredComment = {
  id: string;
  name: string;
  content: string;
  createdAt: string;
};

type CommentGroup = {
  slug: string;
  storageKey: string;
  comments: StoredComment[];
};

const COMMENT_PREFIX = "roisdev-comments-";

export default function CommentsDashboard() {
  const [groups, setGroups] = useState<CommentGroup[]>([]);
  const [ready, setReady] = useState(false);

  const totalComments = useMemo(
    () => groups.reduce((sum, group) => sum + group.comments.length, 0),
    [groups]
  );

  const loadComments = useCallback(() => {
    if (typeof window === "undefined") return;

    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith(COMMENT_PREFIX)
    );

    const nextGroups: CommentGroup[] = [];

    keys.forEach((key) => {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return;

        const parsed = JSON.parse(raw) as StoredComment[];
        if (!Array.isArray(parsed) || parsed.length === 0) return;

        nextGroups.push({
          slug: key.replace(COMMENT_PREFIX, ""),
          storageKey: key,
          comments: parsed,
        });
      } catch (error) {
        console.error("Failed to parse comment data:", error);
      }
    });

    nextGroups.sort((a, b) => b.comments.length - a.comments.length);
    setGroups(nextGroups);
  }, []);

  useEffect(() => {
    setReady(true);
    loadComments();
  }, [loadComments]);

  const deleteComment = (group: CommentGroup, commentId: string) => {
    const target = group.comments.find((item) => item.id === commentId);
    if (!target) return;

    const confirmed = window.confirm(
      `Hapus komentar dari ${target.name} di artikel "${group.slug}"?`
    );
    if (!confirmed) return;

    const nextComments = group.comments.filter((item) => item.id !== commentId);

    if (nextComments.length === 0) {
      localStorage.removeItem(group.storageKey);
    } else {
      localStorage.setItem(group.storageKey, JSON.stringify(nextComments));
    }

    loadComments();
  };

  const deleteAllBySlug = (group: CommentGroup) => {
    const confirmed = window.confirm(
      `Hapus semua komentar untuk artikel "${group.slug}"?`
    );
    if (!confirmed) return;

    localStorage.removeItem(group.storageKey);
    loadComments();
  };

  if (!ready) return null;

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageCircle className="h-5 w-5 text-purple-600" />
              Manajemen Komentar
            </CardTitle>
            <CardDescription>
              Hapus komentar dari dashboard admin.
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline">{totalComments} komentar</Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={loadComments}
              className="gap-1"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {groups.length === 0 ? (
          <div className="rounded-lg border border-dashed p-5 text-sm text-muted-foreground">
            Belum ada data komentar tersimpan.
          </div>
        ) : (
          groups.map((group) => (
            <div key={group.storageKey} className="rounded-xl border p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-sm">/blog/{group.slug}</p>
                  <p className="text-xs text-muted-foreground">
                    {group.comments.length} komentar
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => deleteAllBySlug(group)}
                >
                  Hapus Semua
                </Button>
              </div>

              <div className="space-y-2">
                {group.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="rounded-lg border bg-background p-3 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{comment.name}</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">
                        {comment.content}
                      </p>
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

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => deleteComment(group, comment.id)}
                      aria-label="Hapus komentar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
