"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MessageSquare, Bot, ArrowRight, Users, Zap, BookOpen, ChevronRight } from "lucide-react";

const AboutBot = () => {
  const features = [
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Instant Answers",
      description: "Get immediate responses to your academic questions anytime."
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Study Resources",
      description: "Access course materials, notes, and educational content."
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Community Access",
      description: "Connect with study groups and academic clubs easily."
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Progress Tracking",
      description: "Monitor your learning journey and achievements."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-8">
        <nav className="flex text-sm mb-8">
          <Link href="/" className="text-gray-500 hover:text-primaryColor transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400 mt-0.5" />
          <span className="text-primaryColor font-medium">Fayida Bot</span>
        </nav>
      </div>
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-12 max-w-6xl"
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-1/2"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Enhance Your Learning with<br />
              <span className="text-primaryColor">Fayida Academy Bot</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Your intelligent assistant for a seamless educational experience. Get instant access to resources, track your progress, and connect with your academic community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://t.me/fayidaacademy_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primaryColor text-white rounded-full font-medium hover:bg-primaryColor/90 transition duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px] text-center justify-center"
              >
                Start Using Bot <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <Link href="/search" className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition duration-300 text-center justify-center">
                Explore Courses
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primaryColor/20 rounded-full blur-3xl transform -translate-x-2 translate-y-2 opacity-30"></div>
              <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-md">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-primaryColor/10 flex items-center justify-center text-primaryColor">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900">Fayida Bot</h3>
                    <p className="text-sm text-gray-500">Online • Ready to help</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm text-gray-700">How can I help with your studies today?</p>
                  </div>
                  
                  <div className="bg-primaryColor/10 p-3 rounded-lg rounded-tr-none ml-auto max-w-[80%]">
                    <p className="text-sm text-gray-700">Show me my upcoming assignments</p>
                  </div>
                  
                  <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm text-gray-700">You have 2 assignments due this week for Mathematics and Economics.</p>
                  </div>
                </div>
                
                <div className="flex items-center border-t border-gray-100 pt-4">
                  <input 
                    type="text" 
                    className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primaryColor/20"
                    placeholder="Type your question..."
                  />
                  <button className="ml-2 p-2 rounded-full bg-primaryColor text-white hover:bg-primaryColor/90 transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Features Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="container mx-auto px-4 py-16 max-w-6xl"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How Fayida Bot Can Help You</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our intelligent bot is designed to make your educational journey smoother and more efficient.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index + 0.5 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-primaryColor/30"
            >
              <div className="h-12 w-12 rounded-full bg-primaryColor/10 flex items-center justify-center text-primaryColor mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="container mx-auto px-4 py-16 max-w-4xl"
      >
        <div className="bg-gradient-to-r from-primaryColor/90 to-primaryColor rounded-2xl p-8 md:p-12 shadow-xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Learning Experience?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already using Fayida Academy Bot to enhance their education journey.
          </p>
          <a
            href="https://t.me/fayidaacademy_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-white text-primaryColor rounded-full font-medium hover:bg-gray-50 transition duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
          >
            Get Started with Fayida Bot <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </motion.div>
      
      {/* FAQ Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="container mx-auto px-4 py-16 max-w-4xl"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about using the Fayida Academy Bot
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">How do I access the Fayida Academy Bot?</h3>
            <p className="text-gray-600">
              You can access our bot through Telegram by searching for @fayidaacademy_bot or clicking the "Start Using Bot" button above.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">Is the bot available 24/7?</h3>
            <p className="text-gray-600">
              Yes, our bot is available round the clock to help you with your questions and provide resources whenever you need them.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">What type of questions can I ask the bot?</h3>
            <p className="text-gray-600">
              You can ask questions about your courses, assignments, deadlines, learning materials, and even get help with certain academic topics.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutBot;
