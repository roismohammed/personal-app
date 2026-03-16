"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Editor } from "@tinymce/tinymce-react";
import { Loader2, Send, Hash, BookOpen, Edit3, ChevronDown } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface AddChapterFormProps {
    ebookId?: string;
    chapterId?: string;
}

export default function AddChapterForm({ ebookId: initialEbookId, chapterId }: AddChapterFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [ebooks, setEbooks] = useState<any[]>([]);
    const [selectedEbookId, setSelectedEbookId] = useState(initialEbookId || "");

    const editorRef = useRef<any>(null);
    const supabase = createSupabaseServerClient();

    const [chapterData, setChapterData] = useState({
        title: "",
        slug: "",
    });

    const isEditMode = !!chapterId;

    useEffect(() => {
        const loadInitialData = async () => {
            setFetching(true);

            // 1. Ambil SEMUA daftar ebook untuk ditampilkan di Select
            const { data: ebooksList } = await supabase
                .from("ebooks")
                .select("id, title")
                .order('title', { ascending: true });

            if (ebooksList) setEbooks(ebooksList);

            // 2. Jika Mode Edit, ambil data Chapter
            if (isEditMode && chapterId) {
                const { data: chapter } = await supabase
                    .from("chapters")
                    .select("*")
                    .eq("id", chapterId)
                    .single();

                if (chapter) {
                    setChapterData({ title: chapter.title, slug: chapter.slug });
                    setSelectedEbookId(chapter.ebook_id);
                    if (editorRef.current) editorRef.current.setContent(chapter.content);
                }
            }
            setFetching(false);
        };
        loadInitialData();
    }, []);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setChapterData({
            ...chapterData,
            title: val,
            slug: val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedEbookId) return toast.error("Pilih E-book terlebih dahulu!");

        setLoading(true);
        const content = editorRef.current ? editorRef.current.getContent() : "";
        const payload = {
            title: chapterData.title,
            slug: chapterData.slug,
            content: content,
            ebook_id: selectedEbookId
        };

        try {
            if (isEditMode) {
                const { error } = await supabase.from("chapters").update(payload).eq("id", chapterId);
                if (error) throw error;
                toast.success("Bab diperbarui!");
            } else {
                const { error } = await supabase.from("chapters").insert([payload]);
                if (error) throw error;
                toast.success("Bab diterbitkan!");
            }
            router.push("/chapter");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-teal-700" /></div>;

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-none">
            <header className="flex items-center justify-between border-b pb-6">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${isEditMode ? 'bg-amber-50 text-amber-600' : 'bg-teal-50 text-teal-700'}`}>
                        {isEditMode ? <Edit3 size={24} /> : <BookOpen size={24} />}
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-zinc-900 tracking-tight italic uppercase">
                            {isEditMode ? "Edit Bab" : "Tambah Bab"}
                        </h3>
                    </div>
                </div>
            </header>

            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-teal-700 ml-1">Pilih E-Book Induk</label>
                <Select value={selectedEbookId} onValueChange={setSelectedEbookId}>
                    <SelectTrigger className="h-14 w-full rounded-xl bg-slate-50 border-none font-bold text-zinc-700 shadow-inner">
                        <SelectValue placeholder="Pilih buku untuk bab ini..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
                        {ebooks.map((ebook) => (
                            <SelectItem key={ebook.id} value={ebook.id} className="font-medium py-3">
                                {ebook.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-teal-700 ml-1">Judul Bab</label>
                    <Input value={chapterData.title} onChange={handleTitleChange} required className="h-12 rounded-xl bg-slate-50/50" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-teal-700 ml-1">Slug URL</label>
                    <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                        <Input value={chapterData.slug} onChange={(e) => setChapterData({ ...chapterData, slug: e.target.value })} required className="pl-10 h-12 rounded-xl bg-slate-50/50" />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-teal-700 ml-1">Isi Materi</label>
                <div className="rounded-2xl overflow-hidden border border-slate-200">
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        apiKey="858j7u18k8wb7pt41w5urjfpeusf47tsp1fjysx244w7pz1h"
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                            ],
                            toolbar:
                                'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | code | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px; line-height:1.6; }',
                            placeholder: 'Write your content here...'
                        }}
                    />
                </div>
            </div>

            <Button disabled={loading} className={`w-full h-14 rounded-full font-black text-sm shadow-xl transition-all active:scale-95 gap-2 ${isEditMode ? 'bg-amber-600' : 'bg-teal-700'}`}>
                {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                {isEditMode ? "UPDATE BAB" : "SIMPAN BAB"}
            </Button>
        </form>
    );
}