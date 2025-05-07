"use client";

import { apiUrl } from "@/apiConfig";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VideoDetial({ params }: any) {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [videoLocation, setVideoLocation] = useState("");
  // const params = useParams();
  //console.log(params);
  const videoId = params.video_id;

  useEffect(() => {
    const fetchData = () => {
      fetch(`${apiUrl}/purchaselist/specificStudentSingleVideo/${videoId}`, {
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
          {data[0]?.vidTitle}
        </h1>
      </div>
      <div className="py-5">
        {videoLocation == "" ? (
          <div>
            <h1>Loading Video</h1>
            <h1>{`${apiUrl}/upload_assets/videos/course_videos/${data[0]?.location}`}</h1>
            <h1>Location: {videoId}</h1>
          </div>
        ) : (
          <div>
            <video controls>
              <source
                src={`${apiUrl}/upload_assets/videos/course_videos/${data[0]?.location}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>

      <div>
        <h1>
          <span className="font-semibold text-primaryColor"> Description:</span>{" "}
          {data[0]?.vidDescription}
        </h1>
      </div>
    </div>
  );
}
