"use client";

import { apiUrl } from "@/apiConfig";
import MaterialSeen from "@/components/custom_components/seenToggle";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function FileDetails({ file_id, student_id }: any) {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [videoLocation, setVideoLocation] = useState("");
  // const params = useParams();
  //console.log(params);
  const FileId = file_id;
  const studentId = student_id;

  useEffect(() => {
    const fetchData = () => {
      fetch(`${apiUrl}/materials/${FileId}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((jsonData) => {
          setData(jsonData);
          setVideoLocation(jsonData[0].location);
          //  console.log(jsonData[0].Courses.materials);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    };

    fetchData();
  }, []);

  console.log("data:" + data);
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">
          {data?.file?.title}
        </h1>
        <p className="text-gray-500 text-sm">{data?.file?.fileDescription}</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>

          {data?.fileUrl ? (
            <a
              href={data?.fileUrl}
              target="_blank"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primaryColor hover:bg-primaryColor/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download File
            </a>
          ) : (
            <div className="animate-pulse text-gray-400">Loading file...</div>
          )}
        </div>
      </div>

      {data?.StudentMaterial.find((item: any) => item.StudentId === studentId)
        ?.Done !== true && (
        <div className="flex justify-end">
          <MaterialSeen MaterialId={FileId} />
        </div>
      )}
    </div>
  );
}
