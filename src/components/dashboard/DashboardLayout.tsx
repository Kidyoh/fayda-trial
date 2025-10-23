"use client";
import { apiUrl } from "@/apiConfig";
import ProfileTab from "./ProfileTab";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAccessToken, setAccessToken } from "../../lib/tokenManager";
import {
  Home,
  LayoutGrid,
  BookOpen,
  User,
  LogOut,
  Trophy,
  Bell,
  Monitor,
  Trophy as TrophyIcon,
} from "lucide-react";
import Image from "next/image";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const pathname = usePathname();
  const router = useRouter();

  const handleUserDataUpdate = (newData: any) => {
    setUserData(newData);
  };

  useEffect(() => {
    if (pathname.includes("/dashboard/courses")) setActiveTab("mycourse");
    else if (pathname.includes("/dashboard/packages"))
      setActiveTab("mypackage");
    else if (pathname.includes("/dashboard")) setActiveTab("dashboard");
    else if (pathname.includes("/notifications")) setActiveTab("notifications");
    else if (pathname.includes("/competitions")) setActiveTab("competitions");
    else if (pathname.includes("/devices")) setActiveTab("devices");
    else setActiveTab("dashboard");
  }, [pathname]);

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

  const handleTabSelect = (tab: string, href?: string) => {
    setActiveTab(tab);
    if (tab === "profile") return;
    if (href) router.push(href);
  };

  const handleLogout = () => {
    setAccessToken("0");
    window.location.href = "/login";
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
    {
      id: "mycourse",
      label: "My Courses",
      icon: LayoutGrid,
      href: "/dashboard/courses",
    },
    {
      id: "mypackage",
      label: "My Packages",
      icon: BookOpen,
      href: "/dashboard/packages",
    },
    {
      id: "competitions",
      label: "Competitions",
      icon: TrophyIcon,
      href: "/competitions",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      href: "/notifications",
    },
    {
      id: "devices",
      label: "Devices",
      icon: Monitor,
      href: "/dashboard/devices",
    },
    { id: "profile", label: "Profile", icon: User },
  ] as const;

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-[#07705d] border-r-[#bf8c13]"></div>
          <div
            className="absolute inset-2 animate-spin rounded-full h-12 w-12 border-4 border-transparent border-b-[#c7cc3f] border-l-[#07705d]"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-50/30 via-yellow-50/20 to-orange-50/30 relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="dashboard-pattern"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="30,5 55,30 30,55 5,30"
                fill="#07705d"
                opacity="0.3"
              />
              <polygon
                points="30,15 45,30 30,45 15,30"
                fill="#bf8c13"
                opacity="0.2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dashboard-pattern)" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-0">
                <div className="p-6 border-b">
                  <div className="flex items-center space-x-3">
                    {userData?.profileImage ? (
                      <div className="relative w-12 h-12">
                        <Image
                          src={userData.profileImage}
                          alt="Profile"
                          fill
                          sizes="48px"
                          className="rounded-full border-2 border-[#07705d] object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-[#07705d] to-[#bf8c13] rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <div>
                      <h2 className="text-base font-bold text-[#07705d]">
                        {userData?.firstName} {userData?.lastName}
                      </h2>
                      {userData?.points && (
                        <div className="flex items-center space-x-1 text-xs text-[#bf8c13]">
                          <Trophy className="w-3 h-3" />
                          <span>{userData.points} Points</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <nav className="p-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() =>
                          handleTabSelect(tab.id, (tab as any).href)
                        }
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive
                            ? "bg-[#07705d]/10 text-[#07705d]"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}

                  <div className="px-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </nav>
              </div>
            </aside>

            {/* Main content */}
            <section className="lg:col-span-9">
              <div className="relative">
                {activeTab === "profile" ? (
                  <ProfileTab
                    userData={userData}
                    onUserDataUpdate={handleUserDataUpdate}
                  />
                ) : (
                  children
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
