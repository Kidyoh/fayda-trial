"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CourseList2 from "../components/course_list";

export default function CoursesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-sendako font-bold text-[#07705d] mb-2">
            My Courses
          </h2>
          <p className="text-gray-600">
            Track your learning progress and continue your educational journey
          </p>
        </div>
        <CourseList2 />
      </div>
    </DashboardLayout>
  );
}
