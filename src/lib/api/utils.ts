// Shared API utilities and helpers

import { ApiError } from "./types";

/**
 * Reusable fetch utility with consistent error handling and token management
 */
export async function fetchJson<T>(
  url: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
}

/**
 * Centralized error handling for API responses
 */
export async function handleApiError(response: Response): Promise<never> {
  let errorMessage: string;
  let statusCode: number;

  try {
    const errorData: ApiError = await response.json();
    errorMessage = errorData.message || errorData.error || "An error occurred";
    statusCode = errorData.statusCode || response.status;
  } catch {
    errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    statusCode = response.status;
  }

  const error = new Error(errorMessage) as Error & { statusCode: number };
  error.statusCode = statusCode;
  throw error;
}

/**
 * Format phone number for Ethiopian payment systems
 */
export function formatEthiopianPhoneNumber(phoneNumber: string): string {
  // Remove all non-digits
  const digits = phoneNumber.replace(/\D/g, "");

  // Handle different formats
  if (digits.startsWith("251")) {
    return `+${digits}`;
  } else if (digits.startsWith("09") || digits.startsWith("07")) {
    return `+251${digits.substring(1)}`;
  } else if (digits.length === 9) {
    return `+251${digits}`;
  }

  return phoneNumber;
}

/**
 * Validate UUID format
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Sanitize search query
 */
export function sanitizeSearchQuery(query: string): string {
  return query.trim().replace(/[<>]/g, "");
}

/**
 * Build query string from parameters
 */
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}

/**
 * Transform API response course data to processed course data
 */
export function transformCourseData(apiCourse: any): any {
  // Safe price parsing with validation
  const parsePrice = (price: any): number => {
    if (typeof price === "number") return price;
    if (typeof price === "string") {
      const parsed = parseFloat(price);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  return {
    ...apiCourse,
    price: parsePrice(apiCourse.price),
    temporaryPrice: apiCourse.temporaryPrice
      ? parsePrice(apiCourse.temporaryPrice)
      : undefined,
    status: apiCourse.status ?? true,
    displayOnHome: apiCourse.displayOnHome ?? true,
    thumbnail: apiCourse.thumbnail || undefined,
    partName: apiCourse.partName || undefined,
    discountExpiryDate: apiCourse.discountExpiryDate || undefined,
  };
}
