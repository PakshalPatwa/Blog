"use client";

import PostCard from "../components/PostCard";
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
  const articles = allPosts.slice(1);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        {/* Premium Hero Section with Standard Gradients */}
        <div className="relative bg-white overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 -left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:pt-32 md:pb-28 text-center">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-indigo-100 bg-indigo-50/50 backdrop-blur-sm text-indigo-600 text-sm font-semibold tracking-wide uppercase mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
              Welcome to MyBlog
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-[1.1]">
              Explore the <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600">Unseen</span> <br className="hidden lg:block" /> World of Ideas.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 leading-relaxed font-light">
              Discover thought-provoking stories, expert insights, and creative inspiration from a community of passionate writers.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="#featured"
                className="px-8 py-4 bg-gray-900 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all transform hover:-translate-y-1"
              >
                Start Reading
              </Link>
              <Link
                href="#all-posts"
                className="px-8 py-4 bg-white text-gray-900 font-bold rounded-full border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all"
              >
                Become a Writer
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {featuredPost ? (
            <div id="featured">

              {/* badge */}
              <div className="flex items-center justify-center gap-4">
                <span className="inline-flex items-center px-4 py-1.5 text-2xl rounded-full border border-indigo-100 bg-indigo-50/50 backdrop-blur-sm text-indigo-600 text-sm font-semibold tracking-wide uppercase mb-6 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse" />
                  Editor's Pick
                </span>
              </div>

              {/* <div className="flex items-center justify-between">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Latest Writings
                  </h2>
                  <p className="mt-2 text-gray-500">
                    Explore our most recent stories and updates.
                  </p>
                </div>
              </div> */}

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
                        Featured Story
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
                      Read Full Story
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
        </div>

        {/* Latest Articles */}
        <div id="all-posts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">


          {/* badge */}
          <div className="flex items-center justify-center gap-4">
            <span className="inline-flex items-center px-4 py-1.5 text-2xl rounded-full border border-indigo-100 bg-indigo-50/50 backdrop-blur-sm text-indigo-600 text-sm font-semibold tracking-wide uppercase mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse" />
              Article
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900">
                Latest Writings
              </h2>
              <p className="mt-2 text-gray-500">
                Explore our most recent stories and updates.
              </p>
            </div>
            <div className="">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </svg>
              </button>
            </div>
          </div>
          {articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-gray-300 text-center">
              <div className="p-4 bg-indigo-50 rounded-full mb-4">
                <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">No articles yet</h3>
              <p className="text-gray-500 mt-2 max-w-sm">It looks like we haven't published any stories yet. Check back soon for updates!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(showAll ? articles : articles.slice(0, 3)).map((post) => (
                <PostCard key={post.id} post={post} onDelete={handleDelete} />
              ))}
            </div>
          )}
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
      </div >
    </>
  );
}
