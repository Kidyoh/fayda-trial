import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const cards = [
  {
    title: "Carousel Template Kit",
    instructor: "Chris Do",
    instructorImg: "https://randomuser.me/api/portraits/men/33.jpg",
    price: "$19",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    description:
      "Slow that scroll, create captivating social media content in no time, and have an Instagram feed that looks like money (without hiring a designer).",
    cta: "Buy Now",
    link: "#"
  },
  {
    title: "Brand Strategy Fundamentals",
    instructor: "Anneli Hansson",
    instructorImg: "https://randomuser.me/api/portraits/women/65.jpg",
    price: "$199",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    description:
      "Learn the most important frameworks and exercises to lead successful brand strategy sessions.",
    cta: "Buy Now",
    link: "#"
  },
  {
    title: "Design Thinking Guidebook",
    instructor: "Eric Moore",
    instructorImg: "https://randomuser.me/api/portraits/men/32.jpg",
    price: "$79",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description:
      "Whip up some tasty solutions to your clients’ toughest challenges with design thinking methods and become their most trusted advisor.",
    cta: "Buy Now",
    link: "#"
  },
  {
    title: "Illustration for Designers",
    instructor: "Greg Gunn",
    instructorImg: "https://randomuser.me/api/portraits/men/34.jpg",
    price: "$49",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    description:
      "Master the art of illustration and elevate your design work with professional drawing techniques.",
    cta: "Buy Now",
    link: "#"
  },
  {
    title: "Grids & Layout",
    instructor: "Jane Doe",
    instructorImg: "https://randomuser.me/api/portraits/women/66.jpg",
    price: "$99",
    img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=400&q=80",
    description:
      "Learn how to create grids that provide structure and clarity to all your design projects.",
    cta: "Buy Now",
    link: "#"
  },
  {
    title: "Advanced Typography",
    instructor: "Alex Lee",
    instructorImg: "https://randomuser.me/api/portraits/men/35.jpg",
    price: "$59",
    img: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?auto=format&fit=crop&w=400&q=80",
    description:
      "Unlock the secrets of beautiful type and learn advanced techniques for working with fonts and lettering.",
    cta: "Buy Now",
    link: "#"
  }
];

function AnimatedCourseCard({ card }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="bg-white shadow-2xl shadow-primaryColor/10 overflow-hidden w-full rounded-2xl"
      style={{ minHeight: 420, maxWidth: 420 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      <motion.div
        className="w-full overflow-hidden relative z-20"
        animate={{
          height: hovered ? 120 : 300
        }}
        transition={{ duration: 0.35, type: "tween" }}
        style={{ height: 260 }}
      >
        <motion.img
          src={card.img}
          alt={card.title}
          className="w-full h-[120%] object-cover"
          animate={{ scale: hovered ? 1.03 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ willChange: 'transform' }}
        />
      </motion.div>

      <div className="px-6 py-6">
        <div className="font-semibold text-2xl mb-3 font-Sendako">{card.title}</div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <img
              src={card.instructorImg}
              alt={card.instructor}
              className="w-9 h-9 rounded-full object-cover border border-gray-200"
            />
            <span className="uppercase text-sm tracking-wider font-semibold text-gray-900">
              {card.instructor}
            </span>
          </div>
          <span className="font-semibold text-2xl text-gray-900 font-Sendako">
            {card.price}
          </span>
        </div>

        <AnimatePresence initial={false}>
          {hovered && (
            <motion.div
              key="desc"
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="text-gray-700 text-base mb-6 mt-2">
                {card.description}
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={card.link}
                  className="bg-primaryColor text-white font-semibold font-Sendako py-2 px-7 rounded-full"
                >
                  {card.cta}
                </a>
                <a
                  href={card.link}
                  className="flex items-center font-Sendako font-medium text-gray-900 hover:underline ml-2"
                >
                  Learn More
                  <svg
                    className="ml-1 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function AnimatedCourseGrid() {
  return (
    <section id="course" className="min-h-screen py-10 px-4 relative">
      {/* Decorative Brush2.png */}
      <Image
        src="/Images/Brush2.png"
        alt="Brush Decoration"
        width={300}
        height={180}
        className="w-28 absolute top-1/2 right-0 md:right-0 opacity-80 pointer-events-none select-none"
      />

      <Image
        src="/Images/spiral.png"
        alt="Brush Decoration"
        width={300}
        height={180}
        className="w-28 absolute top-1/2 left-0 md:right-0 opacity-80 pointer-events-none select-none"
      />
      <div className="max-w-4xl mx-auto mb-10 relative flex flex-col items-center">
        <Image
          src="/svg/Asset 21.svg"
          alt="Courses"
          width={290}
          height={56}
          className="absolute w-full md:w-max top-3 left-1/2 -translate-x-1/2 z-10"
        />
        <h2 className="text-3xl md:text-4xl font-extrabold font-Sendako tracking-wide uppercase text-white z-20 my-8">
          Courses
        </h2>
      </div>
      <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, idx) => (
          <AnimatedCourseCard key={idx} card={card} />
        ))}
      </div>
    </section>
  );
}