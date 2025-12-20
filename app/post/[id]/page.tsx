"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, use } from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PostPage({ params }: PageProps) {
  const { id } = use(params);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (!res.ok) {
          throw new Error("Post not found");
        }
        const data = await res.json();
        setPost({
          id: data._id,
          title: data.title,
          description: data.content,
          image: data.image,
          author: data.author,
          date: data.date || new Date(data.createdAt).toDateString(),
          readTime: data.readTime,
        });
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-zinc-50 to-zinc-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-zinc-800 mb-4">404 - Post Not Found</h1>
          <p className="text-zinc-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-zinc-200/50 transition-all">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-sm text-zinc-800 font-medium tracking-widest uppercase hover:opacity-60 transition-opacity flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href={`/edit/${post.id}`}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white text-zinc-900 rounded-xl font-bold hover:bg-zinc-200 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Post
            </Link>
          </div>
        </div>
      </nav>

      <div className="w-full h-full text-white flex flex-col relative overflow-hidden group">

        {/* Left Panel - Fixed on Desktop, Top on Mobile */}
        <div className="w-full h-full text-white flex flex-col relative overflow-hidden group">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={`http://localhost:5000/${post.image}`}
              alt={post.title}
              className="w-full h-full object-cover opacity-60 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-b from-zinc-900/30 via-zinc-900/60 to-zinc-900" />
          </div>

          {/* Content Container */}
          <div className="z-10 flex flex-col h-full p-8 md:p-12 lg:p-16 justify-between">

            {/* Title and Meta */}
            <div className="mt-auto mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider">
                  Featured
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-serif">
                {post.title}
              </h1>
              <p className="text-white mb-3 line-clamp-2 text-sm">
                {post.description}
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <span className="text-xl font-bold">{post.author.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-bold text-lg">{post.author}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-white/60 text-sm">{post.date}</p>
                    <span className="text-white/60 text-sm">•</span>
                    <span className="text-white/80 text-sm font-medium">{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-10 md:py-16">
          {/*  Additional Content Sections */}
          <h2 className="text-2xl font-bold text-zinc-800 mb-4">
            Key Takeaways</h2>
          <ul className="space-y-3 text-zinc-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 mt-1">✓</span>
              <span>Understanding modern development practices and methodologies</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 mt-1">✓</span>
              <span>Implementing best practices for optimal performance</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 mt-1">✓</span>
              <span>Creating scalable and maintainable code architectures</span>
            </li>
          </ul>

          {/* Tags */}
          <div className="mt-8 pt-8 border-t border-zinc-200">
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors cursor-pointer">
                Web Development
              </span>
              <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors cursor-pointer">
                Design
              </span>
              <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition-colors cursor-pointer">
                Technology
              </span>
            </div>
          </div>
        </div>

        {/* Author Card */}
        <div className="max-w-6xl mx-auto mt-12 bg-linear-to-br from-zinc-900 to-zinc-800 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
              {post.author.charAt(0)}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">About {post.author}</h3>
              <p className="text-zinc-300 leading-relaxed">
                Passionate writer and developer sharing insights about technology, design, and innovation.
                Follow for more articles on modern web development and creative solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
