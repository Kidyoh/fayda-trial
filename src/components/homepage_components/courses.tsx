import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CoursePurchaseDialog } from "../custom_components/coursePurchaseDialog";
import { CourseAddToCartButton } from "../cart/AddToCartButton";
import {
  getPublicHomepageCourses,
  Course,
  getDisplayPrice,
} from "@/lib/courseAPI";
import { useLanguage } from "@/lib/language-context";

// Helper function to get course thumbnail
const getCourseThumbnail = (course: Course): string => {
  if (course.thumbnail) {
    return course.thumbnail;
  }

  // Map course names to appropriate images
  const courseImages: { [key: string]: string } = {
    Math: "/course/Math.png",
    Physics: "/course/Physics.png",
    Chemistry: "/course/Chemistry.png",
    Biology: "/course/Biology.png",
    History: "/course/History.png",
    Economics: "/course/Economics.png",
  };

  // Try to match course name with available images
  for (const [key, image] of Object.entries(courseImages)) {
    if (course.courseName.toLowerCase().includes(key.toLowerCase())) {
      return image;
    }
  }

  // Default fallback
  return "/course/Math.png";
};

interface AnimatedCourseCardProps {
  course: Course;
}

function AnimatedCourseCard({ course }: AnimatedCourseCardProps) {
  const [hovered, setHovered] = useState(false);
  const { language } = useLanguage();

  const thumbnail = getCourseThumbnail(course);
  const priceInfo = getDisplayPrice(course);

  return (
    <motion.div
      className="bg-white shadow-2xl shadow-primaryColor/10 overflow-hidden w-full rounded-2xl"
      style={{ minHeight: 420, maxWidth: 420 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="w-full overflow-hidden relative z-20"
        animate={{
          height: hovered ? 120 : 300,
        }}
        transition={{ duration: 0.35, type: "tween" }}
        style={{ height: 260 }}
      >
        <motion.img
          src={thumbnail}
          alt={course.courseName}
          className="w-full h-[120%] object-cover"
          animate={{ scale: hovered ? 1.03 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ willChange: "transform" }}
        />
      </motion.div>

      <div className="px-6 py-6">
        <div className="font-semibold text-2xl mb-3 font-Sendako">
          {course.courseName}
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-primaryColor/10 flex items-center justify-center">
              <span className="text-primaryColor font-bold text-sm">
                {course.parts}
              </span>
            </div>
            <span className="uppercase text-sm tracking-wider font-semibold text-gray-900">
              {course.partName || "Course"}
            </span>
          </div>
          <div className="flex flex-col items-end">
            {priceInfo.isDiscounted ? (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg text-gray-500 line-through font-Sendako">
                  {priceInfo.originalPrice} Birr
                </span>
                <span className="font-semibold text-2xl text-[#07705d] font-Sendako">
                  {priceInfo.currentPrice} Birr
                </span>
              </div>
            ) : (
              <span className="font-semibold text-2xl text-gray-900 font-Sendako">
                {priceInfo.currentPrice} Birr
              </span>
            )}
            {priceInfo.isDiscounted && priceInfo.discountExpiry && (
              <span className="text-xs text-red-500 font-medium">
                Until {new Date(priceInfo.discountExpiry).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {hovered && (
            <motion.div
              key="desc"
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="text-gray-700 text-base mb-6 mt-2">
                {course.courseDescription}
              </div>
              <div className="w-full justify-between flex items-center gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <CourseAddToCartButton
                    courseData={{
                      id: course.id,
                      courseName: course.courseName,
                      price: parseFloat(priceInfo.currentPrice),
                      temporaryPrice: priceInfo.isDiscounted
                        ? parseFloat(priceInfo.originalPrice!)
                        : undefined,
                      discountStatus: priceInfo.isDiscounted,
                      discountExpiryDate: priceInfo.discountExpiry,
                      courseDescription: course.courseDescription,
                    }}
                    size="sm"
                  />
                  <CoursePurchaseDialog
                    courseId={course.id}
                    courseName={course.courseName}
                    price={priceInfo.currentPrice}
                    temporaryPrice={
                      priceInfo.isDiscounted
                        ? priceInfo.originalPrice || undefined
                        : undefined
                    }
                    discountStatus={priceInfo.isDiscounted}
                    discountExpiryDate={priceInfo.discountExpiry || undefined}
                  />
                </div>
                <a
                  href={`/course/${course.id}`}
                  className="flex items-center font-Sendako font-medium text-gray-900 hover:underline ml-2"
                >
                  Learn More
                  <svg
                    className="ml-1 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function AnimatedCourseGrid() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6); // Show 6 courses per page
  const { language } = useLanguage();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use public courses API - no authentication required
        const coursesData = await getPublicHomepageCourses();

        // Ensure coursesData is an array
        if (!Array.isArray(coursesData)) {
          console.error("❌ API returned non-array data:", coursesData);
          throw new Error("Invalid course data format received from server");
        }

        console.log("✅ Loaded", coursesData.length, "courses");

        setCourses(coursesData);
      } catch (err) {
        console.error("❌ Error fetching courses:", err);
        let errorMessage = "Failed to load courses";

        if (err instanceof Error) {
          if (err.message.includes("fetch")) {
            errorMessage =
              "Unable to connect to server. Please check your internet connection.";
          } else {
            errorMessage = err.message;
          }
        }

        console.error("💥 Setting error message:", errorMessage);
        setError(errorMessage);
        setCourses([]);
      } finally {
        console.log("🏁 Finished fetching courses, setting loading to false");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentCourses = courses.slice(startIndex, endIndex);

  // Reset to first page when courses change
  useEffect(() => {
    setCurrentPage(1);
  }, [courses]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div
      className="bg-white shadow-2xl shadow-primaryColor/10 overflow-hidden w-full rounded-2xl animate-pulse"
      style={{ minHeight: 420, maxWidth: 420 }}
    >
      <div className="w-full h-64 bg-gray-300"></div>
      <div className="px-6 py-6">
        <div className="h-6 bg-gray-300 rounded mb-3"></div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-20 bg-gray-300 rounded"></div>
          </div>
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );

  // Error component
  const ErrorMessage = () => {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-12">
        <div className="text-red-500 text-lg font-semibold mb-4">
          Failed to load courses
        </div>
        <div className="text-gray-600 text-center mb-4 max-w-md">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-primaryColor text-white px-6 py-2 rounded-full font-semibold hover:bg-primaryColor/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  };

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
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => setCurrentPage(1)}
              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              1
            </button>
            {startPage > 2 && <span className="text-gray-400">...</span>}
          </>
        )}

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-2 rounded-lg border ${
              currentPage === page
                ? "bg-primaryColor text-white border-primaryColor"
                : "border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="text-gray-400">...</span>
            )}
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
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
          className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <section id="course" className="min-h-screen py-10 px-4 relative">
      {/* Decorative Brush2.png */}
      <Image
        src="/Images/Brush2.png"
        alt="Brush Decoration"
        width={300}
        height={180}
        className="w-28 absolute top-1/2 right-0 md:right-0 opacity-80 pointer-events-none select-none"
      />

      <Image
        src="/Images/spiral.png"
        alt="Brush Decoration"
        width={300}
        height={180}
        className="w-28 absolute top-1/2 left-0 md:left-0 opacity-80 pointer-events-none select-none"
      />
      <div className="max-w-4xl mx-auto mb-10 relative flex flex-col items-center">
        <Image
          src="/svg/Asset 21.svg"
          alt="Courses"
          width={290}
          height={56}
          className="absolute w-full md:w-max top-3 left-1/2 -translate-x-1/2 z-10"
        />
        <h2 className="text-3xl md:text-4xl font-extrabold font-Sendako tracking-wide uppercase text-white z-20 my-8">
          Courses
        </h2>
        {!loading && !error && courses.length > 0 && (
          <div className="text-white/80 text-sm mt-2">
            Showing {startIndex + 1}-{Math.min(endIndex, courses.length)} of{" "}
            {courses.length} courses
          </div>
        )}
      </div>
      <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          // Show loading skeletons
          Array.from({ length: 6 }).map((_, idx) => (
            <LoadingSkeleton key={idx} />
          ))
        ) : error ? (
          <ErrorMessage />
        ) : courses.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <div className="text-gray-600 text-lg font-semibold mb-4">
              No courses available
            </div>
            <div className="text-gray-500 text-center">
              Check back later for new courses!
            </div>
          </div>
        ) : (
          <>
            {currentCourses.map((course) => (
              <AnimatedCourseCard key={course.id} course={course} />
            ))}
          </>
        )}
      </div>

      {/* Pagination */}
      <Pagination />
    </section>
  );
}
