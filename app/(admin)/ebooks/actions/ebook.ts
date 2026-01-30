"use server";

import { createSupabaseServerClient } from '@/lib/supabase/client'; 
import { revalidatePath } from 'next/cache';

export async function addEbookAction(formData: FormData) {
  const supabase = createSupabaseServerClient();

  const ebookData: any = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    category: formData.get('category') as string,
    video_url: formData.get('video_url') as string,
    description: formData.get('description') as string,
  };

  const coverFile = formData.get('cover') as File;
  if (coverFile && coverFile.size > 0) {
    const fileExt = coverFile.name.split('.').pop();
    const fileName = `covers/${Date.now()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('ebook-image') 
      .upload(fileName, coverFile);

    if (uploadError) throw new Error(uploadError.message);

    const { data: { publicUrl } } = supabase.storage
      .from('ebook-image')
      .getPublicUrl(fileName);
    
    ebookData.cover_url = publicUrl;
  }

  const { data, error } = await supabase
    .from("ebooks") 
    .insert([ebookData])
    .select();

  if (error) throw new Error(error.message);

  revalidatePath('/admin/ebooks');
  return { success: true, data };
}