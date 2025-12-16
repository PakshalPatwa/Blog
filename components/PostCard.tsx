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

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link
      href={`/post/${post.id}`}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 block border border-gray-100 overflow-hidden group"
    >
      <div className="w-full h-48 relative overflow-hidden">
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
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
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