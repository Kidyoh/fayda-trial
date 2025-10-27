"use client";

import { usePathname } from "next/navigation";
import NavBar from "./nav_bar";

export default function ConditionalNavBar() {
  const pathname = usePathname();

  // Don't show navbar on dashboard pages
  const isDashboardPage =
    pathname?.startsWith("/dashboard") || pathname?.startsWith("/(user)");

  // Render navbar only on non-dashboard pages
  if (isDashboardPage) {
    return null;
  }

  return <NavBar />;
}
