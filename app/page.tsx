"use client";

import PostCard from "../components/PostCard";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const dummyPosts = [
  {
    id: 1,
    title: "First Blog Post",
    description: "This is a dummy description of a blog post",
    image: "Portfolio1.png",
    author: "John Doe",
    date: "Dec 15, 2025",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Second Blog Post",
    description: "More dummy content for the UI",
    image: "Portfolio2.png",
    author: "Jane Smith",
    date: "Dec 14, 2025",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Blog Post 3",
    description: "This is a dummy description of a blog post",
    image: "Portfolio3.png",
    author: "Mike Johnson",
    date: "Dec 13, 2025",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Blog Post 4",
    description: "More dummy content for the UI",
    image: "Portfolio4.png",
    author: "Sarah Williams",
    date: "Dec 12, 2025",
    readTime: "8 min read",
  },
];

export default function Home() {
  const [allPosts, setAllPosts] = useState(dummyPosts);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Store the data localStorage
    const savedPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");

    // Create a map of posts by ID, prioritizing saved posts
    const postsMap = new Map();

    // First add dummy posts
    dummyPosts.forEach(post => postsMap.set(post.id, post));

    // Then add saved posts (this will overwrite dummy posts with same ID)
    savedPosts.forEach((post: any) => postsMap.set(post.id, post));

    // Convert back to array and sort by ID (descending for newest first)
    const mergedPosts = Array.from(postsMap.values()).sort((a, b) => b.id - a.id);

    setAllPosts(mergedPosts);
  }, []);

  const handleDelete = (id: number) => {
    const isConfirmed = confirm("Are you sure you want to delete this post?");
    if (!isConfirmed) return;

    // 1. Remove from state (UI update)
    const updatedPosts = allPosts.filter((post) => post.id !== id);
    setAllPosts(updatedPosts);

    // 2. Update localStorage
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));

    alert("Post deleted successfully");
  };

  const featuredPost = allPosts[0];
  const Articles = allPosts.slice(1);

  if (!allPosts.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No posts available
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                Welcome to{" "}
                <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  MyBlog
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Discover amazing stories, insights, and inspiration from creators around the world
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#featured"
                  className="px-8 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Explore Articles
                </a>
                <a
                  href="#all-posts"
                  className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all shadow-md border border-gray-200"
                >
                  Latest Articles
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        <div id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="grid md:grid-cols-2">

              {/* Image For Blog */}
              <div className="relative flex items-center justify-center">
                {featuredPost.image?.startsWith('data:image') ? (
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-fit h-50 flex items-center justify-center object-cover"
                  />
                ) : (
                  <Image
                    src={`/assets/${featuredPost.image}`}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                    FEATURED
                  </span>
                </div>
              </div>

              {/* Image For Blog Text */}
              <div className="p-8">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                      {featuredPost.author.charAt(0)}
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">{featuredPost.author}</p>
                      <p className="text-gray-500">{featuredPost.date}</p>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => handleDelete(featuredPost.id)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-br from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:from-red-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862 a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m3-3h4a1 1 0 011 1v1H9V5a1 1 0 011-1z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredPost.description}
                </p>

                <Link
                  href={`/post/${featuredPost.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Articles */}
        <div id="all-posts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Articles</h2>
              <p className="text-gray-600">Fresh content from our writers</p>
            </div>

            <div className="">
              <button onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(showAll ? Articles : Articles.slice(0, 3)).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

        </div>

        {/* Newsletter */}
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Never Miss an Update
            </h2>
            <p className="text-indigo-100 text-lg mb-8">
              Get the latest articles delivered straight to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 text-white border border-white px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
