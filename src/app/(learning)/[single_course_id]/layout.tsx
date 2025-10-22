"use client";
import React, { useState } from "react";
import MaterialNav from "./material_nav";
import { ScrollText } from "lucide-react";
import { useParams } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [drawerStatus, setDrawerStatus] = useState(false);
  const params = useParams();
  const courseId = params.single_course_id;

  const toggleDrawer = () => {
    setDrawerStatus(!drawerStatus);
  };

  // Don't render the navigation layout for non-course routes
  if (!courseId || typeof courseId !== "string") {
    return <div className="w-full">{children}</div>;
  }

  // Don't render for invalid routes
  const invalidRoutes = [
    "careers",
    "contact",
    "about",
    "terms_of_service",
    "privacy-policy",
    "help",
    "f_a_q",
    "blogs",
    "teach",
    "courses",
    "competitions",
  ];
  if (invalidRoutes.includes(courseId.toLowerCase())) {
    return <div className="w-full">{children}</div>;
  }

  // Only render for actual numeric course IDs or valid course identifiers
  if (!/^\d+$/.test(courseId) && !courseId.startsWith("course_")) {
    return <div className="w-full">{children}</div>;
  }
  return (
    <div className=" relative space-y-4 grid grid-cols-8 py-7 m-2 xmd:my-0">
      {/** hidden */}
      <div className=" lg:col-span-2 xmd:col-span-3">
        <MaterialNav />
      </div>
      <div className="col-span-8 lg:col-span-6 xmd:col-span-5 w-full ">
        <div className="">{children}</div>
      </div>

      <div>
        <div
          onClick={() => toggleDrawer()}
          className="block lg:hidden z-40 absolute top-1 bg-primaryColor text-white rounded p-1 "
        >
          <ScrollText size={32} />
        </div>

        <div
          className={`absolute top-7 z-10 shadow-xl rounded bg-white shadow-primaryColor ${
            drawerStatus ? "block" : "hidden"
          }`}
          onClick={() => toggleDrawer()}
        >
          <MaterialNav />
        </div>
      </div>
    </div>
  );
}
