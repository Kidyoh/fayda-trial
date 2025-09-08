"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Menu, X, Home, Search, Package, BookOpen, User, 
  Bell, ChevronRight, LogOut, Bot, Book, Trophy, Info 
} from "lucide-react";
import LanguageChanger from "../LanguageChanger";
import { usePathname } from "next/navigation";
import { apiUrl } from "@/apiConfig";
import { clearAccessToken, getAccessToken } from "../../lib/tokenManager";
import { CartIcon } from "../cart/CartIcon";

export default function NavBarMobile({ data, notificationNumber }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsOpen(false);
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Toggle expanded menu
  const toggleMenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  return (
    <>
      {/* Fixed header with logo and menu button */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 px-4 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <img
            className="h-8 w-auto"
            src="/common_files/main/smallfulllogo.png"
            alt="Fayida"
          />
        </Link>
        
        <div className="flex items-center space-x-2">
          <CartIcon />
          
          <Link href="/notifications" className="relative p-2">
            <Bell size={20} className="text-gray-600" />
            {notificationNumber > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificationNumber}
              </span>
            )}
          </Link>
          
          <button 
            onClick={() => setIsOpen(true)}
            className="p-2 text-gray-600 focus:outline-none"
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
              className="absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white overflow-y-auto"
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
                <LanguageChanger />
              </div>

              {/* Search bar */}
              <div className="p-4 border-b border-gray-100">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primaryColor/20 text-sm"
                  />
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-primaryColor text-white p-1 rounded-full"
                  >
                    <ChevronRight size={16} />
                  </button>
                </form>
              </div>

              {/* Menu links */}
              <div className="py-2">
                <Link href="/">
                  <div className={`flex items-center px-4 py-3 ${pathname === '/' ? 'text-primaryColor bg-primaryColor/5' : 'text-gray-700'}`}>
                    <Home size={20} className="mr-3" />
                    <span className="font-medium">Home</span>
                  </div>
                </Link>

                {/* Academic Categories */}
                <div>
                  <div 
                    className="flex items-center justify-between px-4 py-3 text-gray-700 cursor-pointer"
                    onClick={() => toggleMenu('academic')}
                  >
                    <div className="flex items-center">
                      <BookOpen size={20} className="mr-3" />
                      <span className="font-medium">Academic</span>
                    </div>
                    <ChevronRight size={18} className={`transition-transform duration-200 ${expandedMenu === 'academic' ? 'rotate-90' : ''}`} />
                  </div>
                  
                  {expandedMenu === 'academic' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-gray-50 overflow-hidden"
                    >
                      <Link href="/filter_packages/grade9">
                        <div className="px-12 py-2 text-gray-600 hover:text-primaryColor">
                          Grade 9
                        </div>
                      </Link>
                      <Link href="/filter_packages/grade10">
                        <div className="px-12 py-2 text-gray-600 hover:text-primaryColor">
                          Grade 10
                        </div>
                      </Link>
                      <Link href="/filter_packages/grade11">
                        <div className="px-12 py-2 text-gray-600 hover:text-primaryColor">
                          Grade 11
                        </div>
                      </Link>
                      <Link href="/filter_packages/grade12">
                        <div className="px-12 py-2 text-gray-600 hover:text-primaryColor">
                          Grade 12
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </div>

                {/* Other menu items */}
                <Link href="/search">
                  <div className={`flex items-center px-4 py-3 ${pathname.includes('/search') ? 'text-primaryColor bg-primaryColor/5' : 'text-gray-700'}`}>
                    <Package size={20} className="mr-3" />
                    <span className="font-medium">Packages</span>
                  </div>
                </Link>

                <Link href="/blogs">
                  <div className={`flex items-center px-4 py-3 ${pathname.includes('/blogs') ? 'text-primaryColor bg-primaryColor/5' : 'text-gray-700'}`}>
                    <Book size={20} className="mr-3" />
                    <span className="font-medium">Blogs</span>
                  </div>
                </Link>

                <Link href="/leaderboard">
                  <div className={`flex items-center px-4 py-3 ${pathname.includes('/leaderboard') ? 'text-primaryColor bg-primaryColor/5' : 'text-gray-700'}`}>
                    <Trophy size={20} className="mr-3" />
                    <span className="font-medium">Leaderboard</span>
                  </div>
                </Link>

                <Link href="/competitions">
                  <div className={`flex items-center px-4 py-3 ${pathname.includes('/competitions') && !pathname.includes('/demo') ? 'text-primaryColor bg-primaryColor/5' : 'text-gray-700'}`}>
                    <Trophy size={20} className="mr-3" />
                    <span className="font-medium">Competitions</span>
                  </div>
                </Link>

                <Link href="/competitions/demo">
                  <div className={`flex items-center px-4 py-3 ${pathname.includes('/competitions/demo') ? 'text-primaryColor bg-primaryColor/5' : 'text-gray-700'}`}>
                    <Trophy size={20} className="mr-3" />
                    <span className="font-medium">Competitions Demo</span>
                  </div>
                </Link>
                
                <Link href="/to_bot">
                  <div className={`flex items-center px-4 py-3 ${pathname.includes('/to_bot') ? 'text-primaryColor bg-primaryColor/5' : 'text-gray-700'}`}>
                    <Bot size={20} className="mr-3" />
                    <span className="font-medium">Telegram Bot</span>
                  </div>
                </Link>

                <Link href="/about_us">
                  <div className={`flex items-center px-4 py-3 ${pathname.includes('/about_us') ? 'text-primaryColor bg-primaryColor/5' : 'text-gray-700'}`}>
                    <Info size={20} className="mr-3" />
                    <span className="font-medium">About Us</span>
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
          <div className={`flex flex-col items-center justify-center ${pathname === '/' ? 'text-primaryColor' : 'text-gray-500'}`}>
            <Home size={20} />
            <span className="text-xs mt-1">Home</span>
          </div>
        </Link>
        
        <Link href="/search">
          <div className={`flex flex-col items-center justify-center ${pathname.includes('/search') || pathname.includes('/packages_access') ? 'text-primaryColor' : 'text-gray-500'}`}>
            <Package size={20} />
            <span className="text-xs mt-1">Search</span>
          </div>
        </Link>
        
        <Link href="/blogs">
          <div className={`flex flex-col items-center justify-center ${pathname.includes('/blogs') ? 'text-primaryColor' : 'text-gray-500'}`}>
            <Book size={20} />
            <span className="text-xs mt-1">Blogs</span>
          </div>
        </Link>
        
        <Link href={data ? "/dashboard" : "/login"}>
          <div className={`flex flex-col items-center justify-center ${pathname.includes('/dashboard') || pathname.includes('/login') ? 'text-primaryColor' : 'text-gray-500'}`}>
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
