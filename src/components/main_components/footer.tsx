"use client";
import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import {
  Copyright,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  Mail,
  MapPin,
  ChevronRight,
  PhoneCall,
  ArrowRight,
  Heart,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blogs" },
  ],
  resources: [
    { name: "FAQ", href: "/f_a_q" },
    { name: "Terms of Service", href: "/terms_of_service" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Help Center", href: "/help" },
  ],
  courses: [
    { name: "All Courses", href: "/courses" },
    { name: "Free Courses", href: "/courses/free" },
    { name: "Premium Courses", href: "/courses/premium" },
    { name: "Become an Instructor", href: "/teach" },
  ],
};

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

export default function Footer() {
  return (
    <footer className="relative py-8 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 lg:bg-white">
      {/* Desktop Background Images */}
      <Image
        width={1080}
        height={720}
        src="/Background/footer1.png"
        alt="footer image"
        className="hidden lg:flex absolute z-10 w-full bottom-0 h-[75%] object-cover object-center"
      />
      <Image
        width={1080}
        height={720}
        src="/Background/footer2.png"
        alt="footer image"
        className="hidden lg:flex absolute z-20 w-full bottom-0 h-[45%] object-cover object-center"
      />
      <Image
        width={1080}
        height={720}
        src="/Background/footer3.png"
        alt="footer image"
        className="hidden lg:flex absolute z-30 w-full bottom-0 h-[25%] object-cover object-center"
      />

      {/* Mobile gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#c7cc3f]/10 to-[#bf8c13]/10 z-5 lg:hidden"></div>

      {/* Desktop dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-35 hidden lg:block"></div>

      {/* Logo Section */}
      <div className="w-full flex justify-center relative z-40 mb-8">
        <img
          className="h-16 sm:h-20 mb-3"
          src="/common_files/main/smallfulllogo.png"
          alt="Fayida Academy logo"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-40">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <p className="text-white text-sm leading-relaxed max-w-xs mx-auto lg:mx-0 lg:text-white/90">
                Empowering learners worldwide with quality education. Join our
                community of passionate learners and expert instructors.
              </p>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-start gap-3 text-white text-sm lg:text-white/90">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">+251970483333</div>
                  <div className="text-xs opacity-70 mt-1">+251970493333</div>
                </div>
              </div>
              <div className="flex items-start gap-3 text-white text-sm lg:text-white/90">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="flex-1 break-all">
                  contact@fayidaacademy.com
                </span>
              </div>
              <div className="flex items-start gap-3 text-white text-sm lg:text-white/90">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="flex-1">Addis Ababa, Ethiopia</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            {/* Company */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h3
                variants={itemVariants}
                className="text-white font-bold text-lg mb-4 lg:mb-6 relative text-center sm:text-left"
              >
                Company
                <div className="absolute bottom-0 left-1/2 sm:left-0 transform -translate-x-1/2 sm:transform-none w-12 h-0.5 bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] rounded-full"></div>
              </motion.h3>
              <motion.ul variants={containerVariants} className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <motion.li key={index} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className="text-white hover:text-[#c7cc3f] transition-all duration-200 flex items-center justify-center sm:justify-start gap-2 py-1 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h3
                variants={itemVariants}
                className="text-white font-bold text-lg mb-4 lg:mb-6 relative text-center sm:text-left"
              >
                Resources
                <div className="absolute bottom-0 left-1/2 sm:left-0 transform -translate-x-1/2 sm:transform-none w-12 h-0.5 bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] rounded-full"></div>
              </motion.h3>
              <motion.ul variants={containerVariants} className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <motion.li key={index} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className="text-white hover:text-[#c7cc3f] transition-all duration-200 flex items-center justify-center sm:justify-start gap-2 py-1 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Courses */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h3
                variants={itemVariants}
                className="text-white font-bold text-lg mb-4 lg:mb-6 relative text-center sm:text-left"
              >
                Courses
                <div className="absolute bottom-0 left-1/2 sm:left-0 transform -translate-x-1/2 sm:transform-none w-12 h-0.5 bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] rounded-full"></div>
              </motion.h3>
              <motion.ul variants={containerVariants} className="space-y-3">
                {footerLinks.courses.map((link, index) => (
                  <motion.li key={index} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className="text-white hover:text-[#c7cc3f] transition-all duration-200 flex items-center justify-center sm:justify-start gap-2 py-1 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col gap-6 items-center">
            {/* Social Media Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-3 flex-wrap"
            >
              {[
                {
                  icon: Facebook,
                  href: "https://www.facebook.com/profile.php?id=61557674511552",
                  color: "hover:bg-blue-600",
                },
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/fayidaacademy",
                  color: "hover:bg-pink-600",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/company/ethlook/",
                  color: "hover:bg-blue-700",
                },
                {
                  icon: Youtube,
                  href: "https://www.youtube.com/@FayidaAcademyOfficial",
                  color: "hover:bg-red-600",
                },
                {
                  icon: Send,
                  href: "https://t.me/fayidaacademy",
                  color: "hover:bg-blue-500",
                },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:text-white ${social.color} transition-all duration-200 hover:scale-110 hover:shadow-lg`}
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
              <Link
                href="https://www.tiktok.com/@fayidaacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:text-white hover:bg-black transition-all duration-200 hover:scale-110 hover:shadow-lg"
              >
                <FontAwesomeIcon icon={faTiktok} className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 text-white text-sm">
                <Copyright className="w-4 h-4" />
                <span>
                  {new Date().getFullYear()} Fayida Academy. All Rights Reserved
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
