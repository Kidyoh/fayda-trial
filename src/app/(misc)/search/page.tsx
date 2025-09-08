"use client";
import { apiUrl } from "@/apiConfig";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Search, Filter, BookOpen as Book, ChevronRight, X, Heart, Star, Users } from "lucide-react";
import useFetchStore from "../../store/fetchStore";
import { Checkbox } from "@/components/ui/checkbox";

// Create Badge component since it's missing
const Badge = ({ children, className = "", variant = "default" }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variant === "outline" ? "border " : ""
      } ${className}`}>
      {children}
    </span>
  );
};

const Skeleton = ({ className = "" }) => {
  return <div className={`animate-pulse rounded ${className}`} />;
};

export default function search() {
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
      <div key={`skeleton-${index}`} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#c7cc3f]/30">
        <Skeleton className="h-48 w-full bg-gradient-to-r from-[#bf8c13]/20 to-[#c7cc3f]/20" />
        <div className="p-4">
          <Skeleton className="h-6 w-3/4 mb-2 bg-[#07705d]/20" />
          <Skeleton className="h-4 w-1/2 mb-4 bg-[#bf8c13]/20" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-1/3 bg-[#c7cc3f]/20" />
            <Skeleton className="h-8 w-24 rounded-full bg-[#07705d]/20" />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-white relative">

      {/* Hero Section */}
      <section className="relative pt-20 bg-[url(/Background/landing-bg.jpg)] bg-cover bg-center text-white pb-16 md:pt-24">
        <div className="container mx-auto px-6 z-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Find Your Perfect Learning Package</h1>
            <p className="text-xl mb-8 text-white/90">Discover courses tailored to your academic needs and interests</p>

            <div className="bg-white rounded-2xl shadow-lg p-3 flex items-center">
              <Search className="ml-3 text-[#07705d]" size={20} />
              <input
                type="text"
                placeholder="Search for packages..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-3 text-gray-800 focus:outline-none bg-transparent text-lg"
              />
              <button className="ml-auto bg-[#bf8c13] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#bf8c13]/90 transition-all duration-200">
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/10 z-0"></div>
      </section>

      {/* Quick Filter Tags */}
      <section className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-wrap gap-3 justify-center">
          {popularTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 border shadow-sm ${activeTab === tag.id
                  ? "bg-[#07705d] text-white border-[#07705d] shadow-md"
                  : "bg-white text-[#07705d] hover:bg-[#c7cc3f]/10 border-[#c7cc3f]"
                }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-6 pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#07705d]">
              {loading ? "Loading packages..." : `${filteredPackages.length} packages found`}
            </h2>
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#c7cc3f] shadow-sm text-[#07705d] hover:bg-[#c7cc3f]/10 transition-colors"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
          </div>

          {/* Mobile Filter Drawer */}
          <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity lg:hidden ${mobileFiltersOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}>
            <div className={`absolute right-0 top-0 h-full bg-white w-80 transition-transform shadow-xl ${mobileFiltersOpen ? "translate-x-0" : "translate-x-full"
              }`}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-[#07705d]">Filters</h3>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 text-gray-500 hover:text-[#bf8c13] transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  {filterCategories.map((category, idx) => (
                    <div key={idx} className="border-b border-[#c7cc3f]/30 pb-6 last:border-0">
                      <h4 className="font-medium mb-4 text-[#07705d]">{category.name}</h4>
                      <div className="space-y-3">
                        {category.items.map((item) => (
                          <div key={item.id} className="flex items-center">
                            <Checkbox
                              id={`mobile-${item.id}`}
                              checked={filters[item.id as keyof typeof filters]}
                              onCheckedChange={() => handleFilterChange(item.id)}
                              className="data-[state=checked]:bg-[#07705d] data-[state=checked]:border-[#07705d]"
                            />
                            <label htmlFor={`mobile-${item.id}`} className="ml-2 text-sm text-gray-700">
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
                  className="w-full mt-6 bg-[#07705d] text-white py-3 rounded-xl hover:bg-[#07705d]/90 transition-colors font-semibold"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#c7cc3f]/30 sticky top-24">
              <h3 className="text-lg font-semibold mb-4 text-[#07705d]">Filters</h3>

              <div className="space-y-6">
                <div className="pb-4 border-b border-[#c7cc3f]/30">
                  <div className="flex items-center mb-2">
                    <Checkbox
                      id="filter-all"
                      checked={filters.all}
                      onCheckedChange={() => handleFilterChange("all")}
                      className="data-[state=checked]:bg-[#07705d] data-[state=checked]:border-[#07705d]"
                    />
                    <label htmlFor="filter-all" className="ml-2 text-sm font-medium text-[#07705d]">
                      All Packages
                    </label>
                  </div>
                </div>

                {filterCategories.map((category, idx) => (
                  <div key={idx} className="pb-4 border-b border-[#c7cc3f]/30 last:border-0">
                    <h4 className="font-medium mb-4 text-[#07705d]">{category.name}</h4>
                    <div className="space-y-3">
                      {category.items.map((item) => (
                        <div key={item.id} className="flex items-center">
                          <Checkbox
                            id={`filter-${item.id}`}
                            checked={filters[item.id as keyof typeof filters]}
                            onCheckedChange={() => handleFilterChange(item.id)}
                            className="data-[state=checked]:bg-[#07705d] data-[state=checked]:border-[#07705d]"
                          />
                          <label htmlFor={`filter-${item.id}`} className="ml-2 text-sm text-gray-700">
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
              <h2 className="text-xl font-semibold text-[#07705d]">
                {loading ? "Loading packages..." : `${filteredPackages.length} packages found`}
              </h2>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderSkeletons()}
              </div>
            ) : filteredPackages.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-[#c7cc3f]/30">
                <div className="mx-auto w-16 h-16 rounded-full bg-[#c7cc3f]/20 flex items-center justify-center mb-4">
                  <Search className="text-[#bf8c13]" size={24} />
                </div>
                <h3 className="text-xl font-medium text-[#07705d] mb-2">No packages found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
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
                  className="px-6 py-3 bg-[#07705d] text-white rounded-xl hover:bg-[#07705d]/90 transition-colors font-semibold"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPackages.map((singlePackage, index) => (
                  <div key={index}>
                    <Link href={`/details/${singlePackage.id}`}>
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col group border border-[#c7cc3f]/30">
                        <div className="relative overflow-hidden h-48">
                          <img
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            src={singlePackage.imgUrl}
                            alt={singlePackage.packageName}
                          />
                          <div className="absolute top-3 left-3">
                            <Badge variant="outline" className="text-xs font-semibold bg-[#bf8c13]/90 text-white border-none backdrop-blur-sm">
                              {singlePackage.tag}
                            </Badge>
                          </div>

                          <div className="absolute bottom-3 right-3">
                            <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-[#07705d]">
                              {singlePackage.price} Birr
                            </div>
                          </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-lg font-bold text-[#07705d] mb-2 group-hover:text-[#bf8c13] transition-colors">
                            {singlePackage.packageName}
                          </h3>

                          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                            {singlePackage.packageDescription}
                          </p>

                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#c7cc3f]/30">
                            <div className="flex items-center text-sm text-gray-600">
                              <Book size={14} className="mr-1 text-[#bf8c13]" />
                              <span>{singlePackage.courses?.length || 0} Courses</span>
                            </div>

                            <div className="flex items-center justify-center text-sm font-semibold text-[#bf8c13] hover:text-[#bf8c13]/80 transition-colors group">
                              <span>View Details</span>
                              <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
