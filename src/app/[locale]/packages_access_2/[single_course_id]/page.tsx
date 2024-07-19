"use client";
import { apiUrl, homeUrl, localUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import {
  Play,
  ScrollText,
  Text,
  Youtube,
  StickyNote,
  Divide,
  LockKeyhole,
  ArrowDownWideNarrow,
} from "lucide-react";
import { useParams } from "next/navigation";
import useMaterialManagerStore from "../../store/materialManagerStore";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import VideoDetails from "./components/videoDetails";
import AssessmentDetails from "./components/assessmentDetails";
import FileDetails from "./components/fileDetails";
import LinkDetails from "./components/linkDetails";

export default function SingleCourse() {
  const [data, setData] = useState<any[]>([]);
  const [totalPartNumber, setTotalPartNumber] = useState("1");
  const [materialDrawer, setMaterialDrawer] = useState(true);

  const activeMaterialId = useMaterialManagerStore(
    (state) => state.activeMaterialId
  );
  const setActiveMaterialId = useMaterialManagerStore(
    (state) => state.setActiveMaterialId
  );

  const activeMaterialtype = useMaterialManagerStore(
    (state) => state.activeMaterialtype
  );
  const setActiveMaterialtype = useMaterialManagerStore(
    (state) => state.setActiveMaterialtype
  );

  const params = useParams();
  console.log(params);
  const courseId = params.single_course_id;

  useEffect(() => {
    const fetchData = () => {
      fetch(`${apiUrl}/purchaselist/specificStudentSingleCourse/${courseId}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((jsonData) => {
          setData(jsonData);
          setTotalPartNumber(jsonData[0].Courses.parts);
          //  console.log(jsonData[0].Courses.materials);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    };

    fetchData();
  }, []);

  const MaterialClicked = (
    materialId: any,
    materialtype: any,
    materialAccess: any
  ) => {
    if (materialAccess == "unlocked") {
      setActiveMaterialId(materialId);
      setActiveMaterialtype("");
      const timer = setTimeout(() => {
        setActiveMaterialtype(materialtype);
      }, 3);
    }
  };
  const MaterialDrawerClicked = () => {
    setMaterialDrawer(!materialDrawer);
  };

  return (
    <div className=" md:py-5">
      <div className="relative md:grid grid-cols-4">
        {/* <div className="col-span-1">
          {data[0]?.Courses?.materials.map((material: any) => {
            return <div>{material.materialType}</div>;
          })}
        </div> */}
        <div
          onClick={() => MaterialDrawerClicked()}
          className="absolute top-3 right-2 z-30  block md:hidden"
        >
          <ArrowDownWideNarrow
            size={32}
            className="opacity-50 bg-primaryColor rounded-full cursor-pointer text-white"
          />
        </div>
        <div
          className={`
    absolute w-full bg-white z-20 top-4
    md:static col-span-2 xxmd:col-span-1
    mx-4 px-5
    ${!materialDrawer ? "hidden md:block" : ""}
  `}
        >
          {Array.from({ length: parseInt(totalPartNumber) }, (_, index) => (
            <div key={index}>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Unit {index + 1}</AccordionTrigger>
                  <AccordionContent>
                    {data[0]?.Courses?.materials.map((material: any) => {
                      return (
                        <div
                          onClick={() => {
                            MaterialClicked(
                              material.id,
                              material.materialType,
                              material.Access
                            );
                            MaterialDrawerClicked();
                          }}
                        >
                          {material.part == index + 1 && (
                            <div
                              className={`
                                px-4 py-2 rounded-md hover:bg-blue-300 cursor-pointer
                                ${
                                  material.id == activeMaterialId
                                    ? "bg-primaryColor text-white hover:bg-blue-600"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }
                              `}
                            >
                              {material.materialType == "video" && (
                                <div className="space-x-3 flex">
                                  {" "}
                                  <Play size={18} /> {material?.video?.vidTitle}{" "}
                                  {material?.Access == "locked" && (
                                    <LockKeyhole size={18} />
                                  )}
                                </div>
                              )}{" "}
                              {material.materialType == "assessment" && (
                                <div className="space-x-3 flex">
                                  {" "}
                                  <StickyNote size={18} />{" "}
                                  {material?.assementId?.assesmentTitle}
                                  {material?.Access == "locked" && (
                                    <LockKeyhole size={18} />
                                  )}
                                </div>
                              )}{" "}
                              {material.materialType == "file" && (
                                <div className="space-x-3 flex">
                                  {" "}
                                  <Text size={18} /> {material?.file?.title}
                                  {material?.Access == "locked" && (
                                    <LockKeyhole size={18} />
                                  )}
                                </div>
                              )}{" "}
                              {material.materialType == "link" && (
                                <div className="space-x-3 flex">
                                  <Youtube size={18} /> {material?.link?.title}
                                  {material?.Access == "locked" && (
                                    <LockKeyhole size={18} />
                                  )}
                                </div>
                              )}{" "}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
        <div className="col-span-2 py-5 xxmd:col-span-3">
          {activeMaterialtype == "" && <div>Loading ...</div>}
          {activeMaterialtype == "video" && (
            <div>
              <VideoDetails video_id={activeMaterialId} />
            </div>
          )}
          {activeMaterialtype == "assessment" && (
            <div>
              <AssessmentDetails assessment_id={activeMaterialId} />
            </div>
          )}
          {activeMaterialtype == "file" && (
            <div>
              <FileDetails file_id={activeMaterialId} />
            </div>
          )}
          {activeMaterialtype == "link" && (
            <div>
              <LinkDetails link_id={activeMaterialId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
