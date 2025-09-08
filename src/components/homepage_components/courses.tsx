import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CoursePurchaseDialog } from "../custom_components/coursePurchaseDialog";
import { CourseAddToCartButton } from "../cart/AddToCartButton";

const cards = [
  {
    id: "course-1",
    title: "Ethiopian Mathematics Grade 12",
    instructor: "Dr. Alemayehu Tadesse",
    instructorImg: "https://randomuser.me/api/portraits/men/33.jpg",
    price: "299",
    temporaryPrice: "199",
    discountStatus: true,
    discountExpiryDate: "2025-10-01",
    status: true,
    displayOnHome: true,
    thumbnail: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    courseDescription: "Comprehensive mathematics course covering all Grade 12 topics including calculus, statistics, and advanced algebra concepts.",
    parts: "12",
    partName: "Mathematical Foundations",
    courseIntroductionVideo: "/course.mp4",
    description: "Master Grade 12 mathematics with Ethiopian curriculum standards. Perfect preparation for university entrance exams.",
    cta: "Enroll Now",
    link: "/course/course-1"
  },
  {
    id: "course-2",
    title: "Physics for Ethiopian Students",
    instructor: "Prof. Hanan Mohammed",
    instructorImg: "https://randomuser.me/api/portraits/women/65.jpg",
    price: "399",
    temporaryPrice: "299",
    discountStatus: true,
    discountExpiryDate: "2025-09-15",
    status: true,
    displayOnHome: true,
    thumbnail: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    courseDescription: "Advanced physics covering mechanics, thermodynamics, electromagnetism, and modern physics concepts.",
    parts: "8",
    partName: "Physics Fundamentals",
    courseIntroductionVideo: "/course.mp4",
    description: "Learn physics concepts with practical applications and laboratory experiments designed for Ethiopian curriculum.",
    cta: "Enroll Now",
    link: "/course/course-2"
  },
  {
    id: "course-2",
    title: "Physics for Ethiopian Students",
    instructor: "Prof. Hanan Mohammed",
    instructorImg: "https://randomuser.me/api/portraits/women/65.jpg",
    price: "399",
    temporaryPrice: "299",
    discountStatus: true,
    discountExpiryDate: "2025-09-15",
    status: true,
    displayOnHome: true,
    thumbnail: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    courseDescription: "Advanced physics covering mechanics, thermodynamics, electromagnetism, and modern physics concepts.",
    parts: "8",
    partName: "Physics Fundamentals",
    courseIntroductionVideo: "/course.mp4",
    description: "Learn physics concepts with practical applications and laboratory experiments designed for Ethiopian curriculum.",
    cta: "Enroll Now",
    link: "/course/course-2"
  },

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
          <div className="flex flex-col items-end">
            {card.discountStatus ? (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg text-gray-500 line-through font-Sendako">
                  {card.price} Birr
                </span>
                <span className="font-semibold text-2xl text-[#07705d] font-Sendako">
                  {card.temporaryPrice} Birr
                </span>
              </div>
            ) : (
              <span className="font-semibold text-2xl text-gray-900 font-Sendako">
                {card.price} Birr
              </span>
            )}
            {card.discountStatus && (
              <span className="text-xs text-red-500 font-medium">
                Until {new Date(card.discountExpiryDate).toLocaleDateString()}
              </span>
            )}
          </div>
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
              <div className="w-full justify-between flex items-center gap-4">
                {card.id ? (
                  <div className="flex flex-col gap-2 flex-1">
                    <CourseAddToCartButton 
                      courseData={{
                        id: card.id,
                        courseName: card.title,
                        price: parseFloat(card.price),
                        temporaryPrice: card.temporaryPrice ? parseFloat(card.temporaryPrice) : undefined,
                        discountStatus: card.discountStatus,
                        discountExpiryDate: card.discountExpiryDate,
                        courseDescription: card.courseDescription
                      }}
                      size="sm"
                    />
                    <CoursePurchaseDialog
                      courseId={card.id}
                      courseName={card.title}
                      price={card.price}
                      temporaryPrice={card.temporaryPrice}
                      discountStatus={card.discountStatus}
                      discountExpiryDate={card.discountExpiryDate}
                    />
                  </div>
                ) : (
                  <a
                    href={card.link}
                    className="bg-primaryColor text-white font-semibold font-Sendako py-2 px-7 rounded-full"
                  >
                    {card.cta}
                  </a>
                )}
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