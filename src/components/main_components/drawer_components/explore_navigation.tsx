"use client";
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ExploreNavigation() {
  const [slectedMenu, setSlectedMenu] = useState("");

  const onClickMenu = (menu: any) => {
    setSlectedMenu(menu);
  };

  return (
    <div className="px-3 py-3 w-full ">
      <div className="grid grid-cols-4 md:w-[800px]">
        <div className="col-span-1">
          <h1 className="text-lg font-semibold py-5 underline">Categories</h1>
          <div className="space-y-3">
            <div
              onClick={() => onClickMenu("carricular")}
              className="flex space-x-3 cursor-pointer hover:text-primaryColor"
            >
              <h1>Carricular</h1> <ChevronRight size={12} className="my-auto" />
            </div>
            <div className="flex space-x-3 cursor-pointer hover:text-primaryColor">
              <h1>Extra Carricular</h1>{" "}
              <ChevronRight size={12} className="my-auto" />
            </div>
            <div className="flex space-x-3 cursor-pointer hover:text-primaryColor">
              <h1>Blogs</h1>
            </div>
            <div className="flex space-x-3 cursor-pointer hover:text-primaryColor">
              <h1>Advert</h1>
            </div>
          </div>
        </div>
        <div className="col-span-3 bg-gray-100">
          {slectedMenu === "carricular" && (
            <div className="p-3">
              <h1 className="text-primaryColor text-xl mb-4 underline font-semibold">
                Carricular
              </h1>
              <div className="flex flex-col gap-2 w-fit mx-4 ">
                <Link
                  className=" bg-white px-4"
                  href={`/packages_access/filter_packages/grade9`}
                >
                  Grade 9
                </Link>

                <Link
                  className=" bg-white px-4"
                  href={`/packages_access/filter_packages/grade10`}
                >
                  Grade 10
                </Link>

                <Link
                  className=" bg-white px-4"
                  href={`/packages_access/filter_packages/grade11`}
                >
                  Grade 11
                </Link>

                <Link
                  className=" bg-white px-4"
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
          {slectedMenu == "" && <h1>Main</h1>}
        </div>
      </div>
    </div>
  );
}
