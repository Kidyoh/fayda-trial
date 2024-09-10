"use client";
import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { apiUrl } from "@/apiConfig";
import CheckPhoneNumber from "@/app/[locale]/mock_package/mock_package_components/checkphonenumber";

export default function ExploreNavigation() {
  const [slectedMenu, setSlectedMenu] = useState("");
  const [categoryList, setCategoryList] = useState<any>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [categoryFolderList, setCategoryFolderList] = useState<any>([]);

  useEffect(() => {
    fetch(`${apiUrl}/categorylist/`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCategoryList(data);
        // console.log("CategoryList: " + JSON.stringify(data));
      });
  }, []);

  const handleMouseEnter = (item: any) => {
    setIsHovered(true);
    setSlectedMenu(item);

    // Execute your function here

    console.log("Mouse entered the component");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    //setSlectedMenu("");
    // Execute your function here
    console.log("Mouse left the component");
  };

  const onClickMenu = (menu: any) => {
    setSlectedMenu(menu);
  };

  const onClickMenuFetch = (menu: any) => {
    setSlectedMenu(menu);
  };
  return (
    <div className="px-3 py-3 w-full ">
      <div className="grid grid-cols-4 md:w-[800px]">
        <div className="col-span-1">
          <h1 className="text-lg font-semibold py-5 underline">Categories</h1>
          <div className="space-y-3">
            <div
              onMouseEnter={() => handleMouseEnter("carricular")}
              onMouseLeave={handleMouseLeave}
              onClick={() => onClickMenu("carricular")}
              className="flex space-x-3 cursor-pointer hover:text-primaryColor"
            >
              <h1>Academic</h1> <ChevronRight size={12} className="my-auto" />
            </div>

            <div
              onMouseEnter={() => handleMouseEnter("extracarricular")}
              onMouseLeave={handleMouseLeave}
              onClick={() => onClickMenu("extracarricular")}
              className="flex space-x-3 cursor-pointer hover:text-primaryColor"
            >
              <h1>Multidisciplinary Skills</h1>{" "}
              <ChevronRight size={12} className="my-auto" />
            </div>

            <div className="flex space-x-3 cursor-pointer hover:text-primaryColor">
              <CheckPhoneNumber pushto={"/mock_package/selectmainfolder"} />
              <ChevronRight size={12} className="my-auto" />
            </div>

            <div className="flex space-x-3 cursor-pointer hover:text-primaryColor">
              <Link href={"/searchPackages"}>
                <h1>Packages List</h1>
              </Link>
            </div>

            <div className="flex space-x-3 cursor-pointer hover:text-primaryColor">
              <Link href={"/blogs"}>
                <h1>Blogs</h1>
              </Link>
            </div>
            <div className="flex space-x-3 cursor-pointer hover:text-primaryColor">
              <Link href={"/leaderboard"}>
                <h1>Leader Board</h1>
              </Link>
            </div>

            <div className="flex space-x-3 cursor-pointer hover:text-primaryColor">
              <h1>Advert</h1>
            </div>

            <div className="flex space-x-3 cursor-pointer hover:text-primaryColor">
              <Link href={"/about_us"}>
                <h1>About</h1>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-3 bg-gray-100">
          {slectedMenu === "carricular" && (
            <div className="p-3">
              <h1 className="text-primaryColor text-xl mb-4 underline font-semibold">
                Academic
              </h1>
              <div className="grid grid-cols-2  gap-5 w-fit mx-4 ">
                <Link
                  className="  p-6 text-white bg-primaryColor bg-opacity-80 rounded-xl"
                  href={`/packages_access/filter_packages/grade9`}
                >
                  Grade 9
                </Link>

                <Link
                  className=" p-6 text-white bg-primaryColor bg-opacity-80 rounded-xl"
                  href={`/packages_access/filter_packages/grade10`}
                >
                  Grade 10
                </Link>

                <Link
                  className=" p-6 text-white bg-primaryColor bg-opacity-80 rounded-xl"
                  href={`/packages_access/filter_packages/grade11`}
                >
                  Grade 11
                </Link>

                <Link
                  className=" p-6 text-white bg-primaryColor bg-opacity-80 rounded-xl"
                  href={`/packages_access/filter_packages/grade12`}
                >
                  Grade 12
                </Link>

                {/* <button className=" bg-white px-4">Grade 9</button>
                <button className=" bg-white px-4">Grade 10</button>
                <button className=" bg-white px-4">Grade 11</button>
                <button className=" bg-white px-4">Grade 12</button> */}
              </div>
            </div>
          )}

          {slectedMenu === "extracarricular" && (
            <div className="p-3">
              <h1 className="text-primaryColor text-xl mb-4 underline font-semibold">
                Multidisciplinary Skills
              </h1>
              <div className="grid grid-cols-2  gap-5 w-fit mx-4 ">
                <Link
                  className="  p-6 text-white bg-primaryColor bg-opacity-80 rounded-xl"
                  href={`/packages_access/filter_packages/computer`}
                >
                  Computer
                </Link>

                <Link
                  className=" p-6 text-white bg-primaryColor bg-opacity-80 rounded-xl"
                  href={`/packages_access/filter_packages/language`}
                >
                  Language
                </Link>

                <Link
                  className=" p-6 text-white bg-primaryColor bg-opacity-80 rounded-xl"
                  href={`/packages_access/filter_packages/artlitrature`}
                >
                  Art and Litrature
                </Link>

                <Link
                  className=" p-6 text-white bg-primaryColor bg-opacity-80 rounded-xl"
                  href={`/packages_access/filter_packages/other`}
                >
                  Others
                </Link>

                {/* <button className=" bg-white px-4">Grade 9</button>
                <button className=" bg-white px-4">Grade 10</button>
                <button className=" bg-white px-4">Grade 11</button>
                <button className=" bg-white px-4">Grade 12</button> */}
              </div>
            </div>
          )}
          {slectedMenu == "" && <h1></h1>}
          {/* {slectedMenu !== "" && slectedMenu !== "carricular" && (
            <div>
              <h1>{slectedMenu}</h1>
            </div>
          )} */}
        </div>

        {/* <div>
         
        
          <div className="space-y-3 py-3">
            {categoryList.map((data: any) => {
              return (
                <div
                  onClick={() => onClickMenuFetch(data?.name)}
                  className="flex space-x-3 cursor-pointer hover:text-primaryColor"
                >
                  <h1>{data?.name}</h1>
                </div>
              );
            })}
          </div>
        </div> */}
      </div>
    </div>
  );
}
