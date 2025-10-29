# Cart API Specification

This document outlines the API endpoints needed to support the cart functionality in the Fayida Student Web application.

## 📋 Overview

The cart system needs two main API endpoints:

1. **Bulk Purchase Creation** - Creates purchase records for multiple items
2. **Bulk Payment Initiation** - Initiates payment for the bulk purchase

## 🔗 API Endpoints

### 1. Create Bulk Purchase

**Endpoint:** `POST /cart/bulk-purchase`

**Headers:**

```
Content-Type: application/json
Authorization: Bearer {accessToken}
```

**Request Body:**

```json
{
  "packages": [
    {
      "packageId": "string",
      "duration": 1 | 3 | 6,
      "quantity": number,
      "price": number
    }
  ],
  "courses": [
    {
      "courseId": "string",
      "quantity": number,
      "price": number
    }
  ],
  "totalAmount": number,
  "phoneNumber": "string",
  "paymentMethod": "santipay"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "purchaseId": "string",
  "message": "Bulk purchase created successfully",
  "packagePurchases": [
    {
      "id": "string",
      "packageId": "string",
      "studentId": "string",
      "duration": number,
      "quantity": number,
      "price": number,
      "status": "pending",
      "createdAt": "timestamp"
    }
  ],
  "coursePurchases": [
    {
      "id": "string",
      "courseId": "string",
      "studentId": "string",
      "quantity": number,
      "price": number,
      "status": "pending",
      "createdAt": "timestamp"
    }
  ]
}
```

**Response (Error - 400/500):**

```json
{
  "success": false,
  "message": "Error message describing what went wrong"
}
```

### 2. Initiate Bulk Payment

**Endpoint:** `POST /paymenthandler/bulk-checkout/`

**Headers:**

```
Content-Type: application/json
Authorization: Bearer {accessToken}
```

**Request Body:**

```json
{
  "purchaseId": "string",
  "phoneNumber": "string",
  "totalAmount": number,
  "items": [
    {
      "type": "package" | "course",
      "id": "string",
      "packageName": "string", // if type is package
      "courseName": "string",  // if type is course
      "price": number,
      "quantity": number,
      "selectedDuration": 1 | 3 | 6 // if type is package
    }
  ]
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "paymentUrl": "string",
  "message": "Payment initiated successfully"
}
```

**Response (Error - 400/500):**

```json
{
  "success": false,
  "message": "Error message describing what went wrong"
}
```

## 🔍 Implementation Details

### Database Schema Suggestions

#### Bulk Purchase Table

```sql
CREATE TABLE bulk_purchases (
  id VARCHAR(36) PRIMARY KEY,
  student_id VARCHAR(36) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (student_id) REFERENCES students(id)
);
```

#### Bulk Purchase Items Table

```sql
CREATE TABLE bulk_purchase_items (
  id VARCHAR(36) PRIMARY KEY,
  bulk_purchase_id VARCHAR(36) NOT NULL,
  item_type ENUM('package', 'course') NOT NULL,
  item_id VARCHAR(36) NOT NULL, -- packageId or courseId
  quantity INT NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL,
  duration INT NULL, -- Only for packages (1, 3, or 6 months)
  status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (bulk_purchase_id) REFERENCES bulk_purchases(id),
  INDEX idx_item_type_id (item_type, item_id)
);
```

### Backend Implementation Logic

#### 1. Bulk Purchase Creation (`/cart/bulk-purchase`)

```javascript
// Pseudocode for bulk purchase creation
async function createBulkPurchase(req, res) {
  try {
    const { packages, courses, totalAmount, phoneNumber, paymentMethod } =
      req.body;
    const studentId = req.user.id; // From JWT token

    // Start transaction
    const transaction = await db.beginTransaction();

    try {
      // Create main bulk purchase record
      const bulkPurchase = await db.bulkPurchases.create(
        {
          id: generateUUID(),
          student_id: studentId,
          total_amount: totalAmount,
          phone_number: phoneNumber,
          payment_method: paymentMethod,
          status: "pending",
        },
        { transaction },
      );

      const packagePurchases = [];
      const coursePurchases = [];

      // Process packages
      for (const pkg of packages) {
        for (let i = 0; i < pkg.quantity; i++) {
          // Create individual package purchase records
          const packagePurchase = await db.packagePurchases.create(
            {
              id: generateUUID(),
              package_id: pkg.packageId,
              student_id: studentId,
              duration: pkg.duration,
              price: pkg.price / pkg.quantity, // Individual price
              phone_number: phoneNumber,
              payment_method: paymentMethod,
              status: "pending",
            },
            { transaction },
          );

          packagePurchases.push(packagePurchase);

          // Create bulk purchase item record
          await db.bulkPurchaseItems.create(
            {
              id: generateUUID(),
              bulk_purchase_id: bulkPurchase.id,
              item_type: "package",
              item_id: pkg.packageId,
              quantity: 1,
              price: pkg.price / pkg.quantity,
              duration: pkg.duration,
              status: "pending",
            },
            { transaction },
          );
        }
      }

      // Process courses
      for (const course of courses) {
        for (let i = 0; i < course.quantity; i++) {
          // Create individual course purchase records
          const coursePurchase = await db.coursePurchases.create(
            {
              id: generateUUID(),
              course_id: course.courseId,
              student_id: studentId,
              price: course.price / course.quantity, // Individual price
              phone_number: phoneNumber,
              payment_method: paymentMethod,
              status: "pending",
            },
            { transaction },
          );

          coursePurchases.push(coursePurchase);

          // Create bulk purchase item record
          await db.bulkPurchaseItems.create(
            {
              id: generateUUID(),
              bulk_purchase_id: bulkPurchase.id,
              item_type: "course",
              item_id: course.courseId,
              quantity: 1,
              price: course.price / course.quantity,
              status: "pending",
            },
            { transaction },
          );
        }
      }

      await transaction.commit();

      res.json({
        success: true,
        purchaseId: bulkPurchase.id,
        message: "Bulk purchase created successfully",
        packagePurchases,
        coursePurchases,
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Error creating bulk purchase:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create bulk purchase",
    });
  }
}
```

#### 2. Bulk Payment Initiation (`/paymenthandler/bulk-checkout/`)

```javascript
// Pseudocode for bulk payment initiation
async function initiateBulkPayment(req, res) {
  try {
    const { purchaseId, phoneNumber, totalAmount, items } = req.body;
    const studentId = req.user.id;

    // Verify bulk purchase exists and belongs to student
    const bulkPurchase = await db.bulkPurchases.findOne({
      where: { id: purchaseId, student_id: studentId },
    });

    if (!bulkPurchase) {
      return res.status(404).json({
        success: false,
        message: "Bulk purchase not found",
      });
    }

    // Create payment description
    const itemDescriptions = items.map((item) => {
      if (item.type === "package") {
        return `${item.packageName} (${item.selectedDuration} month${item.selectedDuration > 1 ? "s" : ""}) x${item.quantity}`;
      } else {
        return `${item.courseName} x${item.quantity}`;
      }
    });

    const description = `Bulk Purchase: ${itemDescriptions.join(", ")}`;

    // Initiate payment with SantiPay (use your existing payment logic)
    const paymentResult = await initiatePaymentWithSantiPay({
      amount: totalAmount,
      phoneNumber: phoneNumber,
      description: description,
      referenceId: purchaseId,
      callbackUrl: `${process.env.BASE_URL}/api/payment/bulk-callback`,
      returnUrl: `${process.env.FRONTEND_URL}/payment/success`,
    });

    if (paymentResult.success) {
      // Update bulk purchase with payment info
      await db.bulkPurchases.update(
        {
          payment_reference: paymentResult.referenceId,
          payment_url: paymentResult.paymentUrl,
        },
        {
          where: { id: purchaseId },
        },
      );

      res.json({
        success: true,
        paymentUrl: paymentResult.paymentUrl,
        message: "Payment initiated successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: paymentResult.message || "Failed to initiate payment",
      });
    }
  } catch (error) {
    console.error("Error initiating bulk payment:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to initiate payment",
    });
  }
}
```

## 🔄 Payment Callback Handling

You'll also need to handle payment callbacks for bulk purchases:

**Endpoint:** `POST /api/payment/bulk-callback`

```javascript
async function handleBulkPaymentCallback(req, res) {
  try {
    const { referenceId, status, transactionId } = req.body;

    // Verify payment with SantiPay
    const paymentVerification = await verifySantiPayPayment(transactionId);

    if (paymentVerification.success && status === "success") {
      // Start transaction
      const transaction = await db.beginTransaction();

      try {
        // Update bulk purchase status
        await db.bulkPurchases.update(
          {
            status: "completed",
            transaction_id: transactionId,
            completed_at: new Date(),
          },
          {
            where: { id: referenceId },
            transaction,
          },
        );

        // Update all related purchase records
        await db.packagePurchases.update(
          {
            status: "completed",
            transaction_id: transactionId,
          },
          {
            where: {
              id: { [Op.in]: await getBulkPurchasePackageIds(referenceId) },
            },
            transaction,
          },
        );

        await db.coursePurchases.update(
          {
            status: "completed",
            transaction_id: transactionId,
          },
          {
            where: {
              id: { [Op.in]: await getBulkPurchaseCourseIds(referenceId) },
            },
            transaction,
          },
        );

        // Update bulk purchase items
        await db.bulkPurchaseItems.update(
          {
            status: "completed",
          },
          {
            where: { bulk_purchase_id: referenceId },
            transaction,
          },
        );

        await transaction.commit();

        res.json({ success: true, message: "Payment processed successfully" });
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    } else {
      // Handle failed payment
      await db.bulkPurchases.update(
        {
          status: "failed",
        },
        {
          where: { id: referenceId },
        },
      );

      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error handling bulk payment callback:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
```

## 📝 Example Request/Response Flow

### Example Cart Data

```json
{
  "packages": [
    {
      "packageId": "pkg-123",
      "duration": 3,
      "quantity": 1,
      "price": 500
    }
  ],
  "courses": [
    {
      "courseId": "course-456",
      "quantity": 2,
      "price": 400
    }
  ],
  "totalAmount": 900,
  "phoneNumber": "251912345678",
  "paymentMethod": "santipay"
}
```

### Expected Response

```json
{
  "success": true,
  "purchaseId": "bulk-789",
  "message": "Bulk purchase created successfully",
  "packagePurchases": [
    {
      "id": "pp-001",
      "packageId": "pkg-123",
      "studentId": "student-123",
      "duration": 3,
      "quantity": 1,
      "price": 500,
      "status": "pending"
    }
  ],
  "coursePurchases": [
    {
      "id": "cp-001",
      "courseId": "course-456",
      "studentId": "student-123",
      "quantity": 1,
      "price": 200,
      "status": "pending"
    },
    {
      "id": "cp-002",
      "courseId": "course-456",
      "studentId": "student-123",
      "quantity": 1,
      "price": 200,
      "status": "pending"
    }
  ]
}
```

## 🚀 Implementation Notes

1. **Use Transactions**: Ensure all database operations are wrapped in transactions
2. **Validation**: Validate all input data (package/course existence, student permissions, etc.)
3. **Error Handling**: Provide clear error messages for different failure scenarios
4. **Security**: Verify JWT tokens and ensure students can only access their own data
5. **Logging**: Log all purchase attempts and payment initiations for debugging
6. **Phone Number**: Format phone numbers consistently (251XXXXXXXXX format)

This specification should give you everything needed to implement the bulk purchase APIs! 🎯
