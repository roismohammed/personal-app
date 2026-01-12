"use client";
import { useMemo } from "react";
import Link from "next/link";
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
import Image from "next/image";
import { PostData } from "@/types";
import PageTitle from "@/components/page-title";

export default function IndexPost({ posts }: { posts: PostData[] }) {


  const columns = useMemo<ColumnDef<PostData>[]>(
    () => [
      {
        id: "image",
        header: "Image",
        cell: ({ row }) => (
          <Image
            src={row.original.image ?? "/placeholder.png"}
            alt={row.original.title}
            width={80}
            height={56}
            className="object-cover rounded-md"
          />
        ),
      },
      {
        accessorKey: "name",
        header: "Title",
      },
      {
        accessorKey: "slug",
        header: "Slug",
      },
      {
        accessorFn: (row) => row.category?.name ?? "-",
        id: "category",
        header: "Category",
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
              <DropdownMenuItem asChild>
                <Link href={`/posts/edit/${row.original.id}`}>Edit</Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => alert(`Delete post ${row.original.id}`)}
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
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <PageTitle title="Posts" description="List of posts" />
        <Link href="/posts/create">
          <Button className="cursor-pointer">Tambah Artikel</Button>
        </Link>
      </div>

      <div className="-mt-6">
        {/* <DataTable columns={columns} data={posts} /> */}
      </div>
    </div>
  );
}