"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

interface Props {
  defaultValues?: {
    id: number;
    name: string;
    description: string;
  };
  action: (formData: FormData) => Promise<void>;
}

export default function CategoryFormClient({defaultValues,action}: Props) {
  const [name, setName] = useState(defaultValues?.name || "");
  const [description, setDescription] = useState(
    defaultValues?.description || ""
  );
  const router = useRouter();

  return (
    <form action={action} className="space-y-3">
      {defaultValues?.id && (
        <input type="hidden" name="id" value={defaultValues.id} />
      )}

      <div>
        <Label>Title</Label>
        <Input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category title"
          required
        />
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Category description"
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="submit">
          {defaultValues?.id ? "Update Category" : "Create Category"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/category")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
