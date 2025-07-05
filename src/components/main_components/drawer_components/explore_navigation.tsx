"use client";
import React, { useEffect, useState } from "react";
import { ChevronRight, BookOpen, Package, Book, Trophy, Info, Bot } from "lucide-react";
import Link from "next/link";
import { apiUrl } from "@/apiConfig";
import CheckPhoneNumber from "@/app/mock_package/mock_package_components/checkphonenumber";

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
      });
  }, []);

  const handleMouseEnter = (item: any) => {
    setIsHovered(true);
    setSlectedMenu(item);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onClickMenu = (menu: any) => {
    setSlectedMenu(menu);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 md:w-[800px]">
        <div className="col-span-1 bg-gray-50 p-6">
          <h1 className="text-lg font-semibold text-gray-800 mb-6">Categories</h1>
          <div className="space-y-4">
            <div
              onMouseEnter={() => handleMouseEnter("carricular")}
              onMouseLeave={handleMouseLeave}
              onClick={() => onClickMenu("carricular")}
              className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg transition-colors duration-200 ${
                slectedMenu === "carricular"
                  ? "bg-primaryColor/10 text-primaryColor"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <BookOpen size={18} className="text-primaryColor" />
              <h1 className="font-medium">Academic</h1>
              <ChevronRight size={16} className="ml-auto" />
            </div>

            <Link href={"/search-packages"}>
              <div className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-700">
                <Package size={18} className="text-primaryColor" />
                <h1 className="font-medium">Packages List</h1>
              </div>
            </Link>

            <Link href={"/blogs"}>
              <div className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-700">
                <Book size={18} className="text-primaryColor" />
                <h1 className="font-medium">Blogs</h1>
              </div>
            </Link>

            <Link href={"/leaderboard"}>
              <div className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-700">
                <Trophy size={18} className="text-primaryColor" />
                <h1 className="font-medium">Leader Board</h1>
              </div>
            </Link>

            <Link href={"/about_us"}>
              <div className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-700">
                <Info size={18} className="text-primaryColor" />
                <h1 className="font-medium">About</h1>
              </div>
            </Link>

            <Link href={"/to_bot"}>
              <div className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-700">
                <Bot size={18} className="text-primaryColor" />
                <h1 className="font-medium">Telegram Bot</h1>
              </div>
            </Link>
          </div>
        </div>

        <div className="col-span-3 bg-white p-6">
          {slectedMenu === "carricular" && (
            <div>
              <h1 className="text-xl font-semibold text-gray-800 mb-6">Academic Categories</h1>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href={`/packages_access/filter_packages/grade9`}
                  className="group p-4 rounded-xl border border-gray-200 hover:border-primaryColor/50 hover:bg-primaryColor/5 transition-all duration-200"
                >
                  <h2 className="text-lg font-medium text-gray-800 group-hover:text-primaryColor transition-colors duration-200">
                    Grade 9
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Explore Grade 9 materials</p>
                </Link>

                <Link
                  href={`/packages_access/filter_packages/grade10`}
                  className="group p-4 rounded-xl border border-gray-200 hover:border-primaryColor/50 hover:bg-primaryColor/5 transition-all duration-200"
                >
                  <h2 className="text-lg font-medium text-gray-800 group-hover:text-primaryColor transition-colors duration-200">
                    Grade 10
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Explore Grade 10 materials</p>
                </Link>

                <Link
                  href={`/packages_access/filter_packages/grade11`}
                  className="group p-4 rounded-xl border border-gray-200 hover:border-primaryColor/50 hover:bg-primaryColor/5 transition-all duration-200"
                >
                  <h2 className="text-lg font-medium text-gray-800 group-hover:text-primaryColor transition-colors duration-200">
                    Grade 11
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Explore Grade 11 materials</p>
                </Link>

                <Link
                  href={`/packages_access/filter_packages/grade12`}
                  className="group p-4 rounded-xl border border-gray-200 hover:border-primaryColor/50 hover:bg-primaryColor/5 transition-all duration-200"
                >
                  <h2 className="text-lg font-medium text-gray-800 group-hover:text-primaryColor transition-colors duration-200">
                    Grade 12
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Explore Grade 12 materials</p>
                </Link>
              </div>
            </div>
          )}

          {slectedMenu === "extracarricular" && (
            <div>
              <h1 className="text-xl font-semibold text-gray-800 mb-6">Multidisciplinary Skills</h1>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href={`/packages_access/filter_packages/computer`}
                  className="group p-4 rounded-xl border border-gray-200 hover:border-primaryColor/50 hover:bg-primaryColor/5 transition-all duration-200"
                >
                  <h2 className="text-lg font-medium text-gray-800 group-hover:text-primaryColor transition-colors duration-200">
                    Computer
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Computer skills and programming</p>
                </Link>

                <Link
                  href={`/packages_access/filter_packages/language`}
                  className="group p-4 rounded-xl border border-gray-200 hover:border-primaryColor/50 hover:bg-primaryColor/5 transition-all duration-200"
                >
                  <h2 className="text-lg font-medium text-gray-800 group-hover:text-primaryColor transition-colors duration-200">
                    Language
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Language learning resources</p>
                </Link>

                <Link
                  href={`/packages_access/filter_packages/artlitrature`}
                  className="group p-4 rounded-xl border border-gray-200 hover:border-primaryColor/50 hover:bg-primaryColor/5 transition-all duration-200"
                >
                  <h2 className="text-lg font-medium text-gray-800 group-hover:text-primaryColor transition-colors duration-200">
                    Art and Literature
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Creative arts and literature</p>
                </Link>

                <Link
                  href={`/packages_access/filter_packages/other`}
                  className="group p-4 rounded-xl border border-gray-200 hover:border-primaryColor/50 hover:bg-primaryColor/5 transition-all duration-200"
                >
                  <h2 className="text-lg font-medium text-gray-800 group-hover:text-primaryColor transition-colors duration-200">
                    Others
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Additional skill categories</p>
                </Link>
              </div>
            </div>
          )}

          {slectedMenu === "" && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-xl font-medium text-gray-600">Select a category to explore</h2>
                <p className="text-gray-500 mt-2">Choose from the menu on the left to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}