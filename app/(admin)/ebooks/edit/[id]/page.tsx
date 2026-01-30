import BookForm from "../../actions/ebook-form";


export default async function EditEbookPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; 
    return <BookForm ebookId={id} />;
}