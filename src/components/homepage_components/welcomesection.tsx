"use client";

import React, { useState, useRef } from "react";
import { BookOpenCheck, Blocks, Trophy, Vote, Play, Pause, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { apiUrl } from "@/apiConfig";

export default function WelcomeSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent video click event from firing
    handleVideoClick();
  };

  const features = [
    {
      icon: BookOpenCheck,
      title: "Simple Learning",
      description: "We Use a Very Simple Way to Explain",
      color: "text-primaryColor",
      bgColor: "bg-primaryColor/5",
      stats: "95% Success Rate"
    },
    {
      icon: Vote,
      title: "Best Courses",
      description: "Well Organized and Prepared Courses",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/5",
      stats: "50+ Courses"
    },
    {
      icon: Blocks,
      title: "Rich Materials",
      description: "Useful Books and Materials",
      color: "text-blue-500",
      bgColor: "bg-blue-500/5",
      stats: "1000+ Resources"
    },
    {
      icon: Trophy,
      title: "Recognition",
      description: "Recognition for Best Scores",
      color: "text-amber-500",
      bgColor: "bg-amber-500/5",
      stats: "Weekly Awards"
    },
    {
      icon: Trophy,
      title: "Recognition",
      description: "Recognition for Best Scores",
      color: "text-amber-500",
      bgColor: "bg-amber-500/5",
      stats: "Weekly Awards"
    }
  ];

  return (
    <div className="relative py-10 overflow-hidden">
      <section className="w-full bg-white px-6 py-12 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-snug font-Sendako">
              Learn at your own pace, <br />
              Succeed at your own rate
            </h1>

            <div className="flex flex-col gap-4 text-black font-Sendako">
              <div className="text-4xl font-bold">
                500<span className="text-orange-500">+</span>{" "}
                <span className="block text-sm font-normal text-gray-600">
                  Active Resource
                </span>
              </div>
              <div className="text-4xl font-bold">
                1000<span className="text-orange-500">+</span>{" "}

                <span className="block text-sm font-normal text-gray-600">
                  Active Student
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full aspect-video rounded-lg shadow-lg overflow-hidden">

              <div className="absolute top-0 left-0 w-full h-full">
                <img
                  src="/orange-splash.svg"
                  alt="Background illustration"
                  className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
                />
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* Features grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-content-center gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className={`relative h-full p-8 rounded-2xl ${feature.bgColor} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`p-4 rounded-full ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-12 h-12 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className={`${feature.color} font-semibold mt-2`}>
                  {feature.stats}
                </div>
              </div>
              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-16 h-16 ${feature.bgColor} rounded-bl-[48px] -z-10 transition-all duration-300 group-hover:scale-110`} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
