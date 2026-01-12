"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Save, Edit } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ isEditing }: { isEditing?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          {isEditing ? (
            <Edit className="h-4 w-4 mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {isEditing ? "Update Project" : "Create Project"}
        </>
      )}
    </Button>
  );
}
