"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  Star,
  DollarSign,
  Clock,
  Award,
  ArrowRight,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Teach() {
  const benefits = [
    {
      icon: Users,
      title: "Reach Thousands",
      description:
        "Share your knowledge with students across Ethiopia and beyond",
    },
    {
      icon: DollarSign,
      title: "Earn Income",
      description: "Generate revenue from your expertise and teaching skills",
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Create and teach on your own schedule, at your own pace",
    },
    {
      icon: Award,
      title: "Build Your Brand",
      description: "Establish yourself as an expert in your field",
    },
  ];

  const requirements = [
    "Expertise in your subject area",
    "Passion for teaching and helping students",
    "Good communication skills",
    "Ability to create engaging content",
    "Basic technical skills for recording videos",
    "Commitment to student success",
  ];

  const steps = [
    {
      step: "1",
      title: "Apply",
      description:
        "Submit your application with your background and teaching interests",
    },
    {
      step: "2",
      title: "Review",
      description: "Our team reviews your application and expertise",
    },
    {
      step: "3",
      title: "Training",
      description:
        "Get onboarded with our platform and teaching best practices",
    },
    {
      step: "4",
      title: "Create",
      description: "Start creating and publishing your courses",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Become an <span className="text-[#c7cc3f]">Instructor</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Share your expertise with thousands of eager learners. Join our
            community of passionate educators and make a real impact on
            Ethiopian education.
          </motion.p>
          <motion.div variants={itemVariants}>
            <a
              href="mailto:teach@fayidaacademy.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] text-white font-semibold rounded-xl text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Start Teaching Today
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900 text-center mb-12"
          >
            Why Teach With Us?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900 text-center mb-12"
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg text-center relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white font-bold text-lg">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-0">
                    <ArrowRight className="w-8 h-8 text-[#c7cc3f]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Requirements Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                What We're Looking For
              </h2>
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6">Ready to Get Started?</h3>
              <p className="text-lg mb-8 opacity-90">
                Join our community of expert instructors and start making an
                impact today. We provide all the tools and support you need to
                succeed.
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:teach@fayidaacademy.com"
                  className="block w-full text-center px-6 py-3 bg-white text-[#c7cc3f] font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Apply to Teach
                </a>
                <a
                  href="/contact"
                  className="block w-full text-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/30 transition-all duration-200"
                >
                  Learn More
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl p-12 shadow-lg text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900 mb-12"
          >
            Join Our Growing Community
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants}>
              <div className="text-4xl font-bold text-[#c7cc3f] mb-2">
                10,000+
              </div>
              <div className="text-gray-600">Active Students</div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="text-4xl font-bold text-[#c7cc3f] mb-2">500+</div>
              <div className="text-gray-600">Courses Available</div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="text-4xl font-bold text-[#c7cc3f] mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
