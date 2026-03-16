// app/(admin)/chapters/create/page.tsx
import { use } from "react";
import AddChapterForm from "../partials/chapter-form";

export default function CreateChapterPage({ searchParams }: { searchParams: Promise<{ ebookId?: string; chapterId?: string }> }) {
    const { ebookId, chapterId } = use(searchParams);

    return (
        <div className="p-10 max-w-5xl mx-auto">
            <AddChapterForm ebookId={ebookId} chapterId={chapterId} />
        </div>
    );
}