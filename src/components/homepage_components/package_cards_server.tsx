import { apiUrl } from "@/apiConfig";
import PackageCardsClient from "./package_cards_client";

interface PackageItem {
  id: string;
  packageName: string;
  packageDescription: string;
  price: string | number;
  imgUrl: string[];
  thumbnail?: string | null;
  tag?: string;
  courses?: unknown[];
  temporaryPrice?: string | number | null;
  discountStatus?: boolean;
  discountExpiryDate?: string | null;
}

/**
 * Server Component: fetch featured packages and render the client grid
 */
export default async function PackageCardsServer() {
  let packages: PackageItem[] = [];

  try {
    const response = await fetch(`${apiUrl}/packages/public/featured`, {
      cache: "no-store",
      // credentials aren't used on server fetch by default; rely on public endpoint
    });
    if (response.ok) {
      const result = await response.json();
      if (result?.success && Array.isArray(result.data)) {
        packages = result.data.slice(0, 2);
      }
    }
  } catch (error) {
    console.error("Failed to fetch featured packages:", error);
    packages = [];
  }

  return <PackageCardsClient packages={packages} />;
}
