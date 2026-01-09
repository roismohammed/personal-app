"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);
import type { Editor as TinyMCEEditor } from "@tinymce/tinymce-react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Upload,
  X,
  Save,
  Loader2,
  Edit,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PostData } from "@/types";

type Category = { id: number; name: string };

interface PostFormProps {
  initialData?: Partial<PostData>;
  onSubmit?: (data: PostData) => Promise<void> | void;
  submitText?: string;
  isEditing?: boolean;
  isLoading?: boolean;
}

export default function PostForm({
  initialData,
  submitText = "Publish Post",
  isEditing = false,
  isLoading = false,
}: PostFormProps) {
  const editorRef = useRef< TinyMCEEditor>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [featuredImage, setFeaturedImage] = useState<string | null>(
    initialData?.image || null
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const Router = useRouter();
  const [formData, setFormData] = useState({
    image: initialData?.image || false,
    title: initialData?.title || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    slug: initialData?.slug || "",
    category_id: initialData?.category_id || 0,
    tags: Array.isArray(initialData?.tags) ? initialData.tags.join(", ") : initialData?.tags || "",
  });

  const generateSlug = (v: string) =>
    v
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

  const handleChange = <K extends keyof PostData>(
    key: K,
    value: PostData[K]
  ) => {
    setFormData((s) => ({
      ...s,
      [key]: value,
      ...(key === "title" && { slug: generateSlug(value as string) }),
    }));
  };

  // load kategori
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     setIsLoadingCategories(true);
  //     const { data } = await client.from("category").select("*");
  //     if (data) setCategories(data);
  //     setIsLoadingCategories(false);
  //   };
  //   fetchCategories();
  // }, []);

  // upload image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setFeaturedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFeaturedImage = () => setFeaturedImage(null);

  const parsedTags = formData.tags
    .split(",")
    .map((tag: string) => tag.trim())
    .filter((tag: string) => tag);

  const postId = initialData?.id ?? null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validasi required fields
      if (!formData.title.trim()) {
        alert("Title is required");
        return;
      }

      const editorContent = editorRef.current?.getContent() || "";
      const plainContent = editorContent.replace(/<[^>]*>/g, "").trim();

      if (!plainContent) {
        alert("Content is required");
        return;
      }

      // Validasi slug
      if (!formData.slug.trim()) {
        alert("Slug is required");
        return;
      }

      const payload = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        description: formData.description.trim(),
        content: editorContent,
        category_id: formData.category_id || null,
        tags: parsedTags,
        image: featuredImage,
      };

      let result;

      // EDIT
      if (postId) {
        result = await client
          .from("posts")
          .update(payload)
          .eq("id", postId)
          .select();

        if (result.error) {
          console.error("Update error:", result.error);
          alert(`Gagal mengupdate post: ${result.error.message}`);
          return;
        }

        toast.success("Post berhasil diupdate!");
        Router.push("/posts");
        setIsSheetOpen(false);
        return;
      }

      // CREATE
      result = await client
        .from("posts")
        .insert([{
          ...payload,
          created_at: new Date().toISOString()
        }])
        .select();

      if (result.error) {
        console.error("Create error:", result.error);
        alert(`Gagal membuat post: ${result.error.message}`);
        return;
      }

      toast.success("Post berhasil di buat!");
      Router.push("/posts");
      setIsSheetOpen(false);

      // Reset form setelah create berhasil
      setFormData({
        image: false,
        title: "",
        description: "",
        content: "",
        slug: "",
        category_id: 0,
        tags: "",
      });
      setFeaturedImage(null);
      if (editorRef.current) {
        editorRef.current.setContent("");
      }

    } catch (error) {
      console.error("Unexpected error:", error);
      alert("Terjadi kesalahan tak terduga");
    } finally {
      setIsSubmitting(false);
      Router.push("/posts");
    }
  };

  // klik Next → cek title & editor, kalau OK buka sheet
  const handleNext = () => {
    const editorContent = editorRef.current?.getContent() || "";
    const plain = editorContent
      .replace(/<(.|\n)*?>/g, "")
      .replace(/&nbsp;/g, "")
      .trim();


    if (!formData.title.trim() || !plain) {
      alert("Isi title dan content dulu sebelum lanjut.");
      return;
    }

    setIsSheetOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            {isEditing ? "Edit Post" : "Create New Post"}
          </h1>
          <p className="text-gray-600 mt-1 flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full animate-pulse ${isEditing ? "bg-blue-500" : "bg-black"
                }`}
            />
            {isEditing
              ? "Update your content"
              : "Write and publish your content"}
          </p>
        </div>

        <Button
          type="button"
          onClick={handleNext}
          className="px-6 bg-black hover:bg-zinc-700 cursor-pointer text-white"
        >
          Next
        </Button>
      </div>

      {/* FORM: hanya Title + Editor */}
      <form id="post-form" onSubmit={handleSubmit} className="space-y-6 px-18">
        {/* Post Details - tanpa Card */}
        <div className="space-y-6 p-6 border border-gray-200 rounded-lg bg-white">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Post Details</h2>
              <p className="text-sm text-gray-600">
                Enter the title and basic information
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-medium">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter an engaging title..."
                className="text-lg h-12"
                required
              />
            </div>
          </div>
        </div>

        {/* Content Editor - tanpa Card */}
        <div className="p-6 border border-gray-200 rounded-lg bg-white">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Content *</h2>
            <p className="text-sm text-gray-600">Write your post content</p>
          </div>

          <Editor
            apiKey="858j7u18k8wb7pt41w5urjfpeusf47tsp1fjysx244w7pz1h"
            initialValue={formData.content}
            onInit={(_evt, editor) => {
              editorRef.current = editor;
            }}

            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | image link | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent
            side="right"
            className="w-full sm:w-[420px] max-h-screen overflow-y-auto"
          >
            <SheetHeader>
              <SheetTitle>Post Settings</SheetTitle>
              <SheetDescription>
                Lengkapi detail post sebelum dipublish.
              </SheetDescription>
            </SheetHeader>

            <div className=" space-y-6 px-4">
              {/* Slug */}
              <div className="space-y-3">
                <Label htmlFor="slug" className="text-base font-medium">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleChange("slug", e.target.value)}
                  placeholder="post-url-slug"
                />
                <p className="text-xs text-muted-foreground">
                  URL: /blog/{formData.slug || "your-post-slug"}
                </p>
              </div>

              {/* Featured Image */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Featured Image</Label>
                <div>
                  {featuredImage ? (
                    <div className="relative group">
                      <Image
                        src={featuredImage}
                        alt="Featured"
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={removeFeaturedImage}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all">
                      <div className="flex flex-col items-center justify-center py-4">
                        <Upload className="h-6 w-6 text-blue-600 mb-3" />
                        <p className="text-sm font-medium text-gray-700">
                          Click to upload
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Category */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Category</Label>
                <Select
                  value={String(formData.category_id)}
                  onValueChange={(v) =>
                    handleChange("category_id", Number(v))
                  }
                  disabled={isLoadingCategories}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        isLoadingCategories ? "Loading..." : "Select category"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {/* {categories.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.name}
                      </SelectItem>
                    ))} */}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <Label htmlFor="description" className="text-base font-medium">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Brief description of your post..."
                  rows={3}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {formData.description.length}/160 characters recommended
                </p>
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <Label htmlFor="tags" className="text-base font-medium">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleChange("tags", e.target.value)}
                  placeholder="react, nextjs, tutorial"
                />
                <p className="text-xs text-muted-foreground">
                  Separate tags with commas
                </p>

                {parsedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {parsedTags.map((tag: string, idx: number) => (
                      <Badge key={idx} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="space-y-3 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <Label className="text-base font-medium">Publishing Stats</Label>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Title Length</span>
                    <span className="text-sm font-bold text-gray-900">
                      {formData.title.length} chars
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Description</span>
                    <span className="text-sm font-bold text-gray-900">
                      {formData.description.length} chars
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tags Count</span>
                    <span className="text-sm font-bold text-gray-900">
                      {parsedTags.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Mode</span>
                    <Badge variant={isEditing ? "default" : "secondary"}>
                      {isEditing ? "Editing" : "Creating"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <SheetFooter className="mt-">
              <Button
                type="submit"
                form="post-form"
                disabled={isLoading || isSubmitting}
                className={`w-full ${isEditing
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-black hover:bg-zinc-800"
                  }`}
              >
                {(isLoading || isSubmitting) ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {isEditing ? "Updating..." : "Publishing..."}
                  </>
                ) : (
                  <>
                    {isEditing ? (
                      <Edit className="h-4 w-4 mr-2" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    {submitText}
                  </>
                )}
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </form>
    </div>
  );
}