"use clinet";
import React, { useState } from "react";
import {
  AlignLeft,
  X,
  Settings,
  ChevronDown,
  Bell,
  User,
  LogOut,
  UserCircle,
  Home,
  // LibraryBig,
  StickyNote,
  Award,
  SearchSlash,
  // BookA,
  Blocks,
  Book,
  ChevronRight,
  Search,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";
import CheckPhoneNumber from "@/app/[locale]/mock_package/mock_package_components/checkphonenumber";
import useFetchStore from "@/app/[locale]/store/fetchStore";
import LanguageChanger from "../LanguageChanger";
export default function NavBarMobile(props: any) {
  const data = props?.data;
  const notificationNumber = props?.notificationNumber;

  const [exploreDrawer, setExploreDrawer] = useState(false);
  const [mainDrawer, setMainDrawer] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const setSearchQuery = useFetchStore((state) => state.setSearchQuery);

  const handleSearch = async () => {
    setSearchQuery(searchTerm);
  };

  const toggleExploreDrawer = (type: any) => {
    if (type == "toggle") {
      setExploreDrawer(!exploreDrawer);
    } else if (type == "close") {
      setExploreDrawer(false);
      setMainDrawer(false);
    }
  };

  const toggleMainDrawer = (type: any) => {
    if (type == "toggle") {
      setMainDrawer(!mainDrawer);
      setExploreDrawer(false);
    } else if (type == "close") {
      setMainDrawer(false);
    }
  };

  return (
    <div className="relative bg-gray-200">
      <div className="px-3 py-1 flex justify-between">
        <div className=" " onClick={() => toggleMainDrawer("toggle")}>
          {mainDrawer ? (
            <X className="my-auto" />
          ) : (
            <AlignLeft className="my-auto" />
          )}
        </div>
        <div>
          {" "}
          <Link href={"/"}>
            <img
              className="h-10"
              src="/common_files/main/smallfulllogo.png"
              alt="fayida"
            />
          </Link>
        </div>
      </div>

      {mainDrawer && (
        <div className=" absolute top-10 h-50 bg-white z-50 w-full  p-2">
          <div className=" w-full py-4 justify-around flex">
            <h1
              onClick={() => toggleExploreDrawer("toggle")}
              className="bg-primaryColor text-center my-auto cursor-pointer p-1 text-white w-fit rounded"
            >
              Explore
            </h1>

            <div>
              <div className="flex">
                <input
                  type="text"
                  id="search"
                  className="block w-3/4 pl-4 pr-3 py-2 my-auto rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
                <Link href={"/searchPackages"} onClick={() => handleSearch()}>
                  <div className="bg-primaryColor text-white h-fit my-auto py-3 px-2 rounded-r-lg">
                    <Search
                      onClick={() => toggleMainDrawer("close")}
                      size={18}
                      className=""
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {exploreDrawer && (
            <div className="absolute z-40 t-50 bg-white w-5/6 ssmd:w-3/4 px-5 py-2">
              <ScrollArea className="h-full rounded-md border p-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Academics</AccordionTrigger>
                    <AccordionContent
                      onClick={() => toggleExploreDrawer("close")}
                      className="grid grid-cols-2 px-5 gap-4 py-2  flex-col"
                    >
                      <Link
                        onClick={() => toggleMainDrawer("close")}
                        className="  text-primaryColor"
                        href={`/packages_access/filter_packages/grade9`}
                      >
                        Grade 9
                      </Link>{" "}
                      <Link
                        onClick={() => toggleMainDrawer("close")}
                        className="  text-primaryColor"
                        href={`/packages_access/filter_packages/grade10`}
                      >
                        Grade 10
                      </Link>{" "}
                      <Link
                        onClick={() => toggleMainDrawer("close")}
                        className="  text-primaryColor"
                        href={`/packages_access/filter_packages/grade11`}
                      >
                        Grade 11
                      </Link>{" "}
                      <Link
                        onClick={() => toggleMainDrawer("close")}
                        className="  text-primaryColor"
                        href={`/packages_access/filter_packages/grade12`}
                      >
                        Grade 12
                      </Link>{" "}
                    </AccordionContent>
                  </AccordionItem>
                  {/* <AccordionItem value="item-2">
                    <AccordionTrigger>
                      {" "}
                      Multidisciplinary Skills
                    </AccordionTrigger>
                    <AccordionContent
                      onClick={() => toggleExploreDrawer("close")}
                      className="grid grid-cols-2 px-5 gap-4 py-2  "
                    >
                      <Link
                        onClick={() => toggleMainDrawer("close")}
                        className="  text-primaryColor"
                        href={`/packages_access/filter_packages/computer`}
                      >
                        Computer
                      </Link>

                      <Link
                        onClick={() => toggleMainDrawer("close")}
                        className=" text-primaryColor"
                        href={`/packages_access/filter_packages/language`}
                      >
                        Language
                      </Link>

                      <Link
                        onClick={() => toggleMainDrawer("close")}
                        className=" text-primaryColor"
                        href={`/packages_access/filter_packages/artlitrature`}
                      >
                        Art and Litrature
                      </Link>

                      <Link
                        onClick={() => toggleMainDrawer("close")}
                        className=" text-primaryColor"
                        href={`/packages_access/filter_packages/other`}
                      >
                        Others
                      </Link>
                    </AccordionContent>
                  </AccordionItem> */}
                </Accordion>

                <div className="py-2 space-y-3">
                  {/* <div className="flex space-x-3 cursor-pointer hover:text-primaryColor">
                    <CheckPhoneNumber
                      onClick={() => toggleExploreDrawer("close")}
                      pushto={"/mock_package/selectmainfolder"}
                    />
                    <ChevronRight size={12} className="my-auto" />
                  </div> */}

                  <div className="flex space-x-3 cursor-pointer hover:text-primaryColor">
                    <Link
                      onClick={() => toggleExploreDrawer("close")}
                      href={"/searchPackages"}
                    >
                      <h1>Packages List</h1>
                    </Link>
                  </div>

                  <div className="flex space-x-3 cursor-pointer hover:text-primaryColor">
                    <Link
                      onClick={() => toggleExploreDrawer("close")}
                      href={"/blogs"}
                    >
                      <h1>Blogs</h1>
                    </Link>
                  </div>
                  <div className="flex space-x-3 cursor-pointer hover:text-primaryColor">
                    <Link
                      onClick={() => toggleExploreDrawer("close")}
                      href={"/leaderboard"}
                    >
                      <h1>Leader Board</h1>
                    </Link>
                  </div>

                  {/* <div
                    onClick={() => toggleExploreDrawer("close")}
                    className="flex space-x-3 cursor-pointer hover:text-primaryColor"
                  >
                    <h1>Advert</h1>
                  </div> */}

                  <div className="flex space-x-3 cursor-pointer hover:text-primaryColor">
                    <Link
                      onClick={() => toggleExploreDrawer("close")}
                      href={"/about_us"}
                    >
                      <h1>About</h1>
                    </Link>
                  </div>
                  <div className="flex space-x-3 cursor-pointer hover:text-primaryColor">
                    <Link
                      onClick={() => toggleExploreDrawer("close")}
                      href={"/to_bot"}
                    >
                      <h1>Telegram Bot</h1>
                    </Link>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
          <div className="w-full bg-white pb-4 space-y-2">
            <Link
              onClick={() => toggleMainDrawer("close")}
              className="w-fit text-center mx-auto py-1"
              href={"/"}
            >
              <h1>Home</h1>
            </Link>

            <Separator orientation="horizontal" className=" mx-auto" />

            <div className="w-fit mx-auto py-2">
              <LanguageChanger />
            </div>

            {data != "User not authenticated" && (
              <Link
                onClick={() => toggleMainDrawer("close")}
                href={"/notifications"}
                className="w-fit  h-fit my-auto"
              >
                <Separator orientation="horizontal" className=" mx-auto" />
                <div className="relative flex my-auto mx-auto py-2   pr-2 nav_bar_hover">
                  <div className="my-auto">
                    <Bell />
                  </div>
                  {notificationNumber != 0 && (
                    <div className="absolute px-1  top-0 right-0 text-white rounded-full bg-red-600">
                      <h1>{notificationNumber}</h1>
                    </div>
                  )}
                </div>{" "}
              </Link>
            )}

            <Separator orientation="horizontal" className=" mx-auto" />

            {data != "User not authenticated" ? (
              <div>
                {" "}
                <Link
                  className="w-fit mx-auto"
                  onClick={() => toggleMainDrawer("close")}
                  href={"/dashboard"}
                >
                  <h1 className="text-white bg-primaryColor px-3 py-1 rounded w-fit mx-auto">
                    Dashboard
                  </h1>
                </Link>
              </div>
            ) : (
              <div>
                <div className="flex w-3/4 mx-auto justify-around">
                  <Link
                    onClick={() => toggleMainDrawer("close")}
                    href={"/login"}
                    className="text-primaryColor"
                  >
                    {" "}
                    Log In
                  </Link>
                  <Link
                    onClick={() => toggleMainDrawer("close")}
                    href={"/signup"}
                    className="text-primaryColor"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
