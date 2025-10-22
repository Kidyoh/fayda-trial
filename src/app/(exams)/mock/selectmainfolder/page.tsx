"use client";
import { apiUrl } from "@/apiConfig";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Book,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Clock,
  Users,
  Trophy,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MockPackage {
  id: string;
  folderName: string;
  description?: string;
  totalExams?: number;
  studentsEnrolled?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function SubFoldersList() {
  const [data, setData] = useState<MockPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/pacakgefolder/mockmain`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-[250px]" />
            <Skeleton className="h-6 w-[450px]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-[200px] rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-primary" />
            Mock Exam Packages
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Choose from our comprehensive selection of mock exam packages
            designed to help you prepare effectively. Each package contains
            carefully curated questions to test your knowledge.
          </p>
        </div>

        {/* Packages Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {data.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group relative"
            >
              <Link href={`/mock/packagesList/${item.folderName}`}>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                  {/* Package Header */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                            {item.folderName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.description ||
                              "Comprehensive mock exam package"}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>

                    {/* Package Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {item.totalExams || "Multiple"} Exams
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {item.studentsEnrolled || "100+"} Students
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Package Footer */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-primary font-medium">
                        <Trophy className="h-4 w-4" />
                        Start Practice
                      </div>
                      <div className="text-xs text-gray-500">
                        Updated Recently
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {data.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Packages Available
            </h3>
            <p className="text-gray-500">
              Check back later for new mock exam packages.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
