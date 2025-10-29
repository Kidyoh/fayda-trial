import AdSliderServer from "@/components/homepage_components/ad_slider_server";
import BlogServer from "@/components/homepage_components/blog_server";
import CourseGridServer from "@/components/homepage_components/course_grid_server";
import CoverHomeServer from "@/components/homepage_components/cover_home_server";
import Marquee from "@/components/homepage_components/marquee";
import PackageCardsServer from "@/components/homepage_components/package_cards_server";
import PackageDiscountSlider from "@/components/homepage_components/package_discount_slider";
import TestimonialsServer from "@/components/homepage_components/testimony_server";
import WelcomeSection from "@/components/homepage_components/welcome_section";
import WhatWeOfferServer from "@/components/homepage_components/what_we_offer_server";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <CoverHomeServer />
      <WelcomeSection />
      <AdSliderServer />
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
        <PackageCardsServer />
        <CourseGridServer />
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
        <WhatWeOfferServer />
        <PackageDiscountSlider />
        <TestimonialsServer />
      </div>
      <BlogServer />
      {/* <Marquee /> */}
    </>
  );
}
