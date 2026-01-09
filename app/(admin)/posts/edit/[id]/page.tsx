"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import PostForm from "../../partials/form-post";
import { createClient } from "@/lib/supabase/server";

export default function EditPostPage() {
  const { id } = useParams();
  // const router = useRouter();
  const client = createClient();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving,] = useState(false);

  // Ambil data awal post
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await client
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        toast.error("Gagal mengambil data post");
      } else {
        setInitialData(data);
      }

      setLoading(false);
    };

    fetchPost();
  }, [id]);

  // const handleUpdate = async (data:string) => {
  //   setSaving(true);

  //   const { error } = await client
  //     .from("posts")
  //     .update(data)
  //     .eq("id", id);

  //   setSaving(false);

  //   if (error) {
  //     console.error(error);
  //     toast.error("Gagal mengupdate post");
  //     return;
  //   }

  //   toast.success("Post berhasil diupdate");
  //   router.push("/posts");
  // };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!initialData) {
    return <div className="p-6">Post tidak ditemukan</div>;
  }

  return (
    <div className="">
      <PostForm
        initialData={initialData}
        // onSubmit={handleUpdate}
        submitText="Update Post"
        isEditing={true}
        isLoading={saving}
      />
    </div>
  );
}
