import { apiUrl } from "@/apiConfig";
import AdSliderClient from "./ad_slider_client";

interface Advertisement {
  id: string;
  title: string;
  subtitle?: string;
  text?: string;
  info?: string;
  imgUrl: string;
}

/**
 * Server Component for Ad Slider
 * Fetches advertisements from API and passes to client component
 */
export default async function AdSliderServer() {
  let advertisements: Advertisement[] = [];

  try {
    const response = await fetch(`${apiUrl}/advertisment/displayhome`, {
      cache: "no-store", // Always get fresh data
    });

    if (response.ok) {
      const data = await response.json();
      // Ensure data is always an array
      advertisements = Array.isArray(data)
        ? data
        : data?.data && Array.isArray(data.data)
          ? data.data
          : [];
    }
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    advertisements = [];
  }

  return <AdSliderClient advertisements={advertisements} />;
}
