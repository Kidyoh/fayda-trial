"use client";
import React from "react";
import { motion } from "framer-motion";
import { HelpCircle, Mail, Phone, MessageCircle, Book, Video, Users } from "lucide-react";
import Link from "next/link";

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

export default function Help() {
  const helpCategories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn how to navigate our platform and start your learning journey",
      topics: ["Creating an account", "Enrolling in courses", "Accessing materials", "Tracking progress"],
    },
    {
      icon: Video,
      title: "Technical Support",
      description: "Get help with technical issues and platform functionality",
      topics: ["Video playback issues", "Login problems", "Payment issues", "Mobile app support"],
    },
    {
      icon: Users,
      title: "Account & Billing",
      description: "Manage your account settings and billing information",
      topics: ["Update profile", "Change password", "Billing questions", "Subscription management"],
    },
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed help via email",
      action: "contact@fayidaacademy.com",
      link: "mailto:contact@fayidaacademy.com",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us for immediate assistance",
      action: "+251970483333",
      link: "tel:+251970483333",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Start Chat",
      link: "/contact",
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
          <motion.div
            variants={itemVariants}
            className="w-20 h-20 bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <HelpCircle className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Help <span className="text-[#c7cc3f]">Center</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Find answers to your questions and get the support you need to succeed 
            in your learning journey with Fayida Academy.
          </motion.p>
        </motion.div>

        {/* Help Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900 text-center mb-12"
          >
            How Can We Help You?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {helpCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] rounded-full flex items-center justify-center mx-auto mb-6">
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  {category.description}
                </p>
                <ul className="space-y-2">
                  {category.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="text-gray-700 text-sm">
                      • {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900 text-center mb-12"
          >
            Need More Help?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <method.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {method.description}
                </p>
                <Link
                  href={method.link}
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  {method.action}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Link */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] rounded-2xl p-12 text-white"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold mb-4"
          >
            Still Have Questions?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg mb-8 opacity-90"
          >
            Check out our frequently asked questions for quick answers to common queries.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              href="/f_a_q"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#c7cc3f] font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              View FAQ
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
