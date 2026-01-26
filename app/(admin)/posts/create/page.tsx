import CreatePostForm from '../partials/create-post-form'

export default function CreatePostPage() {
  return (
    <div >
        <div className="w-full  ">
          <p className="text-3xl font-bold">Create New Post</p>
          <p>  Write and publish your amazing content</p>
        </div>
          <div className='mt-6'>
            <CreatePostForm />
          </div>
      </div>
  )
}