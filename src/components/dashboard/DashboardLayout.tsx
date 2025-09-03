"use client";
import { apiUrl } from "@/apiConfig";
import ProfileTab from "./ProfileTab";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAccessToken, setAccessToken } from "../../lib/tokenManager";
import { Home, LayoutGrid, BookOpen, User, LogOut, Trophy } from "lucide-react";
 
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
    else if (pathname.includes("/dashboard/packages")) setActiveTab("mypackage");
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

  const handleTabSelect = (tab: string) => {
    setActiveTab(tab);
    if (tab === "profile") {
      // Don't navigate for profile, just set the active tab
      return;
    }
    
    switch (tab) {
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

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "mycourse", label: "My Courses", icon: LayoutGrid },
    { id: "mypackage", label: "My Packages", icon: BookOpen },
    { id: "profile", label: "Profile", icon: User },
  ];

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-[#07705d] border-r-[#bf8c13]"></div>
          <div className="absolute inset-2 animate-spin rounded-full h-12 w-12 border-4 border-transparent border-b-[#c7cc3f] border-l-[#07705d]" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pt-24 bg-gradient-to-br from-green-50/30 via-yellow-50/20 to-orange-50/30 relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dashboard-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <polygon points="30,5 55,30 30,55 5,30" fill="#07705d" opacity="0.3"/>
              <polygon points="30,15 45,30 30,45 15,30" fill="#bf8c13" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dashboard-pattern)"/>
        </svg>
      </div>

      <div className="relative z-10">
        <div className="backdrop-blur-sm border-b-2 border-[#07705d]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-6">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  {userData?.profileImage ? (
                    <img
                      src={userData.profileImage}
                      alt="Profile"
                      className="w-12 h-12 rounded-full border-2 border-[#07705d]"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-[#07705d] to-[#bf8c13] rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div>
                    <h1 className="text-lg font-sendako font-bold text-[#07705d]">
                      {userData?.firstName} {userData?.lastName}
                    </h1>
                    {userData?.points && (
                      <div className="flex items-center space-x-1 text-sm text-[#bf8c13]">
                        <Trophy className="w-4 h-4" />
                        <span>{userData.points} Points</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Logout</span>
              </button>
            </div>

            <div className="border-t border-gray-200/50">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabSelect(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? "border-[#07705d] text-[#07705d]"
                          : "border-transparent text-gray-500 hover:text-[#bf8c13] hover:border-[#bf8c13]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative">
            {activeTab === "profile" ? (
              <ProfileTab userData={userData} onUserDataUpdate={handleUserDataUpdate} />
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 