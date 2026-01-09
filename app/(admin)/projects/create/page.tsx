"use client";

// import { useRouter } from "next/navigation";
import ProjectForm from "../partials/project-form";

// import client from "@/lib/client";

export default function Page() {
    // const router = useRouter();

    // const handleSubmit = async (data: React.FormEvent) => {
    //     const { error } = await client.from("projects").insert(data);
    //     if (!error) router.push("/posts");
    // };

    return (
        <div className="lg:max-w-4xl mx-auto">
            <ProjectForm
                submitText="Publish Post"
                // onSubmit={handleSubmit}
            />
        </div>
    );
}
