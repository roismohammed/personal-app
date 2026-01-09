"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import ProjectForm from "../../partials/project-form";
import { createClient } from "@/lib/supabase/server";
import { ProjectData } from "@/types";

export default function EditProjectPage() {
  const { id } = useParams();
  const router = useRouter();
const client = createClient()
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Ambil data awal post
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await client
        .from("projects")
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

  const handleUpdate = async (data: ProjectData) => {
    setSaving(true);

    const { error } = await client
      .from("projects")
      .update(data)
      .eq("id", id);

    setSaving(false);

    if (error) {
      console.error(error);
      toast.error("Gagal mengupdate post");
      return;
    }

    toast.success("projects berhasil diupdate");
    router.push("/projects");
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!initialData) {
    return <div className="p-6">Post tidak ditemukan</div>;
  }

  return (
    <div className="">
      <ProjectForm
        initialData={initialData}
        onSubmit={handleUpdate}
        submitText="Update projects"
        isEditing={true}
        isLoading={saving}
      />
    </div>
  );
}
