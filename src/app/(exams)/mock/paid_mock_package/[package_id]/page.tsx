"use client";
import React, { useEffect } from "react";
import useSelectedMockPackageStore from "@/app/store/selectedmockpackageStore";

import { useRouter } from "next/navigation";

export default function FreeMockPackageDetails() {
  const { push } = useRouter();

  const MockPackage = useSelectedMockPackageStore((state) => state.mockpackage);

  useEffect(() => {
    if (MockPackage.id == undefined) {
      push("/mock");
    }
    // This code runs after the component is mounted
    console.log("Component mounted");

    // This code runs when the component is unmounted
    return () => {
      console.log("Component unmounted");
    };
  }, []);

  const passToExamPage = (data: any) => {
    push(`/mock/free_exam/${data}`);
  };

  return (
    <div className="mx-4 space-y-4 py-8">
      {MockPackage?.Exams?.map((exam: any, index: number) => {
        return (
          <div
            key={index}
            className="bg-primaryColor text-white p-5 cursor-pointer hover:bg-opacity-80"
            onClick={() => {
              passToExamPage(exam?.id);
            }}
          >
            <div>
              <h1>Exam Title: {exam?.assesmentTitle}</h1>
            </div>

            <div>
              <h1>Time Duration: {exam?.duration}</h1>
            </div>

            <div>
              <h1>Description: {exam?.assesmentDescription}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
}
