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
    <footer className="bg-white relative py-4 text-white">
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
      <div className="w-full flex justify-start lg:justify-center">
        <img
          className="h-16 mb-3"
          src="/common_files/main/smallfulllogo.png"
          alt="Fayida Academy logo"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-40 flex flex-col h-full justify-between mix-blend-difference">
        <div className="flex flex-col gap-10 md:gap-0 md:flex-row md:justify-between md:items-start w-full">
          {/* Logo and Description */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 min-w-[220px] max-w-xs mb-8 md:mb-0"
          >
            <motion.div variants={itemVariants}>
              <p className="text-sm leading-relaxed max-w-[250px]">
                Empowering learners worldwide with quality education. Join our community of passionate learners and expert instructors.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <PhoneCall className="w-4 h-4" />
                <span>+251970483333</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <PhoneCall className="w-4 h-4 opacity-70" />
                <span>+251970493333</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4" />
                <span>contact@fayidaacademy.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </motion.div>
          </motion.div>

          <div className="flex-1 w-full grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {/* Company */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.h3 variants={itemVariants} className="text-base font-semibold mb-3">
                Company
              </motion.h3>
              <motion.ul variants={containerVariants} className="space-y-1">
                {footerLinks.company.map((link, index) => (
                  <motion.li key={index} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className="hover:text-[#c7cc3f] transition-colors duration-200 flex items-center gap-2 py-1"
                    >
                      <ChevronRight className="w-4 h-4 opacity-60" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            {/* Resources */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.h3 variants={itemVariants} className="text-base font-semibold mb-3">
                Resources
              </motion.h3>
              <motion.ul variants={containerVariants} className="space-y-1">
                {footerLinks.resources.map((link, index) => (
                  <motion.li key={index} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className="hover:text-[#c7cc3f] transition-colors duration-200 flex items-center gap-2 py-1"
                    >
                      <ChevronRight className="w-4 h-4 opacity-60" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            {/* Courses */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.h3 variants={itemVariants} className="text-base font-semibold mb-3">
                Courses
              </motion.h3>
              <motion.ul variants={containerVariants} className="space-y-1">
                {footerLinks.courses.map((link, index) => (
                  <motion.li key={index} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className="hover:text-[#c7cc3f] transition-colors duration-200 flex items-center gap-2 py-1"
                    >
                      <ChevronRight className="w-4 h-4 opacity-60" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 mix-blend-difference text-white">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center space-x-2 text-xs"
          >
            <Copyright className="w-4 h-4" />
            <p>{new Date().getFullYear()} Fayida Academy. All Rights Reserved</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center space-x-3"
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
                className="p-2 rounded-full hover:bg-[#c7cc3f]/20 transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
            <Link
              href="https://www.tiktok.com/@fayidaacademy"
              target="_blank"
              className="p-2 rounded-full hover:bg-[#c7cc3f]/20 transition-colors"
            >
              <FontAwesomeIcon
                icon={faTiktok}
                className="w-5 h-5"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
