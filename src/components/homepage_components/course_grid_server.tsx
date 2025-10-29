import Image from "next/image";
import { fetchPublicHomepageCourses } from "@/lib/api/course.api";
import CourseGridClient from "./course_grid_client";

export default async function CourseGridServer() {
  let courses: any[] = [];
  try {
    courses = await fetchPublicHomepageCourses();
  } catch (e) {
    courses = [];
  }

  return (
    <section id="courses" className="min-h-screen py-10 px-4 relative">
      <Image
        src="/Images/Brush2.png"
        alt="Brush Decoration"
        width={300}
        height={180}
        className="w-28 absolute top-1/2 right-0 opacity-80 pointer-events-none select-none"
      />
      <Image
        src="/Images/spiral.png"
        alt="Brush Decoration"
        width={300}
        height={180}
        className="w-28 absolute top-1/2 left-0 opacity-80 pointer-events-none select-none"
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

      <CourseGridClient courses={courses} />
    </section>
  );
}
