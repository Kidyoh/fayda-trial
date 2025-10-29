"use client";

import { apiUrl } from "@/apiConfig";
import MaterialSeen from "@/components/custom_components/seenToggle";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function LinkDetails({ link_id, student_id }: any) {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [videoLocation, setVideoLocation] = useState("");
  // const params = useParams();
  //console.log(params);
  const LinkId = link_id;
  const studentId = student_id;

  useEffect(() => {
    const fetchData = () => {
      fetch(`${apiUrl}/materials/${LinkId}`, {
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

  function getVideoId(url: any) {
    const urlParams = new URL(url).searchParams;
    return urlParams.get("v");
  }

  console.log("data:" + data);
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">
          {data?.link?.title}
        </h1>
        <p className="text-gray-500 text-sm">{data?.link?.fileDescription}</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {data?.link?.location ? (
          <div className="space-y-4">
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${getVideoId(
                  data?.link?.location,
                )}`}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Want to view on YouTube?
                </p>
                <a
                  href={data?.link?.location}
                  target="_blank"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primaryColor hover:bg-primaryColor/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor transition-colors"
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Open in YouTube
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[315px]">
            <div className="animate-pulse text-gray-400">Loading video...</div>
          </div>
        )}
      </div>

      {data?.StudentMaterial.find((item: any) => item.StudentId === studentId)
        ?.Done !== true && (
        <div className="flex justify-end">
          <MaterialSeen MaterialId={LinkId} />
        </div>
      )}
    </div>
  );
}
