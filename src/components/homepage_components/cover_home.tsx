"use client";

import Image from "next/image";
import ScrollDown from "./scroll_down";
import GetStarted from "./get_started";
import FaqButton from "./faq_button";
import ShinyText from "../custom_components/shiny_text";

export default function CoverHome() {
  return (
    <div className="relative h-[90dvh] md:h-screen w-full pt-12 md:pt-32 bg-[url(/Background/landing-bg.jpg)] bg-cover bg-center flex flex-col items-center">

      <h1 className="sr-only">let&lsquo;s embark on this knowledge journey!</h1>

      <div className="px-6 lg:px-0 flex flex-col w-full max-w-5xl md:max-w-3xl absolute top-[55%] md:top-[65%] z-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="relative w-full md:max-w-4xl mb-4 text-5xl md:text-6xl lg:text-[5.2rem] leading-[1.2] text-white header font-Sendako uppercase">

          <ShinyText
            text="let&lsquo;s embark on this knowledge journey!"
            disabled={false}
            speed={5} />
          <Image
            src="/svg/Asset 9.svg"
            alt="text decoration"
            width={20}
            height={20}
            className="w-12 md:w-20 h-12 md:h-20 absolute -top-6 md:-top-14 left-0 md:-left-5 pointer-events-none"
          />
        </h1>
        <Image
          src="/common_files/main/bannerx01.jpg"
          alt="Landing Image"
          width={700}
          height={500}
          className="w-full bg-white rounded-3xl"
        />
        <div className="flex md:hidden flex-row items-center gap-2 sm:gap-4 mt-4 mx-auto">
          <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
            <Image src="/logos/app-store.png" alt="App Store" width={140} height={50} />
          </a>
          <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
            <Image src="/logos/play-store.png" alt="Play Store" width={140} height={50} />
          </a>
        </div>
      </div>
      <Image
        src="/svg/Asset 20.svg"
        alt="Landing Image"
        width={20}
        height={20}
        className="w-20 lg:w-36 absolute -bottom-20 md:-bottom-32 z-10 right-[15%] md:right-[20%]"
      />
      <GetStarted />
      <FaqButton />
      <ScrollDown />
    </div>
  );
}

