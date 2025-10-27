"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Search,
  Package,
  BookOpen,
  User,
  Bell,
  ChevronRight,
  LogOut,
  Bot,
  Book,
  Trophy,
  Info,
} from "lucide-react";
import TranslateButton from "../TranslateButton";
import { usePathname } from "next/navigation";
import { apiUrl } from "@/apiConfig";
import { clearAccessToken, getAccessToken } from "../../lib/tokenManager";
import { CartIcon } from "../cart/CartIcon";

export default function NavBarMobile({ data, notificationNumber }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch(`${apiUrl}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      clearAccessToken();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Toggle expanded menu
  const toggleMenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  return (
    <>
      {/* Fixed header with logo and menu button */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <img
            className="h-8 w-auto"
            src="/common_files/main/smallfulllogo.png"
            alt="Fayida"
          />
        </Link>

        <div className="flex items-center space-x-1 sm:space-x-2">
          <CartIcon />

          <button
            onClick={() => setIsOpen(true)}
            className="p-2 text-gray-600 focus:outline-none hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Full screen menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute top-0 right-0 w-[90%] sm:w-[85%] max-w-sm h-full bg-white overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 -ml-2 text-gray-600 focus:outline-none"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                  <span className="ml-2 font-medium text-gray-900">Menu</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TranslateButton />
                </div>
              </div>

              {/* Menu links */}
              <div className="py-2">
                <Link href="/">
                  <div
                    className={`flex items-center px-4 py-3 ${pathname === "/" ? "text-primaryColor bg-primaryColor/5" : "text-gray-700"}`}
                  >
                    <Home size={20} className="mr-3" />
                    <span className="font-medium">Home</span>
                  </div>
                </Link>

                <Link href="/packages">
                  <div
                    className={`flex items-center px-4 py-3 ${pathname === "/packages" ? "text-primaryColor bg-primaryColor/5" : "text-gray-700"}`}
                  >
                    <Package size={20} className="mr-3" />
                    <span className="font-medium">Packages</span>
                  </div>
                </Link>

                <Link href="/#courses">
                  <div className="flex items-center px-4 py-3 text-gray-700">
                    <BookOpen size={20} className="mr-3" />
                    <span className="font-medium">Courses</span>
                  </div>
                </Link>

                <Link href="/blogs">
                  <div
                    className={`flex items-center px-4 py-3 ${pathname.includes("/blogs") ? "text-primaryColor bg-primaryColor/5" : "text-gray-700"}`}
                  >
                    <Book size={20} className="mr-3" />
                    <span className="font-medium">Blogs</span>
                  </div>
                </Link>

                <Link href="/bot">
                  <div
                    className={`flex items-center px-4 py-3 ${pathname.includes("/bot") ? "text-primaryColor bg-primaryColor/5" : "text-gray-700"}`}
                  >
                    <Bot size={20} className="mr-3" />
                    <span className="font-medium">Telegram Bot</span>
                  </div>
                </Link>

                <Link href="/about">
                  <div
                    className={`flex items-center px-4 py-3 ${pathname.includes("/about") ? "text-primaryColor bg-primaryColor/5" : "text-gray-700"}`}
                  >
                    <Info size={20} className="mr-3" />
                    <span className="font-medium">About</span>
                  </div>
                </Link>
              </div>

              {/* User section */}
              <div className="mt-auto border-t border-gray-100 p-4">
                {data ? (
                  <>
                    <Link href="/dashboard">
                      <div className="flex items-center px-4 py-3 mb-2 bg-primaryColor text-white rounded-xl">
                        <User size={20} className="mr-3" />
                        <span className="font-medium">Dashboard</span>
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-gray-700 rounded-xl border border-gray-200"
                    >
                      <LogOut size={20} className="mr-3" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Link href="/login">
                      <div className="flex items-center px-4 py-3 text-primaryColor border border-primaryColor rounded-xl justify-center">
                        <span className="font-medium">Login</span>
                      </div>
                    </Link>
                    <Link href="/signup">
                      <div className="flex items-center px-4 py-3 bg-primaryColor text-white rounded-xl justify-center">
                        <span className="font-medium">Sign Up</span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 flex items-center justify-around h-16">
        <Link href="/">
          <div
            className={`flex flex-col items-center justify-center ${pathname === "/" ? "text-primaryColor" : "text-gray-500"}`}
          >
            <Home size={20} />
            <span className="text-xs mt-1">Home</span>
          </div>
        </Link>

        <Link href="/packages">
          <div
            className={`flex flex-col items-center justify-center ${pathname === "/packages" ? "text-primaryColor" : "text-gray-500"}`}
          >
            <Package size={20} />
            <span className="text-xs mt-1">Packages</span>
          </div>
        </Link>

        <Link href="/blogs">
          <div
            className={`flex flex-col items-center justify-center ${pathname.includes("/blogs") ? "text-primaryColor" : "text-gray-500"}`}
          >
            <Book size={20} />
            <span className="text-xs mt-1">Blogs</span>
          </div>
        </Link>

        <Link href={data ? "/dashboard" : "/login"}>
          <div
            className={`flex flex-col items-center justify-center ${pathname.includes("/dashboard") || pathname.includes("/login") ? "text-primaryColor" : "text-gray-500"}`}
          >
            <User size={20} />
            <span className="text-xs mt-1">{data ? "Profile" : "Login"}</span>
          </div>
        </Link>
      </div>

      {/* Space to prevent content from being hidden behind the bottom navigation */}
      <div className="h-16 w-full"></div>
    </>
  );
}
