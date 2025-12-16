"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CreatePostpage = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [readTime, setReadTime] = useState("");
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState(null);
  const router = useRouter();

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

    // Get existing posts from localStorage
    const existingPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");

    // Generate unique ID
    const newId = existingPosts.length > 0
      ? Math.max(...existingPosts.map((p: any) => p.id)) + 1
      : 5;

    // Create new post
    const newPost = {
      id: newId,
      title: title,
      description: desc,
      image: preview || "Portfolio1.png",
      author: author,
      date: date,
      readTime: readTime,
      content: desc,
    };

    // Add new post to beginning of array
    const updatedPosts = [newPost, ...existingPosts];

    // Save to localStorage
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));

    alert("Post Created Successfully!");
    router.push("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">Create Post</h1>

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

      <input type="file" accept="image/*" onChange={handleImage} />

      {image && (
        <img src={image} className="w-full h-60 object-cover rounded" />
      )}
      {preview && <img src={preview} className="w-60 rounded" />}

      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Create Post
      </button>
    </div>
  )
}

export default CreatePostpage
