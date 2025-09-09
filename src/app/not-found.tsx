"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, BookOpen, Users, Award } from "lucide-react";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function NotFound() {
  const quickLinks = [
    { name: "All Courses", href: "/courses", icon: BookOpen },
    { name: "About Us", href: "/about", icon: Users },
    { name: "Competitions", href: "/competitions", icon: Award },
  ];

  // Hide any potential interfering navigation elements
  useEffect(() => {
    // Add a class to body to potentially hide interfering elements
    document.body.classList.add('not-found-page');
    
    return () => {
      document.body.classList.remove('not-found-page');
    };
  }, []);

  return (
    <div className="not-found-container min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full text-center relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-green-100 rounded-full opacity-60 animate-pulse delay-300"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-100 rounded-full opacity-60 animate-pulse delay-700"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          {/* 404 Image/Animation */}
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="mb-8"
          >
            <div className="relative mx-auto w-80 h-80 mb-8">
              {/* You can replace this with an actual image or illustration */}
              <div className="w-full h-full bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] rounded-full flex items-center justify-center relative overflow-hidden">
                <span className="text-8xl font-bold text-white opacity-20">404</span>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Search className="w-20 h-20 text-white/80" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4">
              4<span className="text-[#c7cc3f]">0</span>4
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              The page you're looking for seems to have wandered off into the digital wilderness. 
              Don't worry though - let's get you back on track to continue your learning journey!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-3 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-[#c7cc3f] hover:text-[#c7cc3f] transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-gray-700 mb-6">
              Or explore these popular sections:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.href}
                    className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg border-2 border-transparent hover:border-[#c7cc3f]/20 transition-all duration-200 group"
                  >
                    <link.icon className="w-8 h-8 text-[#c7cc3f] mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-gray-700 font-medium group-hover:text-[#c7cc3f] transition-colors duration-200">
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer Note */}
          <motion.div variants={itemVariants} className="mt-12">
            <p className="text-sm text-gray-500">
              Need help? Contact us at{" "}
              <a
                href="mailto:contact@fayidaacademy.com"
                className="text-[#c7cc3f] hover:underline font-medium"
              >
                contact@fayidaacademy.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
