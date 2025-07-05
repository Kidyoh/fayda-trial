"use client";
import { apiUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import { Percent, Calendar, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";

export default function PackageDiscountSlider() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/packages/slider`, {
          withCredentials: true,
        });

        const jsonData = response.data;
        setData(jsonData);
        console.log("Package slider data: ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-primaryColor/10 to-secondaryColor/10 rounded-2xl p-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded-lg w-3/4 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="py-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primaryColor/5 via-transparent to-secondaryColor/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-thirdColor/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primaryColor/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4">
        <Carousel
          plugins={[
            Autoplay({
              delay: 8000,
              stopOnInteraction: false,
            }),
          ]}
          opts={{
            align: "center",
            loop: true,
            skipSnaps: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            <AnimatePresence mode="wait">
              {data?.map((pack: any, index: number) => {
                const tempPrice = pack.temporaryPrice;
                const mainPrice = pack.price;
                const difference = Math.abs(tempPrice - mainPrice);
                const higherPrice = Math.max(tempPrice, mainPrice);
                const percentageChange = (difference / higherPrice) * 100;
                const formattedPercentage = percentageChange.toFixed(0);

                return (
                  <CarouselItem
                    key={pack.id}
                    className="pl-2 md:pl-4 basis-full"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative group"
                    >
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primaryColor via-primaryColor to-secondaryColor p-1">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8">
                          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            {/* Left side - Package info */}
                            <div className="flex items-center space-x-4">
                              <div className="relative">
                                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
                                <div className="relative bg-white/30 backdrop-blur-sm p-4 rounded-full">
                                  <Sparkles className="w-8 h-8 text-white" />
                                </div>
                              </div>
                              
                              <div className="text-center md:text-left">
                                <h3 className="text-white font-bold text-xl md:text-2xl mb-2">
                                  {pack.packageName} Package
                                </h3>
                                <p className="text-white/90 text-sm md:text-base">
                                  Limited time offer - Don't miss out!
                                </p>
                              </div>
                            </div>

                            {/* Center - Discount badge */}
                            <div className="relative">
                              <motion.div
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="bg-gradient-to-r from-thirdColor to-fourthColor p-6 rounded-full shadow-lg"
                              >
                                <div className="text-center">
                                  <div className="flex items-center justify-center mb-1">
                                    <Percent className="w-6 h-6 text-white mr-1" />
                                    <span className="text-3xl font-bold text-white">
                                      {formattedPercentage}
                                    </span>
                                  </div>
                                  <div className="text-white/90 text-sm font-medium">
                                    OFF
                                  </div>
                                </div>
                              </motion.div>
                              
                              {/* Pulsing ring */}
                              <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" />
                            </div>

                            {/* Right side - Expiry info */}
                            <div className="text-center md:text-right">
                              <div className="flex items-center justify-center md:justify-end space-x-2 mb-2">
                                <Calendar className="w-5 h-5 text-white/80" />
                                <span className="text-white/80 text-sm">Valid until</span>
                              </div>
                              <div className="text-white font-semibold text-lg">
                                {new Date(pack?.discountExpriyDate).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </div>
                              
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium py-2 px-6 rounded-full transition-all duration-200 border border-white/20"
                              >
                                Get Now
                              </motion.button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Animated gradient border */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primaryColor via-secondaryColor to-thirdColor opacity-50 animate-pulse" />
                      </div>
                    </motion.div>
                  </CarouselItem>
                );
              })}
            </AnimatePresence>
          </CarouselContent>
          
          {/* Navigation arrows */}
          <div className="hidden md:block">
            <CarouselPrevious className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/20 text-white" />
            <CarouselNext className="absolute -right-12 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/20 text-white" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
