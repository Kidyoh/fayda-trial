"use client";
import React, { useState } from "react";
import MaterialNav from "./material_nav";
import { ScrollText } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [drawerStatus, setDrawerStatus] = useState(false);

  const toggleDrawer = () => {
    setDrawerStatus(!drawerStatus);
  };
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
