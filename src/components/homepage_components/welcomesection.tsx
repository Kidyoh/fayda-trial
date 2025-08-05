"use client";

import { motion } from "framer-motion";
import { Blocks, BookOpenCheck, ChevronRight, Pause, Play, Trophy, Vote, PiIcon, FlaskConical, AtomIcon, Globe, Orbit } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

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
      secondIcon: PiIcon,
      title: "Simple Learning",
      description: "We Use a Very Simple Way to Explain",
      color: "text-primaryColor",
      bgColor: "bg-primaryColor/5",
      stats: "95% Success Rate"
    },
    {
      icon: Vote,
      secondIcon: FlaskConical,
      title: "Best Courses",
      description: "Well Organized and Prepared Courses",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/5",
      stats: "50+ Courses"
    },
    {
      icon: Blocks,
      secondIcon: Globe,
      title: "Rich Materials",
      description: "Useful Books and Materials",
      color: "text-blue-500",
      bgColor: "bg-blue-500/5",
      stats: "1000+ Resources"
    },
    {
      icon: Trophy,
      secondIcon: Orbit,
      title: "Recognition",
      description: "Recognition for Best Scores",
      color: "text-amber-500",
      bgColor: "bg-amber-500/5",
      stats: "Weekly Awards"
    },
    {
      icon: Trophy,
      secondIcon: AtomIcon,
      title: "Recognition",
      description: "Recognition for Best Scores",
      color: "text-amber-500",
      bgColor: "bg-amber-500/5",
      stats: "Weekly Awards"
    }
  ];

  return (
    <div className="relative py-10 overflow-hidden">
      <section className="max-w-7xl mx-auto h-screen flex items-center justify-center relative">
        <Image
          src="/Images/TestTubes.png"
          alt="Welcome"
          width={800}
          height={600}
          className="w-72 absolute bottom-10 left-[15%] z-0 object-contain"
        />
        <Image
          src="/Images/equation.png"
          alt="Welcome"
          width={800}
          height={600}
          className="w-72 absolute left-1/4 top-1/3  z-0 object-contain"
        />
        <Image
          src="/svg/Asset 6.svg"
          alt="Welcome"
          width={80}
          height={60}
          className="w-24 absolute bottom-10 right-[10%] z-0 object-contain"
        />
        <Image
          src="/svg/Asset 5.svg"
          alt="Welcome"
          width={80}
          height={60}
          className="w-24 absolute left-1/2 top-10  z-0 object-contain"
        />
        <div className="w-full mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-snug font-Sendako">
              Learn at your own pace, <br />
              Succeed at your own rate
            </h1>

            <div className="flex flex-col gap-4 text-black font-Sendako">
              <div className="text-7xl font-bold">
                500<span className="text-orange-500">+</span>{" "}
                <span className="block text-sm font-normal text-gray-600">
                  Active Resource
                </span>
              </div>
              <div className="text-7xl font-bold">
                1000<span className="text-orange-500">+</span>{" "}

                <span className="block text-sm font-normal text-gray-600">
                  Active Student
                </span>
              </div>
            </div>
          </div>

          <Image
            src="/Images/Brush.png"
            alt="Welcome"
            width={800}
            height={600}
            className="w-[55%] absolute top-0 right-0 z-0 object-contain"
          />
          <div className="relative">
            <div className="relative w-full aspect-video rounded-lg shadow-2xl overflow-hidden">
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
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto mb-10 relative flex flex-col items-center">
        <Image
          src="/svg/Asset 21.svg"
          alt="Fayida Packages"
          width={290}
          height={56}
          className="absolute w-max top-3 left-1/2 -translate-x-1/2 z-10"
        />
        <h2 className="text-2xl md:text-4xl font-extrabold font-Sendako tracking-wide uppercase text-white z-20 my-8">
          What we offer
        </h2>

      </div>
      {/* Features grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-content-center gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group bg-[url(/Images/surface.jpg)] bg-cover bg-center rounded-2xl relative overflow-hidden"
          >
            <feature.secondIcon className={`w-full h-full ${feature.color} absolute -bottom-2 -left-1/2 opacity-5`} />
            <div className={`relative h-full p-8 rounded-2xl ${feature.bgColor}`}>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`p-4 rounded-full ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-12 h-12 ${feature.color}`} />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 font-Sendako">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className={`${feature.color} font-Sendako md:text-lg mt-2`}>
                  {feature.stats}
                </div>
              </div>
              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-16 h-16 ${feature.bgColor} rounded-bl-[48px] rounded-tr-2xl z-10 transition-all duration-300 group-hover:opacity-100`} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
