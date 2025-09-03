import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

const parallaxSlides = [
  {
    id: 1,
    backgroundImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    title: "Tech Innovators",
    subtitle: "Leading the Future",
    description: "Discover cutting-edge solutions from Tech Innovators, your partner in digital transformation and IT excellence.",
    overlayColor: "from-green-950/80 to-black/50",
  },
  {
    id: 2,
    backgroundImage: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1600&q=80",
    title: "Green Energy Co.",
    subtitle: "Powering Tomorrow",
    description: "Join Green Energy Co. in building a sustainable future with clean, renewable energy for homes and businesses.",
    overlayColor: "from-green-950/80 to-black/50",
  },
  {
    id: 3,
    backgroundImage: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1600&q=80",
    title: "Urban Eats",
    subtitle: "Taste the City",
    description: "Experience culinary delights from Urban Eats, serving fresh flavors and gourmet experiences across the city.",
    overlayColor: "from-green-950/80 to-black/50",
  },
  {
    id: 4,
    backgroundImage: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1600&q=80",
    title: "TravelSphere",
    subtitle: "Explore the World",
    description: "Adventure awaits with TravelSphere. Book your next journey and discover new destinations with expert guides.",
    overlayColor: "from-green-950/80 to-black/50",
  },
];

const ParallaxSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 0.8]);

  // Smooth spring animations
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 400, damping: 40 });
  const smoothTextY = useSpring(textY, { stiffness: 400, damping: 40 });
  const smoothScale = useSpring(scale, { stiffness: 400, damping: 40 });


  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % parallaxSlides.length);
      }, 5000);
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    setTimeout(() => {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % parallaxSlides.length);
      }, 5000);
    }, 1000);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[60vh] mb-12 overflow-hidden"
    >
      {/* Background slides with parallax */}
      {parallaxSlides.map((slide, index) => (
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentSlide === index ? 1 : 0,
            scale: currentSlide === index ? 1 : 1.1
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={slide.backgroundImage}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>

          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.overlayColor}`} />

          {/* Ethiopian pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M40 40l20-20v40l-20-20zm0 0l-20-20v40l20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '80px 80px'
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
            {/* Amharic Title */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-Sendako mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {parallaxSlides[currentSlide].title}
            </motion.h1>

            {/* English Subtitle */}
            <motion.h2
              className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 opacity-90"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {parallaxSlides[currentSlide].subtitle}
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 opacity-80"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {parallaxSlides[currentSlide].description}
            </motion.p>

            {/* CTA Button */}
            <motion.button
              className="bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/30 hover:bg-white/30 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
             Explore More
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-3">
          {parallaxSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/70'
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
          {parallaxSlides.map((slide, index) => (
            <motion.button
              key={slide.id}
              onClick={() => handleSlideChange(index)}
              className={`w-1 h-8 rounded-full transition-all duration-300 ${currentSlide === index
                  ? 'bg-white'
                  : 'bg-white/30 hover:bg-white/50'
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
};

const AdSlider = () => {
  return <ParallaxSlider />;
};

export default AdSlider;

