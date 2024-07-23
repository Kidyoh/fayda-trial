"use client";
import React, { useEffect, useState } from "react";
import { apiUrl } from "@/apiConfig";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CourseList2() {
  const [coursesList, setCoursesList] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/purchaselist/specificStudentCourses`,
          {
            credentials: "include",
          }
        );

        const jsonData = await response.json();
        setCoursesList(jsonData);
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

  return (
    <div>
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">In Progress</TabsTrigger>
          <TabsTrigger value="password">Completed Courses</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          {coursesList?.map((course) => (
            <Link
              key={course?.Courses?.id} // Add key prop for each item
              href={`/packages_access_2/${course?.Courses?.id}`}
              //href="/"
            >
              <div className=" w-5/6 border-2 border-primaryColor/30 p-5 m-4 rounded-2xl hover:bg-primaryColor/20">
                <div className="grid grid-cols-5 gap-3">
                  <div className="col-span-1">
                    <img src={course?.packageImgUrl} className="rounded-lg" />
                  </div>
                  <div className="py-3 col-span-4 ">
                    <h1 className="text-sm pb-4">
                      Package | {course?.Packages?.packageName}
                    </h1>
                    <h1 className="text-xl text-primaryColor font-semibold py-1">
                      {course?.Courses?.courseName}
                    </h1>
                    <div className="flex space-x-3">
                      <Progress
                        value={33}
                        className="text-primaryColor my-auto"
                      />
                      <h1 className="flex my-auto">33%</h1>
                    </div>
                    <h1 className="text-xs px-4 py-2">Over all progress</h1>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
