'use client';
import AdSlider from "@/components/homepage_components/ad_slider";
import Blog from "@/components/homepage_components/blog";
import CourseGrid from "@/components/homepage_components/courses";
import CoverHome from "@/components/homepage_components/cover_home";
import Info from "@/components/homepage_components/info";
import Marquee from "@/components/homepage_components/marquee";
import PackageCards from "@/components/homepage_components/package_cards";
import PackageDiscountSlider from "@/components/homepage_components/package_discount_slider";
import Testimonials from "@/components/homepage_components/testimony";
import WelcomeSection from "@/components/homepage_components/welcomesection";
import WhatWeOffer from "@/components/homepage_components/what_we_offer";
import { useLanguage } from "@/lib/language-context";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <CoverHome />
      <Info />
      <WelcomeSection />
      {/* <AdSlider/> */}
      <div className="relative overflow-hidden">
        <div className="w-[150vw] h-[250vh] absolute left-[45%] opacity-10 -z-10 -translate-x-1/2">
          <Image
            src="/Images/Flowgreen1.png"
            alt="background"
            width={2000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        <PackageCards />
        <CourseGrid />
      </div>
      <div className="relative overflow-hidden">
        <div className="w-[150vw] h-[250vh] absolute top-0 left-[44.5%] opacity-20 -z-10 -translate-x-1/2">
          <Image
            src="/Images/Floworange.png"
            alt="background"
            width={2000}
            height={1000}
            className="w-full h-full absolute opacity-100 rotate- -z-10 object-cover"
          />
        </div>
        <WhatWeOffer />
        <PackageDiscountSlider />
        <Testimonials />
      </div>
      <Blog />
      {/* <Marquee /> */}
    </>
  );
}
