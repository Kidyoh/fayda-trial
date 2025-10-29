"use client";

import { useEffect, useState } from "react";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const GoogleTranslate = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    // Define the init function
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,am,om,ti",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element",
      );
      setIsLoaded(true);
    };

    // Load the Google Translate script
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);

    // Cleanup
    return () => {
      const existingScript = document.querySelector(
        'script[src*="translate.google.com"]',
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
      const translateElement = document.getElementById(
        "google_translate_element",
      );
      if (translateElement) {
        translateElement.innerHTML = "";
      }
    };
  }, []);

  const handleTranslateClick = () => {
    setShowWidget(!showWidget);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={handleTranslateClick}
        className="flex items-center gap-2"
      >
        <Languages className="h-4 w-4" />
        Translate
      </Button>
      {showWidget && (
        <div className="absolute top-full mt-2 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg p-2">
          <div id="google_translate_element"></div>
        </div>
      )}
    </div>
  );
};

export default GoogleTranslate;
