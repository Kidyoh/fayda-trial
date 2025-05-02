'use client';

import React from 'react';
import { useLanguage, Language } from '@/lib/language-context';
import { Globe } from 'lucide-react';

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'am', name: 'አማርኛ', flag: '🇪🇹' },
  { code: 'om', name: 'Afaan Oromoo', flag: '🇪🇹' },
  { code: 'ti', name: 'ትግርኛ', flag: '🇪🇹' },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    closeDropdown();
  };

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primaryColor"
        onClick={toggleDropdown}
      >
        <Globe className="h-4 w-4" />
        <span>{currentLanguage?.flag}</span>
        <span className="hidden md:inline">{currentLanguage?.name}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10"
            onClick={closeDropdown}
          />
          <div className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`flex w-full items-center px-4 py-2 text-sm ${
                    language === lang.code
                      ? 'bg-gray-100 text-primaryColor font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
} 