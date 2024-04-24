"use client";
import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import animationOne from "../../../public/lottie_files/lottie_one.json";
import { SearchCheck } from "lucide-react";

export default function SectionOne() {
  return (
    <div className=" mb-4">
      <div className="xmd:grid xmd:grid-cols-2  ">
        <div className="hidden xmd:block col-span-1 mx-auto  xmd-w-full xmd:m-20">
          <Lottie animationData={animationOne} autoplay loop />
        </div>
        <div className="my-auto    px-4">
          <div className="py-8 text-3xl text-primaryColor font-semibold">
            <h1 className="text-center">
              Learner Outcomes on Courses You will take
            </h1>
          </div>
          <div className="space-y-6">
            <div className="flex">
              <SearchCheck size={64} className="px-2 text-thirdColor" />
              <div>
                Interactive Learning: Provide interactive learning materials
                such as videos, simulations, and interactive quizzes to engage
                students and enhance their understanding of various subjects.
              </div>
            </div>
            <div className="flex">
              <SearchCheck size={64} className="px-2 text-thirdColor" />
              <div>
                Personalized Learning Experience: Implement adaptive learning
                techniques to provide personalized content tailored to your
                strength, weakness, and learning pace.
              </div>
            </div>
            <div className="flex">
              <SearchCheck size={64} className="px-2 text-thirdColor" />
              <div>
                Mobile-Friendly Design: Ensure that your platform is accessible
                on various devices, including smartphones and tablets, allowing
                students to learn anytime, anywhere.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
