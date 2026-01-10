'use client';

import { useState, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/datatable/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import CategoryForm from "./partials/category-form";
import { deleteCategory } from "./actions";
import { CategoryData } from "@/types";

interface Props {
  categories: CategoryData[];
}

export default function IndexCategory({ categories }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryData | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const isEditMode = !!editingCategory;

  const handleDelete = () => {
    if (!deleteId) return;

    startTransition(async () => {
      await deleteCategory(deleteId);
      setOpenDelete(false);
      setDeleteId(null);
    });
  };

  const columns = useMemo<ColumnDef<CategoryData>[]>(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "description", header: "Description" },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">

              {/* ROUTE KE EDIT PAGE */}
              <DropdownMenuItem
                onClick={() => router.push(`/category/edit/${row.original.id}`)}
              >
                Edit
              </DropdownMenuItem>

              {/* DELETE */}
              <DropdownMenuItem
                onClick={() => {
                  setDeleteId(row.original.id);
                  setOpenDelete(true);
                }}
                className="text-red-600"
              >
                Delete
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [router]
  );

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <PageTitle title="Category" description="List of all categories" />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingCategory(null)}>
              Add Category
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? "Edit Category" : "Add Category"}
              </DialogTitle>
              <DialogDescription>
                {isEditMode
                  ? "Ubah data kategori yang dipilih."
                  : "Tambahkan kategori baru disini."}
              </DialogDescription>
            </DialogHeader>

            <CategoryForm
              defaultValues={editingCategory ?? undefined}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* TABLE */}
      <div className="-mt-6">
        <DataTable columns={columns} data={categories ?? []} />
      </div>

      {/* DELETE MODAL */}
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah anda ingin menghapus data ini?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Data yang dihapus tidak bisa dikembalikan
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
