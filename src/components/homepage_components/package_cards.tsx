import Image from "next/image";
import React from "react";

const packages = [
  {
    title: "PACKAGE 2",
    price: "$",
    button: "TRY IT FREE",
    description: [
      "Access to 850+ resources",
      "Certification prep",
      "Goal-focused recommendations",
    ],
    bg: "bg-[#F9C96B]",
    border: "border-t-4 border-[#4AD7D1]",
    text: "text-[#fff]",
  },
  {
    title: "MAIN PACKAGE",
    price: "$",
    button: "TRY IT FREE",
    description: [
      "Access to 1000+ Resources",
      "Certification prep",
      "Goal-focused recommendations",
      "AI-powered coding exercises",
      "Advanced analytics and insights",
      "Dedicated customer success team",
    ],
    bg: "bg-[#2A5951]",
    border: "border-t-4 border-[#4AD7D1]",
    text: "text-[#fff]",
    featured: true,
  },
  {
    title: "PACKAGE 3",
    price: "$",
    button: "TRY IT FREE",
    description: [
      "Access to 500+ top courses",
      "Certification prep",
      "Goal-focused recommendations",
    ],
    bg: "bg-[#F9C96B]",
    border: "border-t-4 border-[#4AD7D1]",
    text: "text-[#fff]",
  },
];

type CardProps = {
  title: string;
  price: string;
  button: string;
  description: string[];
  bg: string;
  border: string;
  featured?: boolean;
};

const Card: React.FC<CardProps> = ({ title, price, button, description, bg, border, featured }) => (
  <div
    className={`
      relative flex flex-col items-center p-6 rounded-md shadow-md
      ${bg} ${border} 
      transition-all duration-300
      hover:-translate-y-3 hover:shadow-2xl hover:scale-105
      ${featured ? "z-10 scale-105 shadow-lg" : ""}
      min-h-[350px] w-full
    `}
    style={{
      boxShadow: featured
        ? "0 8px 24px 0 rgba(0,0,0,0.12)"
        : undefined,
    }}
  >
    <div className="font-bold text-lg tracking-wide mb-2 text-white">{title}</div>
    <div className="text-3xl font-extrabold mb-1 text-white">{price}</div>
    <button className="bg-white text-[#2A5951] font-bold py-2 px-5 rounded-md mb-4 shadow-sm transition hover:bg-[#e6e6e6]">
      {button}
    </button>
    <ul className="text-white text-sm mt-2 space-y-1 text-center">
      {description.map((line, i) => (
        <li key={i}>{line}</li>
      ))}
    </ul>
  </div>
);

export default function PackageCards() {
  return (
    <div className="bg-white py-10 px-2">
      {/* Heading */}
      <div className="max-w-4xl mx-auto mb-10 relative flex flex-col items-center">
        <Image
          src="/svg/Asset 21.svg"
          alt="Fayida Packages"
          width={290}
          height={56}
          className="absolute w-max top-3 left-1/2 -translate-x-1/2 z-10"
        />
        <h2 className="text-2xl md:text-4xl font-extrabold font-Sendako tracking-wide uppercase text-white z-20 mt-8">
          FAYIDA PACKAGES
        </h2>
        <div className="w-full border-t border-black mt-8"></div>
      </div>
      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, i) => (
          <Card key={i} {...pkg} />
        ))}
      </div>
    </div>
  );
}