"use client";

import PostForm from "@/app/(admin)/posts/partials/form-post";
// import client from "@/lib/client";
// import { useRouter } from "next/navigation";
import React from "react";

export default function CreatePost() {
  // const router = useRouter();

  // const handleSubmit = async (data:React.FormEvent) => {
  //   const { error } = await client.from("posts").insert(data);
  //   if (!error) router.push("/posts");
  // };

  return (
    <PostForm
      // onSubmit={handleSubmit}
      submitText="Publish Post"
    />
  );
}
