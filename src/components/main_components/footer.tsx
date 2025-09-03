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
  PhoneCall,
  Send,
  Mail,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact_us" },
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
  ]
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  },
};

export default function Footer() {
  return (
    <footer className="text-black relative md:h-[80dvh]">
      {/* Background Images */}
      <Image
        width={1080}
        height={720}
        src="/Background/footer1.png"
        alt="footer image"
        className="absolute z-10 w-full bottom-0 h-[75%] object-cover object-center"
      />
      <Image
        width={1080}
        height={720}
        src="/Background/footer2.png"
        alt="footer image"
        className="absolute z-20 w-full bottom-0 h-[45%] object-cover object-center"
      />
      <Image
        width={1080}
        height={720}
        src="/Background/footer3.png"
        alt="footer image"
        className="absolute z-30 w-full bottom-0 h-[25%] object-cover object-center"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-primaryColor relative z-40 flex flex-col h-full justify-between">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Logo and Description */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-4"
          >
            <motion.div variants={itemVariants}>
              <img
                className="h-20 w-auto"
                src="/Images/faydagreenlogo.png"
                alt="Fayida Academy"
              />
              <p className="mt-4 text-sm text-gray-700 leading-relaxed">
                Empowering learners worldwide with quality education. Join our community of passionate learners and expert instructors.
              </p>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants} className="mt-6 space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-700">
                <PhoneCall className="w-4 h-4" />
                <div>
                  <p>+251970483333</p>
                  <p>+251970493333</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-700">
                <Mail className="w-4 h-4" />
                <p>contact@fayidaacademy.com</p>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-700">
                <MapPin className="w-4 h-4" />
                <p>Addis Ababa, Ethiopia</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Company Links */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h3 variants={itemVariants} className="text-lg font-semibold mb-4">
                Company
              </motion.h3>
              <motion.ul variants={containerVariants} className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <motion.li key={index} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className="text-gray-600 transition-colors duration-200 flex items-center group"
                    >
                      <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Resources Links */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h3 variants={itemVariants} className="text-lg font-semibold mb-4">
                Resources
              </motion.h3>
              <motion.ul variants={containerVariants} className="space-y-2">
                {footerLinks.resources.map((link, index) => (
                  <motion.li key={index} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className="text-gray-600 transition-colors duration-200 flex items-center group"
                    >
                      <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Courses Links */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h3 variants={itemVariants} className="text-lg font-semibold mb-4">
                Courses
              </motion.h3>
              <motion.ul variants={containerVariants} className="space-y-2">
                {footerLinks.courses.map((link, index) => (
                  <motion.li key={index} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className="text-gray-600 transition-colors duration-200 flex items-center group"
                    >
                      <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      {link.name}
                    </Link>
                  </motion.li>  
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10">
          <div className="py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-2 text-sm text-gray-300"
            >
              <Copyright className="w-4 h-4" />
              <p>{new Date().getFullYear()} Fayida Academy. All Rights Reserved</p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center space-x-4"
            >
              {[
                { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61557674511552" },
                { icon: Instagram, href: "https://www.instagram.com/fayidaacademy" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/ethlook/" },
                { icon: Youtube, href: "https://www.youtube.com/@FayidaAcademyOfficial" },
                { icon: Send, href: "https://t.me/fayidaacademy" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  className="p-2 rounded-full text-white"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
              <Link
                href="https://www.tiktok.com/@fayidaacademy"
                target="_blank"
                className="p-2 rounded-full text-white"
              >
                <FontAwesomeIcon
                  icon={faTiktok}
                  className="w-5 h-5"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
