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
    <div className="px-4 my-5">
      <div>
        <h1>
          <span className="text-primaryColor font-semibold"> Title:</span>{" "}
          {data?.file?.title}
        </h1>
      </div>
      <div className="py-5">
        {data?.fileUrl ? (
          <div>
            <a
              href={data?.fileUrl}
              target="_blank"
              className="text-white bg-primaryColor px-2 py-1 rounded"
            >
              Read File
            </a>
          </div>
        ) : (
          <div>Loading File ...</div>
        )}
      </div>

      {data?.StudentMaterial.find((item: any) => item.StudentId === studentId)
        ?.Done !== true && (
        <div>
          <MaterialSeen MaterialId={FileId} />
        </div>
      )}

      {/* {data?.StudentMaterial[0]?.Done != true && (
        <div>
          <MaterialSeen MaterialId={FileId} />
        </div>
      )} */}
      <div>
        <h1>
          <span className="font-semibold text-primaryColor"> Description:</span>{" "}
          {data?.file?.fileDescription}
        </h1>
      </div>
    </div>
  );
}
