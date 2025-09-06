"use client";
import React, { useEffect, useState } from "react";
import { apiUrl } from "@/apiConfig";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { BookOpen, Clock, CheckCircle, Play, Award } from "lucide-react";
import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../../../lib/tokenManager";

export default function CourseList2() {
  const [coursesList, setCoursesList] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState("active");
  const accessToken = getAccessToken();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/purchaselist/specificStudentCourses`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const jsonData = await response.json();
        setCoursesList(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  const getProgress = (course: any) => {
    if (!course?.Courses?.materials?.length) return 0;
    const completedMaterials = course?.Courses?.materials?.filter(
      (material: any) =>
        material?.StudentMaterial.find(
          (item: any) => item.StudentId === course?.studentsId
        )?.Done == true
    ).length;
    return (completedMaterials * 100) / course?.Courses?.materials?.length;
  };

  const activeCourses = coursesList?.filter((course) => getProgress(course) < 100);
  const completedCourses = coursesList?.filter((course) => getProgress(course) === 100);

  const filters = [
    { id: "active", label: "In Progress", count: activeCourses?.length || 0 },
    { id: "completed", label: "Completed", count: completedCourses?.length || 0 },
  ];

  const currentCourses = activeFilter === "active" ? activeCourses : completedCourses;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-[#07705d] border-r-[#bf8c13]"></div>
          <div className="absolute inset-2 animate-spin rounded-full h-12 w-12 border-4 border-transparent border-b-[#c7cc3f] border-l-[#07705d]" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 mb-8">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeFilter === filter.id
                ? "bg-[#07705d] text-white"
                : "bg-white text-gray-600 hover:bg-[#07705d]/10 border-2 border-[#07705d]/20"
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      {currentCourses?.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-[#07705d]/10 to-[#bf8c13]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-12 h-12 text-[#07705d]" />
          </div>
          <h3 className="text-xl font-sendako font-bold text-[#07705d] mb-2">
            {activeFilter === "active" ? "No Active Courses" : "No Completed Courses"}
          </h3>
          <p className="text-gray-600 mb-6">
            {activeFilter === "active" 
              ? "Start learning by enrolling in courses" 
              : "Complete some courses to see them here"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {currentCourses?.map((course) => {
            const progress = getProgress(course);
            const isCompleted = progress === 100;
            
            return (
              <Link
                key={course?.id}
                href={`/packages_access_2/${course?.Courses?.id}`}
                className="block"
              >
                <div className="bg-white rounded-lg border-2 border-[#07705d]/20 overflow-hidden hover:border-[#bf8c13] transition-colors">
                  <div className="relative">
                    <div className="absolute inset-0 opacity-5">
                      <svg width="100%" height="100%">
                        <defs>
                          <pattern id="course-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <polygon points="20,2 38,20 20,38 2,20" fill="#07705d" opacity="0.3"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#course-pattern)"/>
                      </svg>
                    </div>
                    
                    <div className="relative z-10 p-6">
                      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                        <div className="flex-shrink-0">
                          {course?.packageImgUrl ? (
                            <img
                              src={course?.packageImgUrl}
                              alt={course?.Courses?.courseName}
                              className="w-24 h-24 object-cover rounded-lg border-2 border-[#07705d]/20"
                            />
                          ) : (
                            <div className="w-24 h-24 bg-gradient-to-br from-[#07705d]/10 to-[#bf8c13]/10 rounded-lg flex items-center justify-center border-2 border-[#07705d]/20">
                              <BookOpen className="w-12 h-12 text-[#07705d]" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <p className="text-sm text-gray-600">
                              Package | {course?.Packages?.packageName}
                            </p>
                            {isCompleted ? (
                              <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs md:text-sm">
                                <CheckCircle className="w-4 h-4" />
                                <span>Completed</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2 bg-[#bf8c13]/10 text-[#bf8c13] px-3 py-1 rounded-full text-xs md:text-sm">
                                <Clock className="w-4 h-4" />
                                <span>In Progress</span>
                              </div>
                            )}
                          </div>

                          <h3 className="text-xl font-sendako font-bold text-[#07705d] mb-4">
                            {course?.Courses?.courseName}
                          </h3>

                          {!isCompleted ? (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Progress</span>
                                <span className="text-sm font-medium text-[#07705d]">
                                  {isNaN(progress) ? "0%" : `${progress.toFixed(1)}%`}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                  className="bg-gradient-to-r from-[#07705d] to-[#bf8c13] h-3 rounded-full transition-all"
                                  style={{ width: `${isNaN(progress) ? 0 : progress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500">Overall progress</p>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <Award className="w-5 h-5 text-[#c7cc3f]" />
                                <span className="text-lg font-bold text-[#07705d]">Course Completed!</span>
                              </div>
                              <span className="text-sm text-gray-600">{progress.toFixed(0)}%</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-[#07705d]/10 rounded-full flex items-center justify-center hover:bg-[#07705d]/20 transition-colors">
                            <Play className="w-6 h-6 text-[#07705d]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
