"use client";

import React, { useEffect, useState } from "react";
import { apiUrl } from "@/apiConfig";
import { Trophy, Medal, Crown, Star, Award, Users, Target } from "lucide-react";
import { getAccessToken } from "@/lib/tokenManager";

export default function LeaderBoard() {
  const [data, setData] = useState<any>([]);
  const [data2, setData2] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gradeFetched, setGradeFetched] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [activeTab, setActiveTab] = useState("global");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = getAccessToken();
        const response = await fetch(`${apiUrl}/newlogin/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        if (!response.ok) throw new Error("Failed to fetch profile");
        
        const jsonData = await response.json();
        setGradeFetched(jsonData.gread);
        setCurrentUserId(jsonData.id);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/leaderboard/all/toptwenty`);
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (gradeFetched) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${apiUrl}/leaderboard/grade/toptwenty/${gradeFetched}`
          );
          const jsonData = await response.json();
          setData2(jsonData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [gradeFetched]);

  const TopThreeCard = ({ student, rank }: { student: any; rank: number }) => {
    const icons = {
      1: <Crown className="w-8 h-8 text-[#c7cc3f]" />,
      2: <Medal className="w-8 h-8 text-[#bf8c13]" />,
      3: <Award className="w-8 h-8 text-[#07705d]" />
    };

    const colors = {
      1: "from-[#c7cc3f]/20 to-[#c7cc3f]/5 border-[#c7cc3f]/30",
      2: "from-[#bf8c13]/20 to-[#bf8c13]/5 border-[#bf8c13]/30",
      3: "from-[#07705d]/20 to-[#07705d]/5 border-[#07705d]/30"
    };

    return (
      <div className={`relative p-6 rounded-lg border-2 bg-gradient-to-br ${colors[rank as keyof typeof colors]}`}>
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 border-2 border-gray-100">
          {icons[rank as keyof typeof icons]}
        </div>
        
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id={`pattern-${rank}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <polygon points="15,2 28,15 15,28 2,15" fill="currentColor" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#pattern-${rank})`}/>
          </svg>
        </div>
        
        <div className="relative z-10 mt-4 text-center">
          <div className="mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-white text-[#07705d] rounded-full text-lg font-bold border-2 border-[#07705d]/20">
              {rank}
            </span>
          </div>
          <h3 className="text-lg font-sendako font-bold text-[#07705d]">
            {student?.firstName} {student?.lastName}
          </h3>
          <p className="text-sm text-gray-600 mt-1">Grade {student?.gread}</p>
          <div className="mt-3">
            <div className="text-2xl font-bold text-[#07705d]">
              {parseFloat(student?.points).toFixed(1)}
            </div>
            <span className="text-sm text-gray-600">points</span>
          </div>
        </div>
      </div>
    );
  };

  const LeaderboardRow = ({ student, index }: { student: any; index: number }) => {
    const isCurrentUser = student?.id === currentUserId;
    
    return (
      <div className={`p-4 rounded-lg transition-colors ${
        isCurrentUser
          ? "bg-[#07705d]/10 border-2 border-[#07705d]/30"
          : "bg-white border-2 border-gray-100 hover:border-[#bf8c13]/30"
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${
                isCurrentUser 
                  ? "bg-[#07705d] text-white" 
                  : "bg-gray-100 text-gray-700"
              }`}>
                {index + 4}
              </span>
            </div>
            <div>
              <div className={`text-sm font-medium ${isCurrentUser ? "text-[#07705d]" : "text-gray-900"}`}>
                {student?.firstName} {student?.lastName}
                {isCurrentUser && <span className="ml-2 text-xs bg-[#07705d] text-white px-2 py-1 rounded-full">You</span>}
              </div>
              <div className="text-xs text-gray-500">Grade {student?.gread}</div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-lg font-bold ${isCurrentUser ? "text-[#07705d]" : "text-[#bf8c13]"}`}>
              {parseFloat(student?.points).toFixed(1)}
            </div>
            <div className="text-xs text-gray-500">points</div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full py-20 flex items-center justify-center bg-gradient-to-br from-green-50/30 via-yellow-50/20 to-orange-50/30">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-[#07705d] border-r-[#bf8c13]"></div>
          <div className="absolute inset-2 animate-spin rounded-full h-12 w-12 border-4 border-transparent border-b-[#c7cc3f] border-l-[#07705d]" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "global", label: "Global Rankings", icon: Users, count: data?.length || 0 },
    { id: "grade", label: "Grade Rankings", icon: Target, count: data2?.length || 0 },
  ];

  const currentData = activeTab === "global" ? data : data2;

  return (
    <div className="w-full min-h-screen pt-24 bg-gradient-to-br from-green-50/30 via-yellow-50/20 to-orange-50/30 relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="leaderboard-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <polygon points="30,5 55,30 30,55 5,30" fill="#07705d" opacity="0.3"/>
              <polygon points="30,15 45,30 30,45 15,30" fill="#bf8c13" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaderboard-pattern)"/>
        </svg>
      </div>

      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#07705d] to-[#bf8c13] rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-sendako font-bold text-[#07705d] mb-2">Leaderboard</h1>
            <p className="text-gray-600">Compete with the best and rise to the top!</p>
          </div>

          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#07705d] text-white"
                      : "bg-white text-gray-600 hover:bg-[#07705d]/10 border-2 border-[#07705d]/20"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id 
                      ? "bg-white/20 text-white" 
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="space-y-8">
            {currentData?.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {currentData?.slice(0, 3).map((student: any, index: number) => (
                    <TopThreeCard key={index} student={student} rank={index + 1} />
                  ))}
                </div>

                {currentData?.length > 3 && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg border-2 border-[#07705d]/20 p-6">
                    <h3 className="text-xl font-sendako font-bold text-[#07705d] mb-6 flex items-center">
                      <Star className="w-5 h-5 mr-2" />
                      Top Performers
                    </h3>
                    
                    <div className="space-y-4">
                      {currentData?.slice(3).map((student: any, index: number) => (
                        <LeaderboardRow key={index} student={student} index={index} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {currentData?.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-[#07705d]/10 to-[#bf8c13]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-12 h-12 text-[#07705d]" />
                </div>
                <h3 className="text-xl font-sendako font-bold text-[#07705d] mb-2">No Rankings Available</h3>
                <p className="text-gray-600">Start earning points to appear on the leaderboard!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
