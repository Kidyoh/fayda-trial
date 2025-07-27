"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const blog = [
  {
    title: "Greenwood High School",
    subtitle: "Innovative Learning Environment",
    description: `Greenwood High School fosters creativity and critical thinking through project-based learning and modern classrooms. Students participate in science fairs, coding clubs, and art exhibitions, preparing them for future careers in technology and the arts.`,
    image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80",
    link: "greenwood-high",
  },
  {
    title: "Maple Leaf Academy",
    subtitle: "Community and Collaboration",
    description: `Maple Leaf Academy emphasizes teamwork and community service. Students engage in group projects, volunteer programs, and leadership workshops, building strong interpersonal skills and a sense of responsibility.`,
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    link: "maple-leaf-academy",
  },
  {
    title: "Sunrise Elementary",
    subtitle: "Early Childhood Education",
    description: `Sunrise Elementary provides a nurturing environment for young learners. Interactive lessons, outdoor activities, and dedicated teachers help children develop foundational skills in literacy, numeracy, and social interaction.`,
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80",
    link: "sunrise-elementary",
  },
];

const Blog = () => {
  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".blog",
          start: "top center",
          scrub: 0.5,
        },
      })
      .to(".blog-img", {
        yPercent: -20,
      });
  }, []);

  return (
    <div className="py-10">
      {blog?.map((item, index) => (
        <div
          id={item.link}
          key={index}
          className={`flex flex-col md:flex-row w-full items-center md:h-[50vh] lg:h-[80vh] 2xl:h-[65vh] ${
            index === 1 ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`md:w-1/2 h-full w-full hidden overflow-hidden md:flex relative ${
              index === 1 ? "order-last" : ""
            }`}
          >
            <Image
              width={500}
              height={500}
              src={item.image}
              alt="blog images negari"
              className="w-full h-[130%] object-cover blog-img absolute inset-0"
            />
          </div>
          <div className=" space-y-2 bg-white h-full md:w-1/2 p-8 lg:p-16 flex flex-col justify-center items-start">
            <h2 className="text-4xl lg:text-5xl font-Sendako font-bold text-primary font-tokiyo-brush uppercase">
              {item.title}
            </h2>
            <h3 className="text-xl lg:text-3xl max-w-lg font-semibold text-primary font-tokiyo-brush uppercase">
              {item.subtitle}
            </h3>
            <p className="text-sm lg:text-base 2xl:text-lg text-gray-500 max-w-2xl font-raleway-medium">
              {item.description}
            </p>
            <Link
              href={`/blog/${item.link}`}
              className="text-primary underline lg:text-xl font-raleway-medium"
            >
              Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;