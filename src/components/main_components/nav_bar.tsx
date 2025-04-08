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

import { setAccessToken, getAccessToken, clearAccessToken } from "../../lib/tokenManager";


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

  //const accessToken = localStorage.getItem("accessToken");
  const accessToken = getAccessToken();
  const setSearchQuery = useFetchStore((state) => state.setSearchQuery);

  const handleSearch = async () => {
    setSearchQuery(searchTerm);
  };

  // useEffect(() => {
  //   fetch(`${apiUrl}/login_register/profile`, {
  //     credentials: "include",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data.message);
  //       setLoading(false);
  //       setUserName(data.firstName + " " + data.lastName);
  //       console.log("message: " + data);
  //     });
  // }, []);



  useEffect(() => {
    //const accessToken = localStorage.getItem("accessToken");
  //const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxNmQzMDUwLTI5MTYtNDQ3YS04OGEyLWM0MzE2Y2U0YTJhMSIsImlhdCI6MTczMTMyMDkxM30.QSm1qpDlJMI8XrvW4snH5nm-bzSsppZk4RZ_fxlzmII'
   console.log("AccessToken: "+ accessToken)
    fetch(`${apiUrl}/newlogin/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch profile data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data.id);
        setLoading(false);
        setUserName(data.firstName + " " + data.lastName);
        console.log("message:", data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
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

  // useEffect(() => {
  //   fetch(`${apiUrl}/notifications/count/`, {
  //     credentials: "include",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setNotificationData(data.message);
  //       //  setLoading(false);
  //       var countx = 0;
  //       if (data.error != "not authenticated") {
  //         countx = Object.keys(data).length;
  //       }

  //       setNotificationNumber(countx);
  //       console.log("message2: " + data.error);
  //     });
  // }, []);
  useEffect(() => {
   // const accessToken = getAccessToken();
  
    fetch(`${apiUrl}/notifications/count/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch notifications");
        }
        return res.json();
      })
      .then((data) => {
        setNotificationData(data.message);
  
        let countx = 0;
        if (data.error !== "not authenticated") {
          countx = Object.keys(data).length;
        }
  
        setNotificationNumber(countx);
        console.log("message2:", data.error);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
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
      <div className="hidden xxmd:block fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-8">
              <Link href={"/"} className="flex-shrink-0">
                <img
                  className="h-12 w-auto"
                  src="/common_files/main/smallfulllogo.png"
                  alt="fayida"
                />
              </Link>
              
              <div className="hidden md:flex items-center space-x-8">
                <Link href={"/"} className="group">
                  <h1 className={`text-sm font-medium transition-colors duration-200 ${
                    routerPathname === "/" 
                      ? "text-primaryColor" 
                      : "text-gray-600 hover:text-primaryColor"
                  }`}>
                    Home
                  </h1>
                </Link>

                <div className="relative">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent">
                          <h1 className="text-sm font-medium text-gray-600 hover:text-primaryColor transition-colors duration-200">
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
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="flex items-center">
                  <input
                    type="text"
                    id="search"
                    className="w-64 pl-4 pr-10 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor text-sm transition-all duration-200"
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
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-primaryColor text-white p-1.5 rounded-full hover:bg-primaryColor/90 transition-colors duration-200">
                      <Search size={16} />
                    </div>
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <LanguageChanger />
                
                <Link href={"/notifications"} className="relative">
                  <div className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                    <Bell className="w-5 h-5 text-gray-600" />
                    {notificationNumber !== 0 && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {notificationNumber}
                      </div>
                    )}
                  </div>
                </Link>

                {data == null ? (
                  <div className="flex items-center space-x-3">
                    <Link href={"/login"}>
                      <button className="px-4 py-2 text-sm font-medium text-primaryColor border border-primaryColor rounded-full hover:bg-primaryColor/5 transition-colors duration-200">
                        Login
                      </button>
                    </Link>
                    <Link href={"/signup"}>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-primaryColor rounded-full hover:bg-primaryColor/90 transition-colors duration-200">
                        Sign Up
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link href={"/dashboard"}>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-primaryColor rounded-full hover:bg-primaryColor/90 transition-colors duration-200">
                        Dashboard
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block xxmd:hidden fixed w-full z-50">
        <NavBarMobile data={data} notificationNumber={notificationNumber} />
      </div>
    </div>
  );
}
