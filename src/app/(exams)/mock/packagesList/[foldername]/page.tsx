"use client";
import { apiUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import CheckPhoneNumber from "../../mock_package_components/checkphonenumber";
import CheckPayment from "../../mock_package_components/checkpayment";
import useSelectedMockPackageStore from "@/app/store/selectedmockpackageStore";
import { motion } from "framer-motion";
import { Book, Clock, Users, Trophy, Tag, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

export default function MockPackage({ params }: any) {
  const FolderName = params.foldername;
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const setSelectedMockPackage = useSelectedMockPackageStore(
    (state) => state.setMockPackage,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/mockexampackage/tostudentselectmain/${FolderName}`,
          {
            credentials: "include",
          },
        );

        const jsonData = await response.json();
        setData(jsonData);
        console.log("Data: ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const SetStorePackage = (data: any) => {
    console.log(" Result: " + JSON.stringify(data));
    setSelectedMockPackage(data);
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
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[400px] rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No Mock Packages Available
          </h3>
          <p className="text-gray-500">
            Check back later for new mock exam packages.
          </p>
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
            <Trophy className="h-8 w-8 text-primaryColor" />
            Mock Exam Packages
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Choose from our selection of mock exam packages designed to help you
            prepare effectively. Each package contains carefully curated
            questions to test your knowledge.
          </p>
        </div>

        {/* Packages Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {data.map((packagex: any, index: number) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Package Image */}
              <div className="relative aspect-[16/9] bg-gray-100">
                <img
                  src={packagex?.imgUrl}
                  alt={packagex.title}
                  className="w-full h-full object-cover"
                />
                {packagex.price === "0" && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Free
                  </div>
                )}
              </div>

              {/* Package Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {packagex.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {packagex?.description}
                  </p>
                </div>

                {/* Package Stats */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {packagex?.Exams.length} Exams
                    </span>
                  </div>
                  {packagex.price !== "0" && (
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-primaryColor">
                        {packagex.price}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div>
                  {packagex.price !== "0" ? (
                    <button
                      onClick={() => SetStorePackage(packagex)}
                      className="w-full bg-primaryColor text-white rounded-lg py-2.5 px-4 font-medium hover:bg-primaryColor/90 transition-colors flex items-center justify-center gap-2"
                    >
                      Purchase Package
                      <ArrowRight className="h-4 w-4" />
                      <CheckPayment mock_package_id={packagex.id} />
                    </button>
                  ) : (
                    <button
                      onClick={() => SetStorePackage(packagex)}
                      className="w-full bg-primaryColor text-white rounded-lg py-2.5 px-4 font-medium hover:bg-primaryColor/90 transition-colors flex items-center justify-center gap-2"
                    >
                      Start Practice
                      <ArrowRight className="h-4 w-4" />
                      <CheckPhoneNumber
                        mockPackageId={packagex.id}
                        pushto={`/mock_package/free_mock_package/${packagex.id}`}
                      />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
