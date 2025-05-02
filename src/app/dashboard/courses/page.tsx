"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CourseList2 from "../components/course_list";

export default function CoursesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <CourseList2 />
        </div>
      </div>
    </DashboardLayout>
  );
} 