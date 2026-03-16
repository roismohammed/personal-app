'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Upload, X, Loader2, Save } from 'lucide-react'
import Image from 'next/image'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function PostForm() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [status, setStatus] = useState('draft')

  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  const generateSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  const handleTitleChange = (value: string) => { setTitle(value); setSlug(generateSlug(value)) }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      const file = e.target.files?.[0]
      if (!file) return
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const { error } = await supabase.storage.from('blog-images').upload(fileName, file)
      if (error) throw error
      const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(fileName)
      setImage(publicUrl)
    } catch (error) { alert('Upload failed') } finally { setUploading(false) }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        title,
        slug,
        description,
        category,
        cover: image || null,
        status,
        created_at: createdAt ? new Date(createdAt).toISOString() : new Date().toISOString(),
      }

      const { error } = await supabase.from('ebooks').insert(payload)
      if (error) {
        // Fallback if status column is not available in the table schema.
        const { error: fallbackError } = await supabase.from('ebooks').insert({
          title,
          slug,
          description,
          category,
          cover: image || null,
          created_at: createdAt ? new Date(createdAt).toISOString() : new Date().toISOString(),
        })
        if (fallbackError) throw fallbackError
      }

      alert('Ebook created!')
      router.push('/ebooks')
    } catch (err) { console.error(err); alert('Error saving data') } finally { setSaving(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4 md:p-6">
      <Card className="p-5 md:p-6 border border-zinc-200 dark:border-zinc-800 shadow-none space-y-5">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Form Ebook</h2>
          <p className="text-sm text-zinc-500">Isi data utama ebook berikut agar mudah dipahami user.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="ebook-title">Title</Label>
            <Input
              id="ebook-title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Masukkan judul ebook"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ebook-slug">Slug</Label>
            <Input
              id="ebook-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="judul-ebook"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ebook-category">Category</Label>
            <Input
              id="ebook-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Contoh: Frontend"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="ebook-description">Description</Label>
            <Textarea
              id="ebook-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi singkat ebook"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ebook-created">Created</Label>
            <Input
              id="ebook-created"
              type="date"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ebook-status">Status</Label>
            <Input
              id="ebook-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="draft / published"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Cover</Label>
            <div className="border border-dashed rounded-xl flex items-center justify-center bg-slate-50 dark:bg-zinc-900 overflow-hidden relative min-h-[220px]">
              {image ? (
                <>
                  <Image src={image} alt="Preview" fill className="object-cover" />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="absolute right-3 top-3"
                    onClick={() => setImage('')}
                  >
                    <X size={14} className="mr-1" /> Hapus
                  </Button>
                </>
              ) : (
                <label className="text-center cursor-pointer p-4">
                  <Upload className="mx-auto text-slate-400 mb-2" />
                  <span className="text-xs font-medium text-slate-600">Upload cover (JPG/PNG)</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={() => router.push('/ebooks')}>
            Batal
          </Button>
          <Button
            type="submit"
            className="h-11 bg-teal-700 hover:bg-teal-800 text-white font-semibold"
            disabled={saving || uploading}
          >
            {saving ? <Loader2 className="animate-spin" /> : <Save className="mr-2" />}
            {saving ? 'Menyimpan...' : 'Simpan Ebook'}
          </Button>
        </div>
      </Card>
    </form>
  )
}