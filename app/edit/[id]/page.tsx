"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';

interface PageProps {
    params: Promise<{ id: string }>;
}

const EditPostPage = ({ params }: PageProps) => {
    const { id } = use(params);
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [readTime, setReadTime] = useState("");
    const [preview, setPreview] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/posts/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setTitle(data.title);
                    setContent(data.content || "");
                    setAuthor(data.author || "");

                    // Use date from API if available, otherwise format createdAt
                    if (data.date) {
                        setDate(data.date);
                    } else if (data.createdAt) {
                        const dateObj = new Date(data.createdAt);
                        const formattedDate = dateObj.toISOString().split('T')[0];
                        setDate(formattedDate);
                    } else {
                        setDate("");
                    }

                    setReadTime(data.readTime || "");
                    setImage(data.image || "");
                    setPreview(data.image ? `http://localhost:5000/${data.image}` : "");
                } else {
                    alert("Post not found");
                    router.push("/");
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id]);

    const handleImage = (e: any) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPreview(base64String);
            };
            reader.readAsDataURL(selected);
        }
    };

    const handleSubmit = async () => {
        if (!title || !content || !author || !date || !readTime) {
            alert("Please fill in all required fields");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("author", author);
        formData.append("date", date); // Added date
        formData.append("readTime", readTime); // Added readTime

        if (file) {
            formData.append("image", file);
        }

        try {
            const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
                method: "PUT",
                body: formData,
            });

            if (res.ok) {
                alert("Blog Updated Successfully!");
                router.push(`/post/${id}`);
            } else {
                const errorData = await res.json();
                alert(`Failed to update post: ${errorData.message || res.statusText}`);
            }
        } catch (error) {
            console.error("Error updating post:", error);
            alert("An error occurred while updating the post");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-4">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-zinc-200/50 transition-all">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href={`/post/${id}`} className="text-sm text-zinc-800 font-medium tracking-widest uppercase hover:opacity-60 transition-opacity flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Blog
                    </Link>

                </div>
            </nav>

            <h1 className="text-3xl font-bold">Edit Post</h1>

            <input
                type="text"
                placeholder="Title"
                className="w-full p-3 border rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Content"
                rows={10}
                className="w-full p-3 border rounded"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <input
                type="text"
                placeholder="Author Name"
                className="w-full p-3 border rounded"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />

            <input
                type="date"
                placeholder="Date"
                className="w-full p-3 border rounded"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <input
                type="text"
                placeholder="Read Time (e.g., 5 min read)"
                className="w-full p-3 border rounded"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
            />

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Current Image</label>
                <div className="h-40 w-full relative bg-gray-100 rounded overflow-hidden">
                    {preview && (
                        <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                    )}
                </div>
            </div>

            <input type="file" accept="image/*" onChange={handleImage} />

            <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Update Post
            </button>
        </div>
    )
}

export default EditPostPage;
