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
    <Link
      href={`/post/${post.id}`}
      className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 block border border-gray-100 overflow-hidden group"
    >
      {/* Image Wrapper */}
      <div className="flex items-center justify-center h-[200px] overflow-hidden bg-gray-100">
        {post.image && (
          <img
            src={`http://localhost:5000/${post.image}`}
            alt={post.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete(post.id);
        }}
        className="absolute top-3 right-3 p-2
                   bg-linear-to-br from-indigo-500 to-purple-500
                   text-white rounded-lg shadow-md
                   hover:from-red-600 hover:to-pink-600 transition-all"
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862
               a2 2 0 01-1.995-1.858L5 7
               m5 4v6m4-6v6
               M9 7h6m2 0H7
               m3-3h4a1 1 0 011 1v1H9V5a1 1 0 011-1z"
          />
        </svg>
      </button>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-gray-900 text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">
          {post.title}
        </h2>

        <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
          {post.description}
        </p>

        {(post.author || post.date || post.readTime) && (
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
            {post.author && (
              <>
                <div className="w-6 h-6 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                  {post.author.charAt(0)}
                </div>
                <span className="font-medium">{post.author}</span>
              </>
            )}
            {post.date && <span>• {post.date}</span>}
            {post.readTime && <span>• {post.readTime}</span>}
          </div>
        )}
      </div>
    </Link>
  );
};

export default PostCard;
