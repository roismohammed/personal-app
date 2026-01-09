"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";

interface CategoryPops {
  defaultValues?: {
    id: number;
    name: string;
    description: string;
  };
  onSuccess?: () => void;
}

export default function CategoryForm({ defaultValues, onSuccess }: CategoryPops) {
  const [name, setName] = useState(defaultValues?.name || "");
  const [description, setDescription] = useState(defaultValues?.description || "");
  const router = useRouter();
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (defaultValues?.id) {
  //     // UPDATE
  //     await client
  //       .from("category")
  //       .update({ name, description })
  //       .eq("id", defaultValues.id);
  //   } else {
  //     // CREATE
  //     await client
  //       .from("category")
  //       .insert([{ name, description }]);
  //   }

  //   if (onSuccess) onSuccess();
  // };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label className="text-sm font-medium">Title</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category title"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Category description"
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="submit" className="w-  text-white">
          {defaultValues?.id ? "Update Category" : "Create Category"}
        </Button>
        <Button
          onClick={() => router.push("/category")}
          variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}
