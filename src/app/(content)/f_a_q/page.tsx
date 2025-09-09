"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

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

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create an account?",
          answer: "You can create an account by clicking the 'Sign Up' button on our homepage and filling in your details. You'll need to provide your name, email, and create a password."
        },
        {
          question: "How do I enroll in a course?",
          answer: "Once you're logged in, browse our course catalog, select the course you want, and click 'Enroll Now'. Some courses are free while others require payment."
        },
        {
          question: "Can I access courses on mobile?",
          answer: "Yes! Our platform is fully responsive and works on all devices. We also have mobile apps available for Android and iOS."
        }
      ]
    },
    {
      category: "Courses & Learning",
      questions: [
        {
          question: "What types of courses do you offer?",
          answer: "We offer courses in various subjects including Mathematics, Physics, Chemistry, Biology, History, Economics, and more. We have both free and premium courses available."
        },
        {
          question: "Can I download course materials?",
          answer: "Yes, enrolled students can download course materials including PDFs, assignments, and other resources for offline study."
        },
        {
          question: "How long do I have access to a course?",
          answer: "Once you enroll in a course, you have lifetime access to the course materials and can learn at your own pace."
        },
        {
          question: "Do you provide certificates?",
          answer: "Yes, we provide certificates of completion for courses once you successfully complete all requirements and assessments."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "What should I do if videos won't play?",
          answer: "First, check your internet connection. If the issue persists, try refreshing the page or using a different browser. Contact support if problems continue."
        },
        {
          question: "I forgot my password. How can I reset it?",
          answer: "Click on 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your email to reset your password."
        },
        {
          question: "Why can't I access my purchased course?",
          answer: "Make sure you're logged into the correct account. If you're still having issues, check your email for purchase confirmation or contact our support team."
        }
      ]
    },
    {
      category: "Billing & Payments",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept major credit cards, debit cards, and mobile money payments including Telebirr and other local Ethiopian payment methods."
        },
        {
          question: "Can I get a refund?",
          answer: "We offer a 30-day money-back guarantee for premium courses. If you're not satisfied, contact us within 30 days of purchase for a full refund."
        },
        {
          question: "How do I update my billing information?",
          answer: "Go to your account settings, select 'Billing Information', and update your payment details. Your changes will be saved automatically."
        }
      ]
    }
  ];

  let questionIndex = 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Frequently Asked <span className="text-[#c7cc3f]">Questions</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Find quick answers to the most common questions about Fayida Academy. 
            Can't find what you're looking for? Contact our support team.
          </motion.p>
        </motion.div>

        {/* FAQ Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {faqData.map((category, categoryIndex) => (
            <motion.div key={categoryIndex} variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-[#c7cc3f]">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, index) => {
                  const currentIndex = questionIndex++;
                  const isOpen = openItems.includes(currentIndex);
                  
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleItem(currentIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#c7cc3f] focus:ring-opacity-50 rounded-2xl"
                      >
                        <span className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-[#c7cc3f] flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#c7cc3f] flex-shrink-0" />
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4">
                              <p className="text-gray-700 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Support */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 text-center bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] rounded-2xl p-12 text-white"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold mb-4"
          >
            Still Have Questions?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg mb-8 opacity-90"
          >
            Our support team is here to help you succeed in your learning journey.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="mailto:contact@fayidaacademy.com"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#c7cc3f] font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Email Support
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/30 transition-all duration-200"
            >
              Contact Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
