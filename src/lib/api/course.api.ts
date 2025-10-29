// Course API - Public course endpoints and course management

import { apiUrl } from "@/apiConfig";
import {
  fetchJson,
  buildQueryString,
  sanitizeSearchQuery,
  isValidUUID,
  transformCourseData,
} from "./utils";
import {
  Course,
  ApiResponse,
  PaginationParams,
  PaginatedResponse,
  CoursePricingInfo,
} from "./types";

/**
 * Fetch all public courses with optional pagination and search
 */
export async function fetchPublicCourses(
  params?: PaginationParams,
): Promise<Course[]> {
  const queryParams: Record<string, any> = {};

  if (params) {
    if (params.page) queryParams.page = params.page;
    if (params.limit) queryParams.limit = params.limit;
    if (params.search) queryParams.search = sanitizeSearchQuery(params.search);
    if (params.sortBy) queryParams.sortBy = params.sortBy;
    if (params.sortOrder) queryParams.sortOrder = params.sortOrder;
  }

  const queryString = buildQueryString(queryParams);
  const url = queryString
    ? `${apiUrl}/courses/public?${queryString}`
    : `${apiUrl}/courses/public`;

  const apiCourses = await fetchJson<any>(url, { method: "GET" });
  const list: any[] = Array.isArray(apiCourses)
    ? apiCourses
    : Array.isArray(apiCourses?.data)
      ? apiCourses.data
      : [];
  return list.map(transformCourseData);
}

/**
 * Fetch a single public course by ID
 */
export async function fetchPublicCourse(courseId: string): Promise<Course> {
  if (!courseId || !isValidUUID(courseId)) {
    throw new Error("Invalid course ID provided");
  }

  const apiCourse = await fetchJson<any>(
    `${apiUrl}/courses/public/${courseId}`,
    {
      method: "GET",
    },
  );
  return transformCourseData(apiCourse);
}

/**
 * Fetch public courses that should be displayed on homepage
 */
export async function fetchPublicHomepageCourses(): Promise<Course[]> {
  const allCourses = await fetchPublicCourses();

  // Filter out courses with empty names or missing IDs
  const homepageCourses = allCourses.filter((course) => {
    return course.courseName && course.courseName.trim() !== "" && course.id;
  });

  return homepageCourses;
}

/**
 * Fetch all courses with pricing information (requires authentication)
 */
export async function fetchAllCourses(
  token: string,
): Promise<Course[] | ApiResponse<Course[]>> {
  return fetchJson<Course[] | ApiResponse<Course[]>>(
    `${apiUrl}/courses`,
    { method: "GET" },
    token,
  );
}

/**
 * Fetch courses that should be displayed on homepage (requires authentication)
 */
export async function fetchHomepageCourses(token: string): Promise<Course[]> {
  const allCourses = await fetchAllCourses(token);

  // Check if the response is an error object
  if (allCourses && typeof allCourses === "object" && "error" in allCourses) {
    throw new Error(
      (allCourses as ApiResponse<Course[]>).message ||
        "Failed to fetch courses",
    );
  }

  // Ensure it's an array before filtering
  if (!Array.isArray(allCourses)) {
    throw new Error("Invalid course data format received from server");
  }

  return allCourses.filter((course) => course.displayOnHome && course.status);
}

/**
 * Fetch single course details including pricing (requires authentication)
 */
export async function fetchCourseDetails(
  courseId: string,
  token: string,
): Promise<Course> {
  if (!courseId || !isValidUUID(courseId)) {
    throw new Error("Invalid course ID provided");
  }

  return fetchJson<Course>(
    `${apiUrl}/courses/${courseId}`,
    { method: "GET" },
    token,
  );
}

/**
 * Verify course access for authenticated user
 */
export async function verifyCourseAccess(
  courseId: string,
  token: string,
): Promise<{ hasAccess: boolean; purchaseDetails?: any }> {
  if (!courseId || !isValidUUID(courseId)) {
    throw new Error("Invalid course ID provided");
  }

  return fetchJson<{ hasAccess: boolean; purchaseDetails?: any }>(
    `${apiUrl}/courses/${courseId}/verify-access`,
    { method: "GET" },
    token,
  );
}

/**
 * Get comprehensive pricing information for a course
 * Merges calculateCoursePrice and getDisplayPrice functionality
 */
export function getCoursePricingInfo(course: Course): CoursePricingInfo {
  // Ensure we have valid price values, default to 0 if null/undefined
  const originalPrice = course.price || 0;
  const temporaryPrice = course.temporaryPrice;

  const isDiscounted = Boolean(
    course.discountStatus &&
      temporaryPrice !== undefined &&
      temporaryPrice !== null &&
      course.discountExpiryDate &&
      new Date(course.discountExpiryDate) > new Date(),
  );

  const finalPrice =
    isDiscounted && temporaryPrice !== undefined && temporaryPrice !== null
      ? temporaryPrice
      : originalPrice;
  const discountAmount =
    isDiscounted && temporaryPrice !== undefined && temporaryPrice !== null
      ? originalPrice - temporaryPrice
      : 0;

  return {
    originalPrice,
    finalPrice,
    discountAmount,
    isDiscounted,
    discountExpiryDate: isDiscounted ? course.discountExpiryDate : undefined,
  };
}

/**
 * Check if discount is still valid for a course
 */
export function isDiscountValid(course: Course): boolean {
  return Boolean(
    course.discountStatus &&
      course.discountExpiryDate &&
      new Date(course.discountExpiryDate) > new Date(),
  );
}

/**
 * Get formatted price display for a course
 */
export function getFormattedPrice(course: Course): {
  currentPrice: string;
  originalPrice: string | null;
  isDiscounted: boolean;
  discountExpiry?: string;
} {
  const pricingInfo = getCoursePricingInfo(course);

  // Ensure we have valid numbers for formatting - handle NaN cases
  const finalPrice = isNaN(pricingInfo.finalPrice) ? 0 : pricingInfo.finalPrice;
  const originalPrice = isNaN(pricingInfo.originalPrice)
    ? 0
    : pricingInfo.originalPrice;

  // Format prices with fallback for invalid numbers
  const formatPrice = (price: number): string => {
    if (isNaN(price) || price < 0) return "0 Birr";
    return price.toLocaleString("en-ET", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 0,
    });
  };

  return {
    currentPrice: formatPrice(finalPrice),
    originalPrice: pricingInfo.isDiscounted ? formatPrice(originalPrice) : null,
    isDiscounted: pricingInfo.isDiscounted,
    discountExpiry: pricingInfo.discountExpiryDate,
  };
}
