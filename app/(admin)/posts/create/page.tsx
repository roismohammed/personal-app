
import WrapperLayout from '@/components/wrapperLayout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import CreatePostForm from '../partials/create-post-form'

export default function CreatePostPage() {
  return (
    <WrapperLayout>
      <div className="">
        <div className="w-full mx-auto px-4">
          <Card className="border-none shadow-none">
            <CardHeader className="  ">
              <CardTitle className="text-3xl font-bold">Create New Post</CardTitle>
              <CardDescription >
                Write and publish your amazing content
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <CreatePostForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </WrapperLayout>
  )
}