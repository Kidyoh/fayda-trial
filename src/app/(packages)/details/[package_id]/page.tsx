import React from "react";
import PackageDetailsRendered from "../package_details_rendered";
import FooterServer from "@/components/main_components/footer_server";

export default function PackageDetails({ params }: any) {
  const PackageId = params.package_id;

  return (
    <div className="">
      <PackageDetailsRendered className="" package_id={PackageId} />
      {/* <div className="h-screen mt-12 flex flex-col justify-end">
        <FooterServer />
      </div> */}
    </div>
  );
}
