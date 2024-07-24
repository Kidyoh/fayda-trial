"use client";

import { apiUrl } from "@/apiConfig";
import MaterialSeen from "@/components/custom_components/seenToggle";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function LinkDetails({ link_id }: any) {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [videoLocation, setVideoLocation] = useState("");
  // const params = useParams();
  //console.log(params);
  const LinkId = link_id;

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
    <div className="px-4 my-5">
      <div>
        <h1>
          <span className="text-primaryColor font-semibold"> Title:</span>{" "}
          {data?.link?.title}
        </h1>
      </div>
      <div className="py-5">
        {data?.link?.location ? (
          <div className="space-y-5">
            <div>
              <iframe
                className=" w-full h-[315px]  xxmd:w-[560px] xxmd:h-[315px] bg-yell"
                // width="560"
                // height="315"
                src={`https://www.youtube.com/embed/${getVideoId(
                  data?.link?.location
                )}`}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div>
              <a
                href={data?.link?.location}
                target="_blank"
                className="text-white bg-primaryColor px-2 py-1 rounded"
              >
                Go to Source
              </a>
            </div>
          </div>
        ) : (
          <div>Loading File ...</div>
        )}
      </div>
      {data?.StudentMaterial[0]?.Done != true && (
        <div>
          <MaterialSeen MaterialId={LinkId} />
        </div>
      )}
      <div>
        <h1>
          <span className="font-semibold text-primaryColor"> Description:</span>{" "}
          {data?.link?.fileDescription}
        </h1>
      </div>
    </div>
  );
}
