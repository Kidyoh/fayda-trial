"use client";
import React from "react";
import dynamic from 'next/dynamic';
import { BookOpen, Target, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import animationOne from "../../../public/lottie_files/lottie_one.json";
import { useLanguage } from '@/lib/language-context';

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { 
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-100 animate-pulse rounded-lg"></div>
});

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
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
    },
    {
      icon: Target,
      title: t('home.feature2.title'),
      description: t('home.feature2.desc'),
    },
    {
      icon: Smartphone,
      title: t('home.feature3.title'),
      description: t('home.feature3.desc'),
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Animation Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden bg-gradient-to-br from-primaryColor/5 to-transparent p-8">
              <Lottie 
                animationData={animationOne} 
                autoplay 
                loop 
                className="w-full h-full"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-primaryColor/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-thirdColor/5 rounded-full blur-3xl" />
          </motion.div>

          {/* Content Column */}
          <div className="lg:pl-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900">
                {t('home.section.title')}
              </h2>
              <p className="mt-4 text-lg text-gray-600">
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
                  className="flex items-start space-x-4 group"
                >
                  <div className="flex-shrink-0">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-primaryColor/10 to-thirdColor/10 group-hover:from-primaryColor/20 group-hover:to-thirdColor/20 transition-all duration-300">
                      <feature.icon className="w-6 h-6 text-primaryColor" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primaryColor transition-colors duration-200">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
