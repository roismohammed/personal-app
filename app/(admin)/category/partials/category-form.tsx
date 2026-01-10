
import { saveCategory } from "../actions";
import CategoryFormClient from "./category-form-client";

interface CategoryProps {
  defaultValues?: {
    id: number;
    name: string;
    description: string;
  };
}

export default function CategoryForm({ defaultValues }: CategoryProps) {
  return (
    <CategoryFormClient
      defaultValues={defaultValues}
      action={saveCategory}
    />
  );
}
