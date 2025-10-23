// Centralized environment configuration
// Uses build-time env with runtime fallbacks for browser-safe values only

export interface AppEnv {
  API_BASE: string;
  NODE_ENV: "development" | "production" | "test";
}

function getString(envValue: string | undefined, fallback: string): string {
  return envValue && envValue.trim().length > 0 ? envValue : fallback;
}

export const env: AppEnv = {
  API_BASE: getString(
    process.env.NEXT_PUBLIC_API_BASE,
    "https://dummy.api.local",
  ),
  NODE_ENV:
    process.env.NODE_ENV === "production"
      ? "production"
      : process.env.NODE_ENV === "test"
        ? "test"
        : "development",
};

export const API_BASE = env.API_BASE;
