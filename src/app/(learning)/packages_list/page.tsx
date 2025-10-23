"use client";
import React from "react";
import { PackageGrid } from "@/components/molecules/PackageGrid";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Search, Package } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function PackagesList() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            Please log in to view your packages.
          </p>
          <Button asChild>
            <a href="/login">Sign In</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Packages</h1>
              <p className="mt-2 text-gray-600">
                Access your purchased learning packages
              </p>
            </div>

            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search packages..."
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7cc3f]">
                <option value="">All Durations</option>
                <option value="1">1 Month</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7cc3f]">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="mb-8">
          <PackageGrid showPurchasedOnly={true} />
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] rounded-lg p-8 text-white text-center">
          <div className="flex items-center justify-center mb-4">
            <Package className="w-8 h-8 mr-3" />
            <h2 className="text-2xl font-bold">Explore More Packages</h2>
          </div>
          <p className="mb-6 opacity-90">
            Discover comprehensive learning bundles for all subjects
          </p>
          <Button variant="secondary" size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Browse All Packages
          </Button>
        </div>
      </div>
    </div>
  );
}
