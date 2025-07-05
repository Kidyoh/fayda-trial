"use client";
import { apiUrl } from "@/apiConfig";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Tag, Book, Clock, Star, Filter } from "lucide-react";

export default function FilteredPackage({ params }: any) {
  const FilterKey = params.filter_key;
  let filterKeyExtracted = "";

  if (FilterKey == "grade9") {
    filterKeyExtracted = "Grade 9";
  } else if (FilterKey == "grade10") {
    filterKeyExtracted = "Grade 10";
  } else if (FilterKey == "grade11") {
    filterKeyExtracted = "Grade 11";
  } else if (FilterKey == "grade12") {
    filterKeyExtracted = "Grade 12";
  } else if (FilterKey == "computer") {
    filterKeyExtracted = "Computer";
  } else if (FilterKey == "artlitrature") {
    filterKeyExtracted = "Art Litrature";
  } else if (FilterKey == "language") {
    filterKeyExtracted = "Language";
  } else if (FilterKey == "other") {
    filterKeyExtracted = "Other";
  }

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/packages/filter_fetch_home_packages/${filterKeyExtracted}`,
          {
            credentials: "include",
          }
        );

        const jsonData = await response.json();
        setData(jsonData);
        console.log("Data: ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filterKeyExtracted]);
  
  // Define skeleton component for loading state
  const PackageSkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden h-[380px] animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-8 bg-gray-200 rounded w-1/3 mt-4"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex mb-6 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primaryColor transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400 mt-0.5" />
            <Link href="/search-packages" className="text-gray-500 hover:text-primaryColor transition-colors">
              Packages
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400 mt-0.5" />
            <span className="text-primaryColor font-medium">
              {filterKeyExtracted}
            </span>
          </nav>

          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center md:text-left"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {filterKeyExtracted} Packages
                </h1>
                <p className="text-gray-600 max-w-2xl">
                  Explore our curated collection of {filterKeyExtracted.toLowerCase()} learning packages designed to help you succeed in your studies.
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                <Filter size={18} className="text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-600">
                  {data.length} packages found
                </span>
              </div>
            </div>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <PackageSkeleton key={index} />
              ))}
            </div>
          ) : data.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {data.map((singlePackage: any, index: number) => (
                <motion.div
                  key={singlePackage.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <Link href={`/package_2/${singlePackage.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={singlePackage.imgUrl}
                        alt={singlePackage.packageName}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      {singlePackage.discountStatus && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {Math.round((1 - singlePackage.temporaryPrice / singlePackage.price) * 100)}% OFF
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex items-center mb-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-primaryColor/10 text-primaryColor text-xs font-medium">
                          <Tag size={12} className="mr-1" />
                          {singlePackage.tag}
                        </span>
                        
                        {singlePackage.featured && (
                          <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
                            <Star size={12} className="mr-1" />
                            Featured
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
                        {singlePackage.packageName}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {singlePackage.packageDescription}
                      </p>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          {singlePackage.discountStatus ? (
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-gray-900">{singlePackage.temporaryPrice} Birr</span>
                              <span className="text-sm line-through text-gray-400">{singlePackage.price} Birr</span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold text-gray-900">{singlePackage.price} Birr</span>
                          )}
                        </div>
                        
                        <div className="flex items-center text-primaryColor font-medium text-sm hover:underline">
                          View Details
                          <ChevronRight size={16} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book size={24} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No packages found</h3>
              <p className="text-gray-600 mb-6">We couldn't find any packages in this category</p>
              <Link href="/search-packages">
                <button className="px-4 py-2 bg-primaryColor text-white rounded-full text-sm font-medium hover:bg-primaryColor/90 transition-colors">
                  Browse All Packages
                </button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
