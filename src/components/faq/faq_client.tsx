"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  questions: FAQItem[];
}

interface FAQClientProps {
  faqData: FAQCategory[];
}

export default function FAQClient({ faqData }: FAQClientProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [openCategories, setOpenCategories] = useState<number[]>([]);

  const toggleItem = (index: string) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );
  };

  const toggleCategory = (categoryIndex: number) => {
    setOpenCategories((prev) =>
      prev.includes(categoryIndex)
        ? prev.filter((item) => item !== categoryIndex)
        : [...prev, categoryIndex],
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {faqData.map((category, categoryIndex) => {
        const isCategoryOpen = openCategories.includes(categoryIndex);

        return (
          <motion.div
            key={categoryIndex}
            layout
            className="bg-white rounded-2xl shadow-md"
          >
            {/* Category header */}
            <button
              onClick={() => toggleCategory(categoryIndex)}
              className="w-full flex items-center justify-between p-6 rounded-xl focus:outline-none"
            >
              <h2 className="text-2xl font-bold text-gray-900">
                {category.category}
              </h2>
              {isCategoryOpen ? (
                <ChevronUp className="w-6 h-6 text-[#c7cc3f]" />
              ) : (
                <ChevronDown className="w-6 h-6 text-[#c7cc3f]" />
              )}
            </button>

            {/* Category content */}
            <AnimatePresence>
              {isCategoryOpen && (
                <motion.div
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 px-6 pb-6">
                    {category.questions.map((faq, index) => {
                      const currentIndex = `${categoryIndex}-${index}`;
                      const isOpen = openItems.includes(currentIndex);

                      return (
                        <motion.div
                          key={index}
                          layout
                          className="border border-gray-200 rounded-xl"
                        >
                          <button
                            onClick={() => toggleItem(currentIndex)}
                            className="w-full flex items-center justify-between px-4 py-3 text-left focus:outline-none"
                          >
                            <span className="text-lg font-semibold text-gray-900">
                              {faq.question}
                            </span>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-[#c7cc3f]" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-[#c7cc3f]" />
                            )}
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                layout
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4 }}
                                className="overflow-hidden bg-blue-50/30 rounded-b-xl"
                              >
                                <div className="px-4 py-3">
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
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
