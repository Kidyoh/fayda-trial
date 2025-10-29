"use client";

import Image from "next/image";
import type { Course } from "@/lib/api/types";
import { getFormattedPrice } from "@/lib/api/course.api";
import Link from "next/link";

const courseImages: { [key: string]: string } = {
  math: "/course/Math.png",
  mathematics: "/course/Math.png",
  physics: "/course/Physics.png",
  chemistry: "/course/Chemistry.png",
  biology: "/course/Biology.png",
  history: "/course/History.png",
  economics: "/course/Economics.png",
};

const pickCourseImage = (name?: string) => {
  const key = (name || "").toLowerCase();
  for (const k of Object.keys(courseImages)) {
    if (key.includes(k)) return courseImages[k];
  }
  return "/common_files/main/cover.jpg";
};

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  const priceInfo = getFormattedPrice(course);
  const thumbnail = pickCourseImage(course.courseName);

  const desc = course.courseDescription
    ? course.courseDescription.length > 120
      ? course.courseDescription.slice(0, 120) + "..."
      : course.courseDescription
    : "";

  return (
    <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-full rounded-xl group">
      <Link href={`/courses/${course.id}`} className="block">
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
                  Until{" "}
                  {new Date(priceInfo.discountExpiry).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>

          <div className="text-gray-700 text-base mb-4">{desc}</div>

          <div className="flex gap-3">
            <Link
              href={`/courses/${course.id}`}
              className="w-full h-12 inline-flex items-center justify-center text-sm font-semibold bg-gradient-to-r from-[#07705d] to-[#c7cc3f] hover:from-[#07705d]/90 hover:to-[#c7cc3f]/90 text-white rounded-xl hover:scale-105 transition-transform"
            >
              View Details
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
}
