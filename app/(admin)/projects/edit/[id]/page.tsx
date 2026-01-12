import { createClient } from "@/lib/supabase/server";
import ProjectForm from "../../partials/project-form";

export default async function EditProjectPage({ params }: any) {
  const supabase = await createClient(); // Tambahkan await

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id)
    .single();

  // Handle error
  if (error || !data) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">
          Project not found
        </h1>
        <p className="text-gray-600 mt-2">
          The project you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <p className="text-gray-600">Update your project details</p>
      </div>
      <ProjectForm initialData={data} />
    </div>
  );
}