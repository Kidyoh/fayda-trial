"use client";

import { apiUrl } from "@/apiConfig";
import { InfoIcon, Clock, AlertTriangle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Info() {
  const [responseMessage, setResponseMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/students/checkpackageexpirydate`,
          {
            credentials: "include", // Include credentials in the request
          }
        );

        const data = await response.json();
        setResponseMessage(data.message);
        if (data.message === "found") {
          setIsVisible(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AnimatePresence>
      {responseMessage === "found" && isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.95 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 20,
            duration: 0.6 
          }}
          className="relative py-6 px-4"
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                      <div className="relative bg-white/30 backdrop-blur-sm p-3 rounded-full">
                        <AlertTriangle className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-1">
                        Package Expiry Alert
                      </h3>
                      <p className="text-white/90 text-sm">
                        You have packages expiring in very few days! Update now to continue your learning journey.
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden sm:flex items-center space-x-3">
                    <div className="flex items-center space-x-2 text-white/90">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Urgent</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsVisible(false)}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-colors duration-200"
                    >
                      <InfoIcon className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 border border-white/20"
                  >
                    Update Packages
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsVisible(false)}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white/80 font-medium py-3 px-6 rounded-xl transition-all duration-200 border border-white/10"
                  >
                    Dismiss
                  </motion.button>
                </div>
              </div>
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 rounded-2xl animate-pulse opacity-50" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
