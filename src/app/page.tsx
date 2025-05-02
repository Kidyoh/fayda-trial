'use client';

import Advertisment_home from "@/components/homepage_components/advertisment_home";
import AdvertismentSliding from "@/components/homepage_components/advertisment_siding";
import BlogSample from "@/components/homepage_components/blogs_sample";
import CoursesSampleNames from "@/components/homepage_components/couses_sample_names";
import CoverHome from "@/components/homepage_components/cover_home";
import Info from "@/components/homepage_components/info";
import MockExamRendered from "@/components/homepage_components/mockexam_rendered";
import PackageDiscountSlider from "@/components/homepage_components/package_discount_slider";
import PackagesRenderd from "@/components/homepage_components/pakages_rendered";
import SectionOne from "@/components/homepage_components/section_one";
import WelcomeSection from "@/components/homepage_components/welcomesection";
import PageBreaker from "@/components/main_components/pageBreaker";
import { useEffect, useState } from "react";

export default function Home() {
  // Use useState and useEffect to safely handle client-side code
  const [isClient, setIsClient] = useState(false);

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
