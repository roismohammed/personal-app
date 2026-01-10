import PostForm from "../../partials/form-post";

export default function EditPostPage() {


  return (
    <div className="">
      <PostForm
        // initialData={initialData}
        // onSubmit={handleUpdate}
        submitText="Update Post"
        isEditing={true}
        // isLoading={saving}
      />
    </div>
  );
}
