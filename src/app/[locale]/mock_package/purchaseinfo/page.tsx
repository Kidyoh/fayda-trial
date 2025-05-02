"use client";
import React, { useEffect } from "react";
import useSelectedMockPackageStore from "@/app/[locale]/store/selectedmockpackageStore";
import { useRouter } from "next/navigation";
import { MockPurchaseDialogCustom } from "@/components/custom_components/mockPurchaseDialog";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Info, Package, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function MockPackagePurchaseInfo() {
  const { push } = useRouter();

  const mockPackageSelected = useSelectedMockPackageStore(
    (state) => state.mockpackage
  );

  useEffect(() => {
    if (mockPackageSelected.id == undefined) {
      push("/mock_package");
    }
  }, [mockPackageSelected.id, push]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="overflow-hidden border-gray-200 shadow-lg">
          {/* Header */}
          <div className="bg-primaryColor text-white p-6 flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-full">
              <ShoppingCart className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Purchase Required</h1>
              <p className="text-white/80">
                Complete your purchase to access the mock exam package
              </p>
            </div>
          </div>

          {/* Package Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Package className="h-5 w-5 text-primaryColor" />
              <h2 className="text-lg font-semibold text-gray-900">Package Details</h2>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-xl font-bold text-primaryColor">
                {mockPackageSelected.title}
              </h3>
              {mockPackageSelected.description && (
                <p className="mt-2 text-gray-600">
                  {mockPackageSelected.description}
                </p>
              )}
              {mockPackageSelected.price && (
                <div className="mt-3 inline-flex items-center px-3 py-1 bg-primaryColor/10 text-primaryColor rounded-full font-medium">
                  Price: {mockPackageSelected.price} Birr
                </div>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Info className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-700">
                  You have not purchased the mock exam package <span className="font-semibold text-primaryColor">{mockPackageSelected.title}</span> with your phone number yet. You need to purchase it once, and you will have access to it using your phone.
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="p-6 bg-gray-50 flex justify-center">
            <div className="w-full max-w-xs">
              <MockPurchaseDialogCustom />
            </div>
          </div>
          
          {/* Footer Note */}
          <div className="px-6 pb-6 pt-2 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <AlertCircle className="h-4 w-4" />
              <p>You will only need to purchase this package once</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
