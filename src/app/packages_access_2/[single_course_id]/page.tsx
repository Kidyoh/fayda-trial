"use client";
import { apiUrl } from "@/apiConfig";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useMaterialManagerStore from "../../store/materialManagerStore";

import CourseHeader from "@/components/packages_access_2/CourseHeader";
import ForumButton from "@/components/packages_access_2/ForumButton";
import MaterialContent from "@/components/packages_access_2/MaterialContent";
import TopAccordionNav from "@/components/packages_access_2/TopAccordionNav";
import {
  getAccessToken
} from "../../../lib/tokenManager";
import useFetchStore from "../../store/fetchStore";

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

  // Move MaterialClicked above useEffect to avoid ReferenceError
  const MaterialClicked = React.useCallback((
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
      setActiveMaterialtype(materialtype);
    } else {
      console.log("Material is locked, not updating state");
    }
  }, [activeMaterialId, setActiveMaterialId, setActiveMaterialtype]);

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
            // Only set the first material if nothing is selected yet
            if (!activeMaterialId) {
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
            }
          } else {
            console.log("No materials found in the response");
          }
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    };

    fetchData();
  }, [seenMaterialsFetch, accessToken, courseId, MaterialClicked]);

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
          <TopAccordionNav
            materials={data[0]?.Courses?.materials || []}
            activeMaterialId={activeMaterialId}
            onMaterialClick={MaterialClicked}
          />
          <div className="bg-white rounded-xl border border-[#bf8c13]/20 min-h-[400px] w-full h-full p-4 md:p-6 backdrop-blur-sm">
            <MaterialContent
              activeMaterialtype={activeMaterialtype}
              activeMaterialId={activeMaterialId}
              studentId={data[0]?.studentsId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
