"use client";

import { apiUrl } from "@/apiConfig";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Package, Loader2, Search, Filter } from "lucide-react";
import { PackageAddToCartButton } from "@/components/cart/AddToCartButton";

interface Package {
  id: string;
  packageName: string;
  packageDescription: string;
  price: string | number;
  imgUrl: string[];
  thumbnail: string;
  tag: string;
  courses?: any[];
  temporaryPrice?: string | null;
  discountStatus?: boolean;
  discountExpiryDate?: string | null;
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${apiUrl}/packages/public/active`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }

        const result = await response.json();
        if (result.success && result.data) {
          setPackages(result.data);
        } else {
          setPackages([]);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
        setPackages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Get unique tags from packages
  const uniqueTags = Array.from(
    new Set(packages.map((pkg) => pkg.tag).filter(Boolean)),
  );

  // Filter packages based on search and tag
  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.packageDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "all" || pkg.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#c7cc3f]/10 to-white pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primaryColor" />
                <p className="text-gray-600">Loading packages...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c7cc3f]/10 to-white pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-Sendako font-bold text-[#07705d] mb-4">
              Explore Our Packages
            </h1>
            <p className="text-gray-600 text-lg">
              Discover comprehensive learning packages designed for your success
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>

            {/* Tag Filter */}
            {uniqueTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter:
                </span>
                <button
                  onClick={() => setSelectedTag("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTag === "all"
                      ? "bg-primaryColor text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  All Packages
                </button>
                {uniqueTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedTag === tag
                        ? "bg-primaryColor text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Packages Grid */}
          {filteredPackages.length === 0 ? (
            <div className="text-center py-16">
              <Package className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No packages found
              </h3>
              <p className="text-gray-500">
                {searchQuery || selectedTag !== "all"
                  ? "Try adjusting your search or filters"
                  : "Check back soon for new packages"}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#c7cc3f]/20"
                  >
                    {/* Package Image */}
                    <div className="relative h-48 w-full">
                      {pkg.imgUrl && pkg.imgUrl.length > 0 ? (
                        <img
                          src={pkg.imgUrl[0]}
                          alt={pkg.packageName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#07705d] to-[#bf8c13] flex items-center justify-center">
                          <span className="text-5xl">📚</span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                        <span className="text-xs font-semibold text-[#07705d]">
                          {pkg.tag}
                        </span>
                      </div>
                    </div>

                    {/* Package Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold font-Sendako text-[#07705d] mb-2 line-clamp-2">
                        {pkg.packageName}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {pkg.packageDescription}
                      </p>

                      {/* Price */}
                      <div className="mb-4">
                        {pkg.discountStatus && pkg.temporaryPrice ? (
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-extrabold text-[#07705d]">
                              {pkg.temporaryPrice}
                            </span>
                            <span className="text-lg font-semibold text-gray-400 line-through">
                              {pkg.price}
                            </span>
                            <span className="text-xs font-semibold text-red-500">
                              Sale
                            </span>
                          </div>
                        ) : (
                          <span className="text-2xl font-extrabold text-[#07705d]">
                            {pkg.price} Birr
                          </span>
                        )}
                      </div>

                      {/* Courses Count */}
                      <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                        <Package className="h-4 w-4" />
                        <span>
                          {pkg.courses?.length || 0} comprehensive courses
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <PackageAddToCartButton
                          packageData={pkg}
                          className="w-full bg-primaryColor hover:bg-primaryColor/90 text-white font-bold py-2 px-4 rounded-xl transition-all"
                          size="default"
                        />
                        <Link href={`/details/${pkg.id}`} className="block">
                          <button className="w-full bg-white border-2 border-primaryColor text-primaryColor hover:bg-primaryColor/5 font-bold py-2 px-4 rounded-xl transition-all">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Results Count */}
              <div className="text-center text-gray-600">
                Showing {filteredPackages.length} of {packages.length} packages
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
