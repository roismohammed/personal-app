// app/(admin)/chapters/create/page.tsx
import { use } from "react";
import AddChapterForm from "../partials/chapter-form";

export default function CreateChapterPage({ searchParams }: { searchParams: Promise<{ ebookId: string }> }) {
    const { ebookId } = use(searchParams);

    return (
        <div className="p-10 max-w-5xl mx-auto">
            {/* Hanya memanggil form tanpa perlu fetch di sini */}
            <AddChapterForm ebookId={ebookId} />
        </div>
    );
}