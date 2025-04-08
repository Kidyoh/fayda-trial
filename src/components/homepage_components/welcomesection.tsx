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
    }
  ];

  return (
    <div className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/common_files/main/pattern.png')] opacity-5" />
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primaryColor/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-emerald-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primaryColor to-emerald-600 bg-clip-text text-transparent mb-6">
            Welcome To Fayida Academy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your journey to academic excellence starts here. Discover a world of knowledge and growth through our innovative learning platform.
          </p>
        </motion.div>

        {/* Video section with enhanced controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="relative max-w-5xl mx-auto">
            {/* Video Container with Perspective */}
            <div 
              className="relative aspect-video rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500 shadow-2xl group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm z-10 transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`} />
              <video
                ref={videoRef}
                id="welcome-video"
                poster="/common_files/intro_thumbnail.png"
                className="w-full h-full object-cover"
                onClick={handleVideoClick}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controlsList="nodownload"
              >
                <source src="/common_files/intro.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Enhanced Play/Pause Button Overlay */}
              <motion.div
                initial={false}
                animate={{ opacity: isHovering || !isPlaying ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center z-20"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePlayPause}
                  className={`${isPlaying ? 'bg-black/40' : 'bg-white/30'} backdrop-blur-md p-6 rounded-full transition-colors duration-300 hover:bg-primaryColor/80`}
                >
                  {isPlaying ? (
                    <Pause className="w-12 h-12 text-white" />
                  ) : (
                    <Play className="w-12 h-12 text-white" />
                  )}
                </motion.button>
              </motion.div>

              {/* Video Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/20 z-20 group">
                <motion.div
                  className="h-full bg-primaryColor"
                  initial={{ width: "0%" }}
                  animate={{ width: isPlaying ? "100%" : "0%" }}
                  transition={{
                    duration: videoRef.current?.duration || 0,
                    ease: "linear",
                    repeat: 0
                  }}
                />
              </div>

              {/* Video Info */}
              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 z-10 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center justify-between text-white">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Introduction to Fayida Academy</h3>
                    <p className="text-gray-200">Learn about our platform and methodology</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-primaryColor/80 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-primaryColor transition-colors duration-200"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Video Decorative Elements */}
            <div className="absolute -top-6 -left-6 bg-primaryColor/10 w-24 h-24 rounded-full blur-xl" />
            <div className="absolute -bottom-6 -right-6 bg-emerald-500/10 w-24 h-24 rounded-full blur-xl" />
          </div>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
    </div>
  );
}
