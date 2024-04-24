"use client";
import React, { useEffect, useState } from "react";
import { ChevronRightCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CoverHome() {
  const texts = [
    "Learning Simplified: Online courses that pave your path. ",
    "Education Unbound: Learn on your terms, anytime, anywhere.",
    "Effortless Learning: Streamlined courses, maximized results.",
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentText = texts[currentTextIndex];

  return (
    <div className=" ssmd:grid ssmd:grid-cols-3  h-92 pt-12 xl:pt-2 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-200 ">
      <div className="col-span-2 w-full  flex">
        <div className="mx-auto my-auto   px-5">
          <div className="mx-auto my-auto  text-3xl smd:text-4xl lg:text-5xl font-bold px-5">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center  ssmd:text-left"
              >
                {currentText}
              </motion.h1>
            </AnimatePresence>
          </div>
          <div className="mx-4 my-10">
            <h1 className="text-white text-xl md:text-2xl font-semibold text-center  ssmd:text-left">
              Education for All, Anytime, Anywhere!
            </h1>
          </div>
          <div className="mt-20  pb-3 w-full flex">
            <h1 className="bg-primaryColor mx-auto  ssmd:mx-10 text-white px-3 py-1 rounded-2xl w-fit cursor-pointer hover:scale-105 duration-100">
              Download App
            </h1>
          </div>
        </div>
      </div>
      <div className=" w-full flex">
        {/* <img className="w-full " src="common_files/main/cover4.png" alt="" /> */}
        <div className="hidden ssmd:block right-0">
          <motion.img
            src="common_files/main/cover4.png"
            alt="Floating Image"
            animate={{
              y: [-20, 20, -20],
              transition: { repeat: Infinity, duration: 7 },
            }}
          />
        </div>
        <div className="block ssmd:hidden mx-auto">
          <motion.img
            src="common_files/main/cover5.png"
            alt="Floating Image"
            animate={{
              y: [-20, 20, -20],
              transition: { repeat: Infinity, duration: 7 },
            }}
          />
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
