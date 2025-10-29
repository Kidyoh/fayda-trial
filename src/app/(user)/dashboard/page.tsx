"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsGrid from "@/components/dashboard/StatsGrid";
import { apiUrl } from "@/apiConfig";
import { getAccessToken } from "@/lib/tokenManager";

export default function DashBoard() {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = getAccessToken();

        // Add timeout to prevent infinite loading
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch(`${apiUrl}/newlogin/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        console.log("Profile data received:", data); // Debug log
        setUserData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setIsLoading(false);
        // If there's an error, still allow the component to render
        setUserData(null);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primaryColor"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        {userData ? (
          <StatsGrid userData={userData} />
        ) : (
          <div className="text-center py-12">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Data Available
            </h3>
            <p className="text-gray-600 mb-4">Unable to load dashboard data.</p>
            <p className="text-sm text-gray-500">
              Please check your connection and try again later.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
