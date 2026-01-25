// app/admin/posts/create/page.tsx

import WrapperLayout from '@/components/wrapperLayout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import CreatePostForm from './partials/create-post-form'

export default function CreatePostPage() {
  return (
    <WrapperLayout>
      <div className="min-h-screen py-24">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="border-none shadow-lg">
            <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-t-lg">
              <CardTitle className="text-3xl font-bold">Create New Post</CardTitle>
              <CardDescription className="text-teal-50">
                Write and publish your amazing content
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <CreatePostForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </WrapperLayout>
  )
}