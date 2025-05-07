'use client';
import { useEffect, useState } from "react";
import CoverHome from "@/components/homepage_components/cover_home";
import Info from "@/components/homepage_components/info";
import WelcomeSection from "@/components/homepage_components/welcomesection";
import PackageDiscountSlider from "@/components/homepage_components/package_discount_slider";
import BlogSample from "@/components/homepage_components/blogs_sample";
import SectionOne from "@/components/homepage_components/section_one";
import { useLanguage } from "@/lib/language-context";

export default function Home() {
  // Use useState and useEffect to safely handle client-side code
  const [isClient, setIsClient] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <div className="">
      {isClient && (
        <>
          <CoverHome />
          <Info />
          <WelcomeSection />
          <PackageDiscountSlider />
          <BlogSample />
          <SectionOne />
        </>
      )}
    </div>
  );
} 
