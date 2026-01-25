"use server"
import { createClient } from "@/lib/supabase/server"
import IndexPost from "../page"

export default async function Server() {
  const supabase = await createClient()

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) return <p>Gagal memuat data</p>

  return (
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
     {/* <IndexPost posts={posts ?? []}/> */}
    </div>
  )
}