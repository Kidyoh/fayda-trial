"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { apiUrl } from "@/apiConfig";
import { getAccessToken } from "@/lib/tokenManager";
import {
  Package,
  Calendar,
  ExternalLink,
  ShoppingCart,
  CheckCircle,
  Clock,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

export default function PackagesPage() {
  const [packagesList, setPackagesList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

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

  const getDaysRemaining = (expiryDate: string) => {
    if (!expiryDate) return null;
    const days = Math.max(
      Math.ceil(
        (new Date(expiryDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24),
      ),
      0,
    );
    return days;
  };

  const filters = [
    { id: "all", label: "All Packages", count: packagesList.length },
    {
      id: "active",
      label: "Active",
      count: packagesList.filter(
        (pkg) => pkg.paymentStatus === "active" || !pkg.paymentStatus,
      ).length,
    },
    {
      id: "expired",
      label: "Expired",
      count: packagesList.filter(
        (pkg) => pkg.expiryDate && getDaysRemaining(pkg.expiryDate) === 0,
      ).length,
    },
  ];

  const filteredPackages = packagesList.filter((pkg) => {
    if (activeFilter === "active")
      return pkg.paymentStatus === "active" || !pkg.paymentStatus;
    if (activeFilter === "expired")
      return pkg.expiryDate && getDaysRemaining(pkg.expiryDate) === 0;
    return true;
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-[#07705d] border-r-[#bf8c13]"></div>
            <div
              className="absolute inset-2 animate-spin rounded-full h-12 w-12 border-4 border-transparent border-b-[#c7cc3f] border-l-[#07705d]"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            ></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-sendako font-bold text-[#07705d] mb-2">
            My Packages
          </h2>
          <p className="text-gray-600">
            Access your purchased learning packages and track your progress
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeFilter === filter.id
                  ? "bg-[#07705d] text-white"
                  : "bg-white text-gray-600 hover:bg-[#07705d]/10 border-2 border-[#07705d]/20"
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        {packagesList.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-[#07705d]/10 to-[#bf8c13]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-[#07705d]" />
            </div>
            <h3 className="text-xl font-sendako font-bold text-[#07705d] mb-2">
              No Packages Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Purchase learning packages to access comprehensive course
              collections
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#07705d] text-white rounded-lg hover:bg-[#07705d]/90 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Browse Packages</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((item, index) => {
              const daysRemaining = getDaysRemaining(item.expiryDate);
              const isExpired = daysRemaining === 0;
              const isActive =
                item.paymentStatus === "active" || !item.paymentStatus;

              return (
                <Link
                  key={index}
                  href={`/details/${item?.packagesId}`}
                  className="block"
                >
                  <div className="bg-white rounded-lg border-2 border-[#07705d]/20 overflow-hidden hover:border-[#bf8c13] transition-colors">
                    <div className="relative">
                      {item?.Package?.thumbnailUrl ? (
                        <img
                          src={item?.Package?.thumbnailUrl}
                          alt={item?.Package?.packageName}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-[#07705d]/10 to-[#bf8c13]/10 flex items-center justify-center">
                          <Package className="w-16 h-16 text-[#07705d]" />
                        </div>
                      )}

                      <div className="absolute top-4 right-4">
                        {isExpired ? (
                          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Expired</span>
                          </div>
                        ) : isActive ? (
                          <div className="bg-[#bf8c13] text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>Active</span>
                          </div>
                        ) : (
                          <div className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm">
                            {item.paymentStatus}
                          </div>
                        )}
                      </div>

                      <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ExternalLink className="w-12 h-12 text-white" />
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-sendako font-bold text-[#07705d] mb-4 line-clamp-2">
                        {item?.Package?.packageName || `Package ${index + 1}`}
                      </h3>

                      <div className="space-y-3">
                        {item?.Package?.courses?.length && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 flex items-center space-x-1">
                              <BookOpen className="w-4 h-4" />
                              <span>Courses</span>
                            </span>
                            <span className="text-[#07705d] font-medium">
                              {item.Package.courses.length}
                            </span>
                          </div>
                        )}

                        {item.expiryDate && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>Expires</span>
                            </span>
                            <span
                              className={`font-medium ${isExpired ? "text-red-600" : "text-[#bf8c13]"}`}
                            >
                              {new Date(item.expiryDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}

                        {daysRemaining !== null && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">
                              Days Remaining
                            </span>
                            <span
                              className={`font-bold ${
                                daysRemaining === 0
                                  ? "text-red-600"
                                  : daysRemaining <= 7
                                    ? "text-orange-600"
                                    : "text-green-600"
                              }`}
                            >
                              {daysRemaining === 0 ? "Expired" : daysRemaining}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-6">
                        <div
                          className={`w-full py-2 px-4 rounded-lg text-center font-medium transition-colors ${
                            isExpired
                              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                              : "bg-[#07705d] text-white hover:bg-[#07705d]/90"
                          }`}
                        >
                          {isExpired ? "Package Expired" : "Access Package"}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {packagesList.length > 0 && (
          <div className="bg-white rounded-lg border-2 border-[#c7cc3f]/20 p-6 mt-8">
            <h3 className="text-xl font-sendako font-bold text-[#c7cc3f] mb-4">
              Package Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#07705d] mb-1">
                  {packagesList.length}
                </div>
                <div className="text-gray-600">Total Packages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#bf8c13] mb-1">
                  {
                    packagesList.filter(
                      (pkg) =>
                        pkg.paymentStatus === "active" || !pkg.paymentStatus,
                    ).length
                  }
                </div>
                <div className="text-gray-600">Active Packages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {
                    packagesList.filter(
                      (pkg) =>
                        pkg.expiryDate &&
                        getDaysRemaining(pkg.expiryDate) === 0,
                    ).length
                  }
                </div>
                <div className="text-gray-600">Expired Packages</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
