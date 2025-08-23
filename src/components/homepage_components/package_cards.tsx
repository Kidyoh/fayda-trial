import Image from "next/image";
import React from "react";
import Link from "next/link";

const packages = [
  {
    id: "1",
    title: "Computer Science Fundamentals",
    price: "200 Birr",
    button: "BUY NOW",
    description: [
      "Programming basics and algorithms",
      "Data structures and databases",
      "Software development practices",
      "Hands-on coding projects",
      "Industry-standard certification",
    ],
    bg: "bg-gradient-to-br from-[#07705d] to-[#bf8c13]",
    border: "border-2 border-[#c7cc3f]",
    text: "text-white",
  },
  {
    id: "2",
    title: "Ethiopian Literature & Culture",
    price: "300 Birr",
    button: "BUY NOW",
    description: [
      "Classical Ethiopian literature",
      "Modern cultural studies",
      "Historical perspectives",
      "Creative writing workshops",
      "Cultural heritage analysis",
    ],
    bg: "bg-gradient-to-br from-[#bf8c13] to-[#c7cc3f]",
    border: "border-2 border-[#07705d]",
    text: "text-white",
  },
];

type CardProps = {
  id: string;
  title: string;
  price: string;
  button: string;
  description: string[];
  bg: string;
  border: string;
  text: string;
};

const Card: React.FC<CardProps> = ({ id, title, price, button, description, bg, border, text }) => (
  <div
    className={`
      relative flex flex-col items-center p-8
      ${bg} ${border} ${text}
      transition-all duration-300
      hover:-translate-y-2 hover:scale-[1.02]
      min-h-[400px] w-full rounded-2xl
      overflow-hidden group
    `}
  >
    {/* Ethiopian Pattern Overlay */}
    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id={`pattern-${id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <polygon points="10,0 20,10 10,20 0,10" fill="currentColor" opacity="0.3" />
            <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#pattern-${id})`} />
      </svg>
    </div>

    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="font-bold text-xl font-Sendako tracking-wide mb-4 text-center leading-tight">
        {title}
      </div>
      <div className="text-4xl font-extrabold mb-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl">
        {price}
      </div>

      <Link href={`/package_2/${id}`} className="w-full mb-6">
        <button className="w-full bg-white text-[#07705d] font-bold py-3 px-6 rounded-2xl transition-all duration-200 hover:bg-white/90 hover:scale-105 group-hover:shadow-lg border-2 border-transparent hover:border-white/30">
          {button}
        </button>
      </Link>

      <ul className="text-white/90 text-sm space-y-3 text-left font-medium list-none w-full">
        {description.map((line, i) => (
          <li key={i} className="flex items-start">
            <div className="w-2 h-2 bg-white/80 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="leading-relaxed">{line}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default function PackageCards() {
  return (
    <div className="pb-10 px-4">
      <div className="max-w-4xl mx-auto mb-10 relative flex flex-col items-center">
        <Image
          src="/svg/Asset 21.svg"
          alt="Courses"
          width={290}
          height={56}
          className="absolute w-full md:w-max top-3 left-1/2 -translate-x-1/2 z-10"
        />
        <h2 className="text-3xl md:text-4xl font-extrabold font-Sendako tracking-wide uppercase text-white z-20 my-8">
          Featured Packages
        </h2>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {packages.map((pkg, i) => (
          <Card key={i} {...pkg} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/searchPackages">
          <button className="bg-primaryColor backdrop-blur-sm text-white font-bold py-4 px-8 rounded-2xl border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-[#07705d] hover:scale-105">
            View All Packages
          </button>
        </Link>
      </div>
    </div>
  );
}