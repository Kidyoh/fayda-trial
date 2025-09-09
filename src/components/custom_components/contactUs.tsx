"use client";
import React from "react";
import {
  AtSign,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  PhoneCall,
  Send,
  MapPin,
  Clock,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
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

export default function ContactUs() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "contact@fayidaacademy.com",
      subContent: "fayidaacademy@gmail.com",
      link: "mailto:contact@fayidaacademy.com",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: PhoneCall,
      title: "Phone",
      content: "+251970483333",
      subContent: "+251970493333",
      link: "tel:+251970483333",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Send,
      title: "Telegram",
      content: "@fayidaacademy",
      subContent: "Join our community",
      link: "https://t.me/fayidaacademy",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: MapPin,
      title: "Address",
      content: "Ayat, Galaxy Building",
      subContent: "3rd floor, Addis Ababa, Ethiopia",
      link: "https://maps.google.com/?q=Galaxy+Building+Ayat+Addis+Ababa",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/profile.php?id=61557674511552",
      color: "hover:bg-blue-600",
      name: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/fayidaacademy",
      color: "hover:bg-pink-600",
      name: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/ethlook/",
      color: "hover:bg-blue-700",
      name: "LinkedIn",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/@FayidaAcademyOfficial",
      color: "hover:bg-red-600",
      name: "YouTube",
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
            Have questions about our courses or need support? We're here to help you on your learning journey.
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl font-semibold text-gray-900 mb-8"
            >
              Contact Information
            </motion.h2>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <Link
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : '_self'}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#c7cc3f]/20"
                  >
                    <div className={`p-3 rounded-full ${info.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className={`w-6 h-6 ${info.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-700 font-medium">{info.content}</p>
                      {info.subContent && (
                        <p className="text-gray-500 text-sm mt-1">{info.subContent}</p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Social Media */}
            <motion.div variants={itemVariants} className="pt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:text-white ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                    title={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl font-semibold text-gray-900 mb-8"
            >
              Find Us
            </motion.h2>
            
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="aspect-w-16 aspect-h-12 h-96 lg:h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6321.117200090417!2d38.87837423942284!3d9.022396327003138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b9110219b14bb%3A0xebedb3471cf21533!2zR2FsYXh5IHN1cGVybWFya2V0IHwgQXlhdCB8IOGMi-GIi-GKreGIsiDhiLHhjZDhiK3hiJvhiK3hiqzhibUgfCDhiqDhi6vhibU!5e0!3m2!1sen!2set!4v1717072489431!5m2!1sen!2set"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Fayida Academy Location"
                ></iframe>
              </div>
            </motion.div>

            {/* Office Hours */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] rounded-2xl p-6 text-white"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Office Hours</h3>
              </div>
              <div className="space-y-2 text-white/90">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-semibold text-gray-900 mb-4"
          >
            Ready to Start Learning?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 mb-6 max-w-2xl mx-auto"
          >
            Join thousands of students who are already learning with Fayida Academy. 
            Explore our courses and start your educational journey today.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/courses"
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Browse Courses
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-[#c7cc3f] hover:text-[#c7cc3f] transition-all duration-200"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
