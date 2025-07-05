'use client';
import { useEffect, useState } from "react";
import CoverHome from "@/components/homepage_components/cover_home";
import Info from "@/components/homepage_components/info";
import WelcomeSection from "@/components/homepage_components/welcomesection";
import PackageDiscountSlider from "@/components/homepage_components/package_discount_slider";
import BlogSample from "@/components/homepage_components/blogs_sample";
import SectionOne from "@/components/homepage_components/section_one";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";

export default function Home() {
  // Use useState and useEffect to safely handle client-side code
  const [isClient, setIsClient] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <div className="min-h-screen overflow-hidden">
      {isClient && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Hero Section */}
          <CoverHome />
          
          {/* Info Section with smooth transition */}
          <div className="relative z-10">
            <Info />
          </div>
          
          {/* Welcome Section with background gradient */}
          <div className="relative bg-gradient-to-b from-gray-50 to-white">
            <WelcomeSection />
          </div>
          
          {/* Package Discount with modern styling */}
          <div className="relative bg-gradient-to-r from-primaryColor/5 to-secondaryColor/5">
            <PackageDiscountSlider />
          </div>
          
          {/* Blog Section */}
          <div className="relative bg-gradient-to-b from-white to-gray-50">
            <BlogSample />
          </div>
          
          {/* Section One with enhanced styling */}
          <div className="relative bg-gradient-to-b from-gray-50 to-white">
            <SectionOne />
          </div>
          
          {/* Decorative elements */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primaryColor/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondaryColor/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-thirdColor/5 rounded-full blur-3xl animate-pulse" />
          </div>
        </motion.div>
      )}
    </div>
  );
} 
