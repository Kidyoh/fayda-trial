"use client";
import React, { useEffect, useState } from "react";
import { apiUrl } from "@/apiConfig";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { setAccessToken, getAccessToken, clearAccessToken } from "../../../../lib/tokenManager";

export default function CourseList2() {
  const [coursesList, setCoursesList] = useState<any[]>([]);
  const accessToken = getAccessToken();

  const [isLoading, setIsLoading] = useState(true);

  console.log("Access Token: "+accessToken)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/purchaselist/specificStudentCourses`,{
          method: "GET",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
}

},
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
          <TabsTrigger value="completed">Completed Courses</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          {coursesList?.map((course) => (
            <Link
              key={course?.Courses?.id} // Add key prop for each item
              href={`/packages_access_2/${course?.Courses?.id}`}
              //href="/"
            >
              {/* <h1>
                {(course?.Courses?.materials?.filter(
                  (material: any) => material.StudentMaterial[0]?.Done == true
                ).length *
                  100) /
                  course?.Courses?.materials?.length}
                %
              </h1> */}
              {/* <h1>Materials: {course?.Courses?.materials?.length}</h1> */}
              {/* <h1>
                Materials:{" "}
                {course?.Courses?.materials[0]?.StudentMaterial[0]?.MaterialId}
              </h1> */}

              {/* <h1>
                Materials:{" "}
                {
                  course?.Courses?.materials?.filter(
                    (material: any) => material.StudentMaterial[0]?.Done == true
                  ).length
                }
              </h1> */}
              {(course?.Courses?.materials?.filter(
                (material: any) => material.StudentMaterial[0]?.Done == true
              ).length *
                100) /
                course?.Courses?.materials?.length !=
                100 && (
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
                          value={
                            (course?.Courses?.materials?.filter(
                              (material: any) =>
                                material?.StudentMaterial.find(
                                  (item: any) =>
                                    item.StudentId === course?.studentsId
                                )?.Done == true
                            ).length *
                              100) /
                            course?.Courses?.materials?.length
                          }
                         
                          className="text-primaryColor my-auto"
                        />

                        <h1 className="flex my-auto">
                          {isNaN(
                            (course?.Courses?.materials?.filter(
                              (material: any) =>
                                material?.StudentMaterial.find(
                                  (item: any) =>
                                    item.StudentId === course?.studentsId
                                )?.Done == true
                            ).length *
                              100) /
                              course?.Courses?.materials?.length
                          )
                            ? "0%"
                            : `${
                             (   (course?.Courses?.materials?.filter(
                                  (material: any) =>
                                    material?.StudentMaterial.find(
                                      (item: any) =>
                                        item.StudentId === course?.studentsId
                                    )?.Done == true
                                ).length *
                                  100) /
                                course?.Courses?.materials?.length).toFixed(1)
                              }%`}
                        </h1>
                      </div>
                      <h1 className="text-xs px-4 py-2">Over all progress</h1>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          ))}
        </TabsContent>
        <TabsContent value="completed">
          {coursesList?.map((course) => (
            <Link
              key={course?.Courses?.id} // Add key prop for each item
              href={`/packages_access_2/${course?.Courses?.id}`}
              //href="/"
            >
              {(course?.Courses?.materials?.filter(
                (material: any) =>
                  material?.StudentMaterial.find(
                    (item: any) => item.StudentId === course?.studentsId
                  )?.Done == true
              ).length *
                100) /
                course?.Courses?.materials?.length ==
                100 && (
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
                        <h1 className="text-primaryColor text-2xl font-semibold">
                          Completed
                        </h1>
                        <h1 className="flex my-auto">
                          {(course?.Courses?.materials?.filter(
                            (material: any) =>
                              material?.StudentMaterial.find(
                                (item: any) =>
                                  item.StudentId === course?.studentsId
                              )?.Done == true
                          ).length *
                            100) /
                            course?.Courses?.materials?.length}
                          %
                        </h1>
                      </div>
                      <h1 className="text-xs px-4 py-2">Over all progress</h1>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
