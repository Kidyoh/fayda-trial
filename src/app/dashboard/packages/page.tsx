"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { apiUrl } from "@/apiConfig";
import { getAccessToken } from "@/lib/tokenManager";
import Link from "next/link";

export default function PackagesPage() {
  const [packagesList, setPackagesList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const accessToken = getAccessToken();
        const response = await fetch(`${apiUrl}/purchaselist/getpuchasedlist`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch packages");

        const jsonData = await response.json();
        setPackagesList(jsonData);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
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
        <h1 className="text-2xl font-bold text-gray-900">My Packages</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packagesList.map((item, index) => (
            <Link key={index} href={`/package_2/${item?.packagesId}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <img
                  src={item?.Package?.thumbnailUrl}
                  alt={item?.Package?.packageName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {item?.Package?.packageName}
                  </h2>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Courses: {item?.Package?.courses?.length}</p>
                    {item.expiryDate && (
                      <>
                        <p>
                          Expires: {new Date(item.expiryDate).toLocaleDateString()}
                        </p>
                        <p>
                          Days Remaining:{" "}
                          {Math.max(
                            Math.ceil(
                              (new Date(item.expiryDate).getTime() -
                                new Date().getTime()) /
                                (1000 * 60 * 60 * 24)
                            ),
                            0
                          ) || "Expired"}
                        </p>
                      </>
                    )}
                    {item.paymentStatus !== "active" && (
                      <p className="text-primaryColor">{item.paymentStatus}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
} 