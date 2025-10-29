import Image from "next/image";
import WhatWeOfferClient from "./what_we_offer_client";

interface Feature {
  iconName: string;
  secondIconName: string;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  stats: string;
}

/**
 * Server Component for What We Offer Section
 * Handles static content and layout
 */
export default function WhatWeOfferServer() {
  const features: Feature[] = [
    {
      iconName: "BookOpenCheck",
      secondIconName: "PiIcon",
      title: "Simple Learning",
      description: "We Use a Very Simple Way to Explain",
      color: "text-primaryColor",
      bgColor: "bg-primaryColor/5",
      stats: "95% Success Rate",
    },
    {
      iconName: "Vote",
      secondIconName: "FlaskConical",
      title: "Best Courses",
      description: "Well Organized and Prepared Courses",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/5",
      stats: "50+ Courses",
    },
    {
      iconName: "Blocks",
      secondIconName: "Globe",
      title: "Rich Materials",
      description: "Useful Books and Materials",
      color: "text-blue-500",
      bgColor: "bg-blue-500/5",
      stats: "1000+ Resources",
    },
    {
      iconName: "Trophy",
      secondIconName: "Orbit",
      title: "Recognition",
      description: "Recognition for Best Scores",
      color: "text-amber-500",
      bgColor: "bg-amber-500/5",
      stats: "Weekly Awards",
    },
    {
      iconName: "Users",
      secondIconName: "AtomIcon",
      title: "Community Support",
      description: "Supportive Learning Network",
      color: "text-amber-500",
      bgColor: "bg-amber-500/5",
      stats: "5000+ Active Members",
    },
    {
      iconName: "User",
      secondIconName: "AtomIcon",
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
      <WhatWeOfferClient features={features} />
    </div>
  );
}
