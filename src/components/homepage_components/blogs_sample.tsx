"use client";
import { apiUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
//import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
// Optional for navigation/pagination
import { useLanguage } from "@/lib/language-context";

interface Blog {
  id: string;
  title: string;
  text: string;
  imgUrl: string;
  createdAt: string;
  readTime?: string;
}

export default function BlogSample() {
  const { t } = useLanguage();
  //   const res = await fetch(`${apiUrl}/blogs/displayhome`, {
  //     next: {
  //       revalidate: 5,
  //     },
  //   });
  //   const data = await res.json();

  const [data, setData] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/blogs/displayhome`, {
          credentials: "include",
        });

        const jsonData = await response.json();
        // Add mock read time for demonstration
        const enhancedData = jsonData.map((blog: Blog) => ({
          ...blog,
          readTime: `${Math.floor(Math.random() * 10) + 2} min read`
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

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900">
            <span className="text-primaryColor">{t('home.blogs.title')}</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t('home.blogs.subtitle')}
          </p>
        </motion.div>

        {/* Blog Carousel */}
        <div className="relative">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl h-48 mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <Carousel
              plugins={[
                Autoplay({
                  delay: 6000,
                  stopOnInteraction: true,
                }),
              ]}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {data?.map((blog, index) => (
                  <CarouselItem
                    key={blog.id}
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/4"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      {/* Image Container */}
                      <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                        <img
                          src={blog.imgUrl}
                          alt={blog.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-primaryColor transition-colors duration-200">
                          {blog.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {blog.text}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{blog.readTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Overlay Link */}
                      <Link href={`/blogs/${blog.id}`} className="absolute inset-0">
                        <span className="sr-only">View blog</span>
                      </Link>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden sm:block">
                <CarouselPrevious className="absolute -left-12 top-1/2 transform -translate-y-1/2" />
                <CarouselNext className="absolute -right-12 top-1/2 transform -translate-y-1/2" />
              </div>
            </Carousel>
          )}
        </div>

        {/* View All Link */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link href="/blogs">
            <button className="inline-flex items-center px-6 py-3 rounded-full bg-primaryColor text-white font-medium hover:bg-primaryColor/90 transition-colors duration-200 group">
              {t('home.blogs.viewall')}
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
