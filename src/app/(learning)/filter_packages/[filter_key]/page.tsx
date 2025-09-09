"use client";
import { apiUrl } from "@/apiConfig";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ChevronRight, Tag, Book, Star, Filter, Search, ArrowRight } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");

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
  
  // Define skeleton component for loading state with Ethiopian design
  const PackageSkeleton = () => (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-100 overflow-hidden h-[420px] relative">
      <div className="h-48 bg-gradient-to-br from-[#07705d]/10 to-[#c7cc3f]/10 animate-pulse"></div>
      <div className="p-6 space-y-4 relative z-10">
        <div className="h-5 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded-lg w-1/3 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </div>
        <div className="h-8 bg-gradient-to-r from-[#07705d]/20 to-[#c7cc3f]/20 rounded-full w-1/3 mt-4 animate-pulse"></div>
      </div>
    </div>
  );

  // Filter data based on search query
  const filteredData = data.filter((pkg: any) =>
    pkg.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.packageDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen relative overflow-hidden">

      <div className="container mx-auto px-4 pt-28 pb-16 relative">
        <div className="max-w-7xl mx-auto">

          <div className="mb-10">
            <div className="relative bg-[url(/Background/landing-bg.jpg)] bg-cover bg-center rounded-3xl p-8 overflow-hidden">

              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="header-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <polygon points="10,0 20,10 10,20 0,10" fill="white" opacity="0.3" />
                      <circle cx="10" cy="10" r="3" fill="white" opacity="0.2" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#header-pattern)" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="mb-6 lg:mb-0">
                  <h1 className="text-3xl lg:text-5xl font-bold text-white mb-3">
                    {filterKeyExtracted} Packages
                  </h1>
                  <p className="text-white/90 text-lg max-w-2xl">
                    Explore our curated collection of {filterKeyExtracted.toLowerCase()} learning packages designed to help you succeed in your studies.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/30">
                    <Filter size={20} className="text-white mr-2" />
                    <span className="text-white font-medium">
                      {isLoading ? '...' : filteredData.length} packages found
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Controls */}
          {!isLoading && (
            <div className="mb-8 bg-white rounded-2xl border border-gray-100 p-6">
              <div className="relative mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search packages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#07705d] focus:border-transparent transition-all"
                />
              </div>
            </div>
          )}
          {/* Content Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <PackageSkeleton key={index} />
              ))}
            </div>
          ) : filteredData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((singlePackage: any, index: number) => (
                <div
                  key={singlePackage.id}
                  className="group relative bg-white rounded-2xl border border-gray-100 hover:border-[#07705d]/30 overflow-hidden transition-all duration-300 hover:-translate-y-1 h-[400px] flex flex-col"
                >
                  <Link href={`/details/${singlePackage.id}`} className="flex flex-col h-full">
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-48 w-full">
                      {singlePackage.imgUrl ? (
                        <img
                          src={singlePackage.imgUrl}
                          alt={singlePackage.packageName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#07705d]/20 to-[#c7cc3f]/20 flex items-center justify-center">
                          <Book size={32} className="text-[#07705d]" />
                        </div>
                      )}

                      {/* Discount Badge */}
                      {singlePackage.discountStatus && (
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          {Math.round((1 - singlePackage.temporaryPrice / singlePackage.price) * 100)}% OFF
                        </div>
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5 flex flex-col justify-between flex-1 relative z-10">
                      <div>
                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-[#07705d]/10 text-[#07705d] text-xs font-medium border border-[#07705d]/20">
                            <Tag size={12} className="mr-1" />
                            {singlePackage.tag}
                          </span>
                          
                          {singlePackage.featured && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-[#c7cc3f]/20 to-[#bf8c13]/20 text-[#bf8c13] text-xs font-medium border border-[#bf8c13]/20">
                              <Star size={12} className="mr-1" />
                              Featured
                            </span>
                          )}
                        </div>
                        
                        {/* Title */}
                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                          {singlePackage.packageName}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {singlePackage.packageDescription}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex justify-between items-center mt-4">
                        {/* Price */}
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
                        
                        {/* View Details Button */}
                        <div className="flex items-center text-[#07705d] font-medium text-sm group-hover:text-[#c7cc3f] transition-colors">
                          View Details
                          <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gradient-to-br from-[#07705d]/10 to-[#c7cc3f]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#07705d]/20">
                <Book size={32} className="text-[#07705d]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No packages found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We couldn&apos;t find any packages matching your search criteria. Try adjusting your search or browse all packages.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <button 
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-3 bg-[#07705d] text-white rounded-full font-medium hover:bg-[#07705d]/90 transition-colors"
                >
                  Clear Search
                </button>
                <Link href="/search">
                  <button className="px-6 py-3 border border-[#07705d] text-[#07705d] rounded-full font-medium hover:bg-[#07705d] hover:text-white transition-colors">
                    Browse All Packages
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
