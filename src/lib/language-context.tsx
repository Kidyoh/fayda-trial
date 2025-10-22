"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Define available languages
export type Language = "en" | "am" | "om" | "ti";

// Define the context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Define translation type
type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
});

// Create the translations object
const translations: Translations = {
  en: {
    // Common
    "nav.home": "Home",
    "nav.courses": "Courses",
    "nav.packages": "Packages",
    "nav.blog": "Blog",
    "nav.contact": "Contact Us",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "footer.rights": "All Rights Reserved",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",

    // Homepage
    "home.hero.title1": "Unlock Your Potential with Fayida Academy",
    "home.hero.title2": "Learn at Your Own Pace, Succeed at Your Own Rate",
    "home.hero.slogan": "Your pathway to academic success",
    "home.hero.download": "Download App",
    "home.features.learning": "Comprehensive Learning",
    "home.features.path": "Personalized Path",
    "home.features.progress": "Track Progress",
    "home.features.analytics": "Smart Analytics",
    "home.section.title": "Transform Your Learning Journey",
    "home.section.subtitle":
      "Experience education reimagined with our innovative learning platform",
    "home.feature1.title": "Interactive Learning",
    "home.feature1.desc":
      "Engage with interactive materials including videos, simulations, and quizzes that make learning both effective and enjoyable.",
    "home.feature2.title": "Personalized Experience",
    "home.feature2.desc":
      "Receive tailored content that adapts to your learning pace, strengths, and areas for improvement.",
    "home.feature3.title": "Learn Anywhere",
    "home.feature3.desc":
      "Access your courses on any device with our mobile-friendly platform, enabling learning on your schedule.",
    "home.blogs.title": "Latest Insights",
    "home.blogs.subtitle":
      "Discover our latest articles and stay updated with educational trends",
    "home.blogs.viewall": "View All Articles",
  },
  am: {
    // Common
    "nav.home": "መነሻ",
    "nav.courses": "ኮርሶች",
    "nav.packages": "ፓኬጆች",
    "nav.blog": "ብሎግ",
    "nav.contact": "ያግኙን",
    "nav.login": "ግባ",
    "nav.signup": "ተመዝገብ",
    "footer.rights": "መብቱ በህግ የተጠበቀ ነው",
    "footer.privacy": "የግላዊነት ፖሊሲ",
    "footer.terms": "የአገልግሎት ውሎች",

    // Homepage
    "home.hero.title1": "በፋይዳ አካዴሚ ችሎታዎን ይፍቱ",
    "home.hero.title2": "በራስዎ ፍጥነት ይማሩ፣ በራስዎ ደረጃ ይሳኩ",
    "home.hero.slogan": "ለአካዴሚያዊ ስኬት የእርስዎ መንገድ",
    "home.hero.download": "መተግበሪያውን አውርድ",
    "home.features.learning": "ሁሉን አቀፍ ትምህርት",
    "home.features.path": "የግል ተስተካካይ መንገድ",
    "home.features.progress": "እድገት መከታተል",
    "home.features.analytics": "ብልህ ትንታኔ",
    "home.section.title": "የመማር ጉዞዎን ይቀይሩ",
    "home.section.subtitle": "በእኛ ፈጠራዊ የመማር መድረክ አማካኝነት ትምህርትን እንደገና ይሞክሩ",
    "home.feature1.title": "ተግባራዊ ትምህርት",
    "home.feature1.desc":
      "ትምህርቱን ውጤታማና አስደሳች የሚያደርጉ ተግባራዊ ቁሳቁሶችን ያካተቱ ቪዲዮዎች፣ ሲሙሌሽኖች እና ፈተናዎች ይሳተፉ።",
    "home.feature2.title": "የግል ተሞክሮ",
    "home.feature2.desc":
      "ከመማር ፍጥነትዎ፣ ጥንካሬዎችዎ እና ማሻሻያ የሚያስፈልጋቸው ቦታዎች ጋር የሚስማማ ይዘት ይቀበሉ።",
    "home.feature3.title": "በየትም ይማሩ",
    "home.feature3.desc":
      "በዕቅድዎ መሰረት መማርን የሚያስችሉ የእኛ ሞባይል-ፈቃደኛ መድረክ ላይ በማንኛውም መሣሪያ ኮርሶችዎን ይጠቀሙ።",
    "home.blogs.title": "የቅርብ ግዜ ግንዛቤዎች",
    "home.blogs.subtitle":
      "የቅርብ ጊዜ አጫጭር ጽሑፎቻችንን ይመልከቱ እና በትምህርታዊ ዝንባሌዎች ተዘመን ይሁኑ",
    "home.blogs.viewall": "ሁሉንም ጽሑፎች ይመልከቱ",
  },
  om: {
    // Common
    "nav.home": "Mana",
    "nav.courses": "Koorsiiwwan",
    "nav.packages": "Paakeejoota",
    "nav.blog": "Bulooga",
    "nav.contact": "Nu Quunnamaa",
    "nav.login": "Seeni",
    "nav.signup": "Galmaa",
    "footer.rights": "Mirgi Hunda Seeraan Kan Eegame",
    "footer.privacy": "Imaammata Dhuunfaa",
    "footer.terms": "Waliigaltee Tajaajilaa",

    // Homepage
    "home.hero.title1": "Dandeettii Kee Akademii Faayidaatiin Banani",
    "home.hero.title2": "Suuta Keetiin Baradhu, Sadarkaa Keetiin Milkaa",
    "home.hero.slogan": "Karaa keessan gara milkaa ina barnootaatti",
    "home.hero.download": "Appii Buufi",
    "home.features.learning": "Barachuu Guutuu",
    "home.features.path": "Karaa Dhuunfaa",
    "home.features.progress": "Guddina Hordofi",
    "home.features.analytics": "Xinxala Qaraa",
    "home.section.title": "Imala Barumsa Kee Jijjiiri",
    "home.section.subtitle":
      "Platformii barumsaa keenyaa haaraa irratti barnootaan muuxannoo haaraa argadhu",
    "home.feature1.title": "Barumsa Waliigalaa",
    "home.feature1.desc":
      "Meeshaalee waliigalaa keessatti hirmaachuu kan dabalatu viidiyoowwan, fakkeessitoota, fi qormaatota barumsichi bu'a-qabeessaafi gammachisaa akka ta'u godhu.",
    "home.feature2.title": "Muuxannoo Dhuunfaa",
    "home.feature2.desc":
      "Qabiyyee aartii barumsa keessanii, cimina keessanii, fi bakkeewwan fooyya insaa barbaaduun walsimatu argadhaa.",
    "home.feature3.title": "Bakka Maratti Baradhu",
    "home.feature3.desc":
      "Platformii keenya mobaayilii-marii qabu irratti sagantaa keessan irratti barachuu dandeessisuun meeshaa kamiyyuu irratti koorsiiwwan keessan argadhaa.",
    "home.blogs.title": "Hubannoo Haaraa",
    "home.blogs.subtitle":
      "Barreewwan keenya kan dhiyoo argadhaa, dubbadhaa, qooda kennaa",
    "home.blogs.viewall": "Barreewwan Hunda Ilaali",
  },
  ti: {
    // Common
    "nav.home": "ገዛ",
    "nav.courses": "ኮርሳት",
    "nav.packages": "ፓኬጃት",
    "nav.blog": "ብሎግ",
    "nav.contact": "ርኸቡና",
    "nav.login": "ብመንነት እተው",
    "nav.signup": "ተመዝገብ",
    "footer.rights": "ኩሎም መሰላት ዝተሓለው",
    "footer.privacy": "ፖሊሲ ውልቃዊ ምሕደራ",
    "footer.terms": "ናይ ኣገልግሎት ስምምዕነት",

    // Homepage
    "home.hero.title1": "ብዓቕምኻ ኣብ ፋይዳ ኣካደሚ ዕድል ፍጠር",
    "home.hero.title2": "ብናትካ ፍጥነት ተምሃር፣ ብናትካ ደረጃ ዕወት",
    "home.hero.slogan": "መንገድኻ ናብ ኣካዳማዊ ዓወት",
    "home.hero.download": "ኣፕሊኬሽን ኣውርድ",
    "home.features.learning": "ሓፈሻዊ ምምሃር",
    "home.features.path": "ናይ ውልቂ መንገዲ",
    "home.features.progress": "ምዕባለ ምክትታል",
    "home.features.analytics": "ብልሓት ምትንታን",
    "home.section.title": "ናይ ምምሃር ጉዕዞኻ ለውጢ",
    "home.section.subtitle": "ብሓድሽ ፈጠራዊ ናይ ትምህርቲ መድረኽና ገይርካ ትምህርቲ እንደገና ኣድህብ",
    "home.feature1.title": "ተሳታፋይ ትምህርቲ",
    "home.feature1.desc":
      "ምስ ተሳታፋይ ናውቲ ከም ቪድዮታት፣ ምምስሳላትን ኽውንነት ፈተናታትን ዘጠቓለለ፣ ትምህርቲ ውጽኢታውን ኣዝዩ ሓጎስን ዝገብርዎ።",
    "home.feature2.title": "ናይ ውልቂ ተመኩሮ",
    "home.feature2.desc":
      "ምስ ናይ ምምሃር ፍጥነትካ፣ ሓይልታትካን ኣብ ምምሕያሽ ዘድልዮም ቦታታትን ዝሰማማዕ ትሕዝቶ ተቐበል።",
    "home.feature3.title": "ኣብ ኩሉ ቦታ ተምሃር",
    "home.feature3.desc":
      "ብናትካ ናይ ጊዜ ሰሌዳ ተምሃር ንምኽኣል ብናትና ኣብ ሞባይል ዝሰርሓሉ መድረኽ ኣብ ዝኾነ መሳርሒ ኮርሳትካ ተጠቐም።",
    "home.blogs.title": "ናይ እዋኑ ሓሳባት",
    "home.blogs.subtitle": "ናይ ቀረባ እዋን ጽሑፋትና ርአ፣ ኣንብብ፣ ኣካፍል",
    "home.blogs.viewall": "ኩሎም ጽሑፋት ርአ",
  },
};

// Create the provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Try to get the language from localStorage if available
  const [language, setLanguageState] = useState<Language>("en");

  // Load language preference from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language;
      if (savedLanguage && ["en", "am", "om", "ti"].includes(savedLanguage)) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);

  // Function to set language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
  };

  // Translation function
  const t = (key: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }

    // If translation is missing, fall back to English
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }

    // If not found, return the key itself
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create a custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
