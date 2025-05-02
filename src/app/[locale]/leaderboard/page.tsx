"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiUrl } from "@/apiConfig";
import { motion } from "framer-motion";
import { Trophy, Medal, Crown, Star, Award } from "lucide-react";
import { getAccessToken } from "@/lib/tokenManager";

export default function LeaderBoard() {
  const [data, setData] = useState<any>([]);
  const [data2, setData2] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gradeFetched, setGradeFetched] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");

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
      1: <Crown className="w-8 h-8 text-yellow-500" />,
      2: <Medal className="w-8 h-8 text-gray-400" />,
      3: <Award className="w-8 h-8 text-amber-600" />
    };

    const colors = {
      1: "bg-yellow-100 border-yellow-300",
      2: "bg-gray-100 border-gray-300",
      3: "bg-amber-50 border-amber-200"
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: rank * 0.1 }}
        className={`relative p-6 rounded-2xl border-2 ${colors[rank as keyof typeof colors]} backdrop-blur-sm`}
      >
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          {icons[rank as keyof typeof icons]}
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-xl font-bold text-gray-900">
            {student?.firstName} {student?.lastName}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Grade {student?.gread}</p>
          <div className="mt-3 text-2xl font-bold text-primaryColor">
            {parseFloat(student?.points).toFixed(1)}
            <span className="text-sm text-gray-500 ml-1">points</span>
          </div>
        </div>
      </motion.div>
    );
  };

  const LeaderboardRow = ({ student, index }: { student: any; index: number }) => {
    const isCurrentUser = student?.id === currentUserId;
    
    return (
      <motion.tr
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className={`${
          isCurrentUser
            ? "bg-primaryColor/10 border-l-4 border-primaryColor"
            : index % 2 === 0
            ? "bg-gray-50"
            : "bg-white"
        } hover:bg-gray-100 transition-colors duration-200`}
      >
        <td className="px-6 py-4 whitespace-nowrap text-center">
          <span className="text-sm font-semibold text-gray-900">
            {index + 4}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {student?.firstName} {student?.lastName}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center">
          <span className="text-sm text-gray-500">Grade {student?.gread}</span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center">
          <span className="text-sm font-semibold text-primaryColor">
            {parseFloat(student?.points).toFixed(1)}
          </span>
        </td>
      </motion.tr>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primaryColor"></div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center mb-4"
          >
            <Trophy className="w-12 h-12 text-primaryColor" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
          <p className="mt-2 text-gray-600">Compete with the best and rise to the top!</p>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="account" className="flex-1">
              Global Rankings
            </TabsTrigger>
            <TabsTrigger value="password" className="flex-1">
              Grade Rankings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <div className="space-y-8">
              {/* Top 3 Players */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {data?.slice(0, 3).map((student: any, index: number) => (
                  <TopThreeCard key={index} student={student} rank={index + 1} />
                ))}
              </div>

              {/* Rest of the Leaderboard */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rank
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Grade
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Points
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {data?.slice(3).map((student: any, index: number) => (
                        <LeaderboardRow key={index} student={student} index={index} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="password">
            <div className="space-y-8">
              {/* Top 3 Players in Grade */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {data2?.slice(0, 3).map((student: any, index: number) => (
                  <TopThreeCard key={index} student={student} rank={index + 1} />
                ))}
              </div>

              {/* Rest of the Grade Leaderboard */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rank
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Grade
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Points
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {data2?.slice(3).map((student: any, index: number) => (
                        <LeaderboardRow key={index} student={student} index={index} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
