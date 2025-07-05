"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown, ArrowRight, Star, Users, BookOpen, Sparkles, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DownloadAppConfirmation from "../custom_components/downloadApkDialog";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";
import Image from "next/image";

export default function CoverHome() {
  const { t } = useLanguage();
  const texts = [t('home.hero.title1'), t('home.hero.title2')];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[100svh] bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
        
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primaryColor/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        {/* Background Image */}
        <Image
          src="/common_files/main/bannerx01.jpg"
          alt="Hero Background"
          fill
          className="object-cover object-center opacity-30"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 min-h-[100svh] flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-6xl mx-auto py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="space-y-8">
                {/* Trust Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <Star className="w-4 h-4 mr-2 text-yellow-400" />
                  <span className="text-white/90 text-sm font-medium">{t('home.hero.trust')}</span>
                </motion.div>

                {/* Hero Title with Animation */}
                <div className="relative h-[120px] sm:h-[180px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.h1
                      key={currentTextIndex}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute inset-0 text-4xl sm:text-5xl lg:text-6xl font-bold"
                    >
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200">
                        {texts[currentTextIndex]}
                      </span>
                    </motion.h1>
                  </AnimatePresence>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-gray-300 max-w-xl leading-relaxed"
                >
                  {t('home.hero.slogan')}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  {/* Download App Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200" />
                    <div className="relative">
                      <DownloadAppConfirmation />
                    </div>
                  </motion.div>

                  {/* Explore Button */}
                  <Link href="/search-packages" className="block">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative group"
                      >
                        <div className="absolute -inset-0.5  rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200" />
                      <button className="relative w-full px-8 py-4 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800/50 text-white rounded-xl flex items-center justify-center gap-2 font-medium border border-white/10 transition duration-200">
                        <span>Explore Courses</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  </Link>
                </motion.div>

                {/* Feature Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-12"
                >
                  {[
                    { icon: Users, text: "10K+ Students" },
                    { icon: BookOpen, text: "100+ Courses" },
                    { icon: Sparkles, text: "Premium Quality" }
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                    >
                      <feature.icon className="w-5 h-5 text-blue-400" />
                      <span className="text-white/80 text-sm font-medium">{feature.text}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right Column - Visual Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="relative hidden lg:block"
              >
                <div className="relative w-full aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primaryColor/20 to-transparent rounded-full blur-2xl animate-pulse" />
                  <Image
                    src="/common_files/main/the_girl4.png"
                    alt="Hero Image"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/60 text-sm">Scroll to explore</span>
          <ChevronDown className="w-6 h-6 text-white/60 animate-bounce" />
        </motion.div>
      </div>
    </div>
  );
}
