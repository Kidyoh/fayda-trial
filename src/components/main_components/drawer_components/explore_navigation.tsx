import React from "react";
import { ChevronRight } from "lucide-react";

export default function ExploreNavigation() {
  return (
    <div className="px-3 py-3 w-full ">
      <div className="grid grid-cols-4 md:w-[800px]">
        <div className="col-span-1">
          <h1 className="text-lg font-semibold py-5 underline">Categories</h1>
          <div className="space-y-3">
            <div className="flex space-x-3 cursor-pointer hover:text-primaryColor">
              <h1>Carricular</h1> <ChevronRight size={12} className="my-auto" />
            </div>
            <div className="flex space-x-3 cursor-pointer hover:text-primaryColor">
              <h1>Extra Carricular</h1>{" "}
              <ChevronRight size={12} className="my-auto" />
            </div>
            <div className="flex space-x-3 cursor-pointer hover:text-primaryColor">
              <h1>Blogs</h1> <ChevronRight size={12} className="my-auto" />
            </div>
            <div className="flex space-x-3 cursor-pointer hover:text-primaryColor">
              <h1>Advert</h1> <ChevronRight size={12} className="my-auto" />
            </div>
          </div>
        </div>
        <div className="col-span-3 bg-yellow-200">
          <h1>Main space</h1>
        </div>
      </div>
    </div>
  );
}
