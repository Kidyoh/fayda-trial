"use client";
import { apiUrl } from "@/apiConfig";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useMaterialManagerStore from "../../../store/materialManagerStore";

import CourseHeader from "@/components/packages_access_2/CourseHeader";
import ForumButton from "@/components/packages_access_2/ForumButton";
import MaterialContent from "@/components/packages_access_2/MaterialContent";
import TopAccordionNav from "@/components/packages_access_2/TopAccordionNav";
import {
  getAccessToken
} from "../../../../lib/tokenManager";
import useFetchStore from "../../../store/fetchStore";

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
  const courseId = params.single_course_id;

  const calculateProgress = (materials: any[], studentId: string) => {
    if (!materials || !studentId) return 0;
    
    // Only consider unlocked materials for progress calculation
    const unlockedMaterials = materials.filter(material => material.Access !== "locked");
    if (unlockedMaterials.length === 0) return 0;
    
    const completedUnlockedMaterials = unlockedMaterials.filter(material =>
      material?.StudentMaterial?.find((item: any) =>
        item.StudentId === studentId && item.Done === true
      )
    );
    
    return Math.round((completedUnlockedMaterials.length / unlockedMaterials.length) * 100);
  };

  // Move MaterialClicked above useEffect to avoid ReferenceError
  const MaterialClicked = React.useCallback((
    materialId: any,
    materialtype: any,
    materialAccess: any
  ) => {
    console.log("MaterialClicked called:", { materialId, materialtype, materialAccess });
    if (materialAccess == "unlocked") {
      setActiveMaterialId(materialId);
      setActiveMaterialtype(materialtype);
      console.log("Material set:", { materialId, materialtype });
    }
  }, [setActiveMaterialId, setActiveMaterialtype]);

  useEffect(() => {
    const fetchData = () => {
      fetch(`${apiUrl}/purchaselist/specificStudentSingleCourse/${courseId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((jsonData) => {
          setData(jsonData);
          console.log("Fetched course data:", jsonData);
          setTotalPartNumber(jsonData[0]?.Courses?.parts);

          if (jsonData[0]?.Courses?.materials?.length > 0) {
            const materials = jsonData[0].Courses.materials;
            
            if (!activeMaterialId || !activeMaterialtype) {
              // Only consider unlocked materials for auto-selection
              const unlockedMaterials = materials.filter(m => m.Access !== "locked");
              
              if (unlockedMaterials.length > 0) {
                const firstUnlockedVideo = unlockedMaterials.find(material => 
                  material.materialType === "video"
                );
                
                const selectedMaterial = firstUnlockedVideo || unlockedMaterials[0];
                
                MaterialClicked(selectedMaterial.id, selectedMaterial.materialType, selectedMaterial.Access);
              }
            }
          }
        })
        .catch((error) => {
          console.error("Error loading course data:", error);
        });
    };

    fetchData();
  }, [seenMaterialsFetch, accessToken, courseId, MaterialClicked, activeMaterialId, activeMaterialtype, setActiveMaterialId, setActiveMaterialtype]);

  useEffect(() => {
    const getCourse = async () => {
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
        const course = await res.json();
        setForumId(course[0]?.id);
      } catch (error) {
        console.error("Error loading forum data:", error);
      }
    };

    getCourse();
  }, [accessToken, courseId]);

  const MaterialDrawerClicked = () => {
    setMaterialDrawer(!materialDrawer);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c7cc3f]/10 to-white pt-16">
      <div className="mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <CourseHeader
          courseName={data[0]?.Courses?.courseName || 'Course'}
          courseDescription={data[0]?.Courses?.courseDescription || 'Course materials and content'}
        />
        <ForumButton forumId={forumId} />
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="bg-white rounded-xl border border-[#bf8c13]/20 min-h-[400px] w-full h-full p-4 md:p-6 backdrop-blur-sm">
            {data[0]?.studentsId ? (
              <MaterialContent
                key={`material-${activeMaterialId}-${activeMaterialtype}`}
                activeMaterialtype={activeMaterialtype}
                activeMaterialId={activeMaterialId}
                studentId={data[0]?.studentsId}
              />
            ) : (
              <div className="flex items-center justify-center h-[500px]">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center shadow-lg animate-pulse">
                    <span className="text-blue-500 text-3xl">⏳</span>
                  </div>
                  <div className="text-blue-600 font-semibold text-lg">Loading Course Content...</div>
                  <div className="text-gray-600 max-w-md">
                    <p className="text-sm text-gray-500">Please wait while we load your course materials and progress.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          {data[0]?.Courses?.materials?.length > 0 ? (
            <TopAccordionNav
              materials={data[0].Courses.materials}
              activeMaterialId={activeMaterialId}
              onMaterialClick={MaterialClicked}
              studentId={data[0]?.studentsId}
              courseProgress={calculateProgress(data[0].Courses.materials, data[0]?.studentsId || "")}
            />
          ) : (
            <div className="w-full lg:w-1/2 mb-4 bg-white rounded-xl border border-[#bf8c13]/20 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-center h-[400px]">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-400 text-2xl">📚</span>
                  </div>
                  <p className="text-gray-500 font-medium">Loading course materials...</p>
                  <p className="text-gray-400 text-sm mt-2">Please wait while we prepare your content</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
