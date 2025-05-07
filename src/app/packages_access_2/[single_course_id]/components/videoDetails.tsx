"use client";

import { apiUrl } from "@/apiConfig";
import MaterialSeen from "@/components/custom_components/seenToggle";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VideoDetial({ video_id, student_id }: any) {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [videoLocation, setVideoLocation] = useState("");
  // const params = useParams();
  //console.log(params);
  const videoId = video_id;
  const studentId = student_id;

  useEffect(() => {
    const handleContextMenu = (event: any) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    const fetchData = () => {
      fetch(`${apiUrl}/materials/${videoId}`, {
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
          {data?.video?.vidTitle}
        </h1>
        <p className="text-gray-500 text-sm">
          {data?.video?.vidDescription}
        </p>
      </div>

      <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
        {data?.videoUrl ? (
          <video
            className="w-full h-full object-cover"
            controls
            disablePictureInPicture
            controlsList="nodownload"
            contextMenu="return false"
          >
            <source
              src={data?.videoUrl}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading video...</div>
          </div>
        )}
      </div>

      {data?.StudentMaterial.find((item: any) => item.StudentId === studentId)
        ?.Done !== true && (
        <div className="flex justify-end">
          <MaterialSeen MaterialId={videoId} />
        </div>
      )}
    </div>
  );
}
