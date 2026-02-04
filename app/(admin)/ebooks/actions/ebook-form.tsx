'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { 
  Upload, X, Loader2, Save, Plus, Trash2, 
  CheckCircle2, Zap, Globe, ShieldCheck, List 
} from 'lucide-react'
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
  
  // Basic States
  const [categories, setCategories] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [categoryId, setCategoryId] = useState('')

  // 1. Category Badge & Basic Benefits
  const [categoryBadge, setCategoryBadge] = useState('Coding')
  const [benefits, setBenefits] = useState<string[]>([''])

  // 2. Premium Benefits (Mengapa E-book Ini?)
  const [premiumBenefits, setPremiumBenefits] = useState([
    { title: '', desc: '', icon: 'Globe' }
  ])

  // 3. Tech Stack (Powered By)
  const [tools, setTools] = useState([{ name: '', icon: '' }])

  // 4. Curriculum (Kurikulum Terstruktur)
  const [curriculum, setCurriculum] = useState([
    { title: '', items: [''] }
  ])

  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editorLoaded, setEditorLoaded] = useState(false)

  // --- Handlers for Curriculum (Nested Array) ---
  const addCurriculumSection = () => setCurriculum([...curriculum, { title: '', items: [''] }])
  const removeCurriculumSection = (idx: number) => setCurriculum(curriculum.filter((_, i) => i !== idx))
  
  const updateCurriculumTitle = (idx: number, val: string) => {
    const newCur = [...curriculum]
    newCur[idx].title = val
    setCurriculum(newCur)
  }

  const addCurriculumItem = (idx: number) => {
    const newCur = [...curriculum]
    newCur[idx].items.push('')
    setCurriculum(newCur)
  }

  const updateCurriculumItem = (cIdx: number, iIdx: number, val: string) => {
    const newCur = [...curriculum]
    newCur[cIdx].items[iIdx] = val
    setCurriculum(newCur)
  }

  // --- Handlers for Premium Benefits ---
  const addPremium = () => setPremiumBenefits([...premiumBenefits, { title: '', desc: '', icon: 'Zap' }])
  const updatePremium = (idx: number, field: string, val: string) => {
    const newPrem = [...premiumBenefits] as any
    newPrem[idx][field] = val
    setPremiumBenefits(newPrem)
  }

  // ... (Keep handleTitleChange, handleImageUpload, fetchCategories dari kode sebelumnya)
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
      const { error } = await supabase.from('posts').insert({
        title, slug, description, content, image,
        category_id: categoryId ? parseInt(categoryId) : null,
        category_badge: categoryBadge,
        benefits: benefits.filter(b => b !== ''),
        premium_benefits: premiumBenefits,
        tools: tools,
        curriculum: curriculum
      })
      if (error) throw error
      alert('Post Created!')
      router.push('/blog')
    } catch (err) { console.error(err); alert('Error saving data') } finally { setSaving(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-8 bg-white dark:bg-zinc-950">
      
      <div className="flex-1 space-y-10">
        <section className="space-y-4">
          <Input 
            value={title} 
            onChange={(e) => handleTitleChange(e.target.value)} 
            placeholder="Judul E-book..." 
            className="text-3xl font-black h-20 border-none bg-slate-50 dark:bg-zinc-900 focus-visible:ring-teal-500"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label>Manfaat Singkat (Hero)</Label>
                {benefits.map((b, i) => (
                  <div key={i} className="flex gap-2">
                    <Input value={b} onChange={(e) => {
                       const n = [...benefits]; n[i] = e.target.value; setBenefits(n)
                    }} placeholder="Point manfaat..." />
                    <Button type="button" variant="ghost" size="icon" onClick={() => setBenefits(benefits.filter((_,ix)=>ix!==i))}><X size={14}/></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => setBenefits([...benefits, ''])} className="w-full text-[10px] uppercase font-bold tracking-widest"><Plus size={12}/> Tambah Point</Button>
             </div>

             <div className="border-2 border-dashed rounded-3xl flex items-center justify-center bg-slate-50 dark:bg-zinc-900 overflow-hidden relative min-h-[200px]">
                {image ? (
                  <Image src={image} alt="Preview" fill className="object-cover" />
                ) : (
                  <label className="text-center cursor-pointer p-4">
                    <Upload className="mx-auto text-slate-400 mb-2" />
                    <span className="text-xs font-bold uppercase text-slate-500">Upload Cover</span>
                    <input type="file" className="hidden" onChange={handleImageUpload} />
                  </label>
                )}
             </div>
          </div>
        </section>

        <section className="p-8 bg-teal-50/50 dark:bg-teal-900/10 rounded-[3rem] border border-teal-100 dark:border-teal-900/30 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black italic flex items-center gap-2"><Globe className="text-teal-600"/> Mengapa E-book Ini?</h3>
            <Button type="button" variant="subtle" size="sm" onClick={addPremium} className="bg-white">Tambah Card</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {premiumBenefits.map((item, i) => (
              <Card key={i} className="p-4 space-y-3 relative">
                <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-red-400" onClick={() => setPremiumBenefits(premiumBenefits.filter((_,ix)=>ix!==i))}><Trash2 size={14}/></Button>
                <div className="flex gap-2">
                   <Input placeholder="Icon (Lucide Name)" value={item.icon} onChange={(e) => updatePremium(i, 'icon', e.target.value)} className="w-1/3 text-xs" />
                   <Input placeholder="Title Card" value={item.title} onChange={(e) => updatePremium(i, 'title', e.target.value)} className="font-bold" />
                </div>
                <Textarea placeholder="Deskripsi singkat card..." value={item.desc} onChange={(e) => updatePremium(i, 'desc', e.target.value)} className="text-xs h-20" />
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black italic flex items-center gap-2"><List className="text-teal-600"/> Kurikulum Terstruktur</h3>
            <Button type="button" variant="outline" size="sm" onClick={addCurriculumSection}><Plus size={16}/> Tambah Modul</Button>
          </div>
          <div className="space-y-4">
            {curriculum.map((section, sIdx) => (
              <Card key={sIdx} className="p-6 rounded-[2rem] border-2">
                <div className="flex gap-4 mb-4">
                  <div className="w-10 h-10 bg-teal-700 rounded-lg flex items-center justify-center text-white font-bold">0{sIdx+1}</div>
                  <Input value={section.title} onChange={(e) => updateCurriculumTitle(sIdx, e.target.value)} placeholder="Nama Modul (contoh: Fundamental Next.js)" className="font-bold text-lg" />
                  <Button type="button" variant="ghost" onClick={() => removeCurriculumSection(sIdx)}><X/></Button>
                </div>
                <div className="pl-14 space-y-2">
                  <Label className="text-[10px] uppercase font-bold text-slate-400">Daftar Materi:</Label>
                  {section.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex gap-2">
                      <Zap size={14} className="mt-3 text-teal-500" />
                      <Input value={item} onChange={(e) => updateCurriculumItem(sIdx, iIdx, e.target.value)} placeholder="Nama Materi..." className="h-8 text-sm" />
                      <Button type="button" variant="ghost" size="icon" onClick={() => {
                        const n = [...curriculum]; n[sIdx].items = n[sIdx].items.filter((_,x)=>x!==iIdx); setCurriculum(n)
                      }}><Trash2 size={12}/></Button>
                    </div>
                  ))}
                  <Button type="button" variant="ghost" size="sm" onClick={() => addCurriculumItem(sIdx)} className="text-xs text-teal-600 font-bold">+ Tambah Materi</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <div className="space-y-2">
          <Label className="font-bold italic uppercase tracking-widest text-xs">Detail Deskripsi / Bio Author</Label>
          <div className="border rounded-3xl overflow-hidden">
            <Editor
              apiKey="858j7u18k8wb7pt41w5urjfpeusf47tsp1fjysx244w7pz1h"
              value={content}
              onEditorChange={(c) => setContent(c)}
              init={{ height: 300, menubar: false, plugins: ['lists', 'link'], toolbar: 'bold italic bullist numlist' }}
            />
          </div>
        </div>
      </div>

      <div className="w-full lg:w-80 space-y-6">
        <Card className="p-6 sticky top-10 space-y-6 border-t-4 border-t-teal-600">
          <div className="space-y-4">
             <div>
                <Label className="text-[10px] font-bold uppercase">Badge Kategori</Label>
                <Input value={categoryBadge} onChange={(e) => setCategoryBadge(e.target.value)} className="font-bold uppercase text-teal-700" />
             </div>
             <div>
                <Label className="text-[10px] font-bold uppercase">URL Slug</Label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} className="font-mono text-xs bg-slate-50" />
             </div>
             <div>
                <Label className="text-[10px] font-bold uppercase">Meta Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="text-xs resize-none" rows={4} />
             </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <Label className="text-[10px] font-bold uppercase">Tech Stack Icons</Label>
            {tools.map((t, i) => (
              <div key={i} className="flex gap-1 items-center">
                <Input value={t.icon} onChange={(e) => {
                  const n = [...tools]; n[i].icon = e.target.value; setTools(n)
                }} placeholder="🚀" className="w-12 text-center" />
                <Input value={t.name} onChange={(e) => {
                  const n = [...tools]; n[i].name = e.target.value; setTools(n)
                }} placeholder="Next.js" className="text-xs" />
                <Button type="button" variant="ghost" size="icon" onClick={() => setTools(tools.filter((_,x)=>x!==i))}><X size={14}/></Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => setTools([...tools, {name:'', icon:''}])} className="w-full text-[10px]">Tambah Tech</Button>
          </div>

          <Button 
            type="submit" 
            className="w-full h-14 bg-teal-700 hover:bg-teal-800 text-white font-black uppercase tracking-widest rounded-2xl"
            disabled={saving}
          >
            {saving ? <Loader2 className="animate-spin" /> : <Save className="mr-2"/>}
            PUBLISH EBOOK
          </Button>
        </Card>
      </div>
    </form>
  )
}