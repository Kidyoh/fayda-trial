"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Award, ArrowRight, GraduationCap, Target, Clock } from "lucide-react";

export default function AboutUs() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: "5000+", label: "Active Students" },
    { icon: <BookOpen className="w-6 h-6" />, value: "100+", label: "Courses" },
    { icon: <Award className="w-6 h-6" />, value: "95%", label: "Success Rate" },
  ];

  const features = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Expert-Led Learning",
      description: "Learn from industry professionals and experienced educators who are passionate about sharing their knowledge."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Personalized Path",
      description: "Customized learning paths that adapt to your pace and style, ensuring optimal progress and understanding."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexible Schedule",
      description: "Study anytime, anywhere with our on-demand courses and mobile-friendly platform."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Where Knowledge Meets{" "}
                <span className="text-primaryColor">Excellence</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Empowering learners worldwide with quality education that's accessible, 
                engaging, and transformative. Join us on a journey of continuous growth 
                and discovery.
              </p>
              <Link href="/explore_packages">
                <button className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-primaryColor rounded-full hover:bg-primaryColor/90 transition-colors duration-200">
                  Start Learning
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/common_files/main/cover3.png"
                  alt="Fayida Academy"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <div className="p-3 bg-primaryColor/10 rounded-full text-primaryColor mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We believe education should be accessible to everyone, regardless of 
              location or schedule. That's why we've created a user-friendly platform 
              that allows you to learn at your own pace, anytime, and anywhere. Our 
              commitment is to provide quality education that transforms lives and 
              opens doors to new opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <div className="p-3 bg-primaryColor/10 rounded-full text-primaryColor w-fit mb-4 group-hover:bg-primaryColor group-hover:text-white transition-colors duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primaryColor">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Join Our Learning Community
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Start your learning journey today and unlock a world of possibilities. 
              Join thousands of students who are already transforming their lives 
              through education.
            </p>
            <Link href="/explore_packages">
              <button className="inline-flex items-center px-8 py-4 text-primaryColor bg-white rounded-full font-medium hover:bg-gray-100 transition-colors duration-200">
                Explore Our Courses
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

{
  /*
   <div className="my-3">
      <div className="w-full flex mb-3 px">
        <h1 className="mx-auto text-xl font-semibold text-primaryColor">
          About
        </h1>
      </div>
      <div className="mt-6 boder-2 ">
        <img src="/common_files/main/cover3.png" alt="" />
      </div>

      <div className="mx-4 my-2 border-2 border-primaryColor px-2 py-2">
        <h1 className="">
          {" "}
          Welcome to Fayida Acadamy, a leading online learning destination where
          knowledge meets convenience. Our mission is to empower learners from
          all walks of life to unlock their full potential by providing
          top-quality courses from industry experts and thought leaders. At
          Fayida Acadamy, we believe that education should be accessible to
          everyone, regardless of geographical location or busy schedules.
          That's why we've created a user-friendly platform that allows you to
          learn at your own pace, anytime, and anywhere. Whether you're a
          professional looking to upskill, a student seeking supplementary
          learning resources, or an individual passionate about personal growth,
          we have a course for you.
        </h1>
      </div>
      <div className="grid grid-cols-3  w-full px-5">
        <div className="w-fit my-auto col-span-1  bg-primaryColor rounded shadow-xl shadow-primaryColor border-2 border-white">
          <img src="/common_files/main/aboutcover.png" alt="" />
        </div>
        <div className="col-span-2 px-5">
          <div className="px-5 my-6 text-lg">
            <h1>
              We take pride in curating a diverse range of courses that cover
              various subjects, from technology and business to arts and
              personal development. Our instructors are experienced
              professionals who are passionate about sharing their knowledge and
              expertise. <br />
              <br />
              They design engaging lessons, interactive quizzes, and practical
              exercises to ensure a dynamic learning experience that sticks with
              you long after the course is completed. We are dedicated to
              providing exceptional customer support and a seamless learning
              journey. <br />
              <br />
              Our platform is equipped with intuitive features, such as progress
              tracking, discussion forums, and downloadable resources, to
              enhance your learning experience and foster a vibrant community of
              learners. <br />
              <br /> Join thousands of learners who have already embarked on
              their learning journey with Fayida Acadamy. Expand your horizons,
              gain new skills, and unleash your true potential. Start your
              learning adventure today and unlock a world of possibilities.{" "}
              <br /> <br />
              Together, let's embrace the future of education and make learning
              an exciting and transformative experience.
            </h1>
          </div>
        </div>
      </div>
    </div>
*/
}
