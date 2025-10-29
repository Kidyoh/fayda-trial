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

interface Feature {
  iconName: string;
  secondIconName: string;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  stats: string;
}

interface WhatWeOfferClientProps {
  features: Feature[];
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpenCheck,
  PiIcon,
  Vote,
  FlaskConical,
  Blocks,
  Globe,
  Trophy,
  Orbit,
  Users,
  AtomIcon,
  User,
};

/**
 * Client Component for What We Offer
 * Handles animations and interactive features
 */
export default function WhatWeOfferClient({
  features,
}: WhatWeOfferClientProps) {
  return (
    <div className="px-8 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-content-center gap-2 relative">
      {features.map((feature, index) => {
        const Icon = iconMap[feature.iconName];
        const SecondIcon = iconMap[feature.secondIconName];

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group bg-[url(/Images/surface.jpg)] bg-cover bg-center rounded-2xl relative overflow-hidden"
          >
            <SecondIcon
              className={`w-full h-full ${feature.color} absolute -bottom-2 -left-1/2 opacity-5`}
            />
            <div
              className={`relative h-full p-8 rounded-2xl ${feature.bgColor}`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div
                  className={`p-4 rounded-full ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-12 h-12 ${feature.color}`} />
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
        );
      })}
    </div>
  );
}
