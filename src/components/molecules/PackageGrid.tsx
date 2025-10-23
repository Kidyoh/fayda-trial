"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package } from "@/data/packages";
import { packagesMock } from "@/data/packages";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Users, Star } from "lucide-react";

interface PackageGridProps {
  limit?: number;
  showPurchasedOnly?: boolean;
}

export function PackageGrid({
  limit,
  showPurchasedOnly = false,
}: PackageGridProps) {
  const packages = useMemo(() => {
    let filtered = packagesMock;
    if (showPurchasedOnly) {
      // In a real app, this would filter by user's purchased packages
      filtered = filtered.slice(0, 2); // Mock: show first 2 as "purchased"
    }
    if (limit) {
      filtered = filtered.slice(0, limit);
    }
    return filtered;
  }, [showPurchasedOnly, limit]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <PackageCard key={pkg.id} package={pkg} />
      ))}
    </div>
  );
}

function PackageCard({ package: pkg }: { package: Package }) {
  const getDurationText = (duration: number) => {
    if (duration === 1) return "1 Month";
    if (duration === 3) return "3 Months";
    if (duration === 6) return "6 Months";
    return `${duration} Months`;
  };

  const getPriceForDuration = (duration: number) => {
    if (duration === 1) return pkg.price1;
    if (duration === 3) return pkg.price2 || pkg.price1;
    if (duration === 6) return pkg.price3 || pkg.price1;
    return pkg.price1;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full bg-gradient-to-br from-[#c7cc3f] to-[#bf8c13]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <Users className="w-12 h-12 mx-auto mb-2" />
            <h3 className="text-lg font-semibold">{pkg.packageName}</h3>
          </div>
        </div>
        {pkg.discountStatus && (
          <Badge className="absolute top-2 right-2 bg-red-500">Sale</Badge>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {pkg.packageName}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {pkg.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">1 Month</span>
            <span className="font-semibold">{pkg.price1} ETB</span>
          </div>
          {pkg.price2 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">3 Months</span>
              <span className="font-semibold">{pkg.price2} ETB</span>
            </div>
          )}
          {pkg.price3 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">6 Months</span>
              <span className="font-semibold">{pkg.price3} ETB</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{pkg.courses.length} courses</span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1" />
            <span>Premium</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/packages/details/${pkg.id}`}>View Package</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
