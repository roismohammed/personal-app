
import ProjectForm from "../../partials/project-form";

export default function EditProjectPage() {

  return (
    <div className="">
      <ProjectForm
        // initialData={initialData}
        // onSubmit={handleUpdate}
        submitText="Update projects"
        isEditing={true}
        // isLoading={saving}
      />
    </div>
  );
}
