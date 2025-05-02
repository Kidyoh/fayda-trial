"use client";
import React, { useEffect, useState } from "react";
import { ChevronRightCircle, ArrowRight, Download, ChevronDown } from "lucide-react";
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
    <div className="relative min-h-screen overflow-hidden bg-gray-50">
      {/* Hero Image with Overlay */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
          <img
            src="/common_files/main/bannerx01.jpg"
            alt="Learning Platform"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 py-12 lg:py-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentText}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
                  {currentText}
                </h1>
                
                <p className="text-xl sm:text-2xl text-gray-200 max-w-xl">
                  {t("slogan")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto"
                  >
                    <DownloadAppConfirmation />
                  </motion.div>
                  
                  {/* <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto"
                  >
                    <CheckPhoneNumber 
                      pushto={"/mock_package/selectmainfolder"}
                      className="w-full flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 px-8 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors duration-200"
                    />
                  </motion.div> */}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              {[
                { icon: "📚", text: "Comprehensive Learning", count: "50+" },
                { icon: "🎯", text: "Personalized Path", count: "100%" },
                { icon: "🏆", text: "Track Progress", count: "24/7" },
                { icon: "💡", text: "Smart Analytics", count: "1000+" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200"
                >
                  <span className="text-3xl">{feature.icon}</span>
                  <div>
                    <div className="text-white font-bold">{feature.count}</div>
                    <div className="text-gray-200 text-sm">{feature.text}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right content - Floating Stats */}
          <div className="hidden lg:block relative">
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 right-12 bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20"
            >
              <div className="text-white text-4xl font-bold">1000+</div>
              <div className="text-gray-200">Active Students</div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-1/4 right-24 bg-primaryColor p-6 rounded-2xl shadow-lg"
            >
              <div className="text-white text-4xl font-bold">500+</div>
              <div className="text-white/80">Learning Resources</div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center"
        >
          <div className="text-sm font-medium mb-2">Scroll to explore</div>
          <ChevronDown className="w-6 h-6 mx-auto" />
        </motion.div>
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
