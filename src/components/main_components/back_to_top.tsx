"use client";
import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed">
      {isVisible && (
        <div
          onClick={() => scrollToTop()}
          className="bg-primaryColor rounded-full p-1 text-white border-2 border-white cursor-pointer hover:bg-opacity-70"
        >
          <ChevronUp size={32} />
        </div>
      )}
    </div>
  );
}
