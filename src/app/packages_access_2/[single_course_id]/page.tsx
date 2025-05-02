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
  CheckCheck,
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
import Link from "next/link";
import useFetchStore from "../../store/fetchStore";
import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../../../lib/tokenManager";

export default function SingleCourse() {
  const [data, setData] = useState<any>([]);
  const [totalPartNumber, setTotalPartNumber] = useState("1");
  const [materialDrawer, setMaterialDrawer] = useState(true);
  const [forumId, setForumId] = useState("");
  const accessToken = getAccessToken();

  const { searchQuery, setSearchQuery, seenMaterials, setSeenMaterials } =
    useFetchStore();

  const seenMaterialsFetch = useFetchStore((state) => state.seenMaterials);

  const setSeenMaterialsFetch = useFetchStore(
    (state) => state.setSeenMaterials
  );

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
  console.log("URL Params:", params);
  const courseId = params.single_course_id;
  console.log("Course ID:", courseId);

  useEffect(() => {
    const fetchData = () => {
      console.log("Fetching data with courseId:", courseId);
      console.log("Using API URL:", `${apiUrl}/purchaselist/specificStudentSingleCourse/${courseId}`);
      console.log("Access Token:", accessToken);

      fetch(`${apiUrl}/purchaselist/specificStudentSingleCourse/${courseId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          console.log("API Response Status:", response.status);
          return response.json();
        })
        .then((jsonData) => {
          console.log("Received Data:", jsonData);
          setData(jsonData);
          console.log("Total Parts:", jsonData[0]?.Courses?.parts);
          setTotalPartNumber(jsonData[0]?.Courses?.parts);
          
          if (jsonData[0]?.Courses?.materials?.[0]) {
            console.log("First Material:", {
              id: jsonData[0].Courses.materials[0].id,
              type: jsonData[0].Courses.materials[0].materialType,
              access: jsonData[0].Courses.materials[0].Access
            });
            MaterialClicked(
              jsonData[0].Courses.materials[0].id,
              jsonData[0].Courses.materials[0].materialType,
              jsonData[0].Courses.materials[0].Access
            );
          } else {
            console.log("No materials found in the response");
          }
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    };

    fetchData();
  }, [seenMaterialsFetch]);

  useEffect(() => {
    const getCourse = async () => {
      console.log("Fetching forum data for courseId:", courseId);
      try {
        const res = await fetch(`${apiUrl}/forums/checkcourseforum/${courseId}`, {
          next: {
            revalidate: 0,
          },
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("Forum API Response Status:", res.status);
        const course = await res.json();
        console.log("Forum Data:", course);
        setForumId(course[0]?.id);
      } catch (error) {
        console.error("Forum API Error:", error);
      }
    };

    getCourse();
  }, []);

  const MaterialClicked = (
    materialId: any,
    materialtype: any,
    materialAccess: any
  ) => {
    console.log("Material Clicked:", {
      materialId,
      materialtype,
      materialAccess,
      currentActiveId: activeMaterialId
    });

    if (materialAccess == "unlocked") {
      setActiveMaterialId(materialId);
      setActiveMaterialtype("");
      const timer = setTimeout(() => {
        console.log("Setting material type after delay:", materialtype);
        setActiveMaterialtype(materialtype);
      }, 3);
    } else {
      console.log("Material is locked, not updating state");
    }
  };
  const MaterialDrawerClicked = () => {
    setMaterialDrawer(!materialDrawer);
  };

  console.log("Render State:", {
    data: data,
    totalPartNumber,
    materialDrawer,
    forumId,
    activeMaterialId,
    activeMaterialtype
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="relative flex flex-col md:grid md:grid-cols-4 gap-6">
          {/* Material Drawer Toggle Button */}
          <div
            onClick={() => MaterialDrawerClicked()}
            className="fixed bottom-4 right-4 z-50 md:hidden bg-white shadow-lg rounded-full p-2 border border-gray-200"
          >
            <ArrowDownWideNarrow
              size={24}
              className="text-primaryColor"
            />
          </div>

          {/* Sidebar */}
          <div
            className={`
              fixed inset-0 bg-white z-40 overflow-y-auto transition-transform duration-300 ease-in-out
              md:static md:col-span-1 lg:col-span-1
              md:transform-none md:block md:rounded-xl md:shadow-sm md:border border-gray-200
              ${materialDrawer ? 'translate-x-0' : '-translate-x-full'}
              ${!materialDrawer ? 'hidden md:block' : ''}
            `}
          >
            <div className="p-4 md:p-6">
              {/* Forum Link */}
              {forumId && (
                <div className="mb-6">
                  <Link 
                    href={`/forum/${forumId}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primaryColor hover:bg-primaryColor/90 text-white rounded-lg transition-colors w-full justify-center font-medium"
                  >
                    <ScrollText size={18} />
                    Course Forum
                  </Link>
                </div>
              )}

              {/* Course Units */}
              <div className="space-y-3">
                {Array.from({ length: parseInt(totalPartNumber) }, (_, index) => (
                  <div key={index} className="rounded-lg border border-gray-200">
                    <Accordion type="single" collapsible defaultValue="item-1">
                      <AccordionItem value="item-1" className="border-none">
                        <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primaryColor/10 text-primaryColor font-medium">
                              {index + 1}
                            </span>
                            <span className="font-medium text-gray-900">
                              {data[0]?.Courses?.partName || `Unit ${index + 1}`}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-3">
                          <div className="space-y-2">
                            {data[0]?.Courses?.materials
                              .filter((material: any) => material.part === (index + 1).toString())
                              .sort((a: any, b: any) => a.materialIndex - b.materialIndex)
                              .map((material: any) => (
                                <div
                                  key={material.id}
                                  onClick={() => {
                                    MaterialClicked(
                                      material.id,
                                      material.materialType,
                                      material.Access
                                    );
                                    MaterialDrawerClicked();
                                  }}
                                  className={`
                                    relative group px-4 py-3 rounded-lg cursor-pointer
                                    transition-all duration-200 ease-in-out
                                    ${
                                      material.id === activeMaterialId
                                        ? 'bg-primaryColor text-white'
                                        : 'hover:bg-gray-50 text-gray-700'
                                    }
                                  `}
                                >
                                  <div className="flex items-center gap-3">
                                    {/* Material Type Icon */}
                                    {material.materialType === "video" && (
                                      <Play size={18} className={material.id === activeMaterialId ? 'text-white' : 'text-primaryColor'} />
                                    )}
                                    {material.materialType === "assessment" && (
                                      <StickyNote size={18} className={material.id === activeMaterialId ? 'text-white' : 'text-primaryColor'} />
                                    )}
                                    {material.materialType === "file" && (
                                      <Text size={18} className={material.id === activeMaterialId ? 'text-white' : 'text-primaryColor'} />
                                    )}
                                    {material.materialType === "link" && (
                                      <Youtube size={18} className={material.id === activeMaterialId ? 'text-white' : 'text-primaryColor'} />
                                    )}
                                    
                                    {/* Material Title */}
                                    <span className="flex-1 text-sm font-medium">
                                      {material?.video?.vidTitle ||
                                        material?.assementId?.assesmentTitle ||
                                        material?.file?.title ||
                                        material?.link?.title ||
                                        `${material.materialType} ${material.materialIndex}`}
                                    </span>

                                    {/* Status Icons */}
                                    <div className="flex items-center gap-2">
                                      {material?.StudentMaterial?.find?.(
                                        (item: any) =>
                                          item.StudentId === data[0]?.studentsId
                                      )?.Done && (
                                        <CheckCheck size={16} className={material.id === activeMaterialId ? 'text-white' : 'text-green-500'} />
                                      )}
                                      {material?.Access === "locked" && (
                                        <LockKeyhole size={16} className={material.id === activeMaterialId ? 'text-white' : 'text-gray-400'} />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px] p-6">
              {activeMaterialtype === "" && (
                <div className="flex items-center justify-center h-[500px]">
                  <div className="animate-pulse text-gray-500">Loading ...</div>
                </div>
              )}
              {activeMaterialtype === "video" && (
                <VideoDetails
                  video_id={activeMaterialId}
                  student_id={data[0]?.studentsId}
                />
              )}
              {activeMaterialtype === "assessment" && (
                <AssessmentDetails
                  assessment_id={activeMaterialId}
                  student_id={data[0]?.studentsId}
                />
              )}
              {activeMaterialtype === "file" && (
                <FileDetails
                  file_id={activeMaterialId}
                  student_id={data[0]?.studentsId}
                />
              )}
              {activeMaterialtype === "link" && (
                <LinkDetails
                  link_id={activeMaterialId}
                  student_id={data[0]?.studentsId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
