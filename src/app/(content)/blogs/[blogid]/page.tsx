"use client";
import { apiUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Share2, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface BlogData {
  id: string;
  title: string;
  subTitle?: string;
  text: string;
  imgUrl: string;
  writtenBy: string;
  createdAt: string;
  readTime?: string;
}

export default function BlogDetails({
  params,
}: {
  params: { blogid: string };
}) {
  const [data, setData] = useState<BlogData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/blogs/${params.blogid}`, {
          credentials: "include",
        });

        const jsonData = await response.json();
        // Add mock read time for demonstration
        const enhancedData = {
          ...jsonData,
          readTime: `${Math.floor(Math.random() * 10) + 2} min read`,
          createdAt: jsonData.createdAt || new Date().toISOString(),
        };
        setData(enhancedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.blogid]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-64 bg-gray-200 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Blog not found</h1>
        <Link
          href="/blogs"
          className="text-primaryColor hover:underline mt-4 inline-block"
        >
          Return to blogs
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img
          src={data.imgUrl}
          alt={data.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-20" />

        <div className="absolute inset-x-0 bottom-0 z-30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/blogs"
                className="inline-flex items-center text-white/90 hover:text-white mb-4 group"
              >
                <ChevronLeft className="w-5 h-5 mr-1 transform group-hover:-translate-x-1 transition-transform duration-200" />
                Back to Blogs
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {data.title}
              </h1>
              {data.subTitle && (
                <p className="text-xl text-white/90 mb-6">{data.subTitle}</p>
              )}
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{data.writtenBy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(data.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{data.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="prose prose-lg max-w-none"
        >
          <div className="text-gray-700 leading-relaxed space-y-6">
            {data.text.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <button
            onClick={() => {
              navigator
                .share({
                  title: data.title,
                  text: data.subTitle || data.text.substring(0, 100) + "...",
                  url: window.location.href,
                })
                .catch(console.error);
            }}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share this article
          </button>
        </motion.div>
      </div>
    </article>
  );
}
