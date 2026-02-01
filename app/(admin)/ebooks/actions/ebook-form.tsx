"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ImageIcon, Loader2, Video, Tag, Type, ArrowLeft } from "lucide-react";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Link from "next/link";

const createClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    return createSupabaseClient(supabaseUrl, supabaseAnonKey);
};

interface BookFormProps {
    ebookId?: string; 
}

export default function BookForm({ ebookId }: BookFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(false);
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [existingCoverUrl, setExistingCoverUrl] = useState<string>('');
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        category: '',
        video_url: ''
    });

    const isEditMode = !!ebookId;

    useEffect(() => {
        if (ebookId) {
            fetchEbookData();
        }
    }, [ebookId]);

    const fetchEbookData = async () => {
        setFetchingData(true);
        try {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('ebooks')
                .select('*')
                .eq('id', ebookId)
                .single();

            if (error) throw error;

            if (data) {
                setFormData({
                    title: data.title || '',
                    slug: data.slug || '',
                    description: data.description || '',
                    category: data.category || '',
                    video_url: data.video_url || ''
                });
                setExistingCoverUrl(data.cover_url || '');
            }
        } catch (error: any) {
            console.error('Error fetching ebook:', error);
            toast.error("Gagal memuat data e-book");
        } finally {
            setFetchingData(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Ukuran file terlalu besar. Maksimal 2MB");
                return;
            }
            setCoverFile(file);
            toast.success("File cover siap diunggah");
        }
    };

    const uploadCoverImage = async (file: File) => {
        const supabase = createClient();
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `covers/${fileName}`;

        const { data, error } = await supabase.storage
            .from('ebook-image')
            .upload(filePath, file);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
            .from('ebook-image')
            .getPublicUrl(filePath);

        return publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const supabase = createClient();
            let coverUrl = existingCoverUrl;
            
            // Upload cover baru jika ada
            if (coverFile) {
                coverUrl = await uploadCoverImage(coverFile);
            }

            const ebookData = {
                title: formData.title,
                slug: formData.slug,
                description: formData.description,
                category: formData.category,
                cover_url: coverUrl,
                video_url: formData.video_url,
            };

            if (isEditMode) {
                const { error } = await supabase
                    .from('ebooks')
                    .update(ebookData)
                    .eq('id', ebookId);

                if (error) throw error;
                toast.success("E-Book berhasil diperbarui!");
            } else {
                const { error } = await supabase
                    .from('ebooks')
                    .insert([{
                        ...ebookData,
                        created_at: new Date().toISOString()
                    }]);

                if (error) throw error;
                toast.success("E-Book berhasil diterbitkan!");
            }

            if (!isEditMode) {
                setFormData({
                    title: '',
                    slug: '',
                    description: '',
                    category: '',
                    video_url: ''
                });
                setCoverFile(null);
                setExistingCoverUrl('');
                
                const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                if (fileInput) fileInput.value = '';
            } else {
                router.push('/ebooks');
            }

        } catch (error: any) {
            console.error('Error submitting form:', error);
            toast.error(error.message || `Gagal ${isEditMode ? 'memperbarui' : 'menerbitkan'} e-book`);
        } finally {
            setLoading(false);
        }
    };

    if (fetchingData) {
        return (
            <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Loader2 className="animate-spin mx-auto text-teal-700 mb-4" size={48} />
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Memuat Data...</p>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-none">
            <header className="border-b pb-6 flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Link href="/admin/ebooks">
                            <Button type="button" variant="ghost" size="icon" className="rounded-xl">
                                <ArrowLeft size={18} />
                            </Button>
                        </Link>
                        <h3 className="text-2xl font-black text-zinc-900 tracking-tighter uppercase italic">
                            {isEditMode ? 'Edit E-Book' : 'Tambah E-Book Baru'}
                        </h3>
                    </div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest ml-14">
                        {isEditMode ? 'Update Informasi E-Book' : 'Registrasi Judul & Metadata Utama'}
                    </p>
                </div>
                <div className={`${isEditMode ? 'bg-amber-50 text-amber-700' : 'bg-teal-50 text-teal-700'} px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest`}>
                    {isEditMode ? 'Edit Mode' : 'Create Mode'}
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-teal-700 flex items-center gap-2">
                            <Type size={14} /> Judul E-Book
                        </label>
                        <Input
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            placeholder="Mastering Next.js 15"
                            className="h-12 rounded-2xl border-slate-100 bg-slate-50/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-teal-700 flex items-center gap-2">
                            <Tag size={14} /> Slug URL
                        </label>
                        <Input
                            name="slug"
                            value={formData.slug}
                            onChange={handleInputChange}
                            required
                            placeholder="mastering-nextjs-15"
                            className="h-12 rounded-2xl border-slate-100 bg-slate-50/50"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-teal-700 flex items-center gap-2">
                            <Tag size={14} /> Kategori
                        </label>
                        <Input
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            placeholder="Coding / Design"
                            className="h-12 rounded-2xl border-slate-100 bg-slate-50/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-teal-700 flex items-center gap-2">
                            <Video size={14} /> Link Video Demo Utama
                        </label>
                        <Input
                            name="video_url"
                            value={formData.video_url}
                            onChange={handleInputChange}
                            placeholder="https://youtube.com/..."
                            className="h-12 rounded-2xl border-slate-100 bg-slate-50/50"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-teal-700">Deskripsi Singkat</label>
                <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Jelaskan secara singkat apa yang dipelajari dalam e-book ini..."
                    className="min-h-[120px] rounded-[2rem] border-slate-100 bg-slate-50/50 p-6"
                />
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-teal-700">
                    Sampul E-Book (Cover) {isEditMode && existingCoverUrl && '— Ganti cover (opsional)'}
                </label>
                
                {/* Preview cover yang sudah ada */}
                {isEditMode && existingCoverUrl && !coverFile && (
                    <div className="mb-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-xs font-bold text-slate-500 mb-2">Cover Saat Ini:</p>
                        <img src={existingCoverUrl} alt="Current cover" className="w-32 h-40 object-cover rounded-lg" />
                    </div>
                )}

                <div className="relative group cursor-pointer">
                    <div className="flex flex-col items-center justify-center gap-4 p-10 border-2 border-dashed border-slate-200 rounded-[2.5rem] bg-slate-50/50 transition-all group-hover:bg-teal-50 group-hover:border-teal-200">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-teal-600 group-hover:scale-110 transition-transform">
                            <ImageIcon size={28} />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-bold text-zinc-800">
                                {isEditMode ? 'Klik untuk ganti cover' : 'Klik untuk upload gambar cover'}
                            </p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1">Format: JPG, PNG, WEBP (Maks 2MB)</p>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </div>
                    {coverFile && (
                        <div className="mt-4 flex items-center gap-2 text-teal-600 bg-teal-50 w-fit px-4 py-2 rounded-full border border-teal-100">
                            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{coverFile.name} siap diunggah</span>
                        </div>
                    )}
                </div>
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-700 hover:bg-teal-800 h-16 font-black rounded-full text-lg shadow-lgnone shadow-none cursor-pointer transition-all active:scale-95 gap-3"
            >
                {loading ? <Loader2 className="animate-spin" /> : null}
                {loading 
                    ? (isEditMode ? "MEMPERBARUI..." : "MENERBITKAN...") 
                    : (isEditMode ? "UPDATE E-BOOK SEKARANG" : "TERBITKAN E-BOOK SEKARANG")
                }
            </Button>
        </form>
    );
}