"use client";
import { apiUrl } from "@/apiConfig";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function CoursesList() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/purchaselist/specificStudentCourses`,
          {
            credentials: "include",
          },
        );

        const jsonData = await response.json();
        setData(jsonData);
        console.log("first");
        console.log("Data: ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="my-3">
      {/* Flex container for horizontal layout and header */}
      <div className="w-full flex justify-center items-center py-4">
        <h1 className="text-2xl font-semibold text-primaryColor">
          Explore Exciting Courses
        </h1>
      </div>

      {/* Grid container for courses with card layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto px-4">
        {data?.map((course) => (
          <Link
            key={course?.Courses?.id} // Add key prop for each item
            href={`/packages_access_2/${course?.Courses?.id}`}
            //href="/"
            className="course-card flex flex-col bg-primaryColor border-2 border-white rounded-2xl shadow-xl shadow-primaryColor text-white my-4 p-4 hover:shadow-2xl"
          >
            <div className="course-info flex-1">
              <h2 className="text-lg font-semibold mb-2">
                {course?.Courses?.courseName}
              </h2>
              <p className="text-sm">{course?.Courses?.courseDescription}</p>
            </div>
            <div className="course-footer flex justify-between items-center text-sm">
              <p className="font-semibold">{course?.Packages?.packageName}</p>
              <svg
                className="w-6 h-6 ml-2 text-primaryColor fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.293 3.293a1 1 0 01 1.414 0l6 6a1 1 0 01 0 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293z" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

{
  /*
 <div className="my-3">
      <div className="w-full flex">
        <h1 className="mx-auto text-xl font-semibold text-primaryColor">
          Courses
        </h1>
      </div>

      <div className="w-full">
        <div className=" mx-8   ">
          {data.map((course) => (
            <Link href={`/packages_access/${course.Courses.id}`}>
              <div className="bg-primaryColor border-2 border-white rounded-2xl shadow-xl shadow-primaryColor text-white my-8 py-4 px-5">
                <div className=" flex justify-between">
                  <div className="text-lg">
                    <h1>{course.Courses.courseName}</h1>
                    <h1 className="text-sm">
                      {course.Courses.courseDescription}
                    </h1>
                  </div>
                  <h1>{course.Packages.packageName}</h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
*/
}
