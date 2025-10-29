"use client";

import React from "react";
import Image from "next/image";
import { Course } from "@/lib/api/types";
import { getFormattedPrice } from "@/lib/api/course.api";
import { CoursePurchaseDialog } from "../custom_components/coursePurchaseDialog";
import { CourseAddToCartButton } from "../cart/AddToCartButton";

// Helper function to get course thumbnail - use courseImages directly
const getCourseThumbnail = (course: Course): string => {
  // Map course names to appropriate images
  const courseImages: { [key: string]: string } = {
    Math: "/course/Math.png",
    Mathematics: "/course/Math.png",
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

  // Default fallback - always use a valid image
  return "/course/Math.png";
};

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const thumbnail = getCourseThumbnail(course);
  const priceInfo = getFormattedPrice(course);

  // Truncate description to fit card
  const truncatedDescription = course.courseDescription
    ? course.courseDescription.length > 100
      ? course.courseDescription.substring(0, 100) + "..."
      : course.courseDescription
    : "";

  // Handle card click to navigate to course details
  const handleCardClick = () => {
    window.location.href = `/course/${course.id}`;
  };

  return (
    <div
      className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-full rounded-xl cursor-pointer hover:scale-105 hover:rotate-1 group"
      style={{ minHeight: 420, maxWidth: 420 }}
      onClick={handleCardClick}
    >
      <div className="w-full h-64 relative overflow-hidden">
        <Image
          src={thumbnail}
          alt={course.courseName}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
      </div>

      <div className="px-6 py-6">
        <div className="font-semibold text-2xl mb-3 font-Sendako group-hover:text-primaryColor transition-colors duration-300">
          {course.courseName}
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-primaryColor/10 flex items-center justify-center group-hover:bg-primaryColor/20 transition-colors duration-300">
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
                  {priceInfo.originalPrice}
                </span>
                <span className="font-semibold text-2xl text-[#07705d] font-Sendako">
                  {priceInfo.currentPrice}
                </span>
              </div>
            ) : (
              <span className="font-semibold text-2xl text-gray-900 font-Sendako">
                {priceInfo.currentPrice}
              </span>
            )}
            {priceInfo.isDiscounted && priceInfo.discountExpiry && (
              <span className="text-xs text-red-500 font-medium">
                Until {new Date(priceInfo.discountExpiry).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <div className="text-gray-700 text-base mb-4">
          {truncatedDescription}
        </div>

        <div className="flex flex-col gap-3">
          <CourseAddToCartButton
            courseData={{
              id: course.id,
              courseName: course.courseName,
              price: course.price,
              temporaryPrice: course.temporaryPrice,
              discountStatus: priceInfo.isDiscounted,
              discountExpiryDate: priceInfo.discountExpiry,
              courseDescription: course.courseDescription,
              thumbnail: course.thumbnail,
            }}
            size="default"
            className="w-full h-12 hover:scale-105 transition-transform duration-200 text-sm font-semibold bg-gradient-to-r from-[#07705d] to-[#c7cc3f] hover:from-[#07705d]/90 hover:to-[#c7cc3f]/90 text-white"
          />
          <CoursePurchaseDialog
            courseId={course.id}
            courseName={course.courseName}
            price={course.price.toString()}
            temporaryPrice={
              course.temporaryPrice
                ? course.temporaryPrice.toString()
                : undefined
            }
            discountStatus={course.discountStatus}
            discountExpiryDate={course.discountExpiryDate || undefined}
          />
        </div>
      </div>
    </div>
  );
}
