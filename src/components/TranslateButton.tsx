"use client";

import { useState, useEffect } from "react";
import { Globe, ChevronDown, Loader2 } from "lucide-react";
import { translationService } from "@/lib/translationService";

const languages = [
  { code: "am", name: "አማርኛ" },
  { code: "om", name: "Afaan Oromo" },
  { code: "ti", name: "ትግርኛ" },
];

export default function TranslateButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isReady, setIsReady] = useState(true); // Always ready since we're using direct API

  useEffect(() => {
    // Get current language from localStorage
    const savedLang = translationService.getCurrentLanguage();
    setCurrentLang(savedLang);

    // Auto-translate if there's a saved language preference and page isn't already translated
    const autoTranslate = async () => {
      if (savedLang && savedLang !== "en") {
        const hasTranslatedElements =
          document.querySelectorAll("[data-translated]").length > 0;
        if (!hasTranslatedElements) {
          console.log("Auto-translating to saved language:", savedLang);
          try {
            setIsTranslating(true);
            await translationService.translatePage(savedLang);
          } catch (error) {
            console.error("Auto-translation failed:", error);
          } finally {
            setIsTranslating(false);
          }
        }
      }
    };

    autoTranslate();
  }, []);

  const handleTranslate = async (langCode: string) => {
    if (isTranslating) return;

    try {
      setIsTranslating(true);
      console.log("Starting translation to:", langCode);

      if (langCode === "en" || langCode === "") {
        // Reset to English
        translationService.resetPage();
      } else {
        // Translate the page
        await translationService.translatePage(langCode);
        setCurrentLang(langCode);
      }

      console.log("Translation completed successfully");
    } catch (error) {
      console.error("Translation failed:", error);
      alert(
        "Translation failed. Please check your internet connection and try again.",
      );
    } finally {
      setIsTranslating(false);
      setIsOpen(false);
    }
  };

  const handleReset = () => {
    handleTranslate("");
  };

  return (
    <div className="relative">
      {/* Custom Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isTranslating}
        className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primaryColor transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title={isTranslating ? "Translating..." : "Translate page"}
      >
        {isTranslating ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Globe className="h-4 w-4" />
        )}
        <span className="hidden md:inline">
          {isTranslating ? "Translating..." : "Translate"}
        </span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 border border-gray-200">
            {currentLang !== "en" && currentLang !== "" && (
              <button
                onClick={handleReset}
                disabled={isTranslating}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-100 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🔄 Reset to English
              </button>
            )}
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleTranslate(lang.code)}
                disabled={isTranslating}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  currentLang === lang.code ? "bg-blue-50 text-blue-700" : ""
                } ${lang === languages[languages.length - 1] ? "rounded-b-md" : ""}`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
