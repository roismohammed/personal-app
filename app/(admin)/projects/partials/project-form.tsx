"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, Upload, X } from "lucide-react";
import Image from "next/image";
import { saveProject } from "./project-server";
import SubmitButton from "./submit-button";

interface Props {
  initialData?: any;
}

export default function ProjectForm({ initialData }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    status: initialData?.status || "completed",
    link_demo: initialData?.link_demo || "",
    link_github: initialData?.link_github || "",
    tech_stack: initialData?.tech_stack || [""],
  });

  const [image, setImage] = useState<string | null>(
    initialData?.image || null
  );

  const handleTechChange = (i: number, val: string) => {
    const t = [...form.tech_stack];
    t[i] = val;
    setForm({ ...form, tech_stack: t });
  };

  const removeImage = () => {
    setImage(null);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    // Validasi file type
    if (!f.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validasi file size (max 5MB)
    if (f.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    const r = new FileReader();
    r.onload = () => setImage(r.result as string);
    r.readAsDataURL(f);
  };

  return (
    <form action={saveProject} className="space-y-6 ">
      <input
        type="hidden"
        name="tech_stack"
        value={JSON.stringify(form.tech_stack.filter(Boolean))}
      />
      <input type="hidden" name="image" value={image ?? ""} />
      {initialData?.id && (
        <input type="hidden" name="id" value={initialData.id} />
      )}

      {/* Project Details Card */}
      <div className="space-y-6 p-6 border border-gray-200 rounded-lg bg-white">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Project Information
          </h2>
          <p className="text-sm text-gray-600">
            Enter the basic details of your project
          </p>
        </div>

        {/* Project Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base font-medium">
            Project Name *
          </Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="My Awesome Project"
            required
            className="text-base"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-base font-medium">
            Description *
          </Label>
          <Textarea
            id="description"
            name="description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            placeholder="Describe your project, its purpose, and key features..."
            rows={5}
            required
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            {form.description.length} characters
          </p>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status" className="text-base font-medium">
            Project Status *
          </Label>
          <Select
            value={form.status}
            onValueChange={(val) => setForm({ ...form, status: val })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="completed">✅ Completed</SelectItem>
              <SelectItem value="in-progress">🔄 In Progress</SelectItem>
              <SelectItem value="planned">📋 Planned</SelectItem>
              <SelectItem value="archived">📦 Archived</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" name="status" value={form.status} />
        </div>
      </div>

      {/* Links Card */}
      <div className="space-y-6 p-6 border border-gray-200 rounded-lg bg-white">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Links</h2>
          <p className="text-sm text-gray-600">
            Add links to your live demo and source code
          </p>
        </div>

        {/* Demo Link */}
        <div className="space-y-2">
          <Label htmlFor="link_demo" className="text-base font-medium">
            Demo Link
          </Label>
          <Input
            id="link_demo"
            name="link_demo"
            type="url"
            value={form.link_demo}
            onChange={(e) => setForm({ ...form, link_demo: e.target.value })}
            placeholder="https://your-project-demo.com"
            className="text-base"
          />
          <p className="text-xs text-muted-foreground">
            URL to your live project or demo
          </p>
        </div>

        {/* GitHub Link */}
        <div className="space-y-2">
          <Label htmlFor="link_github" className="text-base font-medium">
            GitHub Repository
          </Label>
          <Input
            id="link_github"
            name="link_github"
            type="url"
            value={form.link_github}
            onChange={(e) =>
              setForm({ ...form, link_github: e.target.value })
            }
            placeholder="https://github.com/username/repo"
            className="text-base"
          />
          <p className="text-xs text-muted-foreground">
            Link to your GitHub repository
          </p>
        </div>
      </div>

      {/* Tech Stack Card */}
      <div className="space-y-6 p-6 border border-gray-200 rounded-lg bg-white">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Tech Stack *
          </h2>
          <p className="text-sm text-gray-600">
            Add the technologies used in this project
          </p>
        </div>

        <div className="space-y-3">
          {form.tech_stack.map((t: string, i: number) => (
            <div key={i} className="flex gap-2">
              <Input
                value={t}
                onChange={(e) => handleTechChange(i, e.target.value)}
                placeholder={`Technology ${i + 1} (e.g., React, Node.js)`}
                className="flex-1"
              />
              {form.tech_stack.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setForm({
                      ...form,
                      tech_stack: form.tech_stack.filter((_, x) => x !== i),
                    })
                  }
                  className="shrink-0"
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              setForm({ ...form, tech_stack: [...form.tech_stack, ""] })
            }
            className="w-full"
          >
            <Plus size={16} className="mr-2" /> Add Technology
          </Button>
        </div>

        {/* Tech Stack Preview */}
        {form.tech_stack.filter(Boolean).length > 0 && (
          <div className="pt-4 border-t">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
            <div className="flex gap-2 flex-wrap">
              {form.tech_stack.filter(Boolean).map((t: string, i: number) => (
                <Badge key={i} variant="secondary" className="text-sm">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Upload Card */}
      <div className="space-y-6 p-6 border border-gray-200 rounded-lg bg-white">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Project Image
          </h2>
          <p className="text-sm text-gray-600">
            Upload a screenshot or preview of your project
          </p>
        </div>

        <div>
          {image ? (
            <div className="relative group">
              <Image
                src={image}
                alt="Project preview"
                width={800}
                height={400}
                className="w-full h-64 object-cover rounded-lg border border-gray-200"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-3">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove Image
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Change Image
                </Button>
              </div>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all">
              <div className="flex flex-col items-center justify-center py-8">
                <Upload className="h-12 w-12 text-blue-600 mb-4" />
                <p className="text-base font-medium text-gray-700">
                  Click to upload project image
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  PNG, JPG, WebP up to 5MB
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Recommended: 1200x630px
                </p>
              </div>
              <input
                ref={fileRef}
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <SubmitButton isEditing={!!initialData} />
      </div>
    </form>
  );
}