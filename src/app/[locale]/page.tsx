//import BlogSample from "@/components/homepage_components/blogs_sample";
import Advertisment_home from "@/components/homepage_components/advertisment_home";
import AdvertismentSliding from "@/components/homepage_components/advertisment_siding";
import BlogSample from "@/components/homepage_components/blogs_sample";
import CoursesSampleNames from "@/components/homepage_components/couses_sample_names";
import HomePageCover from "@/components/homepage_components/cover";
import CoverHome from "@/components/homepage_components/cover_home";
import Info from "@/components/homepage_components/info";
import MockExamRendered from "@/components/homepage_components/mockexam_rendered";
import MockexamSection from "@/components/homepage_components/mockexam_section";
import PackageDiscountSlider from "@/components/homepage_components/package_discount_slider";
import PackagesRenderd from "@/components/homepage_components/pakages_rendered";
import SectionOne from "@/components/homepage_components/section_one";
import Testimony from "@/components/homepage_components/testimony";
import WelcomeSection from "@/components/homepage_components/welcomesection";
import ContactUs from "@/components/main_components/contact_us";
import Footer from "@/components/main_components/footer";
import PageBreaker from "@/components/main_components/pageBreaker";
import Image from "next/image";


import initTranslations from "../i18n";
import TranslationProvider from "../../components/TranslationsProvider";
const i18nNamespaces = ["home", "common"];

export default async function Home({ params: { locale } }: any) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationProvider
      locale={locale}
      resources={resources}
      namespaces={i18nNamespaces}
    >
      <div>
        {/* <HomePageCover /> */}

        <CoverHome />
        <Info />
        <WelcomeSection />
        {/* <MockExamRendered /> */}
        {/* <Advertisment_home /> */}

        {/* <AdvertismentSliding /> */}

        {/* <CoursesSampleNames /> */}
        <PackageDiscountSlider />
        {/* <PackagesRenderd /> */}
        {/* <PageBreaker /> */}
        {/* <Testimony /> */}
        <BlogSample />
        {/* <MockexamSection /> */}
        <SectionOne />

        {/* <ContactUs /> */}
        <Footer />
      </div>
    </TranslationProvider>
  );
}
