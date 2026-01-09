"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {ColumnDef} from "@tanstack/react-table";
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

export default function IndexPost() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const { data, error } = await 
  //       .from("posts")
  //       .select("*, category:category(id, name)");
  //     if (error) console.error(error);
  //     else setPosts(data || []);
  //     setLoading(false);
  //   };
  //   fetchPosts();
  // }, []);

  // const columns = useMemo<ColumnDef<PostData>[]>(
  //   () => [
  //     {
  //       id: "image",
  //       header: "Image",
  //       cell: ({ row }) => (
  //         <Image
  //           src={row.original.image ?? "/placeholder.png"}
  //           alt={row.original.title}
  //           width={80}
  //           height={56}
  //           className="object-cover rounded-md"
  //         />
  //       ),
  //     },
  //     {
  //       accessorKey: "title",
  //       header: "Title",
  //     },
  //     {
  //       accessorKey: "slug",
  //       header: "Slug",
  //     },
  //     {
  //       accessorFn: (row) => row.category?.name ?? "-",
  //       id: "category",
  //       header: "Category",
  //     },
  //     {
  //       id: "actions",
  //       header: "Actions",
  //       cell: ({ row }) => (
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" size="icon">
  //               <MoreHorizontal className="h-5 w-5" />
  //             </Button>
  //           </DropdownMenuTrigger>

  //           <DropdownMenuContent align="end">
  //             <DropdownMenuItem asChild>
  //               <Link href={`/posts/edit/${row.original.id}`}>Edit</Link>
  //             </DropdownMenuItem>

  //             <DropdownMenuItem
  //               onClick={() => alert(`Delete post ${row.original.id}`)}
  //               className="text-red-600 focus:text-red-600"
  //             >
  //               Delete
  //             </DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       ),
  //     },
  //   ],
  //   []
  // );


  // if (loading) {
  //   return (
  //     <div className="space-y-6">
  //       {/* Skeleton header */}
  //       <div className="flex items-center justify-between">
  //         <div className="space-y-2">
  //           <div className="h-6 w-40 rounded-md bg-muted animate-pulse" />
  //           <div className="h-4 w-64 rounded-md bg-muted animate-pulse" />
  //         </div>
  //         <div className="h-9 w-32 rounded-md bg-muted animate-pulse" />
  //       </div>

  //       {/* Skeleton table */}
  //       <div className="rounded-xl border bg-card">
  //         {/* head */}
  //         <div className="flex border-b px-4 py-3 gap-4">
  //           <div className="h-4 w-16 rounded-md bg-muted animate-pulse" />   {/* Image */}
  //           <div className="h-4 w-40 rounded-md bg-muted animate-pulse" />  {/* Title */}
  //           <div className="h-4 w-40 rounded-md bg-muted animate-pulse" />  {/* Slug */}
  //           <div className="h-4 w-32 rounded-md bg-muted animate-pulse" />  {/* Category */}
  //           <div className="h-4 w-10 rounded-md bg-muted animate-pulse ml-auto" /> {/* Actions */}
  //         </div>
  //         {/* rows */}
  //         {Array.from({ length: 5 }).map((_, i) => (
  //           <div
  //             key={i}
  //             className="flex items-center border-b px-4 py-3 gap-4 last:border-b-0"
  //           >
  //             {/* image skeleton */}
  //             <div className="w-14 h-14 rounded-md bg-muted animate-pulse" />
  //             {/* title */}
  //             <div className="h-4 w-40 rounded-md bg-muted animate-pulse" />
  //             {/* slug */}
  //             <div className="h-4 w-40 rounded-md bg-muted animate-pulse" />
  //             {/* category */}
  //             <div className="h-4 w-32 rounded-md bg-muted animate-pulse" />
  //             {/* actions */}
  //             <div className="ml-auto h-8 w-8 rounded-full bg-muted animate-pulse" />
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

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
