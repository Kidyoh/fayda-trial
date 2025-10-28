"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Advertisement {
  id: string;
  title: string;
  subtitle?: string;
  text?: string;
  info?: string;
  imgUrl: string;
}

interface AdSliderClientProps {
  advertisements: Advertisement[];
}

/**
 * Client Component for Ad Slider
 * Handles animations, interactions, and parallax effects
 */
export default function AdSliderClient({
  advertisements,
}: AdSliderClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const smoothTextY = useSpring(textY, { stiffness: 400, damping: 40 });

  // Setup autoplay
  useEffect(() => {
    setIsLoading(false);
    const safeAds = Array.isArray(advertisements) ? advertisements : [];
    if (safeAds.length === 0) return;

    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % safeAds.length);
      }, 5000);
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [advertisements]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    setTimeout(() => {
      const safeAds = Array.isArray(advertisements) ? advertisements : [];
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % safeAds.length);
      }, 5000);
    }, 1000);
  };

  // Don't render if no advertisements or still loading
  if (isLoading) {
    return (
      <div className="w-full h-[60vh] mb-12 flex items-center justify-center">
        <div className="animate-pulse bg-gray-200 rounded-lg w-full h-full"></div>
      </div>
    );
  }

  // Ensure advertisements is always an array
  const safeAdvertisements = Array.isArray(advertisements)
    ? advertisements
    : [];

  // Fallback if no ads
  if (safeAdvertisements.length === 0) {
    return (
      <div className="relative w-full h-[60vh] mb-12 overflow-hidden">
        <Image
          src="/common_files/main/webbannernew.png"
          alt="Default Banner"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/80 to-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">
            Welcome to Fayida Academy
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[60vh] mb-12 overflow-hidden"
    >
      {/* Background slides with parallax */}
      {advertisements.map((ad, index) => (
        <motion.div
          key={ad.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentSlide === index ? 1 : 0,
            scale: currentSlide === index ? 1 : 1.1,
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.div className="absolute inset-0 w-full h-full">
            <Image
              src={ad.imgUrl || "/common_files/main/webbannernew.png"}
              alt={ad.title || "Advertisement"}
              fill
              className="object-cover"
              onError={(e) => {
                console.log("Image failed to load:", ad.imgUrl);
                e.currentTarget.src = "/common_files/main/webbannernew.png";
              }}
            />
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-950/80 to-black/50" />

          {/* Ethiopian pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M40 40l20-20v40l-20-20zm0 0l-20-20v40l20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "80px 80px",
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* Content with parallax text */}
      <motion.div
        style={{ y: smoothTextY }}
        className="relative z-20 h-full flex items-center justify-center px-4"
      >
        <div className="max-w-4xl text-center text-white">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Advertisement Title */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-Sendako mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {advertisements[currentSlide]?.title}
            </motion.h1>

            {/* Advertisement Subtitle */}
            <motion.h2
              className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 opacity-90"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {advertisements[currentSlide]?.subtitle}
            </motion.h2>

            {/* Advertisement Description */}
            <motion.p
              className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 opacity-80"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {advertisements[currentSlide]?.text}
            </motion.p>

            {/* CTA Button */}
            <Link href={`/advertisements/${advertisements[currentSlide]?.id}`}>
              <motion.button
                className="bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/30 hover:bg-white/30 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {advertisements[currentSlide]?.info || "Learn More"}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-3">
          {advertisements.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      {/* Side navigation */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 hidden md:block">
        <div className="flex flex-col space-y-4">
          {advertisements.map((ad, index) => (
            <motion.button
              key={ad.id}
              onClick={() => handleSlideChange(index)}
              className={`w-1 h-8 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-white"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              whileHover={{ scaleY: 1.2 }}
            />
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/20 z-30">
        <motion.div
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          key={currentSlide}
        />
      </div>
    </div>
  );
}
