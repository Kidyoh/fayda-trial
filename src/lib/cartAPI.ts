import { apiUrl } from "@/apiConfig";
import { CartItem, CartPackageItem, CartCourseItem } from "@/app/store/cartStore";

// Bulk purchase interfaces
export interface BulkPurchaseRequest {
  packages: {
    packageId: string;
    duration: 1 | 3 | 6;
    quantity: number;
    price: number;
  }[];
  courses: {
    courseId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  phoneNumber: string;
  paymentMethod: string;
}

export interface BulkPurchaseResponse {
  success: boolean;
  purchaseId: string;
  paymentUrl?: string;
  message: string;
  packagePurchases?: any[];
  coursePurchases?: any[];
}

export interface CartCheckoutRequest {
  items: CartItem[];
  phoneNumber: string;
  paymentMethod: string;
  totalAmount: number;
}

/**
 * Create bulk purchase for packages and courses in cart
 */
export async function createBulkPurchase(
  data: BulkPurchaseRequest,
  accessToken: string
): Promise<BulkPurchaseResponse> {
  try {
    const response = await fetch(`${apiUrl}/cart/bulk-purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create bulk purchase");
    }

    return response.json();
  } catch (error) {
    console.error("Error creating bulk purchase:", error);
    throw error;
  }
}

/**
 * Initiate bulk payment through SantiPay
 */
export async function initiateBulkPayment(
  data: {
    purchaseId: string;
    phoneNumber: string;
    totalAmount: number;
    items: CartItem[];
  },
  accessToken: string
) {
  try {
    const response = await fetch(`${apiUrl}/paymenthandler/bulk-checkout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to initiate bulk payment");
    }

    return response.json();
  } catch (error) {
    console.error("Error initiating bulk payment:", error);
    throw error;
  }
}

/**
 * Process cart checkout - handles both packages and courses
 * Falls back to individual purchases if bulk API is not available
 */
export async function processCartCheckout(
  cartItems: CartItem[],
  phoneNumber: string,
  accessToken: string
): Promise<BulkPurchaseResponse> {
  try {
    // First, try the bulk purchase approach
    try {
      // Separate packages and courses
      const packages = cartItems
        .filter(item => item.type === 'package')
        .map(item => {
          const packageItem = item as CartPackageItem;
          let price = packageItem.discountStatus && packageItem.temporaryPrice 
            ? packageItem.temporaryPrice 
            : packageItem.price;
          
          // Adjust price based on selected duration
          if (packageItem.selectedDuration === 3) {
            price = packageItem.discountStatus && packageItem.temporaryPrice2 
              ? packageItem.temporaryPrice2 
              : packageItem.price2 || price;
          } else if (packageItem.selectedDuration === 6) {
            price = packageItem.discountStatus && packageItem.temporaryPrice3 
              ? packageItem.temporaryPrice3 
              : packageItem.price3 || price;
          }

          return {
            packageId: packageItem.id,
            duration: packageItem.selectedDuration,
            quantity: packageItem.quantity,
            price: price * packageItem.quantity
          };
        });

      const courses = cartItems
        .filter(item => item.type === 'course')
        .map(item => {
          const courseItem = item as CartCourseItem;
          const price = courseItem.discountStatus && courseItem.temporaryPrice 
            ? courseItem.temporaryPrice 
            : courseItem.price;

          return {
            courseId: courseItem.id,
            quantity: courseItem.quantity,
            price: price * courseItem.quantity
          };
        });

      // Calculate total amount
      const totalAmount = [...packages, ...courses].reduce(
        (sum, item) => sum + item.price, 
        0
      );

      const bulkPurchaseData: BulkPurchaseRequest = {
        packages,
        courses,
        totalAmount,
        phoneNumber,
        paymentMethod: "santipay"
      };

      // Try bulk purchase
      const purchaseResult = await createBulkPurchase(bulkPurchaseData, accessToken);

      if (purchaseResult.success && purchaseResult.purchaseId) {
        // Initiate payment
        const paymentResult = await initiateBulkPayment({
          purchaseId: purchaseResult.purchaseId,
          phoneNumber,
          totalAmount,
          items: cartItems
        }, accessToken);

        return {
          ...purchaseResult,
          paymentUrl: paymentResult.paymentUrl
        };
      }

      return purchaseResult;
    } catch (bulkError) {
      console.log("Bulk purchase not available, falling back to individual purchases");
      
      // Fallback to individual purchases
      const individualResult = await processIndividualPurchases(cartItems, phoneNumber, accessToken);
      
      if (individualResult.success && individualResult.results.length > 0) {
        // Get the first payment URL from successful purchases
        const paymentUrl = individualResult.results.find(result => result.result?.paymentUrl)?.result?.paymentUrl;
        
        return {
          success: true,
          purchaseId: `individual-${Date.now()}`,
          paymentUrl,
          message: `Successfully processed ${individualResult.results.length} purchases`,
          packagePurchases: individualResult.results.filter(r => r.type === 'package'),
          coursePurchases: individualResult.results.filter(r => r.type === 'course')
        };
      } else {
        throw new Error(`Failed to process purchases: ${individualResult.errors.map(e => e.error?.message || 'Unknown error').join(', ')}`);
      }
    }
  } catch (error) {
    console.error("Error processing cart checkout:", error);
    throw error;
  }
}

/**
 * Fallback: Process individual purchases if bulk API is not available
 */
export async function processIndividualPurchases(
  cartItems: CartItem[],
  phoneNumber: string,
  accessToken: string
): Promise<{ success: boolean; results: any[]; errors: any[] }> {
  const results: any[] = [];
  const errors: any[] = [];

  console.log("Processing individual purchases for", cartItems.length, "items");

  for (const item of cartItems) {
    try {
      if (item.type === 'package') {
        const packageItem = item as CartPackageItem;
        
        // Process each quantity as separate purchases
        for (let i = 0; i < packageItem.quantity; i++) {
          let price = packageItem.discountStatus && packageItem.temporaryPrice 
            ? packageItem.temporaryPrice 
            : packageItem.price;
          
          // Adjust price based on selected duration
          if (packageItem.selectedDuration === 3) {
            price = packageItem.discountStatus && packageItem.temporaryPrice2 
              ? packageItem.temporaryPrice2 
              : packageItem.price2 || price;
          } else if (packageItem.selectedDuration === 6) {
            price = packageItem.discountStatus && packageItem.temporaryPrice3 
              ? packageItem.temporaryPrice3 
              : packageItem.price3 || price;
          }

          console.log(`Processing package purchase: ${packageItem.packageName} - ${price} Birr`);

          const response = await fetch(`${apiUrl}/paymenthandler/checkout/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              packageId: packageItem.id,
              price,
              phoneNumber,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Package purchase successful:", data);
            results.push({ type: 'package', item: packageItem, result: data });
            
            // For individual purchases, we'll use the first successful payment URL
            if (data.paymentUrl && results.length === 1) {
              break; // Use first payment URL for redirect
            }
          } else {
            const errorText = await response.text();
            console.error("Package purchase failed:", response.status, errorText);
            let error;
            try {
              error = JSON.parse(errorText);
            } catch {
              error = { message: errorText || 'Unknown error' };
            }
            errors.push({ type: 'package', item: packageItem, error });
          }
        }
      } else if (item.type === 'course') {
        const courseItem = item as CartCourseItem;
        
        // Process each quantity as separate purchases
        for (let i = 0; i < courseItem.quantity; i++) {
          const price = courseItem.discountStatus && courseItem.temporaryPrice 
            ? courseItem.temporaryPrice 
            : courseItem.price;

          console.log(`Processing course purchase: ${courseItem.courseName} - ${price} Birr`);

          const response = await fetch(`${apiUrl}/paymenthandler/course-checkout/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              courseId: courseItem.id,
              price,
              phoneNumber,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Course purchase successful:", data);
            results.push({ type: 'course', item: courseItem, result: data });
            
            // For individual purchases, we'll use the first successful payment URL
            if (data.paymentUrl && results.length === 1) {
              break; // Use first payment URL for redirect
            }
          } else {
            const errorText = await response.text();
            console.error("Course purchase failed:", response.status, errorText);
            let error;
            try {
              error = JSON.parse(errorText);
            } catch {
              error = { message: errorText || 'Unknown error' };
            }
            errors.push({ type: 'course', item: courseItem, error });
          }
        }
      }
    } catch (error: unknown) {
      console.error("Error processing item:", item, error);
      const errorMessage = error instanceof Error ? error.message : 'Network error';
      errors.push({ type: item.type, item, error: { message: errorMessage } });
    }
  }

  console.log(`Individual purchases completed: ${results.length} successful, ${errors.length} failed`);

  return {
    success: results.length > 0, // Success if at least one purchase succeeded
    results,
    errors
  };
}

/**
 * Format Ethiopian phone number for payment processing
 */
export function formatEthiopianPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // If it starts with 251, it's already formatted
  if (cleaned.startsWith('251')) {
    return cleaned;
  }
  
  // If it starts with 0, replace with 251
  if (cleaned.startsWith('0')) {
    return '251' + cleaned.slice(1);
  }
  
  // If it starts with 9 (common Ethiopian mobile format), add 251
  if (cleaned.startsWith('9') && cleaned.length === 9) {
    return '251' + cleaned;
  }
  
  // Default: assume it needs 251 prefix
  return '251' + cleaned;
}

/**
 * Validate cart items before checkout
 */
export function validateCartItems(items: CartItem[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (items.length === 0) {
    errors.push("Cart is empty");
  }
  
  items.forEach((item, index) => {
    if (!item.id) {
      errors.push(`Item ${index + 1}: Missing ID`);
    }
    
    if (item.quantity <= 0) {
      errors.push(`Item ${index + 1}: Invalid quantity`);
    }
    
    if (item.type === 'package') {
      const packageItem = item as CartPackageItem;
      if (!packageItem.selectedDuration || ![1, 3, 6].includes(packageItem.selectedDuration)) {
        errors.push(`Package ${packageItem.packageName}: Invalid duration`);
      }
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}
