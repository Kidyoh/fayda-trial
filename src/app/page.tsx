'use client';
import Blog from "@/components/homepage_components/blog";
import CoverHome from "@/components/homepage_components/cover_home";
import Info from "@/components/homepage_components/info";
import PackageCards from "@/components/homepage_components/package_cards";
import PackageDiscountSlider from "@/components/homepage_components/package_discount_slider";
import SectionOne from "@/components/homepage_components/section_one";
import WelcomeSection from "@/components/homepage_components/welcomesection";
import { useLanguage } from "@/lib/language-context";
import { useEffect, useState } from "react";

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
          <Blog />
          <SectionOne />
        </>
      )}
    </>
  );
} 
  