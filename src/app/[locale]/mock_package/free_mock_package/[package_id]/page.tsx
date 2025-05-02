"use client";
import React, { useEffect, useState } from "react";
import useSelectedMockPackageStore from "@/app/[locale]/store/selectedmockpackageStore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, FileText, ArrowRight, Book, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function FreeMockPackageDetails() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const MockPackage = useSelectedMockPackageStore((state) => state.mockpackage);

  useEffect(() => {
    if (MockPackage.id == undefined) {
      push("/mock_package/selectmainfolder");
    }
    setIsLoading(false);
  }, [MockPackage.id, push]);

  const passToExamPage = (examId: string) => {
    push(`/mock_package/free_exam/${examId}`);
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-[300px]" />
            <Skeleton className="h-6 w-[450px]" />
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[160px] rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!MockPackage?.Exams?.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Exams Available</h3>
          <p className="text-gray-500">This package currently has no exams.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Book className="h-8 w-8 text-primaryColor" />
            {MockPackage.title || "Mock Package Details"}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {MockPackage.description || "Select an exam from the list below to begin your practice session."}
          </p>
        </div>

        {/* Exams List */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-4"
        >
          {MockPackage?.Exams?.map((exam: any, index: number) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onClick={() => passToExamPage(exam?.id)}
              className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-4">
                    {/* Exam Title */}
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primaryColor transition-colors">
                        {exam?.assesmentTitle}
                      </h3>
                      <p className="text-sm text-gray-600 max-w-2xl">
                        {exam?.assesmentDescription || "No description available"}
                      </p>
                    </div>

                    {/* Exam Stats */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Duration: {exam?.duration || "Not specified"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Questions: {exam?.Questions?.length || "0"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex items-center self-center">
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primaryColor transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
