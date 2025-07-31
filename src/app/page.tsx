'use client';
import Blog from "@/components/homepage_components/blog";
import CoverHome from "@/components/homepage_components/cover_home";
import Info from "@/components/homepage_components/info";
import Marquee from "@/components/homepage_components/marquee";
import PackageCards from "@/components/homepage_components/package_cards";
import PackageDiscountSlider from "@/components/homepage_components/package_discount_slider";
import SectionOne from "@/components/homepage_components/section_one";
import Testimonials from "@/components/homepage_components/testimony";
import WelcomeSection from "@/components/homepage_components/welcomesection";
import { useLanguage } from "@/lib/language-context";
import { useEffect, useState } from "react";
import CoursesList from "./packages_access/courses_list/page";
import CourseGrid from "@/components/homepage_components/courses";
import FeaturedCourse from "@/components/homepage_components/featured_course";

export default function Home() {
  // Use useState and useEffect to safely handle client-side code
  const [isClient, setIsClient] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <>
      {isClient && (
        <>
          <CoverHome /> 
          <Info />
          <WelcomeSection />
          <PackageCards/>
          <PackageDiscountSlider />
          <FeaturedCourse/>
          <CourseGrid/>
          <Blog />
          <Testimonials />
          <Marquee/>
        </>
      )}
    </>
  );
} 
  