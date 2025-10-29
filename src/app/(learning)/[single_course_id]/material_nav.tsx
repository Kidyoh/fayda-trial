"use client";
import { apiUrl, homeUrl, localUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import { Play, ScrollText } from "lucide-react";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function MaterialNav() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [partNumber, setPartNumber] = useState(1);
  const [activeMaterial, setActiveMaterial] = useState("");
  const [totalPartNumber, setTotalPartNumber] = useState("1");
  const [forumId, setForumId] = useState("");
  const [hasValidData, setHasValidData] = useState(false);

  const params = useParams();
  const courseId = params.single_course_id;

  useEffect(() => {
    const fetchData = () => {
      fetch(`${apiUrl}/purchaselist/specificStudentSingleCourse/${courseId}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((jsonData) => {
          if (jsonData && jsonData[0] && jsonData[0].Courses) {
            setData(jsonData);
            setTotalPartNumber(jsonData[0].Courses.parts);
            setHasValidData(true);
          } else {
            setHasValidData(false);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error:", error);
          setHasValidData(false);
          setIsLoading(false);
        });
    };

    if (courseId) {
      fetchData();
    }
  }, [courseId]);
  useEffect(() => {
    const getCourse = async () => {
      try {
        const res = await fetch(
          `${apiUrl}/forums/checkcourseforum/${courseId}`,
          {
            next: {
              revalidate: 0,
            },
            credentials: "include",
          },
        );
        const course = await res.json();
        setForumId(course[0]?.id);
      } catch (error) {
        console.log("Forum error:", error);
      }
    };

    if (courseId) {
      getCourse();
    }
  }, [courseId]);

  // Don't render if no courseId is available or if it's not a valid course ID format
  if (!courseId || typeof courseId !== "string") {
    return null;
  }

  // Don't render for non-course routes (like careers, contact, etc.)
  const invalidRoutes = [
    "careers",
    "contact",
    "about",
    "terms_of_service",
    "privacy-policy",
    "help",
    "f_a_q",
    "blogs",
    "teach",
    "courses",
    "competitions",
  ];
  if (invalidRoutes.includes(courseId.toLowerCase())) {
    return null;
  }

  // Only render for actual numeric course IDs or valid course identifiers
  if (!/^\d+$/.test(courseId) && !courseId.startsWith("course_")) {
    return null;
  }

  const changePage = () => {
    var tempNumber = partNumber;

    if (partNumber < parseInt(totalPartNumber)) {
      console.log("ok");
      setPartNumber(tempNumber + 1);
    } else {
      setPartNumber(1);
    }
  };

  const RepeatDiv = ({ loopAmount }: any) => {
    //const divs = [];
    const divs: JSX.Element[] = [];
    for (let i = 1; i <= loopAmount; i++) {
      const dynamicClassName = `${
        i == partNumber ? "bg-blue-600" : "bg-primaryColor"
      } text-white px-1 cursor-pointer rounded`;

      divs.push(
        <div key={i} className="">
          {" "}
          <h1 className={dynamicClassName} onClick={() => setPartNumber(i)}>
            {i}{" "}
          </h1>
        </div>,
      );
    }

    return <div className="flex flex-wrap gap-y-2 space-x-3 mx-2">{divs}</div>;
  };

  // Don't render if still loading or no valid data
  if (isLoading) {
    return (
      <div className="mt-12 lg:mt-0 flex items-center justify-center p-4">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Don't render if no valid course data
  if (!hasValidData || !data[0]?.Courses) {
    return null;
  }

  return (
    <div className="mt-12 lg:mt-0">
      <div className="flex gap-2">
        <div className=" bg-secondaryColor text-sm p-1 rounded w-fit text-white my-2 mx-2">
          <Link href="/packages_access/courses_list">Back to Courses</Link>
        </div>
        {forumId && (
          <div className=" bg-secondaryColor text-sm p-1 rounded w-fit text-white my-2 mx-2">
            <Link href={`/forum/${forumId}`}>Go to Forum</Link>
          </div>
        )}
      </div>
      <div className="my-4 flex">
        <h1>{data[0]?.Courses?.partName}</h1>
        <RepeatDiv loopAmount={totalPartNumber} />
      </div>

      <div className="col-span-1    space-y-4 px-1 py-3">
        {data[0]?.Courses?.materials.map((item: any, index: number) => (
          <div key={index}>
            {item.part == partNumber && (
              <div className=" p-1">
                <div>
                  <div key={item.id} onClick={() => setActiveMaterial(item.id)}>
                    {item.materialType == "video" && (
                      <Link
                        href={`${homeUrl}/packages_access/${courseId}/video_details/${item?.video?.id}`}
                      >
                        <div
                          className={`flex space-x-1 py-1 bg-gray-100 text-black${
                            activeMaterial == item.id
                              ? "text-primaryColor border-l-4 border-primaryColor pl-2"
                              : ""
                          } `}
                        >
                          <div className="my-auto">
                            <Play size={20} />
                          </div>
                          <div> {item?.video?.vidTitle}</div>
                        </div>
                      </Link>
                    )}
                  </div>
                  <div key={item.id} onClick={() => setActiveMaterial(item.id)}>
                    {item.materialType == "assesment" && (
                      <Link
                        href={`${homeUrl}/packages_access/${courseId}/assessment_details/${item?.assementId?.id}`}
                      >
                        <div
                          className={`flex space-x-1 py-1  bg-gray-100 text-black${
                            activeMaterial == item.id
                              ? " text-primaryColor border-l-4 border-primaryColor pl-2"
                              : ""
                          } `}
                        >
                          <div className="my-auto">
                            <Play size={20} />
                          </div>
                          <div> {item?.assementId?.assesmentTitle}</div>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          // Add the desired JSX content for each item here
        ))}
      </div>
      <div className="w-full ">
        <h1
          className="mx-auto px-3 py-1 bg-blue-600 rounded text-white my-3 text-center w-fit cursor-pointer "
          onClick={() => {
            changePage();
          }}
        >
          Next
        </h1>
      </div>
    </div>
  );
}

{
}
