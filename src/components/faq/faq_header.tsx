"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

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

/**
 * Client Component for FAQ Header
 * Handles animated header with icon and title
 */
export default function FAQHeader() {
  return (
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
        Frequently Asked <span className="text-[#c7cc3f]">Questions</span>
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="text-lg text-gray-600 max-w-2xl mx-auto"
      >
        Find quick answers to the most common questions about Fayida Academy.
        Can&apos;t find what you&apos;re looking for? Contact our support team.
      </motion.p>
    </motion.div>
  );
}
