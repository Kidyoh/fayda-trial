"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Play, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

/**
 * Client Component for Welcome Video
 * Handles interactive video modal and animations
 */
export default function WelcomeVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
    if (modalVideoRef.current) {
      modalVideoRef.current.play();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
  };

  return (
    <>
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
                className="relative aspect-video rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500 shadow-2xl group cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={openModal}
              >
                <div
                  className={`absolute inset-0 bg-black/40 backdrop-blur-sm z-10 transition-opacity duration-300 ${
                    isHovering ? "opacity-0" : "opacity-100"
                  }`}
                />
                <Image
                  src="/common_files/intro_thumbnail.png"
                  alt="Video Thumbnail"
                  fill
                  className="w-full h-full object-cover"
                />

                {/* Enhanced Play Button Overlay */}
                <motion.div
                  initial={false}
                  animate={{ opacity: isHovering ? 1 : 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center z-20"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={openModal}
                    className="bg-white/30 backdrop-blur-md p-6 rounded-full transition-colors duration-300 hover:bg-primaryColor/80"
                  >
                    <Play className="w-12 h-12 text-white" />
                  </motion.button>
                </motion.div>

                {/* Video Info */}
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 z-10 transition-opacity duration-300 ${
                    isHovering ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Introduction to Fayida Academy
                      </h3>
                      <p className="text-gray-200">
                        Learn about our platform and methodology
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={openModal}
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

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full aspect-video bg-black rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={modalVideoRef}
                className="w-full h-full object-cover"
                controls
                controlsList="nodownload"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src="/common_files/intro.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
