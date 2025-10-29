// Shared API types and interfaces

// Raw course data from API (with string prices)
export interface CourseApiResponse {
  id: string;
  courseName: string;
  courseDescription: string;
  price: string;
  temporaryPrice?: string | null;
  discountStatus: boolean;
  discountExpiryDate?: string | null;
  status?: boolean;
  displayOnHome?: boolean;
  thumbnail?: string | null;
  parts: string;
  partName?: string | null;
  courseIntroductionVideo?: string;
  extra1?: string;
  extra2?: string;
  packages?: Package[];
  Forum?: Forum;
  CourseUnitsList?: CourseUnit[];
  videoUrl?: string;
  createdAt?: string;
}

// Processed course data (with number prices)
export interface Course {
  id: string;
  courseName: string;
  courseDescription: string;
  price: number;
  temporaryPrice?: number;
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
  packages?: Package[];
  Forum?: Forum;
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

export interface Package {
  id: string;
  name: string;
  description?: string;
  price: number;
  courses?: Course[];
}

export interface Forum {
  id: string;
  name: string;
  description?: string;
}

export interface CoursePurchase {
  id: string;
  courseId: string;
  studentId: string;
  price: number;
  paymentMethod: string;
  phoneNumber: string;
  transactionId?: string;
  status: "pending" | "completed" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionIdGenerator {
  id: string;
  courseId: string;
  transactionId: string;
  amount: number;
  phoneNumber: string;
  status: string;
  createdAt: Date;
}

export interface CoursePricingInfo {
  originalPrice: number;
  finalPrice: number;
  discountAmount: number;
  isDiscounted: boolean;
  discountExpiryDate?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  error: string;
  message?: string;
  statusCode?: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaymentInitiationRequest {
  courseId: string;
  price: number;
  phoneNumber: string;
  purchaseId: string;
}

export interface PaymentInitiationResponse {
  paymentUrl?: string;
  transactionId: string;
  status: string;
  message: string;
}

export interface PurchaseStatusResponse {
  purchased: boolean;
  status: string;
  purchaseDetails?: CoursePurchase;
}

export interface AccessVerificationResponse {
  hasAccess: boolean;
  purchaseDetails?: CoursePurchase;
}
