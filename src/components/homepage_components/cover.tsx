import React from "react";
import { ChevronRightCircle } from "lucide-react";

export default function HomePageCover() {
  return (
    <div className="w-full relative">
      <img
        className="w-full bg-green-400"
        src="common_files/main/cover.jpg"
        alt=""
      />
      <div className="absolute top-20 text-white text-5xl font-semibold w-1/2 flex">
        <h1 className="ml-4 w-full text-center mx-auto">
          Achieve Academic Excellence, Embrace Virtual Education.
        </h1>
      </div>
      <div className="absolute bottom-20 text-white text-4xl font-semibold w-1/2 flex">
        <div className="mx-auto space-y-2">
          <div className="flex space-x-2 hover:text-yellow-300  duration-150">
            <div className="my-auto">
              <ChevronRightCircle size={32} />
            </div>
            <h1 className="">Easy to Undersand</h1>
          </div>
          <div className="flex space-x-2 pl-6 hover:text-yellow-300  duration-150">
            <div className="my-auto">
              <ChevronRightCircle size={32} />
            </div>
            <h1 className="">Clear Explanations</h1>
          </div>
          <div className="flex space-x-2 pl-12 hover:text-yellow-300  duration-150">
            <div className="my-auto">
              <ChevronRightCircle size={32} />
            </div>
            <h1 className="">Complete Guiedance</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /*    <div className=" bg-gradient-to-r from-sky-400 via-blue-500 to-sky-200 grid grid-cols-2 ">
      <div className="w-full h-full flex">
        <div className="mx-auto my-auto px-14 text-center">
          <h1 className=" text-3xl font-semibold text-white">
            Unlock the Power of Learning, Unleash Your Success!
          </h1>
          <img src="common_files/logo.png" alt="" />
          <div className="flex space-x-4">
            <div className="bg-thirdColor  rounded text-secondaryColor px-3 py-2">
              <button>Get Started Now</button>
            </div>
            <div className=" border-2 border-thirdColor text-yellow-400 rounded px-3 py-2">
              <button>View Packages</button>
            </div>
          </div>
        </div>
      </div>
      <div className=" ">
        <img className="" src="common_files/main/cover.jpg" alt="" />
      </div>
    </div> */
}
