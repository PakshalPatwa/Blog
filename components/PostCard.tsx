"use client";

import Link from "next/link";
import React from "react";

interface PostCardProps {
  post: {
    id: string | number;
    title: string;
    description: string;
    image?: string;
    author?: string;
    date?: string;
    readTime?: string;
  };
  onDelete: (id: string | number) => void;
}

const PostCard = ({ post, onDelete }: PostCardProps) => {
  return (

    <div className="group relative h-full flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1">

      {/* Remove Button - Top Right */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete(post.id);
        }}
        className="absolute top-3 right-3 z-20 p-2 bg-white/90 backdrop-blur-md text-gray-400 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:text-red-500 hover:bg-red-50"
        title="Delete Post"
      >
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m3-3h4a1 1 0 011 1v1H9V5a1 1 0 011-1z"
          />
        </svg>
      </button>

      <Link href={`/post/${post.id}`} className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-100">
          {post.image ? (
            <img
              src={`http://localhost:5000/${post.image}`}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Overlay Gradient on Hover */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category Badge (Mock) */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-indigo-600 rounded-full shadow-sm">
              Article
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col grow p-6">
          <div className="grow">
            <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
              {post.title}
            </h2>

            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
              {post.description}
            </p>
          </div>

          {/* Footer Metadata */}
          <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {post.author ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm ring-2 ring-white">
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{post.author}</p>
                    <p className="text-[10px] text-gray-500">{post.date}</p>
                  </div>
                </div>
              ) : (
                <span className="text-xs text-gray-400">{post.date}</span>
              )}
            </div>

            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
