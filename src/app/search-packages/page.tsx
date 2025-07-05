"use client";
import { apiUrl } from "@/apiConfig";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, BookOpen as Book, ChevronDown, X } from "lucide-react";
import useFetchStore from "../store/fetchStore";
import { Checkbox } from "@/components/ui/checkbox";

// Create Badge component since it's missing
const Badge = ({ children, className = "", variant = "default" }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
      variant === "outline" ? "border " : ""
    } ${className}`}>
      {children}
    </span>
  );
};

// Create Skeleton component since it's missing
const Skeleton = ({ className = "" }) => {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
};

export default function ExplorePackages() {
  const [packageData, setPackagesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter states
  const [filters, setFilters] = useState({
    all: true,
    grade9: false,
    grade10: false,
    grade11: false,
    grade12: false,
    computer: false,
    language: false,
    artLiterature: false,
    other: false
  });
  
  const setSearchQuery = useFetchStore((state) => state.setSearchQuery);
  const searchQuery = useFetchStore((state) => state.searchQuery);
  
  // Filter categories
  const filterCategories = [
    { 
      name: "Academic Grades", 
      items: [
        { id: "grade9", label: "Grade 9", tag: "Grade 9" },
        { id: "grade10", label: "Grade 10", tag: "Grade 10" },
        { id: "grade11", label: "Grade 11", tag: "Grade 11" },
        { id: "grade12", label: "Grade 12", tag: "Grade 12" },
      ]
    },
    { 
      name: "Course Types", 
      items: [
        { id: "computer", label: "Computer Studies", tag: "Computer" },
        { id: "language", label: "Language", tag: "Language" },
        { id: "artLiterature", label: "Art & Literature", tag: "Art Litrature" },
        { id: "other", label: "Other", tag: "Other" },
      ]
    }
  ];
  
  // Popular tags that appear at the top
  const popularTags = [
    { id: "all", label: "All Courses" },
    { id: "grade9", label: "Grade 9" },
    { id: "grade10", label: "Grade 10" },
    { id: "computer", label: "Computer" },
    { id: "language", label: "Language" },
  ];

  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/packages/fetchPackagesall/`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setPackagesData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching packages:", error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (id: string) => {
    if (id === "all") {
      // If "All" is clicked, clear other filters
      setFilters({
        all: true,
        grade9: false,
        grade10: false,
        grade11: false,
        grade12: false,
        computer: false,
        language: false,
        artLiterature: false,
        other: false
      });
      setActiveTab("all");
    } else {
      // If any other filter is clicked, uncheck "All"
      setFilters({
        ...filters,
        [id]: !filters[id as keyof typeof filters],
        all: false
      });
      setActiveTab(id);
    }
  };

  // Function to handle tag clicks in the top bar
  const handleTagClick = (id: string) => {
    if (id === "all") {
      setFilters({
        all: true,
        grade9: false,
        grade10: false,
        grade11: false,
        grade12: false,
        computer: false,
        language: false,
        artLiterature: false,
        other: false
      });
    } else {
      setFilters({
        all: false,
        grade9: id === "grade9",
        grade10: id === "grade10",
        grade11: id === "grade11",
        grade12: id === "grade12",
        computer: id === "computer",
        language: id === "language",
        artLiterature: id === "artLiterature",
        other: id === "other"
      });
    }
    setActiveTab(id);
  };

  // Filter the packages based on search query and selected filters
  const filteredPackages = packageData.filter((item: any) => {
    // Check if package name includes search query
    if (!item.packageName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // If "All" filter is active, show everything
    if (filters.all) {
      return true;
    }
    
    // Check if any of the selected filters match the package tag
    const tagConditions = [
      filters.grade9 && item.tag.toLowerCase().includes("Grade 9".toLowerCase()),
      filters.grade10 && item.tag.toLowerCase().includes("Grade 10".toLowerCase()),
      filters.grade11 && item.tag.toLowerCase().includes("Grade 11".toLowerCase()),
      filters.grade12 && item.tag.toLowerCase().includes("Grade 12".toLowerCase()),
      filters.computer && item.tag.toLowerCase().includes("Computer".toLowerCase()),
      filters.language && item.tag.toLowerCase().includes("Language".toLowerCase()),
      filters.artLiterature && item.tag.toLowerCase().includes("Art Litrature".toLowerCase()),
      filters.other && item.tag.toLowerCase().includes("Other".toLowerCase()),
    ];
    
    return tagConditions.some(condition => condition);
  });

  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <div key={`skeleton-${index}`} className="bg-white rounded-2xl overflow-hidden shadow-md">
        <Skeleton className="h-48 w-full" />
        <div className="p-4">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primaryColor to-primaryColor/80 text-white py-12">
        <div className="container mx-auto px-6 z-10 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Find Your Perfect Learning Package</h1>
            <p className="text-lg mb-8 text-white/90">Discover courses tailored to your academic needs and interests</p>
            
            <div className="bg-white rounded-full shadow-lg p-2 flex items-center">
              <Search className="ml-2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for packages..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 text-gray-800 focus:outline-none bg-transparent"
              />
              <button className="ml-auto bg-primaryColor text-white font-medium px-5 py-2 rounded-full hover:bg-primaryColor/90 transition">
                Search
              </button>
            </div>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-black/10 z-0"></div>
      </section>

      {/* Quick Filter Tags */}
      <section className="container mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {popularTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag.id)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeTab === tag.id
                  ? "bg-primaryColor text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-6 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {loading ? "Loading packages..." : `${filteredPackages.length} packages found`}
            </h2>
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
          </div>

          {/* Mobile Filter Drawer */}
          <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity lg:hidden ${
            mobileFiltersOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}>
            <div className={`absolute right-0 top-0 h-full bg-white w-80 transition-transform shadow-xl ${
              mobileFiltersOpen ? "translate-x-0" : "translate-x-full"
            }`}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button 
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {filterCategories.map((category, idx) => (
                    <div key={idx} className="border-b border-gray-200 pb-6 last:border-0">
                      <h4 className="font-medium mb-4 text-gray-900">{category.name}</h4>
                      <div className="space-y-3">
                        {category.items.map((item) => (
                          <div key={item.id} className="flex items-center">
                            <Checkbox
                              id={`mobile-${item.id}`}
                              checked={filters[item.id as keyof typeof filters]} 
                              onCheckedChange={() => handleFilterChange(item.id)}
                              className="data-[state=checked]:bg-primaryColor data-[state=checked]:border-primaryColor"
                            />
                            <label htmlFor={`mobile-${item.id}`} className="ml-2 text-sm text-gray-600">
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full mt-6 bg-primaryColor text-white py-2 rounded-lg hover:bg-primaryColor/90 transition"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Filters</h3>
              
              <div className="space-y-6">
                <div className="pb-4 border-b border-gray-200">
                  <div className="flex items-center mb-2">
                    <Checkbox
                      id="filter-all"
                      checked={filters.all} 
                      onCheckedChange={() => handleFilterChange("all")}
                      className="data-[state=checked]:bg-primaryColor data-[state=checked]:border-primaryColor"
                    />
                    <label htmlFor="filter-all" className="ml-2 text-sm font-medium text-gray-700">
                      All Packages
                    </label>
                  </div>
                </div>
                
                {filterCategories.map((category, idx) => (
                  <div key={idx} className="pb-4 border-b border-gray-200 last:border-0">
                    <h4 className="font-medium mb-4 text-gray-900">{category.name}</h4>
                    <div className="space-y-3">
                      {category.items.map((item) => (
                        <div key={item.id} className="flex items-center">
                          <Checkbox
                            id={`filter-${item.id}`}
                            checked={filters[item.id as keyof typeof filters]} 
                            onCheckedChange={() => handleFilterChange(item.id)}
                            className="data-[state=checked]:bg-primaryColor data-[state=checked]:border-primaryColor"
                          />
                          <label htmlFor={`filter-${item.id}`} className="ml-2 text-sm text-gray-600">
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Packages Grid */}
          <div className="flex-1">
            <div className="mb-6 hidden lg:flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {loading ? "Loading packages..." : `${filteredPackages.length} packages found`}
              </h2>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderSkeletons()}
              </div>
            ) : filteredPackages.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Search className="text-gray-400" size={24} />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No packages found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setFilters({
                      all: true,
                      grade9: false,
                      grade10: false,
                      grade11: false,
                      grade12: false,
                      computer: false,
                      language: false,
                      artLiterature: false,
                      other: false
                    });
                    setActiveTab("all");
                  }}
                  className="px-4 py-2 bg-primaryColor text-white rounded-lg hover:bg-primaryColor/90 transition"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPackages.map((singlePackage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link href={`/package_2/${singlePackage.id}`}>
                      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col group border border-gray-100">
                        <div className="relative overflow-hidden h-48">
                          <img
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            src={singlePackage.imgUrl}
                            alt={singlePackage.packageName}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-4 right-4">
                              <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primaryColor">
                                {singlePackage.price} Birr
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col">
                          <div className="mb-2">
                            <Badge variant="outline" className="text-xs font-normal bg-primaryColor/5 text-primaryColor border-primaryColor/20">
                              {singlePackage.tag}
                            </Badge>
                          </div>
                          
                          <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-primaryColor transition-colors">
                            {singlePackage.packageName}
                          </h3>
                          
                          <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">
                            {singlePackage.packageDescription}
                          </p>
                          
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                            <div className="flex items-center text-sm text-gray-500">
                              <Book size={14} className="mr-1" />
                              <span>{singlePackage.courses?.length || 0} Courses</span>
                            </div>
                            
                            <button className="flex items-center justify-center text-sm font-medium text-primaryColor hover:text-primaryColor/80 transition-colors group">
                              <span>View Details</span>
                              <ChevronDown size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
