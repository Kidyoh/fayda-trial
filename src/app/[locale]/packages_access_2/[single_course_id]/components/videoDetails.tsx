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
    <div className="px-4">
      <div>
        <h1>
          <span className="text-primaryColor font-semibold"> Title:</span>{" "}
          {data?.video?.vidTitle}
        </h1>
      </div>
      <div className="py-5">
        {data?.videoUrl ? (
          <div>
            <video
              controls
              disablePictureInPicture
              controlsList="nodownload"
              contextMenu="return false"
            >
              <source
                // src={`${apiUrl}/upload_assets/videos/course_videos/${VideoLocation}`}
                src={data?.videoUrl}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div>Loading video ...</div>
        )}
      </div>

      {data?.StudentMaterial.find((item: any) => item.StudentId === studentId)
        ?.Done !== true && (
        <div>
          <MaterialSeen MaterialId={videoId} />
        </div>
      )}

      {/* {data?.StudentMaterial[0]?.Done != true && (
        <div>
          <MaterialSeen MaterialId={videoId} />
        </div>
      )} */}
      <div>
        <h1>
          <span className="font-semibold text-primaryColor"> Description:</span>{" "}
          {data?.video?.vidDescription}
        </h1>
      </div>
    </div>
  );
}
