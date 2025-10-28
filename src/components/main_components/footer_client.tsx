"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import {
  ArrowRight,
  Copyright,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Send,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterLinks {
  company: FooterLink[];
  resources: FooterLink[];
  courses: FooterLink[];
}

interface FooterClientProps {
  footerLinks: FooterLinks;
}

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
 * Client Component for Footer
 * Handles animations and interactions
 */
export default function FooterClient({ footerLinks }: FooterClientProps) {
  const socialLinks = [
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
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-start">
        {/* Contact + Brand Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
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

          {/* Brand blurb */}
          <motion.div variants={itemVariants} className="">
            <p className="text-white text-sm leading-relaxed max-w-xs lg:text-white/90">
              Empowering learners worldwide with quality education. Join our
              community of passionate learners and expert instructors.
            </p>
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
            {socialLinks.map((social, index) => (
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
  );
}
