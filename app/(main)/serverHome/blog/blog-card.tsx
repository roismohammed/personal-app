import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PostData } from "@/types"

export default function BlogCard({ post }: { post: PostData }) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">
          {/* {post.excerpt} */}
        </p>
      </CardContent>
    </Card>
  )
}
