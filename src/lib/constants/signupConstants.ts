export interface Choice {
  id: string;
  sectionName: string;
  fullForm: string;
  shortForm: string;
  cityName: string;
  regionName: string;
  promocode: string;
}

export const FALLBACK_REGIONS: Choice[] = [
  {
    id: "addis",
    regionName: "Addis Ababa",
    sectionName: "",
    fullForm: "",
    shortForm: "",
    cityName: "",
    promocode: "",
  },
  {
    id: "amhara",
    regionName: "Amhara",
    sectionName: "",
    fullForm: "",
    shortForm: "",
    cityName: "",
    promocode: "",
  },
  {
    id: "oromia",
    regionName: "Oromia",
    sectionName: "",
    fullForm: "",
    shortForm: "",
    cityName: "",
    promocode: "",
  },
  {
    id: "tigray",
    regionName: "Tigray",
    sectionName: "",
    fullForm: "",
    shortForm: "",
    cityName: "",
    promocode: "",
  },
  {
    id: "snnpr",
    regionName: "SNNPR",
    sectionName: "",
    fullForm: "",
    shortForm: "",
    cityName: "",
    promocode: "",
  },
  {
    id: "sidama",
    regionName: "Sidama",
    sectionName: "",
    fullForm: "",
    shortForm: "",
    cityName: "",
    promocode: "",
  },
  {
    id: "somali",
    regionName: "Somali",
    sectionName: "",
    fullForm: "",
    shortForm: "",
    cityName: "",
    promocode: "",
  },
  {
    id: "afar",
    regionName: "Afar",
    sectionName: "",
    fullForm: "",
    shortForm: "",
    cityName: "",
    promocode: "",
  },
  {
    id: "benishangul",
    regionName: "Benishangul-Gumuz",
    sectionName: "",
    fullForm: "",
    shortForm: "",
    cityName: "",
    promocode: "",
  },
  {
    id: "gambella",
    regionName: "Gambella",
    sectionName: "",
    fullForm: "",
    shortForm: "",
    cityName: "",
    promocode: "",
  },
  {
    id: "harari",
    regionName: "Harari",
    sectionName: "",
    fullForm: "",
    shortForm: "",
    cityName: "",
    promocode: "",
  },
  {
    id: "dd",
    regionName: "Dire Dawa",
    sectionName: "",
    fullForm: "",
    shortForm: "",
    cityName: "",
    promocode: "",
  },
];

export const FALLBACK_CITIES: Choice[] = [
  {
    id: "addis",
    cityName: "Addis Ababa",
    sectionName: "",
    fullForm: "",
    shortForm: "",
    regionName: "Addis Ababa",
    promocode: "",
  },
  {
    id: "dd",
    cityName: "Dire Dawa",
    sectionName: "",
    fullForm: "",
    shortForm: "",
    regionName: "Dire Dawa",
    promocode: "",
  },
  {
    id: "mekelle",
    cityName: "Mekelle",
    sectionName: "",
    fullForm: "",
    shortForm: "",
    regionName: "Tigray",
    promocode: "",
  },
  {
    id: "bahirdar",
    cityName: "Bahir Dar",
    sectionName: "",
    fullForm: "",
    shortForm: "",
    regionName: "Amhara",
    promocode: "",
  },
  {
    id: "hawassa",
    cityName: "Hawassa",
    sectionName: "",
    fullForm: "",
    shortForm: "",
    regionName: "Sidama",
    promocode: "",
  },
  {
    id: "jijiga",
    cityName: "Jijiga",
    sectionName: "",
    fullForm: "",
    shortForm: "",
    regionName: "Somali",
    promocode: "",
  },
  {
    id: "adama",
    cityName: "Adama",
    sectionName: "",
    fullForm: "",
    shortForm: "",
    regionName: "Oromia",
    promocode: "",
  },
];

export const FALLBACK_GRADES: Choice[] = [
  {
    id: "grade-9",
    sectionName: "Grade 9",
    fullForm: "Grade 9",
    shortForm: "G9",
    cityName: "",
    regionName: "",
    promocode: "",
  },
  {
    id: "grade-10",
    sectionName: "Grade 10",
    fullForm: "Grade 10",
    shortForm: "G10",
    cityName: "",
    regionName: "",
    promocode: "",
  },
  {
    id: "grade-11",
    sectionName: "Grade 11",
    fullForm: "Grade 11",
    shortForm: "G11",
    cityName: "",
    regionName: "",
    promocode: "",
  },
  {
    id: "grade-12",
    sectionName: "Grade 12",
    fullForm: "Grade 12",
    shortForm: "G12",
    cityName: "",
    regionName: "",
    promocode: "",
  },
];

export const REFERRAL_SOURCES = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "friends", label: "Friend" },
  { value: "school", label: "School" },
  { value: "agent", label: "Agent" },
  { value: "other", label: "Other" },
] as const;

export const FORM_STEPS = [
  {
    step: 1,
    title: "Personal Info",
    description: "Basic information about you",
  },
  {
    step: 2,
    title: "Account Setup",
    description: "Create your login credentials",
  },
  {
    step: 3,
    title: "Additional Info",
    description: "School and location details",
  },
] as const;

export const CACHE_KEYS = {
  REGIONS: "regions-cache",
  CITIES: "cities-cache",
  GRADES: "grades-cache",
} as const;
