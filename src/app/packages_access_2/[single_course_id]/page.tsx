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
    <div className="min-h-screen bg-gradient-to-br from-[#c7cc3f]/10 to-white pt-16">
      <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#07705d] mb-2">
            {data[0]?.Courses?.courseName || 'Course'}
          </h1>
          <p className="text-gray-600">
            {data[0]?.Courses?.courseDescription || 'Course materials and content'}
          </p>
        </div>

        <div className="relative flex flex-col md:grid md:grid-cols-4 gap-6">
          <div
            onClick={() => MaterialDrawerClicked()}
            className="fixed bottom-4 right-4 z-50 md:hidden bg-gradient-to-r from-[#07705d] to-[#bf8c13] shadow-lg rounded-full p-3 border border-[#bf8c13]/20"
          >
            <ArrowDownWideNarrow
              size={24}
              className="text-white"
            />
          </div>

          <div
            className={`
              fixed inset-0 bg-white z-40 overflow-y-auto transition-transform duration-300 ease-in-out
              md:static md:col-span-1 lg:col-span-1
              md:transform-none md:block md:rounded-xl md:shadow-lg md:border border-[#bf8c13]/20
              ${materialDrawer ? 'translate-x-0' : '-translate-x-full'}
              ${!materialDrawer ? 'hidden md:block' : ''}
            `}
          >
            <div className="p-4 md:p-6">
              {forumId && (
                <div className="mb-6">
                  <Link 
                    href={`/forum/${forumId}`}
                    className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#07705d] to-[#bf8c13] hover:from-[#07705d]/90 hover:to-[#bf8c13]/90 text-white rounded-lg transition-all duration-200 w-full justify-center font-medium shadow-md"
                  >
                    <ScrollText size={18} />
                    Course Forum
                  </Link>
                </div>
              )}

              <div className="space-y-4">
                <Accordion type="single" collapsible>
                  {Array.from({ length: parseInt(totalPartNumber) }, (_, partIndex) => {
                    const partMaterials = data[0]?.Courses?.materials
                      ?.filter((material: any) => material.part === (partIndex + 1).toString()) || [];
                    
                    const activeMaterialInPart = partMaterials.find(
                      (material: any) => material.id === activeMaterialId
                    );

                    return (
                      <AccordionItem 
                        key={partIndex} 
                        value={`part-${partIndex + 1}`} 
                        className="border border-[#bf8c13]/20 rounded-lg bg-white shadow-sm"
                      >
                        <AccordionTrigger className="px-4 py-3 hover:bg-[#bf8c13]/5 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#07705d] text-white font-semibold text-sm">
                              {partIndex + 1}
                            </span>
                            <span className="font-semibold text-[#07705d]">
                              Part {partIndex + 1}
                            </span>
                            <span className="text-xs text-gray-500 ml-auto mr-4">
                              {partMaterials.length} materials
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-3">
                          <div className="space-y-3">
                            <Accordion type="single" collapsible>
                              {(() => {
                                const materialsByPart: { [key: string]: any[] } = {};
                                
                                partMaterials.forEach((material: any) => {
                                  // Extract part information from material titles
                                  const title = material?.video?.vidTitle ||
                                    material?.assementId?.assesmentTitle ||
                                    material?.file?.title ||
                                    material?.link?.title ||
                                    '';
                                  
                                  // Extract part number/name from title (e.g., "Part 1", "Part One", "Part Two", etc.)
                                  let partKey = '1'; // Default to part 1
                                  
                                  if (title) {
                                    const partMatch = title.match(/part\s+(\w+)/i);
                                    if (partMatch) {
                                      partKey = partMatch[1].toLowerCase();
                                      // Normalize common variations
                                      switch (partKey) {
                                        case 'one':
                                          partKey = '1';
                                          break;
                                        case 'two':
                                          partKey = '2';
                                          break;
                                        case 'three':
                                          partKey = '3';
                                          break;
                                        case 'four':
                                          partKey = '4';
                                          break;
                                        case 'five':
                                          partKey = '5';
                                          break;
                                        default:
                                          // Keep numeric parts as is
                                          if (!/^\d+$/.test(partKey)) {
                                            partKey = '1'; // Default for unrecognized parts
                                          }
                                      }
                                    }
                                  }
                                  
                                  if (!materialsByPart[partKey]) {
                                    materialsByPart[partKey] = [];
                                  }
                                  materialsByPart[partKey].push(material);
                                });

                                return Object.entries(materialsByPart)
                                  .sort(([a], [b]) => parseInt(a) - parseInt(b)) // Sort parts numerically
                                  .map(([partIndex, materials]) => (
                                  <AccordionItem 
                                    key={`part-${partIndex}`} 
                                    value={`part-${partIndex}`}
                                    className="border border-[#c7cc3f]/20 rounded-lg bg-gradient-to-r from-white to-[#c7cc3f]/5"
                                  >
                                    <AccordionTrigger className="px-3 py-2 hover:bg-[#c7cc3f]/10 rounded-lg">
                                      <div className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-[#c7cc3f] text-white text-xs font-bold flex items-center justify-center">
                                          {partIndex}
                                        </span>
                                        <span className="font-medium text-[#07705d] text-sm">
                                          Part {partIndex === '1' ? 'One' : partIndex === '2' ? 'Two' : partIndex === '3' ? 'Three' : partIndex}
                                        </span>
                                        <span className="text-xs text-gray-500 ml-auto mr-4">
                                          {materials.length} materials
                                        </span>
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-3 pb-2">
                                      <div className="space-y-1">
                                        {materials.map((material: any) => (
                                          <div
                                            key={material.id}
                                            onClick={() => {
                                              MaterialClicked(
                                                material.id,
                                                material.materialType,
                                                material.Access
                                              );
                                              if (typeof window !== 'undefined' && window.innerWidth < 768) {
                                                MaterialDrawerClicked();
                                              }
                                            }}
                                            className={`
                                              relative group px-3 py-2 rounded-lg cursor-pointer
                                              transition-all duration-200 ease-in-out border
                                              ${
                                                material.id === activeMaterialId
                                                  ? 'bg-gradient-to-r from-[#07705d] to-[#bf8c13] text-white border-transparent shadow-md'
                                                  : 'hover:bg-[#c7cc3f]/10 text-gray-700 border-transparent hover:border-[#c7cc3f]/30'
                                              }
                                              ${material.Access === "locked" ? 'opacity-60' : ''}
                                            `}
                                          >
                                            <div className="flex items-center gap-2">
                                              {material.materialType === "video" && (
                                                <Play size={14} className={material.id === activeMaterialId ? 'text-white' : 'text-[#07705d]'} />
                                              )}
                                              {material.materialType === "assessment" && (
                                                <StickyNote size={14} className={material.id === activeMaterialId ? 'text-white' : 'text-[#bf8c13]'} />
                                              )}
                                              {material.materialType === "file" && (
                                                <Text size={14} className={material.id === activeMaterialId ? 'text-white' : 'text-[#c7cc3f]'} />
                                              )}
                                              {material.materialType === "link" && (
                                                <Youtube size={14} className={material.id === activeMaterialId ? 'text-white' : 'text-[#07705d]'} />
                                              )}
                                              
                                              <span className="flex-1 text-xs font-medium">
                                                {material.materialType === "file" && "Note: "}
                                                {material.materialType === "video" && "Video: "}
                                                {material.materialType === "assessment" && "Assessment: "}
                                                {material.materialType === "link" && "Link: "}
                                                {material?.video?.vidTitle ||
                                                  material?.assementId?.assesmentTitle ||
                                                  material?.file?.title ||
                                                  material?.link?.title ||
                                                  `Part ${partIndex} ${material.materialType}`}
                                              </span>

                                              <div className="flex items-center gap-1">
                                                {material?.StudentMaterial?.find?.(item => item.StudentId === data[0]?.studentsId)?.Done && (
                                                  <CheckCheck size={12} className={material.id === activeMaterialId ? 'text-white' : 'text-green-500'} />
                                                )}
                                                {material?.Access === "locked" && (
                                                  <LockKeyhole size={12} className={material.id === activeMaterialId ? 'text-white/70' : 'text-gray-400'} />
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                ));
                              })()}
                            </Accordion>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-[#bf8c13]/20 min-h-[600px] p-6 backdrop-blur-sm">
              {activeMaterialtype === "" && (
                <div className="flex items-center justify-center h-[500px]">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#07705d] to-[#bf8c13] flex items-center justify-center">
                      <Play className="text-white" size={24} />
                    </div>
                    <div className="text-[#07705d] font-medium">Select a material to get started</div>
                  </div>
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
