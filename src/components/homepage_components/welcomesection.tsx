"use client";

import React, { useState, useRef, useEffect } from "react";
import { BookOpenCheck, Blocks, Trophy, Vote, Play, Pause, ChevronRight, Volume2, VolumeX, Maximize, SkipBack, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { apiUrl } from "@/apiConfig";

export default function WelcomeSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
        setCurrentTime(video.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const progressBar = progressBarRef.current;
    if (!progressBar || !videoRef.current) return;

    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
    <div className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent mb-6">
            Welcome To Fayida Academy
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Your journey to academic excellence starts here. Discover a world of knowledge and growth through our innovative learning platform.
          </p>
        </motion.div>

        {/* Modern Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="relative max-w-5xl mx-auto">
            {/* Video Container */}
            <div 
              className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Video Element */}
              <video
                ref={videoRef}
                poster="/common_files/intro_thumbnail.png"
                className="w-full h-full object-cover"
                onClick={handleVideoClick}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                muted={isMuted}
                controlsList="nodownload"
              >
                <source src="/common_files/intro.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video Overlay - Always visible when hovering or paused */}
              <div 
                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 
                  ${isHovering || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
              />

              {/* Video Controls */}
              <div 
                className={`absolute inset-x-0 bottom-0 p-6 space-y-4 transition-all duration-300 transform
                  ${isHovering || !isPlaying ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              >
                {/* Title and Info */}
                <div className="flex items-center justify-between text-white mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Introduction to Fayida Academy</h3>
                    <p className="text-gray-300 text-sm">Learn about our platform and methodology</p>
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

                {/* Progress Bar */}
                <div 
                  ref={progressBarRef}
                  className="relative h-1 bg-gray-600 rounded-full cursor-pointer group"
                  onClick={handleProgressBarClick}
                >
                  <div 
                    className="absolute h-full bg-primaryColor rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                  <div className="absolute h-full w-full opacity-0 group-hover:opacity-100">
                    <div 
                      className="absolute h-3 w-3 bg-primaryColor rounded-full -translate-y-1"
                      style={{ left: `${progress}%`, transform: 'translateX(-50%) translateY(-25%)' }}
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Play/Pause Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleVideoClick}
                      className="text-white hover:text-primaryColor transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8" />
                      ) : (
                        <Play className="w-8 h-8" />
                      )}
                    </motion.button>

                    {/* Restart Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (videoRef.current) videoRef.current.currentTime = 0;
                      }}
                      className="text-white hover:text-primaryColor transition-colors"
                    >
                      <SkipBack className="w-6 h-6" />
                    </motion.button>

                    {/* Volume Control */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleMute}
                      className="text-white hover:text-primaryColor transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-6 h-6" />
                      ) : (
                        <Volume2 className="w-6 h-6" />
                      )}
                    </motion.button>

                    {/* Time Display */}
                    <div className="text-white text-sm font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Right Controls */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (videoRef.current) videoRef.current.requestFullscreen();
                    }}
                    className="text-white hover:text-primaryColor transition-colors"
                  >
                    <Maximize className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Video Decorative Elements */}
            <div className="absolute -top-6 -left-6 bg-primaryColor/20 w-32 h-32 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -right-6 bg-emerald-500/20 w-32 h-32 rounded-full blur-3xl" />
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
              <div className={`relative h-full p-8 rounded-2xl ${feature.bgColor} transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-white/10 backdrop-blur-sm`}>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`relative p-4 rounded-full ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-12 h-12 ${feature.color}`} />
                    <div className={`absolute inset-0 rounded-full ${feature.bgColor} opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-md`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-gray-200">{feature.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300">{feature.description}</p>
                  <div className={`${feature.color} font-semibold mt-2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm`}>
                    {feature.stats}
                  </div>
                </div>
                <div className={`absolute top-0 right-0 w-16 h-16 ${feature.bgColor} rounded-bl-[48px] -z-10 transition-all duration-300 group-hover:scale-110 opacity-50`} />
                <div className={`absolute -top-2 -right-2 w-4 h-4 ${feature.color.replace('text-', 'bg-')} rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className={`absolute -bottom-2 -left-2 w-3 h-3 ${feature.color.replace('text-', 'bg-')} rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
