// Main API exports - Course and Purchase APIs

// Export all types
export * from "./types";

// Export utility functions
export * from "./utils";

// Export course API functions (excluding verifyCourseAccess to avoid conflict)
export {
  fetchPublicCourses,
  fetchPublicCourse,
  fetchPublicHomepageCourses,
  fetchAllCourses,
  fetchHomepageCourses,
  fetchCourseDetails,
  getCoursePricingInfo,
  isDiscountValid,
  getFormattedPrice,
} from "./course.api";

// Export purchase API functions (includes verifyCourseAccess)
export * from "./purchase.api";
