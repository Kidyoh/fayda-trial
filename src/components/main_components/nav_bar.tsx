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

export default function NavBar(response3: any) {
  const profile = response3;
  const routerPathname = usePathname();

  const [data, setData] = useState(null);
  const [notificationData, setNotificationData] = useState(null);
  const [notificationNumber, setNotificationNumber] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [activeMenu, setActiveMenu] = useState("Home");

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
      <div className="hidden xmd:block fixed w-full top-0 z-50 bg-white bg-opacity-80 border-2">
        <div className="flex justify-around text-sm px-3">
          <div>
            <Link href={"/"}>
              <img
                className="h-16"
                src="/common_files/main/smallfulllogo.png"
                alt="fayida"
              />
            </Link>
          </div>
          <div className="flex space-x-5  lg:space-x-10 py-1 my-auto ">
            <Link href={"/"}>
              <h1
                className={
                  routerPathname == "/"
                    ? "text-primaryColor nav_bar_hover "
                    : "text-black nav_bar_hover "
                }
              >
                Home
              </h1>
            </Link>
            {data != "User not authenticated" && (
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
            )}
            <Link href={"/explore_packages"}>
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
            </Link>

            <Link href={"/blogs"}>
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
            </Link>

            <Link href={"/leaderboard"}>
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
            </Link>
            <Link href={"/about_us"}>
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
            </Link>

            <Link href={"/notifications"}>
              <div className="relative  pr-2 nav_bar_hover">
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
            <div className="flex space-x-5">
              <div className="py-3 space-x-3">
                <Link href={"/login"}>
                  <button className="border-2 border-primaryColor py-2 px-3 rounded-md font-semibold hover:bg-primaryColor hover:text-white duration-100">
                    Login
                  </button>
                </Link>
                <Link href={"/signup"}>
                  <button className="border-2 bg-primaryColor text-white px-2 py-2 rounded-md hover:bg-white hover:border-primaryColor hover:text-primaryColor duration-100">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="my-auto">
              <Popover>
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
              </Popover>
            </div>
          )}
        </div>
      </div>

      <div className="block  xmd:hidden fixed w-full z-50">
        <NavBarForMobile
          data={data}
          notificationNumber={notificationNumber}
          userName={userName}
        />
      </div>
    </div>
  );
}
