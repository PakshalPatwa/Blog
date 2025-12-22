"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreatePostpage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [readTime, setReadTime] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  // IMAGE PREVIEW
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setImage(selected);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selected);
    }
  };

  // HANDLE SUBMIT
  const handleSubmit = async () => {
    if (!title || !content || !author || !date || !readTime || !image) {
      alert("All fields required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);
    formData.append("date", date);
    formData.append("readTime", readTime);
    formData.append("image", image);

    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Post Created Successfully");
    router.push("/");
  };


  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <div className="relative flex items-center">
        <Link href={`/`} className="text-sm text-zinc-800 font-medium tracking-widest uppercase hover:opacity-60 transition-opacity flex items-center gap-2">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <h1 className="text-3xl font-bold text-white">Create Post</h1>
        </Link>
      </div>

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

      <input type="file" accept="image/*" onChange={handleImage} />

      {preview && (
        <img src={preview} className="w-60 h-40 object-cover rounded" />
      )}

      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Create Post
      </button>
    </div>
  );
};

export default CreatePostpage;
