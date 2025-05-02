"use client";
import { apiUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import CheckPhoneNumber from "./mock_package_components/checkphonenumber";
import CheckPayment from "./mock_package_components/checkpayment";
import useSelectedMockPackageStore from "../store/selectedmockpackageStore";
import { BookOpen, Tag, Clock } from "lucide-react";

export default function MockPackage() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const setSelectedMockPackage = useSelectedMockPackageStore(
    (state) => state.setMockPackage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/mockexampackage/tostudent`, {
          credentials: "include",
        });

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

  const SetStorePackage = (data: any) => {
    console.log(" Result: " + JSON.stringify(data));
    setSelectedMockPackage(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Mock Exam Packages
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Prepare for your exams with our comprehensive mock exam packages.
          </p>
        </div>

        <div className="space-y-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
                <div className="h-64 bg-gray-200 rounded mb-4"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : (
            data.map((packagex: any, index: number) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="w-full md:w-1/4 p-4">
                    <img
                      src={packagex?.imgUrl}
                      alt={packagex?.title || "Mock Exam Package"}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      {packagex?.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {packagex?.description}
                    </p>

                    {/* Package Stats */}
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primaryColor" />
                        <span className="text-sm text-gray-600">
                          {packagex?.Exams.length} Exams
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primaryColor" />
                        <span className="text-sm font-medium">
                          Price: {packagex?.price == "0" ? (
                            <span className="text-green-600">Free</span>
                          ) : packagex?.discountStatus ? (
                            <span>
                              <span className="line-through text-gray-400">{packagex?.price}</span>{" "}
                              <span className="text-orange-600">{packagex?.temporaryPrice}</span>
                            </span>
                          ) : (
                            <span className="text-primaryColor">{packagex?.price}</span>
                          )}
                          <span>{" Birr"}</span>
                        </span>
                      </div>
                    </div>

                    {/* Exam List */}
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-900 mb-2">Included Exams:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {packagex?.Exams.map((exam: any, idx: number) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primaryColor/10 flex items-center justify-center mt-0.5">
                              <span className="text-primaryColor text-xs font-medium">{idx + 1}</span>
                            </div>
                            <div>
                              <span className="font-medium">{exam.assesmentTitle}</span>
                              {exam.assesmentDescription && (
                                <span className="text-gray-500"> - {exam.assesmentDescription}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div>
                      {packagex.price != 0 ? (
                        <button
                          onClick={() => SetStorePackage(packagex)}
                          className="inline-flex items-center justify-center bg-primaryColor text-white rounded-lg px-4 py-2 font-medium hover:bg-primaryColor/90 transition-colors"
                        >
                          Purchase Package
                          <CheckPayment mock_package_id={packagex.id} />
                        </button>
                      ) : (
                        <button
                          onClick={() => SetStorePackage(packagex)}
                          className="inline-flex items-center justify-center bg-primaryColor text-white rounded-lg px-4 py-2 font-medium hover:bg-primaryColor/90 transition-colors"
                        >
                          Start Free Practice
                          <CheckPhoneNumber
                            mockPackageId={packagex.id}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {!isLoading && data.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                <BookOpen className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Mock Packages Available</h3>
              <p className="text-gray-500">Check back later for new mock exam packages.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
