"use client";
import React from "react";
import { CourseGrid } from "@/components/molecules/CourseGrid";
import { useAuth } from "@/hooks/useAuth";
import { useUIStore } from "@/store/uiStore";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CoursesList() {
  const { isAuthenticated } = useAuth();
  const { addNotification } = useUIStore();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            Please log in to view your courses.
          </p>
          <Button asChild>
            <a href="/login">Sign In</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
              <p className="mt-2 text-gray-600">
                Continue your learning journey with these courses
              </p>
            </div>

            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search courses..."
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7cc3f]">
                <option value="">All Grades</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7cc3f]">
                <option value="">All Subjects</option>
                <option value="math">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="biology">Biology</option>
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="mb-8">
          <CourseGrid showHomepageOnly={false} />
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            Want to explore more courses?
          </h2>
          <p className="mb-6 opacity-90">
            Discover new subjects and expand your knowledge
          </p>
          <Button variant="secondary" size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Browse All Courses
          </Button>
        </div>
      </div>
    </div>
  );
}
