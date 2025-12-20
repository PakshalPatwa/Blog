"use client";

import PostCard from "../components/PostCard";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Post = {
  id: string | number;
  title: string;
  description: string;
  image?: string;
  author?: string;
  date?: string;
  readTime?: string;
};

export default function Home() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts");

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await res.json();

        const formattedPosts: Post[] = data.map((post: any) => ({
          id: post._id,
          title: post.title,
          description: post.content,
          image: post.image,
          author: post.author,
          date: post.date || new Date(post.createdAt).toDateString(),
          readTime: post.readTime,
        }));

        setAllPosts(formattedPosts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: string | number) => {
    const isConfirmed = confirm("Are you sure you want to delete this post?");
    if (!isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const updatedPosts = allPosts.filter((post) => post.id !== id);
        setAllPosts(updatedPosts);
        localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
        alert("Post deleted successfully");
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("An error occurred while deleting the post");
    }
  };

  const featuredPost = allPosts[0];
  const Articles = allPosts.slice(1);

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
        {featuredPost ? (
          <div id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="grid md:grid-cols-2">

                {/* Image For Blog */}
                <div className="relative flex items-center justify-center">
                  <img
                    src={`http://localhost:5000/${featuredPost.image}`}
                    alt={featuredPost.title}
                    className="w-fit h-50 text-black object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                      Letest
                    </span>
                  </div>
                </div>

                {/* Image For Blog Text */}
                <div className="p-8">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                        {featuredPost.author?.[0]}
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
        ) : (
          !loading && (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
              <div className="bg-white rounded-2xl shadow-xl p-12 max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">No Blogs Yet</h2>
                <p className="text-gray-600 text-lg mb-8">
                  We haven't published any articles yet. Check back soon for amazing content!
                </p>
              </div>
            </div>
          )
        )}

        {/* Latest Articles */}
        {Articles.length > 0 && (
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
                <PostCard key={post.id} post={post} onDelete={handleDelete} />
              ))}
            </div>
          </div>
        )}

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
