"use client";

import { motion } from "framer-motion";

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
 * Client Component for Contact Header
 * Handles animated header
 */
export default function ContactHeader() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center mb-12"
    >
      <motion.h1
        variants={itemVariants}
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
      >
        Get in <span className="text-[#c7cc3f]">Touch</span>
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="text-lg text-gray-600 max-w-2xl mx-auto"
      >
        Have questions about our courses or need support? We&apos;re here to
        help you on your learning journey.
      </motion.p>
    </motion.div>
  );
}
