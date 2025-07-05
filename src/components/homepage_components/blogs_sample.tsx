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
import { ArrowRight, Calendar, Clock, ChevronRight, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/common_files/main/pattern.png')] opacity-[0.02]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primaryColor/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primaryColor/10 text-primaryColor text-sm font-medium mb-6"
          >
            <Bookmark className="w-4 h-4 mr-2" />
            Latest Articles
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            <span className="relative inline-block">
              {t('home.blogs.title')}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-2 left-0 h-3 bg-primaryColor/10 -rotate-1 -z-10"
              />
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            {t('home.blogs.subtitle')}
          </p>
        </motion.div>

        {/* Blog Carousel */}
        <div className="relative">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl h-64 mb-4" />
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
              <CarouselContent className="-ml-4">
                <AnimatePresence>
                  {data?.map((blog, index) => (
                    <CarouselItem
                      key={blog.id}
                      className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {/* Image Container */}
                        <div className="relative h-64 overflow-hidden">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"
                            animate={{
                              opacity: hoveredIndex === index ? 0.8 : 0.5
                            }}
                            transition={{ duration: 0.3 }}
                          />
                          <motion.img
                            src={blog.imgUrl}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                            animate={{
                              scale: hoveredIndex === index ? 1.1 : 1
                            }}
                            transition={{ duration: 0.4 }}
                          />
                          
                          {/* Category Tag */}
                          <div className="absolute top-4 left-4 z-20">
                            <div className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-primaryColor text-xs font-medium shadow-lg">
                              Education
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 relative">
                          <motion.div
                            animate={{
                              y: hoveredIndex === index ? -4 : 0
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <h3 className="font-semibold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-primaryColor transition-colors duration-200">
                              {blog.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-4 group-hover:text-gray-700">
                              {blog.text}
                            </p>

                            {/* Meta Info */}
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="w-4 h-4 text-primaryColor" />
                                  <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                  })}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Clock className="w-4 h-4 text-primaryColor" />
                                  <span>{blog.readTime}</span>
                                </div>
                              </div>
                            </div>

                            {/* Read More Button */}
                            <Link href={`/blogs/${blog.id}`}>
                              <motion.button
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-900 transition-colors duration-200 group border border-gray-100"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                Read Article
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </motion.button>
                            </Link>
                          </motion.div>
                        </div>

                        {/* Hover Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-primaryColor/5 to-transparent opacity-0 transition-opacity duration-300"
                          animate={{
                            opacity: hoveredIndex === index ? 1 : 0
                          }}
                        />
                      </motion.div>
                    </CarouselItem>
                  ))}
                </AnimatePresence>
              </CarouselContent>
              
              {/* Navigation Arrows */}
              <div className="hidden sm:block">
                <CarouselPrevious className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 border-gray-200 text-gray-700" />
                <CarouselNext className="absolute -right-12 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 border-gray-200 text-gray-700" />
              </div>
            </Carousel>
          )}
        </div>

        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16 text-center"
        >
          <Link href="/blogs">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-8 py-4 rounded-xl bg-primaryColor text-white font-medium hover:bg-primaryColor/90 transition-all duration-200 group shadow-lg shadow-primaryColor/20 hover:shadow-xl hover:shadow-primaryColor/30"
            >
              {t('home.blogs.viewall')}
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
