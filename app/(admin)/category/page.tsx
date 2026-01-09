'use client';
import { useState, useEffect, useMemo } from "react";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";

import {
  ColumnDef,
} from "@tanstack/react-table";
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
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

import CategoryForm from "./partials/category-form";
import { toast } from "sonner";
// import client from "@/lib/client";
import { CategoryData } from "@/types";

export default function IndexCategory() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryData | null>(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     setLoading(true);

  //     const { data, error } = await client
  //       .from("category")
  //       .select("*");

  //     if (error) {
  //       toast.error("Gagal mengambil data kategori");
  //     } else {
  //       setCategories(data || []);
  //     }

  //     setLoading(false);
  //   };

  //   fetchCategories();
  // }, []);


  // const handleDelete = async () => {
  //   if (!deleteId) return;

  //   try {
  //     const { error } = await client
  //       .from("category")
  //       .delete()
  //       .eq("id", deleteId);

  //     if (error) {
  //       console.error(error);
  //       toast.error("Gagal menghapus data");
  //       return;
  //     }

  //     setCategories((prev) => prev.filter((item) => item.id !== deleteId));
  //     toast.success("Category berhasil dihapus");
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Terjadi kesalahan saat menghapus");
  //   }

  //   setOpenDelete(false);
  //   setDeleteId(null);
  // };

  const columns = useMemo<ColumnDef<CategoryData>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Title",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
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
              <DropdownMenuItem
                onClick={() => {
                  setEditingCategory(row.original); // set yang mau diedit
                  setOpen(true);                     // buka modal
                }}
              >
                Edit
              </DropdownMenuItem>

              {/* DELETE */}
              <DropdownMenuItem
                onClick={() => {
                  setDeleteId(row.original.id);
                  setOpenDelete(true);
                }}
                className="text-red-600 focus:text-red-600"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
  );

  // 🔥 Loading state dengan skeleton yang lebih cakep
  if (loading) {
    return (
      <div className="space-y-6">
        {/* Skeleton header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 w-40 rounded-md bg-muted animate-pulse" />
            <div className="h-4 w-64 rounded-md bg-muted animate-pulse" />
          </div>
          <div className="h-9 w-32 rounded-md bg-muted animate-pulse" />
        </div>

        {/* Skeleton table */}
        <div className="rounded-xl border bg-card">
          {/* head */}
          <div className="flex border-b px-4 py-3">
            <div className="h-4 w-32 rounded-md bg-muted animate-pulse" />
            <div className="ml-10 h-4 w-40 rounded-md bg-muted animate-pulse" />
            <div className="ml-auto h-4 w-16 rounded-md bg-muted animate-pulse" />
          </div>
          {/* rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center border-b px-4 py-3 last:border-b-0"
            >
              <div className="h-4 w-40 rounded-md bg-muted animate-pulse" />
              <div className="ml-10 h-4 w-64 rounded-md bg-muted animate-pulse" />
              <div className="ml-auto h-8 w-8 rounded-full bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const isEditMode = !!editingCategory;

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <PageTitle title="Category" description="List of all categories" />

        <Dialog
          open={open}
          onOpenChange={(openDialog) => {
            setOpen(openDialog);
            if (!openDialog) {
              setEditingCategory(null);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button
              variant="default"
              onClick={() => {
                setEditingCategory(null);
              }}
            >
              Add Category
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
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
              defaultValues={
                editingCategory
                  ? {
                    id: editingCategory.id,
                    name: editingCategory.name,
                    description: editingCategory.description,
                  }
                  : undefined
              }
              onSuccess={async () => {
                // await fetchCategories();
                setOpen(false);
                setEditingCategory(null);
              }}
            />

          </DialogContent>
        </Dialog>
      </div>

      {/* TABLE */}
      <div className="-mt-6">
        <DataTable columns={columns} data={categories} />
      </div>

      {/* MODAL DELETE */}
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah anda ingin menghapus data ini?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Klik Continue untuk menghapus data
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
