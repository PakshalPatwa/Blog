"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';

const dummyPosts = [
    {
        id: 1,
        title: "First Blog Post",
        description: "This is a dummy description of a blog post",
        image: "Portfolio1.png",
        author: "John Doe",
        date: "Dec 15, 2025",
        readTime: "5 min read",
        content: "Dive into the fascinating world of modern web development. This comprehensive guide explores the latest trends, best practices, and cutting-edge technologies shaping the future of digital experiences. From responsive design to performance optimization, we'll cover everything you need to know to build exceptional web applications."
    },
    {
        id: 2,
        title: "Second Blog Post",
        description: "More dummy content for the UI",
        image: "Portfolio2.png",
        author: "Jane Smith",
        date: "Dec 14, 2025",
        readTime: "7 min read",
        content: "Exploring innovative solutions and creative approaches to complex problems. This article delves into the art of problem-solving in the digital age, offering practical insights and proven strategies that can transform your development workflow and boost productivity."
    },
    {
        id: 3,
        title: "Blog Post 3",
        description: "This is a dummy description of a blog post",
        image: "Portfolio3.png",
        author: "Mike Johnson",
        date: "Dec 13, 2025",
        readTime: "6 min read",
        content: "Understanding the core principles that drive successful digital products. Learn how to create user-centric designs that not only look beautiful but also deliver exceptional functionality and user experience. We'll explore case studies and real-world examples."
    },
    {
        id: 4,
        title: "Blog Post 4",
        description: "More dummy content for the UI",
        image: "Portfolio4.png",
        author: "Sarah Williams",
        date: "Dec 12, 2025",
        readTime: "8 min read",
        content: "Mastering the craft of building scalable and maintainable applications. This in-depth guide covers architecture patterns, code organization, testing strategies, and deployment best practices that will elevate your development skills to the next level."
    },
];

interface PageProps {
    params: Promise<{ id: string }>;
}

const EditPostPage = ({ params }: PageProps) => {
    const { id } = use(params);
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [readTime, setReadTime] = useState("");
    const [preview, setPreview] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        // Load post data
        const savedPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");

        // Priority: Check savedPosts first (user edits), then dummyPosts.
        let foundPost = savedPosts.find((p: any) => p.id === Number(id));
        if (!foundPost) {
            foundPost = dummyPosts.find((p: any) => p.id === Number(id));
        }

        if (foundPost) {
            setTitle(foundPost.title);
            setDesc(foundPost.description);
            setAuthor(foundPost.author);
            setDate(foundPost.date);
            setReadTime(foundPost.readTime);
            setPreview(foundPost.image);
            setImage(foundPost.image);
        } else {
            alert("Post not found");
            router.push("/");
        }
    }, [id, router]);

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

    const handleSubmit = () => {
        if (!title || !desc || !author || !date || !readTime) {
            alert("Please fill in all fields");
            return;
        }

        const existingPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");

        // Remove existing version of this post from localStorage if it exists
        const otherPosts = existingPosts.filter((p: any) => p.id !== Number(id));

        const updatedPost = {
            id: Number(id),
            title,
            description: desc,
            image: preview || "Portfolio1.png",
            author,
            date,
            readTime,
            content: desc, // Keeping simple for now
        };

        // Add updated post to the beginning
        const updatedPosts = [updatedPost, ...otherPosts];

        localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));

        alert("Blog Updated Successfully!");
        router.push("/");
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
                placeholder="Description"
                rows={5}
                className="w-full p-3 border rounded"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
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
                    {preview && (preview.startsWith('data:image') ? (
                        <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                        <img src={`/assets/${preview}`} className="w-full h-full object-cover" alt="Preview" />
                    ))}
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
