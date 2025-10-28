"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BookOpen, Calendar, Clock, Star } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  text: string;
  imgUrl: string;
  createdAt: string;
  readTime?: string;
  category?: string;
}

interface BlogClientProps {
  blogs: Blog[];
}

/**
 * Client Component for Blog Cards and Filtering
 * Handles interactive filtering and animations
 */
export default function BlogClient({ blogs }: BlogClientProps) {
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    "Education",
    "Technology",
    "Community",
    "Culture",
    "Environment",
    "Article",
  ];

  const filteredPosts =
    filter === "All" ? blogs : blogs.filter((post) => post.category === filter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const BlogCard = ({ post, index }: { post: Blog; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 h-[420px] border border-gray-100 hover:border-[#07705d]/20 transition-all duration-300 ${
          index === 0 ? "md:col-span-2" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Ethiopian Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 z-10">
          <div
            className="w-full h-full bg-gradient-to-br from-[#07705d]/20 via-transparent to-[#c7cc3f]/20"
            style={{
              maskImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.8'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.8'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Featured Badge */}
        {index === 0 && (
          <div className="absolute top-4 left-4 z-30 bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Star size={14} fill="white" />
            Featured
          </div>
        )}

        {/* Image Container */}
        <div className="relative overflow-hidden h-48">
          <div
            className={`w-full h-full transition-transform duration-500 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          >
            {post.imgUrl ? (
              <>
                <img
                  src={post.imgUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div
                  className="w-full h-full bg-gradient-to-br from-[#07705d]/20 to-[#c7cc3f]/20 flex items-center justify-center"
                  style={{ display: "none" }}
                >
                  <span className="text-4xl">📝</span>
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#07705d]/20 to-[#c7cc3f]/20 flex items-center justify-center">
                <span className="text-4xl">📝</span>
              </div>
            )}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20"></div>

          {/* Category Badge */}
          <div className="absolute top-4 right-4 z-30 bg-[#07705d]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
            {post.category || "Article"}
          </div>
        </div>

        {/* Content */}
        <div className="relative p-5 flex flex-col justify-between flex-1 z-20">
          <div>
            {/* Title */}
            <h3
              className={`font-bold text-[#07705d] mb-2 line-clamp-2 ${
                index === 0 ? "text-xl" : "text-lg"
              }`}
            >
              {post.title}
            </h3>

            {/* Description */}
            <p
              className={`text-gray-700 mb-4 ${
                index === 0 ? "text-sm line-clamp-4" : "text-sm line-clamp-3"
              }`}
            >
              {post.text.length > 150
                ? `${post.text.substring(0, 150)}...`
                : post.text}
            </p>
          </div>

          <div>
            {/* Meta Info */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Calendar size={10} />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={10} />
                  <span>{post.readTime || "5 min read"}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs bg-[#07705d]/10 text-[#07705d] px-2 py-1 rounded-full border border-[#07705d]/20">
                {post.category || "Article"}
              </span>
              <Link
                href={`/blogs/${post.id}`}
                className="group/link flex items-center gap-1 text-xs text-[#07705d] hover:text-[#c7cc3f] font-semibold transition-colors"
              >
                Read More
                <ArrowRight
                  size={12}
                  className="group-hover/link:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-1 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              filter === category
                ? "bg-[#07705d] text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Content */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">📝</div>
          <p className="text-gray-600">
            No blogs found for the selected category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {filteredPosts.slice(0, 6).map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      )}

      {/* View All Button */}
      {filteredPosts.length > 0 && (
        <div className="text-center mt-12">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#07705d] to-[#c7cc3f] text-white px-8 py-3 rounded-full font-semibold hover:from-[#07705d]/90 hover:to-[#c7cc3f]/90 transition-all duration-300 hover:scale-105"
          >
            <BookOpen size={20} />
            View All Blogs
            <ArrowRight size={20} />
          </Link>
        </div>
      )}
    </>
  );
}
