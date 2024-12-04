"use client";
import React, { useEffect, useState } from "react";
import { ChevronRightCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
//import CheckPhoneNumber from "@/app/mock_package/mock_package_components/checkphonenumber";
import CheckPhoneNumber from "@/app/[locale]/mock_package/mock_package_components/checkphonenumber";
import initTranslation from "../../app/i18n";
import { TFunction } from "i18next";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { apiUrl, localUrl } from "@/apiConfig";
import DownloadAppConfirmation from "../custom_components/downloadApkDialog";

export default function CoverHome() {
  const { t } = useTranslation();

  let texts: any = [];
  if (t) {
    //texts = [t("home:info01"), t("home:info02"), t("home:info03")];
    texts = [t("home:info01"), t("home:info02")];
  }

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentText = texts[currentTextIndex];

  if (!t) {
    return <div></div>; // or any loading indicator
  }
  return (
    // <div className="ssmd:grid ssmd:grid-cols-3 h-92 pt-12 xl:pt-2 bg-gradient-to-r from-primaryColor via-emerald-600 to-primaryColor">
    //      <div className="relative ssmd:grid  ssmd:grid-cols-5 h-92 pt-12 xl:pt-2 bg-gradient-to-r from-sky-500/70  to-sky-300">
    <div className="">
      <div className="relative ssmd:grid  smd:grid-cols-6 h-92 pt-12 xl:pt-2 bg-gray-100">
        <div className="col-span-3 w-full  flex">
          <div className="relative mx-auto  h-full w-full py-5 ssmd:py-20  px-5">
            <div className="mx-auto my-auto h-24 ssmd:h-32  text-3xl smd:text-4xl lg:text-5xl font-bold px-5">
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
            <div className=" h-fit ">
              <div className="mx-4  my-10">
                <h1 className="text-primaryColor text-xl md:text-2xl font-semibold text-center  ssmd:text-left">
                  {t("slogan")}
                </h1>

                <div className="my-8 flex ">
                  {/* <a className="mx-auto md:mx-5 bg-primaryColor text-white p-3 rounded-2xl hover:bg-gray-300 hover:text-primaryColor duration-150" 
                  href={`${apiUrl}/download`}>Download App</a> */}
                
                <DownloadAppConfirmation />
                </div>
              </div>
              <div className="mt-20  pb-3 w-full flex"></div>
              {/* 
              <div className="mt-20  pb-3 w-full flex">
                <div className="bg-fourthColor  ssmd:mx-10 mx-auto w-fit px-3 py-1 rounded-2xl hover:scale-105 duration-100">
                  {" "}
                  <CheckPhoneNumber pushto={"/mock_package/selectmainfolder"} />
                </div>

                 <h1 className="bg-fourthColor mx-auto  ssmd:mx-10 text-white px-3 py-1 rounded-2xl w-fit cursor-pointer hover:scale-105 duration-100">
                Download App
              </h1> 


              </div> */}
            </div>
          </div>
        </div>
        {/* <div className=" w-full flex">
        <div className="hidden bg-yellow-200 ssmd:block right-0">
          <motion.img
            src="common_files/main/webbannernew.png"
            alt="Floating Image"
            className="w-full h-full"
            animate={{
              y: [-20, 20, -20],
              transition: { repeat: Infinity, duration: 7 },
            }}
          />
        </div>
        <div className="block ssmd:hidden mx-auto">
          <motion.img
            src="common_files/main/1.png"
            alt="Floating Image"
            animate={{
              y: [-20, 20, -20],
              transition: { repeat: Infinity, duration: 7 },
            }}
          />
        </div>
      </div>  */}
        <div className="smd:relative col-span-3 bg-gray-100">
          <img
            // src="common_files/main/the_girl5.png"
            src="common_files/main/bannerx01.jpg"
            className="smd:absolute w-fit  smd:bottom-0 "
            alt=""
          />
        </div>
        <div className="hidden ssmd:block absolute bottom-0  h-fit">
          <img
            src="common_files/main/the_shape2.png"
            className="h-fit"
            alt=""
          />
        </div>
        {/* <div className="hidden ssmd:block absolute bottom-10 left-36  h-fit">
          <img
            src="common_files/main/the_arrow2.png"
            className="h-fit"
            alt=""
          />
        </div> */}
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
