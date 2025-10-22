"use client";
import { apiUrl } from "@/apiConfig";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function AssessmentDetails({ params }: any) {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  //const [videoLocation, setVideoLocation] = useState("");
  // const params = useParams();
  //console.log(params);
  const AssessmentId = params.assessment_id;

  useEffect(() => {
    const fetchData = () => {
      fetch(
        `${apiUrl}/purchaselist/specificStudentSingleAssessment/${AssessmentId}`,
        {
          credentials: "include",
        },
      )
        .then((response) => response.json())
        .then((jsonData) => {
          setData(jsonData);
          console.log(jsonData);
          //  setVideoLocation(jsonData[0].location);
          //  console.log(jsonData[0].Courses.materials);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    };
    fetchData();
  }, []);
  //{data[0]?.id}
  return (
    <div className="mx-3 ">
      <div>
        <h1 className="pb-3">Assessment Details</h1>
        <h1>{data[0]?.assesmentTitle}</h1>
        <h1>{data[0]?.assesmentDescription}</h1>
        <h1>
          You will have {data[0]?.duration} minutes to complete the assessment.
        </h1>

        <h1>
          You can collect upto{" "}
          <span className="text-blue-700 ">
            {data[0]?.assesmentPoints} Points
          </span>{" "}
          in this assessment!
        </h1>
        <h1>
          Note: Once you start taking the assessment you can not return with out
          submitting! If you do your result may be taken as invalid permanently.
        </h1>
      </div>
      <Link href={`/assessment_questions/${AssessmentId}`}>
        <div className="my-4 w-fit">
          <h1 className="px-3 py-1 bg-secondaryColor text-white rounded-md">
            Start
          </h1>
        </div>
      </Link>
    </div>
  );
}
