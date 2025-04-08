"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import ProfileCard from "./ProfileCard";
import Sidebar from "./Sidebar";
import ProfileDetails from "@/app/[locale]/profile/page";
import { apiUrl } from "@/apiConfig";
import { setAccessToken, getAccessToken } from "../../lib/tokenManager";
import Footer from "../main_components/footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Get the current active menu based on the pathname
  const getActiveMenu = (path: string) => {
    if (path.includes("/dashboard/courses")) return "mycourse";
    if (path.includes("/dashboard/packages")) return "mypackage";
    if (showProfile) return "profile";
    return "dashboard";
  };

  const [menuSelection, setMenuSelection] = useState(getActiveMenu(pathname));

  useEffect(() => {
    const accessToken = getAccessToken();
    
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${apiUrl}/newlogin/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        if (!response.ok) throw new Error("Failed to fetch profile");
        
        const data = await response.json();
        setUserData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleMenuSelect = (menu: string) => {
    if (menu === "profile") {
      setShowProfile(true);
      setMenuSelection("profile");
      return;
    }

    setShowProfile(false);
    setMenuSelection(menu);
    switch (menu) {
      case "dashboard":
        router.push("/dashboard");
        break;
      case "mycourse":
        router.push("/dashboard/courses");
        break;
      case "mypackage":
        router.push("/dashboard/packages");
        break;
    }
  };

  const handleLogout = () => {
    setAccessToken("0");
    window.location.href = "/login";
  };

  const handleProfileClose = () => {
    setShowProfile(false);
    setMenuSelection(getActiveMenu(pathname));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primaryColor"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 fixed h-screen overflow-y-auto">
        <div className="py-6">
          <ProfileCard userData={userData} />
          <Sidebar
            activeMenu={menuSelection}
            onMenuSelect={handleMenuSelect}
            onLogout={handleLogout}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <div className="p-8 bg-gray-50 min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {showProfile ? (
              <ProfileDetails />
            ) : (
              children
            )}
          </motion.div>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
} 