"use client";

import ShinyText from "../custom_components/shiny_text";

/**
 * Client Component for Cover Home Interactive Text
 * Handles client-side animations and interactions
 * Specifically for the ShinyText animation
 */
export default function CoverHomeClient() {
  return (
    <h1 className="relative text-xl xxsm:text-2xl xsm:text-3xl sm:text-4xl ssmd:text-4xl md:text-5xl lg:text-5xl xl:text-6xl xxl:text-7xl leading-[1.05] xxsm:leading-[1.1] sm:leading-[1.15] md:leading-[1.2] text-white font-Sendako uppercase">
      <ShinyText
        text="let&lsquo;s embark on this knowledge journey!"
        disabled={false}
        speed={5}
      />
    </h1>
  );
}
