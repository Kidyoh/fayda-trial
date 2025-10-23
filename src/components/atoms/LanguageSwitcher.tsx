"use client";
import React from "react";
import { Globe } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUIStore } from "@/store/uiStore";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "am", name: "አማርኛ", flag: "🇪🇹" },
  { code: "om", name: "Afaan Oromoo", flag: "🇪🇹" },
  { code: "ti", name: "ትግርኛ", flag: "🇪🇹" },
];

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage } = useUIStore();

  const currentLang =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
          <Globe className="w-5 h-5" />
          <span className="text-sm">{currentLang.flag}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48" align="end">
        <div className="space-y-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`flex items-center space-x-3 w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100 ${
                currentLanguage === lang.code ? "bg-gray-100 font-medium" : ""
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
