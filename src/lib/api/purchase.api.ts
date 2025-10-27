// Purchase API - Purchase and payment endpoints

import { apiUrl } from "@/apiConfig";
import { fetchJson, formatEthiopianPhoneNumber, isValidUUID } from "./utils";
import {
  CoursePurchase,
  TransactionIdGenerator,
  PaymentInitiationRequest,
  PaymentInitiationResponse,
  PurchaseStatusResponse,
  AccessVerificationResponse,
} from "./types";

/**
 * Create a new course purchase record
 */
export async function createCoursePurchase(
  data: {
    courseId: string;
    price: number;
    phoneNumber: string;
    paymentMethod: string;
  },
  accessToken: string,
): Promise<CoursePurchase> {
  if (!data.courseId || !isValidUUID(data.courseId)) {
    throw new Error("Invalid course ID provided");
  }

  if (!data.phoneNumber || data.phoneNumber.trim() === "") {
    throw new Error("Phone number is required");
  }

  if (data.price <= 0) {
    throw new Error("Price must be greater than zero");
  }

  // Format phone number for Ethiopian payment systems
  const formattedPhoneNumber = formatEthiopianPhoneNumber(data.phoneNumber);

  return fetchJson<CoursePurchase>(
    `${apiUrl}/coursepurchase/create`,
    {
      method: "POST",
      body: JSON.stringify({
        ...data,
        phoneNumber: formattedPhoneNumber,
      }),
    },
    accessToken,
  );
}

/**
 * Initiate payment through SantiPay for course purchase
 */
export async function initiateCoursePayment(
  data: PaymentInitiationRequest,
  accessToken: string,
): Promise<PaymentInitiationResponse> {
  if (!data.courseId || !isValidUUID(data.courseId)) {
    throw new Error("Invalid course ID provided");
  }

  if (!data.phoneNumber || data.phoneNumber.trim() === "") {
    throw new Error("Phone number is required");
  }

  if (data.price <= 0) {
    throw new Error("Price must be greater than zero");
  }

  if (!data.purchaseId || !isValidUUID(data.purchaseId)) {
    throw new Error("Invalid purchase ID provided");
  }

  // Format phone number for Ethiopian payment systems
  const formattedPhoneNumber = formatEthiopianPhoneNumber(data.phoneNumber);

  return fetchJson<PaymentInitiationResponse>(
    `${apiUrl}/paymenthandler/course-checkout/`,
    {
      method: "POST",
      body: JSON.stringify({
        ...data,
        phoneNumber: formattedPhoneNumber,
      }),
    },
    accessToken,
  );
}

/**
 * Check course purchase status
 */
export async function checkCoursePurchaseStatus(
  courseId: string,
  phoneNumber: string,
): Promise<PurchaseStatusResponse> {
  if (!courseId || !isValidUUID(courseId)) {
    throw new Error("Invalid course ID provided");
  }

  if (!phoneNumber || phoneNumber.trim() === "") {
    throw new Error("Phone number is required");
  }

  // Format phone number for Ethiopian payment systems
  const formattedPhoneNumber = formatEthiopianPhoneNumber(phoneNumber);

  return fetchJson<PurchaseStatusResponse>(
    `${apiUrl}/coursepurchase/check/${formattedPhoneNumber}/${courseId}`,
    { method: "GET" },
  );
}

/**
 * Generate transaction ID for course purchase
 */
export async function generateTransactionId(data: {
  courseId: string;
  amount: number;
  phoneNumber: string;
}): Promise<TransactionIdGenerator> {
  if (!data.courseId || !isValidUUID(data.courseId)) {
    throw new Error("Invalid course ID provided");
  }

  if (!data.phoneNumber || data.phoneNumber.trim() === "") {
    throw new Error("Phone number is required");
  }

  if (data.amount <= 0) {
    throw new Error("Amount must be greater than zero");
  }

  // Format phone number for Ethiopian payment systems
  const formattedPhoneNumber = formatEthiopianPhoneNumber(data.phoneNumber);

  return fetchJson<TransactionIdGenerator>(`${apiUrl}/transaction/generate`, {
    method: "POST",
    body: JSON.stringify({
      ...data,
      phoneNumber: formattedPhoneNumber,
    }),
  });
}

/**
 * Update transaction status (webhook for payment completion)
 */
export async function updateTransactionStatus(
  transactionId: string,
  status: string,
  paymentData?: Record<string, any>,
): Promise<{ success: boolean; message: string }> {
  if (!transactionId || transactionId.trim() === "") {
    throw new Error("Transaction ID is required");
  }

  if (!status || status.trim() === "") {
    throw new Error("Status is required");
  }

  return fetchJson<{ success: boolean; message: string }>(
    `${apiUrl}/transaction/${transactionId}/status`,
    {
      method: "PUT",
      body: JSON.stringify({ status, paymentData }),
    },
  );
}

/**
 * Verify course access for authenticated user
 */
export async function verifyCourseAccess(
  courseId: string,
  accessToken: string,
): Promise<AccessVerificationResponse> {
  if (!courseId || !isValidUUID(courseId)) {
    throw new Error("Invalid course ID provided");
  }

  return fetchJson<AccessVerificationResponse>(
    `${apiUrl}/courses/${courseId}/verify-access`,
    { method: "GET" },
    accessToken,
  );
}

/**
 * Get user's purchase history
 */
export async function getUserPurchaseHistory(
  accessToken: string,
  limit?: number,
  offset?: number,
): Promise<CoursePurchase[]> {
  const queryParams = new URLSearchParams();
  if (limit) queryParams.append("limit", limit.toString());
  if (offset) queryParams.append("offset", offset.toString());

  const url = queryParams.toString()
    ? `${apiUrl}/coursepurchase/history?${queryParams}`
    : `${apiUrl}/coursepurchase/history`;

  return fetchJson<CoursePurchase[]>(url, { method: "GET" }, accessToken);
}

/**
 * Cancel a pending purchase
 */
export async function cancelPurchase(
  purchaseId: string,
  accessToken: string,
): Promise<{ success: boolean; message: string }> {
  if (!purchaseId || !isValidUUID(purchaseId)) {
    throw new Error("Invalid purchase ID provided");
  }

  return fetchJson<{ success: boolean; message: string }>(
    `${apiUrl}/coursepurchase/${purchaseId}/cancel`,
    { method: "PUT" },
    accessToken,
  );
}

/**
 * Get purchase details by ID
 */
export async function getPurchaseDetails(
  purchaseId: string,
  accessToken: string,
): Promise<CoursePurchase> {
  if (!purchaseId || !isValidUUID(purchaseId)) {
    throw new Error("Invalid purchase ID provided");
  }

  return fetchJson<CoursePurchase>(
    `${apiUrl}/coursepurchase/${purchaseId}`,
    { method: "GET" },
    accessToken,
  );
}
