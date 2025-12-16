
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="bg-gray-50 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                            <span className="text-white font-bold text-sm">MB</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            MyBlog
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link
                            href="/"
                            className="px-4 py-2 rounded-lg text-md font-bold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all"
                        >
                            Home
                        </Link>
                        <Link
                            href="#featured"
                            className="px-4 py-2 rounded-lg text-md font-bold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all"
                        >
                            Featured
                        </Link>
                        <Link
                            href="#all-posts"
                            className="px-4 py-2 rounded-lg text-md font-bold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all"
                        >
                            Articles
                        </Link>
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center space-x-3">
                        <Link
                            href="/CreatePost"
                            className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                        >
                            Create Blog
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100">
                        <div className="space-y-1">
                            <Link
                                href="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px - 4 py - 2 rounded - lg text - sm font - medium ${isActive('/')
                                    ? 'bg-indigo-50 text-indigo-600'
                                    : 'text-gray-700 hover:bg-gray-50'
                                    } `}
                            >
                                Home
                            </Link>
                            <Link
                                href="/#featured"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px - 4 py - 2 rounded - lg text - sm font - medium ${isActive('/')
                                    ? 'text-gray-700 hover:bg-gray-50'
                                    : 'bg-indigo-50 text-indigo-600'
                                    } `}
                            >
                                Featured
                            </Link>
                            <Link
                                href="/#all-posts"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px - 4 py - 2 rounded - lg text - sm font - medium ${isActive('/')
                                    ? 'text-gray-700 hover:bg-gray-50'
                                    : 'bg-indigo-50 text-indigo-600'
                                    } `}
                            >
                                Articles
                            </Link>
                            <Link
                                href="/CreatePost"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-2 mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-lg text-center"
                            >
                                Create Blog
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
