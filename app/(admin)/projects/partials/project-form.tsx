"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Upload,
  X,
  Save,
  Loader2,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
// import client from "@/lib/client";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectData } from "@/types";

interface ProjectFormProps {
  initialData?: Partial<ProjectData>;
  onSubmit?: (data: ProjectData) => Promise<void> | void;
  submitText?: string;
  isEditing?: boolean;
  isLoading?: boolean;
}

type FormData = {
  name: string;
  description: string;
  tech_stack: string[];
  status: string;
  link_demo: string;
  link_github: string;
  image?: string;
};


export default function ProjectForm({
  initialData,
  submitText = "Create Project",
  isEditing = false,
  isLoading = false,
}: ProjectFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [featuredImage, setFeaturedImage] = useState<string | null>(
    initialData?.image || null
  );
  const [, setImageFile] = useState<File | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    tech_stack: Array.isArray(initialData?.tech_stack)
      ? initialData.tech_stack
      : [""],
    status: initialData?.status || "",
    link_demo: initialData?.link_demo || "",
    link_github: initialData?.link_github || "",
  });

  const handleChange = <K extends keyof FormData>(
    key: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Tech Stack Handlers
  const handleTechChange = (index: number, value: string) => {
    const updatedTech = [...formData.tech_stack];
    updatedTech[index] = value;
    handleChange("tech_stack", updatedTech);
  };

  const handleAddTech = () => {
    handleChange("tech_stack", [...formData.tech_stack, ""]);
  };

  const handleRemoveTech = (index: number) => {
    const updatedTech = [...(formData.tech_stack || [])].filter((_, i) => i !== index);
    handleChange("tech_stack", updatedTech.length > 0 ? updatedTech : [""]);
  };


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof window === "undefined") return;

    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (ev) => {
      setFeaturedImage(ev.target?.result as string);
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  const removeFeaturedImage = () => setFeaturedImage(null);
  const projectId = initialData?.id ?? null;


  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     if (!formData.name.trim()) {
  //       toast.error("Project name is required");
  //       return;
  //     }

  //     if (!formData.description.trim()) {
  //       toast.error("Description is required");
  //       return;
  //     }

  //     const validTechStack = formData.tech_stack.filter((t: string) => t.trim());
  //     if (validTechStack.length === 0) {
  //       toast.error("At least one tech stack is required");
  //       return;
  //     }

  //     const finalImageUrl = featuredImage || null;

  //     const payload = {
  //       name: formData.name.trim(),
  //       status: formData.status.trim(),
  //       description: formData.description.trim(),
  //       image: finalImageUrl,
  //       tech_stack: validTechStack,
  //       link_demo: formData.link_demo.trim() || null,
  //       link_github: formData.link_github.trim() || null,
  //     };

  //     let result;


  //     if (projectId) {
  //       result = await client
  //         .from("projects")
  //         .update(payload)
  //         .eq("id", projectId)
  //         .select();

  //       if (result.error) {
  //         toast.error(`Failed to update project: ${result.error.message}`);
  //         return;
  //       }

  //       toast.success("Project updated successfully!");
  //       router.push("/dashboard/projects");
  //       setIsSheetOpen(false);
  //       return;
  //     }

  
  //     result = await client
  //       .from("projects")
  //       .insert([
  //         {
  //           ...payload,
  //           created_at: new Date().toISOString(),
  //         },
  //       ])
  //       .select();

  //     if (result.error) {
  //       toast.error(`Failed to create project: ${result.error.message}`);
  //       return;
  //     }

  //     toast.success("Project created successfully!");
  //     router.push("/dashboard/projects");
  //     setIsSheetOpen(false);


  //     setFormData({
  //       name: "",
  //       status: "",
  //       description: "",
  //       tech_stack: [""],
  //       link_demo: "",
  //       link_github: "",
  //     });
  //     setFeaturedImage(null);
  //     setImageFile(null);

  //   } catch (error) {
  //     console.error("Unexpected error:", error);
  //     toast.error("An unexpected error occurred");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };


  // Next button handler
  const handleNext = () => {
    if (!formData.name.trim() || !formData.description.trim()) {
      toast.error("Please fill in project name and description first");
      return;
    }

    const validTech = formData.tech_stack.filter((t: string) => t.trim());
    if (validTech.length === 0) {
      toast.error("Please add at least one technology");
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
            {isEditing ? "Edit Project" : "Create New Project"}
          </h1>
          <p className="text-gray-600 mt-1 flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full animate-pulse ${isEditing ? "bg-blue-500" : "bg-black"
                }`}
            />
            {isEditing
              ? "Update your project details"
              : "Add a new project to your portfolio"}
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

      {/* FORM */}
      {/* onSubmit={handleSubmit} */}
      <form id="project-form"  className="space-y-6">
        {/* Project Details */}
        <div className="space-y-6 p-6 border border-gray-200 rounded-lg bg-white">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Code className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Project Details
              </h2>
              <p className="text-sm text-gray-600">
                Enter the basic information about your project
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Project Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-medium">
                Project Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter project name..."
                className="text-lg h-12"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-medium">
                Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe your project..."
                rows={4}
                className="resize-none"
                required
              />
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="p-6 border border-gray-200 rounded-lg bg-white">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Tech Stack *
            </h2>
            <p className="text-sm text-gray-600">
              Technologies used in this project
            </p>
          </div>

          <div className="space-y-3">
            {formData.tech_stack.map((tech: string, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="text"
                  value={tech}
                  placeholder={`Technology ${index + 1}`}
                  onChange={(e) => handleTechChange(index, e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveTech(index)}
                  disabled={formData.tech_stack.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="secondary"
              onClick={handleAddTech}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Technology
            </Button>
          </div>
        </div>

        {/* Sheet for Additional Settings */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent
            side="right"
            className="px-0  max-h-screen overflow-y-auto"
          >
            <SheetHeader>
              <SheetTitle>Project Settings</SheetTitle>
              <SheetDescription>
                Complete the project details before publishing
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-3 px-3">
              {/* Featured Image */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Project Image</Label>
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

              {/* Demo Link */}
              <div className="space-y-3">
                <Label htmlFor="status" className="text-base font-medium">
                  Status
                </Label>

                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange("status", value)}
                >
                  <SelectTrigger className="w-full" id="status">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="In progres">In progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>


              {/* Demo Link */}
              <div className="space-y-3">
                <Label htmlFor="link_demo" className="text-base font-medium">
                  Demo Link
                </Label>
                <Input
                  id="link_demo"
                  type="url"
                  value={formData.link_demo}
                  onChange={(e) => handleChange("link_demo", e.target.value)}
                  placeholder="https://demo.example.com"
                />
              </div>

              {/* GitHub Link */}
              <div className="space-y-3">
                <Label htmlFor="link_github" className="text-base font-medium">
                  GitHub Repository
                </Label>
                <Input
                  id="link_github"
                  type="url"
                  value={formData.link_github}
                  onChange={(e) => handleChange("link_github", e.target.value)}
                  placeholder="https://github.com/username/repo"
                />
              </div>

              {/* Tech Stack Preview */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Technologies ({formData.tech_stack.filter((t: string) => t.trim()).length})
                </Label>
                <div className="flex flex-wrap gap-2">
                  {formData.tech_stack
                    .filter((t: string) => t.trim())
                    .map((tech: string, idx: number) => (
                      <Badge key={idx} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-3 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <Label className="text-base font-medium">Project Stats</Label>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Name Length</span>
                    <span className="text-sm font-bold text-gray-900">
                      {formData.name.length} chars
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Description</span>
                    <span className="text-sm font-bold text-gray-900">
                      {formData.description.length} chars
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Tech Stack Count
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {formData.tech_stack.filter((t: string) => t.trim()).length}
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

            <SheetFooter >
              <Button
                type="submit"
                form="project-form"
                disabled={isLoading || isSubmitting}
                className={`w-full ${isEditing
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-black hover:bg-zinc-800"
                  }`}
              >
                {isLoading || isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {isEditing ? "Updating..." : "Creating..."}
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