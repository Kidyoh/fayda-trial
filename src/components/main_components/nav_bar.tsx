"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
//import Cookies from "js-cookie";
import { apiUrl } from "@/apiConfig";
import {
  Bell,
  UserCircle,
  User,
  LogOut,
  ChevronDown,
  AlignLeft,
  X,
  Settings,
  Search,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { stringify } from "querystring";
import { usePathname } from "next/navigation";
import NavBarForMobile from "./responsive_navbar";
import axios from "axios";
import CheckPhoneNumber from "@/app/[locale]/mock_package/mock_package_components/checkphonenumber";
import LanguageChanger from "../LanguageChanger";

import { useTranslation } from "react-i18next";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import ExploreNavigation from "./drawer_components/explore_navigation";
import useFetchStore from "../../app/[locale]/store/fetchStore";
import NavBarMobile from "./nav_bar_mobile";

export default function NavBar(response3: any) {
  const profile = response3;
  const routerPathname = usePathname();

  const [data, setData] = useState(null);
  const [notificationData, setNotificationData] = useState(null);
  const [notificationNumber, setNotificationNumber] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [activeMenu, setActiveMenu] = useState("Home");

  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const setSearchQuery = useFetchStore((state) => state.setSearchQuery);

  const handleSearch = async () => {
    setSearchQuery(searchTerm);
  };

  useEffect(() => {
    fetch(`${apiUrl}/login_register/profile`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.message);
        setLoading(false);
        setUserName(data.firstName + " " + data.lastName);
        console.log("message: " + data);
      });
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${apiUrl}/login_register/profile`, {
  //         withCredentials: true, // Equivalent to "credentials: 'include'"
  //       });
  //       const data = response.data;

  //       setData(data.message);
  //       setLoading(false);
  //       setUserName(data.firstName + " " + data.lastName);
  //       console.log("message:", data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       // Handle errors appropriately, e.g., display an error message to the user
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    fetch(`${apiUrl}/notifications/count/`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setNotificationData(data.message);
        //  setLoading(false);
        var countx = 0;
        if (data.error != "not authenticated") {
          countx = Object.keys(data).length;
        }

        setNotificationNumber(countx);
        console.log("message2: " + data.error);
      });
  }, []);

  // useEffect(() => {
  //   const fetchNotificationCount = async () => {
  //     try {
  //       const response = await axios.get(`${apiUrl}/notifications/count/`, {
  //         withCredentials: true, // Equivalent to "credentials: 'include'"
  //       });
  //       const data = response.data;

  //       if (data.error === "not authenticated") {
  //         // Handle authentication error (e.g., redirect to login page)
  //         console.error("Authentication error:", data.error);
  //         return; // Exit early in case of authentication error
  //       }

  //       const notificationCount = Object.keys(data).length; // Calculate count dynamically
  //       setNotificationData(data.message); // Assuming this refers to data other than count
  //       setNotificationNumber(notificationCount);
  //       console.log("message2:", data.error); // Log error message or remove if not needed
  //     } catch (error) {
  //       console.error("Error fetching notification count:", error);
  //       // Handle other errors appropriately (e.g., display an error message to the user)
  //     }
  //   };

  //   fetchNotificationCount();
  // }, []);

  return (
    <div className="">
      <div className="hidden xxmd:block fixed w-full top-0 z-50 bg-white bg-opacity-80 border-2">
        <div className="flex justify-between px-10 lg:px-20">
          <div className="flex space-x-3">
            <Link className="w-full " href={"/"}>
              <img
                className="h-20 w-full "
                src="/common_files/main/smallfulllogo.png"
                alt="fayida"
              />
            </Link>
            <div className="my-auto h-fit">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <h1 className="border-2 border-primaryColor rounded px-3 py-1">
                        Explore
                      </h1>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ExploreNavigation />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex space-x-5  lg:space-x-10  my-auto ">
            <Link href={"/"} className="flex">
              <h1
                className={
                  routerPathname == "/"
                    ? "text-primaryColor nav_bar_hover my-auto h-fit "
                    : "text-black nav_bar_hover my-auto h-fit"
                }
              >
                Home
              </h1>
            </Link>

            <div>
              <div className="flex">
                <input
                  type="text"
                  id="search"
                  className="block w-full pl-4 pr-3 py-2 my-auto rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    <Search size={18} className="" />
                  </div>
                </Link>
              </div>
            </div>

            {/* {data != "User not authenticated" && (
              <div>
                <Popover>
                  <PopoverTrigger>
                    <div
                      className={
                        routerPathname == "/packages_access/courses_list" ||
                        routerPathname == "/packages_access/packages_list"
                          ? "text-primaryColor nav_bar_hover"
                          : "text-black nav_bar_hover"
                      }
                    >
                      <div className="flex">
                        <h1
                          className={
                            routerPathname.startsWith("/packages_access")
                              ? "text-primaryColor nav_bar_hover_dropdown "
                              : "text-black nav_bar_hover_dropdown "
                          }
                        >
                          Courses
                        </h1>
                        <div className="my-auto">
                          <ChevronDown size={20} />
                        </div>
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="space-y-3">
                      <div className="">
                        <Link href="/packages_access/courses_list">
                          <h1
                            className={
                              routerPathname == "/packages_access/courses_list"
                                ? "text-primaryColor nav_bar_hover_dropdown "
                                : "text-black nav_bar_hover_dropdown "
                            }
                          >
                            Courses List
                          </h1>
                        </Link>
                      </div>
                      <div className="">
                        <Link href="/packages_access/packages_list">
                          <h1
                            className={
                              routerPathname.startsWith(
                                "/packages_access/packages_list"
                              )
                                ? "text-primaryColor nav_bar_hover_dropdown "
                                : "text-black nav_bar_hover_dropdown "
                            }
                          >
                            Packages
                          </h1>
                        </Link>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )} */}
            {/* <Link href={"/explore_packages"}>
              <div className="nav_bar_hover">
                <h1
                  className={
                    routerPathname.startsWith("/explore_packages")
                      ? "text-primaryColor nav_bar_hover_dropdown "
                      : "text-black nav_bar_hover_dropdown "
                  }
                >
                  Explore
                </h1>
              </div>
            </Link> */}

            {/* <h1>
              {" "}
              <div className="nav_bar_hover">
                <h1
                  className={
                    routerPathname.startsWith("/mock_package")
                      ? "text-primaryColor nav_bar_hover_dropdown "
                      : "text-black nav_bar_hover_dropdown "
                  }
                >
                  
                  <CheckPhoneNumber pushto={"/mock_package/selectmainfolder"} />
                </h1>
              </div>
            </h1> */}

            {/* <Link href={"/blogs"}>
              <div className="nav_bar_hover">
                <h1
                  className={
                    routerPathname.startsWith("/blogs")
                      ? "text-primaryColor nav_bar_hover_dropdown "
                      : "text-black nav_bar_hover_dropdown "
                  }
                >
                  Blogs
                </h1>
              </div>
            </Link> */}

            {/* <Link href={"/leaderboard"}>
              <div className="nav_bar_hover">
                <h1
                  className={
                    routerPathname == "/leaderboard"
                      ? "text-primaryColor nav_bar_hover_dropdown "
                      : "text-black nav_bar_hover_dropdown "
                  }
                >
                  LeaderBoard
                </h1>
              </div>
            </Link> */}

            {/* <Link href={"/about_us"}>
              <div className="nav_bar_hover">
                <h1
                  className={
                    routerPathname == "/about_us"
                      ? "text-primaryColor nav_bar_hover_dropdown "
                      : "text-black nav_bar_hover_dropdown "
                  }
                >
                  About
                </h1>
              </div>
            </Link> */}

            <LanguageChanger />
            <Link href={"/notifications"} className=" h-fit my-auto">
              <div className="relative flex my-auto  pr-2 nav_bar_hover">
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
          </div>

          {data == "User not authenticated" ? (
            <div className="w-1/4 flex justify-end ">
              <div className="flex  w-fit space-x-1 lg:space-x-2 xl:space-x-5">
                <div className="py-3 space-x-3">
                  <Link href={"/login"}>
                    <button className="border-2 border-primaryColor py-1 px-1 xl:py-2 xl:px-3 rounded-md font-semibold hover:bg-primaryColor hover:text-white duration-100">
                      Login
                    </button>
                  </Link>
                  <Link href={"/signup"}>
                    <button className="border-2 bg-primaryColor text-white py-1 px-1 xl:px-2 xl:py-2 rounded-md hover:bg-white hover:border-primaryColor hover:text-primaryColor duration-100">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="my-auto">
              <div>
                <Link href={"/dashboard"}>
                  <h1 className="text-white bg-primaryColor px-3 py-1 rounded">
                    Dashboard
                  </h1>
                </Link>
              </div>
              {/* <Popover>
                <PopoverTrigger>
                  <div className="flex space-x-1 text-primaryColor hover:text-secondaryColor duration-150">
                    <UserCircle />

                    <div className="flex">
                      <h1>{userName}</h1>
                      <div className="my-auto">
                        <ChevronDown size={20} />
                      </div>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="space-y-3">
                    <div className="nav_bar_hover_dropdown ">
                      <div className="flex space-x-1">
                        <User />
                        <Link href="/profile">Profile</Link>
                      </div>
                    </div>
                    <div>
                      <form
                        action={`${apiUrl}/login_register/logout`}
                        method="POST"
                      >
                        <button type="submit">
                          <div className="flex space-x-1 nav_bar_hover_dropdown ">
                            <LogOut />
                            <h1>Log Out</h1>
                          </div>
                        </button>
                      </form>
                    </div>
                  </div>
                </PopoverContent>
              </Popover> */}
            </div>
          )}
        </div>
      </div>

      <div className="block  xxmd:hidden fixed w-full z-50">
        {/* <NavBarForMobile
          data={data}
          notificationNumber={notificationNumber}
          userName={userName}
        /> */}

        <NavBarMobile data={data} notificationNumber={notificationNumber} />
      </div>
    </div>
  );
}
