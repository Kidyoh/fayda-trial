"use client";
import { apiUrl } from "@/apiConfig";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  ChevronRight,
  Search,
  Heart,
  User,
  Tag,
} from "lucide-react";

interface Blog {
  id: string;
  title: string;
  text: string;
  imgUrl: string;
  createdAt: string;
  readTime?: string;
  category?: string;
}

export default function Blogs() {
  const [data, setData] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/blogs/displayhome`, {
          credentials: "include",
        });

        const jsonData = await response.json();
        // Add some mock data for demonstration
        const enhancedData = jsonData.map((blog: Blog) => ({
          ...blog,
          readTime: `${Math.floor(Math.random() * 10) + 2} min read`,
          category: ["Technology", "Education", "Tips", "News"][
            Math.floor(Math.random() * 4)
          ],
        }));
        setData(enhancedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredBlogs = data.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Ensure we have valid categories by filtering out undefined values
  const categories = [
    "all",
    ...Array.from(
      new Set(data.map((blog) => blog.category ?? "").filter(Boolean)),
    ),
  ];

  const handleLike = (id: string) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-white relative pt-16">
      {/* Geometric Ethiopian pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 z-0"
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'#bf8c13\' fill-opacity=\'0.12\'%3E%3Cpath d=\'M40 40l20-20v40l-20-20zm0 0l-20-20v40l20-20z\'/%3E%3C/g%3E%3C/svg%3E')`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:mt-24">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#07705d] mb-4">
            Blogs
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Explore stories, insights, and innovations in Ethiopian education.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#07705d] w-5 h-5" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#bf8c13] focus:outline-none focus:ring-2 focus:ring-[#bf8c13]/30 focus:border-[#bf8c13] bg-white font-medium"
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
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#c7cc3f]/30"
              >
                <div className="h-48 bg-gradient-to-r from-[#bf8c13]/20 to-[#c7cc3f]/20" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-[#07705d]/20 rounded w-3/4" />
                  <div className="h-4 bg-[#bf8c13]/20 rounded w-1/2" />
                </div>
              </div>
            ))}
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
                    src={blog.imgUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-[#bf8c13]/80 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {blog.category}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <button
                      onClick={() => handleLike(blog.id)}
                      className={`p-2 rounded-full bg-white/80 hover:bg-[#bf8c13]/80 transition-colors duration-200 shadow ${liked[blog.id] ? "text-[#bf8c13]" : "text-gray-400"}`}
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
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
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

        {/* Empty State */}
        {!isLoading && filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-4 text-[#bf8c13]" />
              <h3 className="text-lg font-medium mb-2">No blogs found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
