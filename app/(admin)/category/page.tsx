import { createClient } from "@/lib/supabase/server";
import IndexCategory from "./index-category";

export default async function Page() {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("category")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    throw new Error("Gagal mengambil data category");
  }

  return <IndexCategory categories={categories??[]} />;
}
