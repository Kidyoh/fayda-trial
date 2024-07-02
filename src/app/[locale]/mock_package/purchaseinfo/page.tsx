"use client";
import React, { useEffect } from "react";
import useSelectedMockPackageStore from "@/app/[locale]/store/selectedmockpackageStore";
import { useRouter } from "next/navigation";
import { MockPurchaseDialogCustom } from "@/components/custom_components/mockPurchaseDialog";

export default function MockPackagePurchaseInfo() {
  const { push } = useRouter();

  const mockPackageSelected = useSelectedMockPackageStore(
    (state) => state.mockpackage
  );

  useEffect(() => {
    console.log("Component mounted");
    if (mockPackageSelected.id == undefined) {
      push("/mock_package");
    }
  }, []); //

  //console.log("Mock: " + JSON.stringify(mockPackageSelected));
  console.log("first :" + mockPackageSelected.id);
  return (
    <div>
      <div className="my-20 w-1/2 mx-auto text-primaryColor border-2 border-primaryColor p-4">
        <h1 className="text-center text-2xl font-semibold py-3">Info</h1>
        <h1 className="text-center">
          {" "}
          You have not purchased Mock Exam package{" "}
          <span className="text-secondaryColor underline">
            {mockPackageSelected.title}{" "}
          </span>
          with your phone number. You need to purchase it once, and you will
          have access to it using your phone.
        </h1>

        <div className="w-full my-4">
          <div className="w-fit mx-auto">
            <MockPurchaseDialogCustom />
          </div>
        </div>
      </div>
    </div>
  );
}
