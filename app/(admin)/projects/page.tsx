import { createClient } from "@/lib/supabase/server";
import IndexProject from "./index-project";
export default async function Page() {
    const supabase = await createClient();

    const { data: projects, error } = await supabase
        .from("projects")
        .select("*")
    // .order("id", { ascending: false });

    if (error) {
        throw new Error("Gagal mengambil data projects");
    }

    return <IndexProject projects={projects ??[]} />;
}
