"use client";
import React from "react";
import dynamic from 'next/dynamic';
import { BookOpen, Target, Smartphone, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import animationOne from "../../../public/lottie_files/lottie_one.json";
import { useLanguage } from '@/lib/language-context';

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gradient-to-r from-gray-100 to-gray-50 animate-pulse rounded-3xl">
      <div className="absolute inset-0 bg-[url('/common_files/texture02.jpg')] opacity-5 mix-blend-overlay" />
    </div>
  )
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const statsVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function SectionOne() {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: BookOpen,
      title: t('home.feature1.title'),
      description: t('home.feature1.desc'),
      color: "from-blue-500/20 to-purple-500/20",
      iconColor: "text-blue-600",
    },
    {
      icon: Target,
      title: t('home.feature2.title'),
      description: t('home.feature2.desc'),
      color: "from-green-500/20 to-teal-500/20",
      iconColor: "text-green-600",
    },
    {
      icon: Smartphone,
      title: t('home.feature3.title'),
      description: t('home.feature3.desc'),
      color: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-600",
    },
  ];

  const stats = [
    { value: "20K+", label: "Students" },
    { value: "500+", label: "Courses" },
    { value: "95%", label: "Success Rate" },
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50/50">
        <div className="absolute inset-0 bg-[url('/common_files/texture02.jpg')] opacity-[0.02] mix-blend-overlay" />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primaryColor/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Animation Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden bg-gradient-to-br from-primaryColor/10 to-transparent p-8">
              <Lottie 
                animationData={animationOne} 
                autoplay 
                loop 
                className="w-full h-full transform hover:scale-105 transition-transform duration-700"
              />
              
              {/* Stats Overlay */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="absolute bottom-0 left-0 right-0 p-6 grid grid-cols-3 gap-4"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={statsVariants}
                    className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg transform hover:-translate-y-1 transition-transform duration-300"
                  >
                    <div className="font-bold text-lg sm:text-xl text-primaryColor">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-primaryColor/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-thirdColor/5 rounded-full blur-3xl animate-pulse" />
          </motion.div>

          {/* Content Column */}
          <div className="lg:pl-8 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left mb-12"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-primaryColor/5 text-primaryColor text-sm font-medium mb-4"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Why Choose Us
              </motion.div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                <span className="relative inline-block">
                  {t('home.section.title')}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-3 bg-primaryColor/10 -rotate-1"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  />
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('home.section.subtitle')}
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-all duration-300`}>
                        {React.createElement(feature.icon, { 
                          className: `w-6 h-6 ${feature.iconColor}` 
                        })}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primaryColor transition-colors duration-200">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-200">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 -m-4 rounded-3xl bg-gradient-to-r from-primaryColor/5 to-transparent opacity-0 transition-opacity duration-300"
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
