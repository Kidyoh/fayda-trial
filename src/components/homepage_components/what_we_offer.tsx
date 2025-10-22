"use client";

import { motion } from "framer-motion";
import {
  AtomIcon,
  Blocks,
  BookOpenCheck,
  FlaskConical,
  Globe,
  Orbit,
  PiIcon,
  Trophy,
  User,
  Users,
  Vote,
} from "lucide-react";
import Image from "next/image";

const WhatWeOffer = () => {
  const features = [
    {
      icon: BookOpenCheck,
      secondIcon: PiIcon,
      title: "Simple Learning",
      description: "We Use a Very Simple Way to Explain",
      color: "text-primaryColor",
      bgColor: "bg-primaryColor/5",
      stats: "95% Success Rate",
    },
    {
      icon: Vote,
      secondIcon: FlaskConical,
      title: "Best Courses",
      description: "Well Organized and Prepared Courses",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/5",
      stats: "50+ Courses",
    },
    {
      icon: Blocks,
      secondIcon: Globe,
      title: "Rich Materials",
      description: "Useful Books and Materials",
      color: "text-blue-500",
      bgColor: "bg-blue-500/5",
      stats: "1000+ Resources",
    },
    {
      icon: Trophy,
      secondIcon: Orbit,
      title: "Recognition",
      description: "Recognition for Best Scores",
      color: "text-amber-500",
      bgColor: "bg-amber-500/5",
      stats: "Weekly Awards",
    },
    {
      icon: Users,
      secondIcon: AtomIcon,
      title: "Community Support",
      description: "Supportive Learning Network",
      color: "text-amber-500",
      bgColor: "bg-amber-500/5",
      stats: "5000+ Active Members",
    },
    {
      icon: User,
      secondIcon: AtomIcon,
      title: "Personalization",
      description: "Tailored just for You",
      color: "text-amber-500",
      bgColor: "bg-amber-500/5",
      stats: "85% Faster Progress",
    },
  ];
  return (
    <div className="relative py-10 overflow-hidden">
      <Image
        src="/Images/spiral.png"
        alt="Brush Decoration"
        width={300}
        height={180}
        className="w-28 absolute top-1/2 right-0"
      />
      <div className="max-w-4xl mx-auto mb-10 relative flex flex-col items-center">
        <Image
          src="/svg/Asset 21.svg"
          alt="Fayida Packages"
          width={290}
          height={56}
          className="absolute w-full md:w-max top-3 left-1/2 -translate-x-1/2 z-10"
        />
        <h2 className="text-3xl md:text-4xl font-extrabold font-Sendako tracking-wide uppercase text-white z-20 my-8">
          What we offer
        </h2>
      </div>
      {/* Features grid */}
      <div className="px-8 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-content-center gap-2 relative">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group bg-[url(/Images/surface.jpg)] bg-cover bg-center rounded-2xl relative overflow-hidden"
          >
            <feature.secondIcon
              className={`w-full h-full ${feature.color} absolute -bottom-2 -left-1/2 opacity-5`}
            />
            <div
              className={`relative h-full p-8 rounded-2xl ${feature.bgColor}`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div
                  className={`p-4 rounded-full ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`w-12 h-12 ${feature.color}`} />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 font-Sendako">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
                <div
                  className={`${feature.color} font-Sendako md:text-lg mt-2`}
                >
                  {feature.stats}
                </div>
              </div>
              {/* Decorative corner */}
              <div
                className={`absolute top-0 right-0 w-16 h-16 ${feature.bgColor} rounded-bl-[48px] rounded-tr-2xl z-10 transition-all duration-300 group-hover:opacity-100`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhatWeOffer;
