import Image from "next/image";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import FooterClient from "./footer_client";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blogs" },
  ],
  resources: [
    { name: "FAQ", href: "/faq" },
    { name: "Terms of Service", href: "/terms_of_service" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Help Center", href: "/help" },
  ],
  courses: [
    { name: "All Courses", href: "/courses" },
    { name: "Free Courses", href: "/courses/free" },
    { name: "Premium Courses", href: "/courses/premium" },
    { name: "Become an Instructor", href: "/teach" },
  ],
};

/**
 * Server Component for Footer
 * Handles static content, images, and layout
 */
export default function FooterServer() {
  return (
    <footer className="relative py-8 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 lg:bg-white">
      {/* Desktop Background Images */}
      <Image
        width={1080}
        height={720}
        src="/Background/footer1.png"
        alt="footer image"
        className="hidden lg:flex absolute z-10 w-full bottom-0 h-[75%] object-cover object-center"
      />
      <Image
        width={1080}
        height={720}
        src="/Background/footer2.png"
        alt="footer image"
        className="hidden lg:flex absolute z-20 w-full bottom-0 h-[45%] object-cover object-center"
      />
      <Image
        width={1080}
        height={720}
        src="/Background/footer3.png"
        alt="footer image"
        className="hidden lg:flex absolute z-30 w-full bottom-0 h-[25%] object-cover object-center"
      />

      {/* Mobile gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#c7cc3f]/10 to-[#bf8c13]/10 z-5 lg:hidden"></div>

      {/* Desktop dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-35 hidden lg:block"></div>

      {/* Logo Section */}
      <div className="w-full flex justify-center relative z-40 mb-8">
        <Image
          src="/common_files/main/smallfulllogo.png"
          alt="Fayida Academy logo"
          width={120}
          height={80}
          className="h-16 sm:h-20 mb-3"
        />
      </div>

      {/* Grid + Animated Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-40">
        <FooterClient footerLinks={footerLinks} />
      </div>
    </footer>
  );
}
