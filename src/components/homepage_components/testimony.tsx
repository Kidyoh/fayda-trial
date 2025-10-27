"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const testimonials = [
  {
    quote: `Everything is possible with Chris’ coaching and guidance. He helps me see my true self, find my voice, and guide me on the road to self acceptance.

With Chris as my coach I’ve reached goals I never thought were possible. Like a six-figure course launch, getting 100K followers on Instagram, and starting my own community.`,
    name: "Anneli Hansson",
    title: "Brand Strategist",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    quote: `Chris helps open the doors of discovery and allows you to uncover the roadblocks. His uncanny ability to ask insightful questions and pull-out creative thoughts helps one to navigate a road map that is both productive and achievable. By carefully following Chris’s instructions and executing his advice our company has grown by 61% YOY.`,
    name: "Eric Wegweiser",
    title: "Horticultural Creations",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    quote: `Chris’ coaching and expertise is easily worth $10,000/hour. In the two years we have worked together, I’ve made over $500,000 a year from my design business while working 15 hours a week. Grown my following from ZERO to over 100,000.

Chris is an incredible mentor, a powerful coach, and a generous fri end. I can’t recommend him enough.`,
    name: "Rich Webster",
    title: "Richard Media Company",
    avatar: "https://randomuser.me/api/portraits/men/24.jpg",
  },
  {
    quote: `I was lost about how to get recognized in my new niche. Chris gave me the clarity and direction I needed: focus on content creation, raise my rate, and delegate.

In less than a year I reached 9.5K followers on LinkedIn (9X growth) and 19.6K followers on Instagram (19X growth). My revenue increased by 50% without having added any clients and I hired a full-time designer — all because of his coaching!`,
    name: "Kung Pik Liu",
    title: "Design Angel",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
  },
];

function QuoteIcon() {
  return (
    <svg
      className="w-10 h-10 text-gray-200 absolute -top-4 -left-4"
      fill="none"
      viewBox="0 0 48 48"
    >
      <text x="0" y="38" fontSize="48" fill="currentColor">
        &ldquo;
      </text>
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section className="w-full px-4 pt-6 md:pb-8">
      <div className="max-w-4xl mx-auto mb-10 relative flex flex-col items-center">
        <Image
          src="/svg/Asset 21.svg"
          alt="Fayida Packages"
          width={290}
          height={56}
          className="absolute w-full md:w-max top-3 left-1/2 -translate-x-1/2 z-10"
        />
        <h2 className="text-3xl md:text-4xl font-extrabold font-Sendako tracking-wide uppercase text-white z-20 my-8">
          Testimonies
        </h2>
      </div>
      <div className="mx-auto max-w-5xl">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={24}
          slidesPerView={1}
          className="w-full"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative bg-primaryColor/10 border border-gray-200 p-6 rounded-lg">
                <div className="relative pl-12">
                  <QuoteIcon />
                  <p className="md:text-lg text-gray-800 whitespace-pre-line">
                    {t.quote}
                  </p>
                </div>
                <div className="flex items-center mt-8 pl-4">
                  <img
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
                    src={t.avatar}
                    alt={t.name}
                  />
                  <div className="ml-4">
                    <div className="font-extrabold text-2xl text-gray-900">
                      {t.name}
                    </div>
                    <div className="uppercase tracking-wide text-gray-500 text-sm font-semibold">
                      {t.title}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
