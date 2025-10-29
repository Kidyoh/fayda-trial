"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
//import Cookies from "js-cookie";
import { apiUrl } from "@/apiConfig";
import {
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
import CheckPhoneNumber from "@/app/(exams)/mock/mock_package_components/checkphonenumber";
import TranslateButton from "../TranslateButton";

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
import useFetchStore from "../../app/store/fetchStore";
import NavBarMobile from "./nav_bar_mobile";

import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../../lib/tokenManager";
import { CartIcon } from "../cart/CartIcon";
import { CartDrawer } from "../cart/CartDrawer";

export default function NavBar(response3: any) {
  const profile = response3;
  const routerPathname = usePathname();

  const [data, setData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  const accessToken = getAccessToken();

  // Check authentication status based on token presence
  useEffect(() => {
    const token = getAccessToken();

    // If no token, user is not authenticated
    // Just set the state, no API call needed for unauthenticated users
    if (!token || token === "0") {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    // User has a token, verify it's valid by fetching profile
    // This determines if we show "Login/Signup" or "Dashboard" button
    fetch(`${apiUrl}/newlogin/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
        setIsAuthenticated(true);
        setLoading(false);
        setUserName(data.firstName + " " + data.lastName);
        console.log("Profile fetched:", data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []); // Empty dependency array - only run once on mount

  return (
    <>
      <div className="hidden xxmd:block fixed top-0 left-1/2 transform -translate-x-1/2 z-50 bg-white shadow-2xl shadow-primaryColor/10 rounded-full mt-4 w-11/12 max-w-7xl">
        <div className="px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center space-x-6">
              <Link href={"/"} className="flex-shrink-0">
                <img
                  className="h-10 w-auto"
                  src="/common_files/main/smallfulllogo.png"
                  alt="fayida"
                />
              </Link>

              <div className="hidden md:flex items-center space-x-6">
                <Link href={"/"} className="group">
                  <h1
                    className={`text-sm font-medium transition-colors duration-200 ${
                      routerPathname === "/"
                        ? "text-primaryColor"
                        : "text-gray-600 hover:text-primaryColor"
                    }`}
                  >
                    Home
                  </h1>
                </Link>

                <Link href="/packages">
                  <h1
                    className={`text-sm font-medium transition-colors duration-200 ${
                      routerPathname === "/packages"
                        ? "text-primaryColor"
                        : "text-gray-600 hover:text-primaryColor"
                    }`}
                  >
                    Packages
                  </h1>
                </Link>

                <Link href="/#courses">
                  <h1 className="text-sm font-medium transition-colors duration-200 text-gray-600 hover:text-primaryColor">
                    Courses
                  </h1>
                </Link>

                <Link href={"/blogs"}>
                  <h1
                    className={`text-sm font-medium transition-colors duration-200 ${
                      routerPathname === "/blogs"
                        ? "text-primaryColor"
                        : "text-gray-600 hover:text-primaryColor"
                    }`}
                  >
                    Blogs
                  </h1>
                </Link>

                <Link href={"/about"}>
                  <h1
                    className={`text-sm font-medium transition-colors duration-200 ${
                      routerPathname === "/about"
                        ? "text-primaryColor"
                        : "text-gray-600 hover:text-primaryColor"
                    }`}
                  >
                    About
                  </h1>
                </Link>

                <Link href={"/bot"}>
                  <h1
                    className={`text-sm font-medium transition-colors duration-200 ${
                      routerPathname === "/bot"
                        ? "text-primaryColor"
                        : "text-gray-600 hover:text-primaryColor"
                    }`}
                  >
                    Telegram Bot
                  </h1>
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="flex items-center space-x-1 md:space-x-3">
                <div className="hidden sm:block">
                  <TranslateButton />
                </div>

                {/* Cart Icon */}
                <CartIcon />

                {!isAuthenticated ? (
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <Link href={"/login"}>
                      <button className="px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-primaryColor border border-primaryColor rounded-full hover:bg-primaryColor/5 transition-colors duration-200">
                        Login
                      </button>
                    </Link>
                    <Link href={"/signup"}>
                      <button className="px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-white bg-primaryColor rounded-full hover:bg-primaryColor/90 transition-colors duration-200">
                        Sign Up
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 md:space-x-4">
                    <Link href={"/dashboard"}>
                      <button className="px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-white bg-primaryColor rounded-full hover:bg-primaryColor/90 transition-colors duration-200">
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
        <NavBarMobile
          data={isAuthenticated ? data : null}
          notificationNumber={0}
        />
      </div>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
