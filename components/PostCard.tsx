"use client";

import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

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
}

const handleDelete = (id: string | number) => {
  const isConfirmed = confirm("Are you sure you want to delete this post?");
  if (!isConfirmed) return;

  alert(`Post ${id} deleted (UI only)`);
};

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link
      href={`/post/${post.id}`}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 block border border-gray-100 overflow-hidden group"
    >
      <div className="w-full h-50 relative overflow-hidden">
        {post.image?.startsWith('data:image') ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <Image
            src={`/assets/${post.image}`}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.preventDefault(); // stop Link navigation
            e.stopPropagation();
            handleDelete(post.id);
          }}
          className="absolute top-3 right-3 p-2
                     bg-linear-to-br from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:from-red-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
      </div>

      <div className="p-5">
        <h2 className="text-gray-900 text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">
          {post.title}
        </h2>

        <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
          {post.description}
        </p>

        {(post.author || post.date) && (
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
            {post.author && (
              <>
                <div className="w-6 h-6 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                  {post.author.charAt(0)}
                </div>
                <span className="font-medium">{post.author}</span>
              </>
            )}
            {post.date && (
              <>
                <span className="text-gray-400">•</span>
                <span>{post.date}</span>
              </>
            )}
            {post.readTime && (
              <>
                <span className="text-gray-400">•</span>
                <span>{post.readTime}</span>
              </>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}

export default PostCard