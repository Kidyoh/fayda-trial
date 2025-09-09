"use client";
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, Users, Star } from "lucide-react";
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

export default function Careers() {
  const jobOpenings = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Addis Ababa, Ethiopia",
      type: "Full-time",
      description: "Join our team to build the next generation of educational technology platforms.",
      requirements: ["React/Next.js", "TypeScript", "Tailwind CSS", "3+ years experience"],
    },
    {
      title: "Content Creator - Education",
      department: "Content",
      location: "Remote/Hybrid",
      type: "Full-time",
      description: "Create engaging educational content for our students across various subjects.",
      requirements: ["Educational background", "Content creation experience", "Video production skills"],
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Addis Ababa, Ethiopia",
      type: "Full-time",
      description: "Help us reach more students and grow our educational impact across Ethiopia.",
      requirements: ["Digital marketing", "Social media", "Analytics", "Creative thinking"],
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: "Great Team",
      description: "Work with passionate educators and technologists",
    },
    {
      icon: Star,
      title: "Impact",
      description: "Make a real difference in Ethiopian education",
    },
    {
      icon: Briefcase,
      title: "Growth",
      description: "Continuous learning and career development",
    },
    {
      icon: Clock,
      title: "Flexibility",
      description: "Work-life balance with flexible hours",
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
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Join Our <span className="text-[#c7cc3f]">Mission</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Help us transform education in Ethiopia. We're looking for passionate individuals 
            who want to make a real impact on students' lives.
          </motion.p>
        </motion.div>

        {/* Benefits Section */}
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
            Why Work With Us?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Job Openings */}
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
            Current Openings
          </motion.h2>
          
          {jobOpenings.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="text-center bg-white rounded-2xl p-12 shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No Current Openings
              </h3>
              <p className="text-gray-600 mb-6">
                We don't have any open positions right now, but we're always looking for talented individuals.
              </p>
              <p className="text-gray-600">
                Send us your resume at{" "}
                <a
                  href="mailto:careers@fayidaacademy.com"
                  className="text-[#c7cc3f] hover:underline font-medium"
                >
                  careers@fayidaacademy.com
                </a>
              </p>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {jobOpenings.map((job, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h3 className="text-2xl font-semibold text-gray-900">
                          {job.title}
                        </h3>
                        <span className="px-3 py-1 bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] text-white text-sm rounded-full">
                          {job.department}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{job.description}</p>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                        <ul className="list-disc list-inside text-gray-600">
                          {job.requirements.map((req, reqIndex) => (
                            <li key={reqIndex}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 lg:mt-0 lg:ml-8">
                      <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                        Apply Now
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* CTA Section */}
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
            Don't See Your Role?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg mb-8 opacity-90"
          >
            We're always interested in hearing from talented individuals who share our passion 
            for education and technology.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="mailto:careers@fayidaacademy.com"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#c7cc3f] font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Send Your Resume
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/30 transition-all duration-200"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
