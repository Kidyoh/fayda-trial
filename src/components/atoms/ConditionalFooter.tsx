"use client";
import { usePathname } from "next/navigation";
import Footer from "@/components/main_components/footer";

export function ConditionalFooter() {
  const pathname = usePathname();

  // Only show footer on landing page
  const shouldShowFooter = pathname === "/";

  if (!shouldShowFooter) {
    return null;
  }

  return (
    <footer className="w-full pt-11">
      <Footer />
    </footer>
  );
}
