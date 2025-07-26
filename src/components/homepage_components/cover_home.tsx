"use client";

import Image from "next/image";
import ScrollDown from "./scroll_down";
import GetStarted from "./get_started";
import FaqButton from "./faq_button";

export default function CoverHome() {




  return (
    <div className="relative h-[100dvh] w-full pt-32 bg-[url(/Background/landing-bg.jpg)] bg-cover bg-center flex flex-col items-center">

      <h1 className="sr-only">let&lsquo;s embark on this knowledge journey!</h1>

      <div className="max-w-5xl absolute top-[65%] z-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="relative max-w-4xl mb-4 text-[5.2rem] leading-[1.2] text-white header font-Sendako uppercase">
          let&lsquo;s embark on this knowledge journey!
          <Image
            src="/svg/Asset 9.svg"
            alt="text decoration"
            width={20}
            height={20}
            className="w-20 h-20 absolute -top-12 -left-6 pointer-events-none"
          />
        </h1>
        <Image
          src="/common_files/main/bannerx01.jpg"
          alt="Landing Image"
          width={700}
          height={500}
          className="w-full bg-white rounded-3xl"
        />
      </div>
        <Image
          src="/svg/Asset 20.svg"
          alt="Landing Image"
          width={20}
          height={20}
          className="w-36 absolute -bottom-32 z-10 right-[20%]"
        />
      <GetStarted />
      <FaqButton />
      <ScrollDown />
    </div>
  );
}

