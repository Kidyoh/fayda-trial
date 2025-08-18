"use client";

import Link from "next/link";
import React from "react";
import { BookOpen, Users, Award, ArrowRight, GraduationCap, Target, Clock, Star, Globe, Shield, Lightbulb, Heart, Zap } from "lucide-react";

export default function AboutUs() {
  const stats = [
    { icon: <Users className="w-6 h-6" />, value: "5000+", label: "Active Students" },
    { icon: <BookOpen className="w-6 h-6" />, value: "100+", label: "Courses" },
    { icon: <Award className="w-6 h-6" />, value: "95%", label: "Success Rate" },
  ];

  const features = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Expert-Led Learning",
      description: "Learn from industry professionals and experienced educators who are passionate about sharing their knowledge and expertise."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Personalized Learning",
      description: "Customized learning paths that adapt to your pace and style, ensuring optimal progress and deep understanding."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexible Schedule",
      description: "Study anytime, anywhere with our on-demand courses and mobile-friendly platform designed for busy lifestyles."
    }
  ];

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Community-Centered",
      description: "Building strong learning communities that support and inspire each other throughout the educational journey."
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation-Driven",
      description: "Embracing cutting-edge technology and innovative teaching methods to enhance the learning experience."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Quality Assured",
      description: "Maintaining the highest standards of educational content and ensuring every course meets our excellence criteria."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Impact-Focused",
      description: "Creating real-world impact through practical education that transforms careers and lives across Ethiopia."
    }
  ];

  const milestones = [
    { year: "2020", event: "Fayida Academy Founded", description: "Started with a vision to democratize education in Ethiopia" },
    { year: "2021", event: "First 1,000 Students", description: "Reached our first major milestone of active learners" },
    { year: "2022", event: "100+ Courses Launched", description: "Expanded our course catalog across multiple disciplines" },
    { year: "2023", event: "International Recognition", description: "Received awards for educational innovation in Africa" },
    { year: "2024", event: "10,000+ Graduates", description: "Celebrated over 10,000 successful course completions" },
  ];

  const testimonials = [
    {
      name: "Meron Tadesse",
      role: "Software Developer",
      content: "Fayida Academy transformed my career. The programming courses were comprehensive and the instructors were incredibly supportive.",
      rating: 5
    },
    {
      name: "Samuel Bekele",
      role: "Business Owner",
      content: "The business management courses helped me scale my startup. The practical approach made all the difference.",
      rating: 5
    },
    {
      name: "Hanan Mohammed",
      role: "Teacher",
      content: "As an educator, I found the teaching methodology courses invaluable. They've enhanced my classroom techniques significantly.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Ethiopian Geometric Patterns */}
      <section className="relative overflow-hidden pt-24 pb-16 bg-[url(/Background/landing-bg.jpg)] bg-cover bg-center">        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-center mx-auto max-w-3xl">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-center font-bold text-white leading-tight mb-6">
                Welcome to{" "}
                <span className="text-[#c7cc3f]">Fayida Academy</span>
              </h1>
              <p className="text-lg text-white/90 mb-8 leading-relaxed text-center">
                Empowering learners across Ethiopia and beyond with quality education that bridges traditional wisdom 
                and modern innovation. Join us in building a brighter future through knowledge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/explore_packages">
                  <button className="inline-flex items-center px-8 py-4 text-[#07705d] bg-white rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                    Start Learning
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </Link>
                <Link href="/contact_us">
                  <button className="inline-flex items-center px-8 py-4 text-white border-2 border-white rounded-xl font-semibold hover:bg-white hover:text-[#07705d] transition-colors duration-200">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white mx-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-gradient-to-br from-white to-[#c7cc3f]/5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#c7cc3f]/20"
              >
                <div className="p-4 bg-gradient-to-br from-[#bf8c13] to-[#c7cc3f] rounded-2xl text-white mb-4 transform hover:scale-110 transition-transform duration-200">
                  {stat.icon}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#07705d] mb-2">{stat.value}</h3>
                <p className="text-gray-600 text-center text-sm sm:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#07705d] mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We believe education should be accessible to everyone, regardless of 
              location or schedule. That&apos;s why we&apos;ve created a user-friendly platform 
              that allows you to learn at your own pace, anytime, and anywhere. Our 
              commitment is to provide quality education that transforms lives and 
              opens doors to new opportunities across Ethiopia and beyond.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 bg-white rounded-2xl shadow-lg border-l-4 border-[#07705d] hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-[#07705d] mb-3">Accessibility</h3>
                <p className="text-gray-600">Making quality education available to learners from all backgrounds and locations.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-lg border-l-4 border-[#bf8c13] hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-[#bf8c13] mb-3">Excellence</h3>
                <p className="text-gray-600">Maintaining the highest standards in course content and learning experiences.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-lg border-l-4 border-[#c7cc3f] hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-[#c7cc3f] mb-3">Innovation</h3>
                <p className="text-gray-600">Embracing modern technology to enhance traditional learning methods.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#07705d] mb-4">Why Choose Fayida Academy</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what makes our educational platform the preferred choice for learners across Ethiopia
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-gradient-to-br from-white to-[#c7cc3f]/5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group border border-[#c7cc3f]/20 hover:border-[#bf8c13]/40"
              >
                <div className="p-4 bg-gradient-to-br from-[#07705d] to-[#bf8c13] rounded-2xl text-white w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#07705d] mb-4 group-hover:text-[#bf8c13] transition-colors duration-200">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#07705d] mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Fayida Academy
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group border border-[#c7cc3f]/20 hover:border-[#bf8c13]/40"
              >
                <div className="inline-flex p-3 bg-gradient-to-br from-[#bf8c13] to-[#c7cc3f] rounded-xl text-white mb-4 group-hover:scale-110 transition-transform duration-200">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-[#07705d] mb-3 group-hover:text-[#bf8c13] transition-colors duration-200">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#07705d] mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Milestones that mark our commitment to educational excellence
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#07705d] via-[#bf8c13] to-[#c7cc3f]"></div>
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-center group">
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-4 h-4 bg-gradient-to-br from-[#bf8c13] to-[#c7cc3f] rounded-full border-4 border-white shadow-lg group-hover:scale-125 transition-transform duration-200"></div>
                    
                    {/* Content */}
                    <div className="ml-20 p-6 bg-gradient-to-br from-white to-[#c7cc3f]/5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#c7cc3f]/20 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-xl font-bold text-[#07705d] group-hover:text-[#bf8c13] transition-colors duration-200">{milestone.event}</h3>
                        <span className="text-sm font-semibold text-[#bf8c13] bg-[#bf8c13]/10 px-3 py-1 rounded-full">{milestone.year}</span>
                      </div>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#07705d] mb-4">What Our Students Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from learners who have transformed their lives with Fayida Academy
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#c7cc3f]/20 hover:border-[#bf8c13]/40"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#bf8c13] fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="border-t border-[#c7cc3f]/30 pt-4">
                  <h4 className="font-bold text-[#07705d]">{testimonial.name}</h4>
                  <p className="text-sm text-[#bf8c13]">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[url(/Background/landing-bg.jpg)] bg-cover bg-center relative overflow-hidden">
        {/* Ethiopian Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="cta-pattern" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
                <rect width="15" height="15" fill="none"/>
                <path d="M7.5,0 L15,7.5 L7.5,15 L0,7.5 Z" fill="currentColor" opacity="0.2"/>
                <circle cx="7.5" cy="7.5" r="2" fill="currentColor" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-pattern)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Join Our Learning Community
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Start your learning journey today and unlock a world of possibilities. 
              Join thousands of students who are already transforming their lives 
              through education at Fayida Academy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/explore_packages">
                <button className="inline-flex items-center px-8 py-4 text-[#07705d] bg-white rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                  Explore Our Courses
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
              <Link href="/signup">
                <button className="inline-flex items-center px-8 py-4 text-white border-2 border-white rounded-xl font-semibold hover:bg-white hover:text-[#07705d] transition-colors duration-200">
                  Start Free Trial
                  <Star className="ml-2 w-5 h-5" />
                </button>
              </Link>
            </div>
            
            {/* Additional Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#c7cc3f] mb-1">24/7</div>
                <div className="text-white/80 text-sm">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#c7cc3f] mb-1">100%</div>
                <div className="text-white/80 text-sm">Mobile Friendly</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#c7cc3f] mb-1">50+</div>
                <div className="text-white/80 text-sm">Expert Instructors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#c7cc3f] mb-1">15+</div>
                <div className="text-white/80 text-sm">Languages Supported</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
