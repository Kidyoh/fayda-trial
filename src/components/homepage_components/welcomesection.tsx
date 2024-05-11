"use client";

import React, { FormEvent } from "react";
import { BookOpenCheck, Blocks, Trophy, Vote } from "lucide-react";
import { apiUrl } from "@/apiConfig";

export default function WelcomeSection() {
  const sizeOfIcons = 70;
  return (
    <div className="py-7">
      <div className="w-full flex">
        <div className=" w-full">
          <h1 className="mx-auto w-fit text-2xl font-semibold text-fourthColor">
            Welcome To Fayida Academy
          </h1>
          <h1 className="px-6 sm:px-12 smd:px-20 md:px-28 xmd:px-36 text-center text-sm font-semibold">
            Welcome to our online learning platform, where students can unlock
            their full potential and embark on a journey of knowledge and
            growth.
          </h1>
          <div className="w-full flex px-4 my-4">
            <div className="aspect-ratio  mx-auto rounded-3xl overflow-hidden shadow-xl shadow-gray-600">
              <video
                controls
                controlsList="nodownload"
                // poster="/common_files/main/cover33.jpg"
                className=""
              >
                <source
                  src="/common_files/introtest.mp4"
                  type="video/mp4"
                  className=" h-1/2 overflow-clip"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 smd:grid-cols-4 gap-10 py-7 px-7">
        <div className=" rounded-lg w-full p-2  ">
          <div className="flex">
            <div className="mx-auto text-fourthColor">
              <BookOpenCheck size={sizeOfIcons} />
            </div>
          </div>
          <div className="w-full flex">
            <div className="mx-auto">
              <h1 className="text-center font-semibold">Simple</h1>
              <h1 className="text-center text-xs xmd:text-sm">
                We Use a Very Simple Way to Explain
              </h1>
            </div>
          </div>
        </div>

        <div className=" rounded-lg w-full p-2">
          <div className="flex">
            <div className="mx-auto text-fourthColor">
              <Vote size={sizeOfIcons} />
            </div>
          </div>
          <div className="w-full flex">
            <div className="mx-auto">
              <h1 className="text-center font-semibold">Best Courses</h1>
              <h1 className="text-center text-xs xmd:text-sm ">
                Well Organized and Prepared Courses
              </h1>
            </div>
          </div>
        </div>

        <div className=" rounded-lg w-full p-2">
          <div className="flex">
            <div className="mx-auto text-fourthColor">
              <Blocks size={sizeOfIcons} />
            </div>
          </div>
          <div className="w-full flex">
            <div className="mx-auto">
              <h1 className="text-center font-semibold">Materials</h1>
              <h1 className="text-center text-xs xmd:text-sm">
                Useful Books and Matierials
              </h1>
            </div>
          </div>
        </div>

        <div className=" rounded-lg w-full p-2">
          <div className="flex">
            <div className="mx-auto text-fourthColor ">
              <Trophy size={sizeOfIcons} />
            </div>
          </div>
          <div className="w-full flex">
            <div className="mx-auto">
              <h1 className="text-center font-semibold">Prizes</h1>
              <h1 className="text-center text-xs xmd:text-sm">
                Recognition for Best Scores
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
