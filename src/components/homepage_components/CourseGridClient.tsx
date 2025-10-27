"use client";

import React, { useState } from "react";
import CourseCard from "./CourseCard";
import { Course } from "@/lib/api/types";

interface CourseGridClientProps {
  courses: Course[];
}

export default function CourseGridClient({ courses }: CourseGridClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6); // Show 6 courses per page (3 rows × 2 columns)

  // Calculate pagination
  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentCourses = courses.slice(startIndex, endIndex);

  // Reset to first page when courses change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [courses]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div
      className="bg-white shadow-lg overflow-hidden w-full rounded-xl animate-pulse"
      style={{ minHeight: 420, maxWidth: 420 }}
    >
      <div className="w-full h-64 bg-gray-300"></div>
      <div className="px-6 py-6">
        <div className="h-6 bg-gray-300 rounded mb-3"></div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-20 bg-gray-300 rounded"></div>
          </div>
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded mb-4"></div>
        <div className="flex gap-2">
          <div className="h-8 bg-gray-300 rounded flex-1"></div>
          <div className="h-8 w-20 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );

  // Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers: number[] = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center items-center space-x-3 mt-12">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-primaryColor/20 text-primaryColor hover:bg-primaryColor/10 hover:border-primaryColor/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-primaryColor/20 transition-all duration-200 font-medium"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => setCurrentPage(1)}
              className="px-4 py-2 rounded-xl border-2 border-primaryColor/20 text-primaryColor hover:bg-primaryColor/10 hover:border-primaryColor/40 transition-all duration-200 font-medium"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="text-gray-400 font-medium">...</span>
            )}
          </>
        )}

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded-xl border-2 font-medium transition-all duration-200 ${
              currentPage === page
                ? "bg-gradient-to-r from-primaryColor to-[#bf8c13] text-white border-transparent shadow-lg shadow-primaryColor/25"
                : "border-primaryColor/20 text-primaryColor hover:bg-primaryColor/10 hover:border-primaryColor/40"
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="text-gray-400 font-medium">...</span>
            )}
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="px-4 py-2 rounded-xl border-2 border-primaryColor/20 text-primaryColor hover:bg-primaryColor/10 hover:border-primaryColor/40 transition-all duration-200 font-medium"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-primaryColor/20 text-primaryColor hover:bg-primaryColor/10 hover:border-primaryColor/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-primaryColor/20 transition-all duration-200 font-medium"
        >
          Next
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {currentCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination />

      {/* Course count display */}
      {courses.length > 0 && (
        <div className="text-center text-white/80 text-sm mt-4">
          Showing {startIndex + 1}-{Math.min(endIndex, courses.length)} of{" "}
          {courses.length} courses
        </div>
      )}
    </>
  );
}
