// Course Purchase API Integration 
// This file demonstrates how to integrate the new course schema with payment systems

import { apiUrl } from "@/apiConfig";

export interface Course {
  id: string;
  courseName: string;
  courseDescription: string;
  price: string;
  temporaryPrice?: string;
  discountStatus: boolean;
  discountExpiryDate?: string;
  status: boolean;
  displayOnHome: boolean;
  thumbnail?: string;
  parts: string;
  partName?: string;
  courseIntroductionVideo?: string;
  extra1?: string;
  extra2?: string;
  packages?: any[];
  Forum?: any;
  CourseUnitsList?: CourseUnit[];
  videoUrl?: string;
  createdAt?: string;
}

export interface CourseUnit {
  id: number;
  UnitNumber: number;
  UnitName: string;
  UnitDescription: string;
}

export interface CoursePurchase {
  id: string;
  courseId: string;
  studentId: string;
  price: string;
  paymentMethod: string;
  phoneNumber: string;
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionIdGenerator {
  id: string;
  courseId: string;
  transactionId: string;
  amount: string;
  phoneNumber: string;
  status: string;
  createdAt: Date;
}

// API Functions for Course Purchase Management

/**
 * Create a new course purchase record
 */
export async function createCoursePurchase(data: {
  courseId: string;
  price: string;
  phoneNumber: string;
  paymentMethod: string;
}, accessToken: string): Promise<CoursePurchase> {
  const response = await fetch(`${apiUrl}/coursepurchase/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create course purchase");
  }

  return response.json();
}

/**
 * Initiate payment through SantiPay for course purchase
 */
export async function initiateCoursePayment(data: {
  courseId: string;
  price: string;
  phoneNumber: string;
  purchaseId: string;
}, accessToken: string) {
  const response = await fetch(`${apiUrl}/paymenthandler/course-checkout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to initiate payment");
  }

  return response.json();
}

/**
 * Check course purchase status
 */
export async function checkCoursePurchaseStatus(
  courseId: string,
  phoneNumber: string
): Promise<{ purchased: boolean; status: string }> {
  const response = await fetch(
    `${apiUrl}/coursepurchase/check/${phoneNumber}/${courseId}`
  );

  if (!response.ok) {
    throw new Error("Failed to check purchase status");
  }

  return response.json();
}

/**
 * Get all courses with pricing information (requires authentication)
 */
export async function getAllCourses(accessToken: string): Promise<Course[] | { Error: string }> {
  const response = await fetch(`${apiUrl}/courses`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      // Return the error response as an object so the calling code can handle it
      return data;
    }
    throw new Error(`Failed to fetch courses: ${response.status} ${response.statusText}`);
  }

  return data;
}

/**
 * Get all public courses (no authentication required)
 */
export async function getPublicCourses(): Promise<Course[]> {
  const response = await fetch(`${apiUrl}/courses/public`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Public courses API error:', errorText);
    throw new Error(`Failed to fetch public courses: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get single public course (no authentication required)
 */
export async function getPublicCourse(courseId: string): Promise<Course> {
  const response = await fetch(`${apiUrl}/courses/public/${courseId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch public course: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get courses that should be displayed on homepage (requires authentication)
 */
export async function getHomepageCourses(accessToken: string): Promise<Course[]> {
  const allCourses = await getAllCourses(accessToken);
  
  // Check if the response is an error object
  if (allCourses && typeof allCourses === 'object' && 'Error' in allCourses) {
    throw new Error(allCourses.Error);
  }
  
  // Ensure it's an array before filtering
  if (!Array.isArray(allCourses)) {
    throw new Error('Invalid course data format received from server');
  }
  
  return allCourses.filter(course => course.displayOnHome && course.status);
}

/**
 * Get public courses that should be displayed on homepage (no authentication required)
 */
export async function getPublicHomepageCourses(): Promise<Course[]> {
  const allCourses = await getPublicCourses();
  
  // Filter out courses with empty names or missing IDs
  const homepageCourses = allCourses.filter(course => {
    return course.courseName && course.courseName.trim() !== '' && course.id;
  });
  
  return homepageCourses;
}

/**
 * Get single course details including pricing
 */
export async function getCourseDetails(courseId: string, accessToken: string): Promise<Course> {
  const response = await fetch(`${apiUrl}/courses/${courseId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch course details");
  }

  return response.json();
}

/**
 * Verify course purchase and grant access
 */
export async function verifyCourseAccess(
  courseId: string,
  accessToken: string
): Promise<{ hasAccess: boolean; purchaseDetails?: CoursePurchase }> {
  const response = await fetch(`${apiUrl}/courses/${courseId}/verify-access`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to verify course access");
  }

  return response.json();
}

/**
 * Generate transaction ID for course purchase
 */
export async function generateTransactionId(data: {
  courseId: string;
  amount: string;
  phoneNumber: string;
}): Promise<TransactionIdGenerator> {
  const response = await fetch(`${apiUrl}/transaction/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to generate transaction ID");
  }

  return response.json();
}

/**
 * Update transaction status (webhook for payment completion)
 */
export async function updateTransactionStatus(
  transactionId: string,
  status: string,
  paymentData?: any
) {
  const response = await fetch(`${apiUrl}/transaction/${transactionId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status, paymentData }),
  });

  if (!response.ok) {
    throw new Error("Failed to update transaction status");
  }

  return response.json();
}

// Payment Integration Utilities

/**
 * Format phone number for Ethiopian payment systems
 */
export function formatEthiopianPhoneNumber(phoneNumber: string): string {
  // Remove all non-digits
  const digits = phoneNumber.replace(/\D/g, '');
  
  // Handle different formats
  if (digits.startsWith('251')) {
    return `+${digits}`;
  } else if (digits.startsWith('09') || digits.startsWith('07')) {
    return `+251${digits.substring(1)}`;
  } else if (digits.length === 9) {
    return `+251${digits}`;
  }
  
  return phoneNumber;
}

/**
 * Calculate course price with discount
 */
export function calculateCoursePrice(course: Course): {
  originalPrice: number;
  finalPrice: number;
  discountAmount: number;
  isDiscounted: boolean;
} {
  const originalPrice = parseFloat(course.price);
  const temporaryPrice = course.temporaryPrice ? parseFloat(course.temporaryPrice) : null;
  
  const isDiscounted = Boolean(course.discountStatus && 
                      temporaryPrice !== null && 
                      course.discountExpiryDate && 
                      new Date(course.discountExpiryDate) > new Date());
  
  const finalPrice = isDiscounted ? temporaryPrice! : originalPrice;
  const discountAmount = isDiscounted ? originalPrice - temporaryPrice! : 0;
  
  return {
    originalPrice,
    finalPrice,
    discountAmount,
    isDiscounted
  };
}

/**
 * Check if discount is still valid
 */
export function isDiscountValid(discountExpiryDate?: string): boolean {
  if (!discountExpiryDate) return false;
  return new Date(discountExpiryDate) > new Date();
}

/**
 * Get display price information for a course
 */
export function getDisplayPrice(course: Course): {
  currentPrice: string;
  originalPrice: string | null;
  isDiscounted: boolean;
  discountExpiry: string | null;
} {
  const isDiscounted = course.discountStatus && 
    course.temporaryPrice && 
    (!course.discountExpiryDate || new Date(course.discountExpiryDate) > new Date());
  
  if (isDiscounted) {
    return {
      currentPrice: course.temporaryPrice!,
      originalPrice: course.price,
      isDiscounted: true,
      discountExpiry: course.discountExpiryDate || null
    };
  }
  
  return {
    currentPrice: course.price,
    originalPrice: null,
    isDiscounted: false,
    discountExpiry: null
  };
}

// Example usage for integrating with existing components:
/*
// In a React component:
import { createCoursePurchase, initiateCoursePayment } from './courseAPI';

const handleCoursePurchase = async (courseId: string, price: string, phoneNumber: string) => {
  try {
    // Step 1: Create purchase record
    const purchase = await createCoursePurchase({
      courseId,
      price,
      phoneNumber,
      paymentMethod: 'santipay'
    }, accessToken);

    // Step 2: Initiate payment
    const paymentResult = await initiateCoursePayment({
      courseId,
      price,
      phoneNumber,
      purchaseId: purchase.id
    }, accessToken);

    // Step 3: Redirect to payment gateway
    if (paymentResult.paymentUrl) {
      window.location.href = paymentResult.paymentUrl;
    }
  } catch (error) {
    console.error('Course purchase failed:', error);
  }
};
*/
