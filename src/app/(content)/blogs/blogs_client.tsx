"use client";

import { ChevronRight, Clock, Heart, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Blog {
  id: string;
  title: string;
  text: string;
  subTitle?: string;
  imgUrl: string | string[];
  writtenBy?: string;
  createdAt: string;
  readTime?: string;
  category?: string;
}

interface BlogsClientProps {
  blogs: Blog[];
}

/**
 * Client Component for Blogs Grid
 * Handles filtering, search, and interactions
 */
export default function BlogsClient({ blogs }: BlogsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "all",
    ...Array.from(
      new Set(blogs.map((blog) => blog.category ?? "").filter(Boolean)),
    ),
  ];

  const handleLike = (id: string) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {/* Search and Filter Section */}
      <div className="mb-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-4 py-2 rounded-lg border border-[#bf8c13] focus:outline-none focus:ring-2 focus:ring-[#bf8c13]/30 focus:border-[#bf8c13] bg-white font-medium"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap border border-[#c7cc3f] shadow-sm
                ${
                  selectedCategory === category
                    ? "bg-[#07705d] text-white"
                    : "bg-white text-[#07705d] hover:bg-[#c7cc3f]/10"
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <h3 className="text-lg font-medium mb-2">No blogs found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#c7cc3f]/30 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={
                    Array.isArray(blog.imgUrl) && blog.imgUrl.length > 0
                      ? blog.imgUrl[0]
                      : typeof blog.imgUrl === "string"
                        ? blog.imgUrl
                        : "/common_files/main/cover.jpg"
                  }
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[#07705d]/20 to-[#c7cc3f]/20 flex items-center justify-center"
                  style={{ display: blog.imgUrl ? "none" : "flex" }}
                >
                  <span className="text-4xl">📝</span>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="bg-[#bf8c13]/80 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {blog.category}
                  </span>
                </div>
                <div className="absolute bottom-2 right-2">
                  <button
                    onClick={() => handleLike(blog.id)}
                    className={`p-2 rounded-full bg-white/80 hover:bg-[#bf8c13]/80 transition-colors duration-200 shadow ${
                      liked[blog.id] ? "text-[#bf8c13]" : "text-gray-400"
                    }`}
                    aria-label="Like"
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={liked[blog.id] ? "#bf8c13" : "none"}
                    />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-[#07705d] mb-2 group-hover:text-[#bf8c13] transition-colors duration-200">
                  {blog.title}
                </h2>
                <p className="text-gray-700 line-clamp-3 mb-4 flex-1">
                  {blog.text}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                {/* Read More Link */}
                <Link
                  href={`/blogs/${blog.id}`}
                  className="inline-flex items-center text-[#bf8c13] font-semibold hover:underline"
                >
                  Read More <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
