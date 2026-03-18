'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Upload, X, Loader2, Save } from 'lucide-react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
const Editor = dynamic(
  () => import('@tinymce/tinymce-react').then((mod) => mod.Editor),
  { ssr: false }
)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function PostForm() {
  const router = useRouter()
  const editorRef = useRef<any>(null)
  const [categories, setCategories] = useState<any[]>([])

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [tags, setTags] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editorLoaded, setEditorLoaded] = useState(false) // 

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    setSlug(generateSlug(value))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      const file = e.target.files?.[0]
      if (!file) return

      if (!file.type.startsWith('image/')) {
        alert('Please upload an image')
        return
      }

      if (file.size > 2 * 1024 * 1024) {
        alert('Image must be less than 2MB')
        return
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`

      const { error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file)

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName)

      setImage(publicUrl)
      alert('Image uploaded!')
    } catch (error) {
      console.error(error)
      alert('Error uploading image!')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = async () => {
    if (!image) return

    try {
      const fileName = image.split('/').pop()
      if (fileName) {
        await supabase.storage.from('blog-images').remove([fileName])
      }
      setImage('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const { error } = await supabase.from('posts').insert({
        image: image || null,
        title,
        description,
        content,
        slug,
        tags: tags || null,
        category_id: categoryId ? parseInt(categoryId) : null,
      })

      if (error) throw error

      alert('Post created successfully!')
      router.push('/blog')
    } catch (error) {
      console.error(error)
      alert('Error creating post!')
    } finally {
      setSaving(false)
    }
  }

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('category')
      .select('id, name')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching categories:', error)
      return
    }

    setCategories(data || [])
  }

  useEffect(() => {
    fetchCategories()
  }, [])


  return (
    <form onSubmit={handleSubmit} className="space-y-6  flex gap-4 w-full ">

      <div className='space-y-6'>
        <div className="space-y-2">
          <Label htmlFor="title">
            Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="Enter post title..."
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label>Featured Image (Optional)</Label>

          {!image ? (
            <label className="cursor-pointer">
              <Card className="border-2 border-dashed hover:border-teal-500 transition-colors">
                <div className="p-12 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm font-medium mb-1">
                    {uploading ? 'Uploading...' : 'Click to upload image'}
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                </div>
              </Card>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          ) : (
            <Card>
              <div className="relative w-full h-64">
                <Image
                  src={image}
                  alt="Preview"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate flex-1">
                  {image.split('/').pop()}
                </p>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveImage}
                  className="ml-4"
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-2">
          <Label>
            Content <span className="text-red-500">*</span>
          </Label>

          {!editorLoaded && (
            <Card className="p-8 text-center border-dashed">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-teal-600" />
              <p className="text-sm text-gray-500">Loading editor...</p>
            </Card>
          )}

          <div className={`border rounded-lg overflow-hidden ${!editorLoaded ? 'hidden' : ''}`}>
            <Editor
              apiKey="858j7u18k8wb7pt41w5urjfpeusf47tsp1fjysx244w7pz1h"
              onInit={(evt, editor) => {
                editorRef.current = editor
                setEditorLoaded(true)
              }}
              value={content}
              onEditorChange={(newContent) => setContent(newContent)}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'codesample', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                ],
                toolbar:
                  'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | code codesample | help',
                codesample_languages: [
                  { text: 'HTML/XML', value: 'markup' },
                  { text: 'JavaScript', value: 'javascript' },
                  { text: 'TypeScript', value: 'typescript' },
                  { text: 'CSS', value: 'css' },
                  { text: 'JSON', value: 'json' },
                  { text: 'Bash', value: 'bash' }
                ],
                extended_valid_elements: 'pre[class|data-language],code[class],span[class]',
                valid_children: '+pre[code]',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px; line-height:1.6; }',
                placeholder: 'Write your content here...'
              }}
            />
          </div>
          <p className="text-xs text-gray-500">
            Content length: {content.replace(/<[^>]*>/g, '').length} characters
          </p>
        </div>



        <div className="flex gap-4 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/blog')}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={saving || !title || !content}
            className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Publish Post
              </>
            )}
          </Button>
        </div>

      </div>

      <div className='space-y-4'>
        <div className="space-y-2">
          <Label htmlFor="slug">
            Slug <span className="text-sm text-gray-500">(Auto-generated)</span>
          </Label>
          <Input
            id="slug"
            placeholder="post-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="font-mono text-sm bg-gray-50 dark:bg-gray-900"
          />
          <p className="text-xs text-gray-500">
            URL: /blog/{slug || 'your-slug'}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Brief description of your post..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="resize-none"
          />
          <p className="text-xs text-gray-500">
            {description.length} characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (Optional)</Label>
          <Input
            id="tags"
            placeholder="e.g., coding, javascript, tutorial"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <p className="text-xs text-gray-500">
            Separate tags with commas
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="categoryId">Category</Label>

          <select
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="
      w-full rounded-md border border-input bg-background px-3 py-2 text-sm
      focus:outline-none focus:ring-2 focus:ring-teal-500
    "
          >
            <option value="">Pilih Category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <p className="text-xs text-gray-500">
            Select category for this post
          </p>
        </div>

        <Card className="p-4 bg-gray-50 dark:bg-gray-900">
          <div className="space-y-1 text-xs font-mono">
            <p><strong>Title:</strong> {title || '(empty)'}</p>
            <p><strong>Slug:</strong> {slug || '(empty)'}</p>
            <p><strong>Description:</strong> {description.length} chars</p>
            <p><strong>Tags:</strong> {tags || '(empty)'}</p>
            <p><strong>Category ID:</strong> {categoryId || '(empty)'}</p>
            <p><strong>Content:</strong> {content.replace(/<[^>]*>/g, '').length} chars</p>
            <p><strong>Image:</strong> {image ? '✅ URL (Storage)' : '❌ No image'}</p>
            {image && (
              <p className="truncate"><strong>URL:</strong> {image}</p>
            )}
          </div>
        </Card>
      </div>

    </form>
  )
}