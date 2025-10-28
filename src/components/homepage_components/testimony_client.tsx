"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

interface TestimonyClientProps {
  testimonials: Testimonial[];
}

/**
 * Client Component for Testimonials
 * Handles Swiper carousel animations
 */
export default function TestimonyClient({
  testimonials,
}: TestimonyClientProps) {
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

  return (
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
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
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
  );
}
