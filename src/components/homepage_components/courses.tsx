import React from "react";
import Image from "next/image";
import { fetchPublicHomepageCourses } from "@/lib/api/course.api";
import CourseGridClient from "./CourseGridClient";

export default async function CourseGrid() {
  let courses;
  let error: string | null = null;

  try {
    courses = await fetchPublicHomepageCourses();
  } catch (err) {
    console.error("Error fetching courses:", err);
    error = err instanceof Error ? err.message : "Failed to load courses";
    courses = [];
  }

  return (
    <section id="courses" className="min-h-screen py-10 px-4 relative">
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
      </div>

      {error ? (
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
        <CourseGridClient courses={courses} />
      )}
    </section>
  );
}
