# 🔌 Complete API Specification for Cart & Payment System

## 📋 Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Cart Management APIs](#cart-management-apis)
4. [Payment Processing APIs](#payment-processing-apis)
5. [Purchase Management APIs](#purchase-management-apis)
6. [Error Handling](#error-handling)
7. [Rate Limiting](#rate-limiting)
8. [Webhooks & Callbacks](#webhooks--callbacks)
9. [Testing Endpoints](#testing-endpoints)

## 🎯 Overview

This document provides complete API specifications for implementing the cart and payment system. All endpoints use RESTful conventions and return JSON responses.

### Base URL

```
Production: https://api.fayida.com
Development: https://dev-api.fayida.com
```

### Content Type

All requests and responses use `application/json`

## 🔐 Authentication

### JWT Token Authentication

All protected endpoints require a valid JWT token in the Authorization header.

```http
Authorization: Bearer <jwt_token>
```

### Token Refresh

```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "string"
}
```

**Response:**

```json
{
  "success": true,
  "accessToken": "string",
  "refreshToken": "string",
  "expiresIn": 3600
}
```

## 🛒 Cart Management APIs

### 1. Get Cart Items

```http
GET /cart/items
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "items": [
    {
      "id": "string",
      "type": "package" | "course",
      "name": "string",
      "price": 100.00,
      "temporaryPrice": 80.00,
      "discountStatus": true,
      "quantity": 2,
      "selectedDuration": 3,
      "imageUrl": "string",
      "addedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "totalItems": 2,
  "totalPrice": 160.00
}
```

### 2. Add Item to Cart

```http
POST /cart/items
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "package" | "course",
  "itemId": "string",
  "quantity": 1,
  "selectedDuration": 3
}
```

**Response:**

```json
{
  "success": true,
  "message": "Item added to cart",
  "item": {
    "id": "string",
    "type": "package",
    "name": "Premium Package",
    "price": 100.0,
    "quantity": 1,
    "selectedDuration": 3
  }
}
```

### 3. Update Cart Item

```http
PUT /cart/items/{itemId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 2,
  "selectedDuration": 6
}
```

**Response:**

```json
{
  "success": true,
  "message": "Item updated successfully",
  "item": {
    "id": "string",
    "quantity": 2,
    "selectedDuration": 6,
    "totalPrice": 200.0
  }
}
```

### 4. Remove Item from Cart

```http
DELETE /cart/items/{itemId}
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Item removed from cart"
}
```

### 5. Clear Cart

```http
DELETE /cart/items
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Cart cleared successfully"
}
```

## 💳 Payment Processing APIs

### 1. Create Bulk Purchase

```http
POST /cart/bulk-purchase
Authorization: Bearer <token>
Content-Type: application/json

{
  "packages": [
    {
      "packageId": "string",
      "duration": 1 | 3 | 6,
      "quantity": 1,
      "price": 100.00
    }
  ],
  "courses": [
    {
      "courseId": "string",
      "quantity": 1,
      "price": 50.00
    }
  ],
  "totalAmount": 150.00,
  "phoneNumber": "251912345678",
  "paymentMethod": "santipay"
}
```

**Response:**

```json
{
  "success": true,
  "purchaseId": "bulk-purchase-123",
  "message": "Bulk purchase created successfully",
  "packagePurchases": [
    {
      "id": "pp-123",
      "packageId": "pkg-456",
      "studentId": "student-789",
      "duration": 3,
      "quantity": 1,
      "price": 100.0,
      "status": "pending",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "coursePurchases": [
    {
      "id": "cp-123",
      "courseId": "course-456",
      "studentId": "student-789",
      "quantity": 1,
      "price": 50.0,
      "status": "pending",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 2. Initiate Bulk Payment

```http
POST /paymenthandler/bulk-checkout/
Authorization: Bearer <token>
Content-Type: application/json

{
  "purchaseId": "bulk-purchase-123",
  "phoneNumber": "251912345678",
  "totalAmount": 150.00,
  "items": [
    {
      "type": "package",
      "id": "pkg-456",
      "name": "Premium Package",
      "price": 100.00,
      "quantity": 1,
      "selectedDuration": 3
    },
    {
      "type": "course",
      "id": "course-456",
      "name": "Mathematics 101",
      "price": 50.00,
      "quantity": 1
    }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "paymentUrl": "https://santipay.com/pay/abc123",
  "paymentReference": "santipay-ref-123",
  "message": "Payment initiated successfully",
  "expiresAt": "2024-01-01T01:00:00Z"
}
```

### 3. Individual Package Purchase

```http
POST /paymenthandler/checkout/
Authorization: Bearer <token>
Content-Type: application/json

{
  "packageId": "string",
  "price": 100.00,
  "phoneNumber": "251912345678",
  "duration": 3
}
```

**Response:**

```json
{
  "success": true,
  "paymentUrl": "https://santipay.com/pay/def456",
  "purchaseId": "purchase-123",
  "message": "Payment initiated successfully"
}
```

### 4. Individual Course Purchase

```http
POST /paymenthandler/course-checkout/
Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": "string",
  "price": 50.00,
  "phoneNumber": "251912345678"
}
```

**Response:**

```json
{
  "success": true,
  "paymentUrl": "https://santipay.com/pay/ghi789",
  "purchaseId": "course-purchase-123",
  "message": "Payment initiated successfully"
}
```

## 📦 Purchase Management APIs

### 1. Get Purchase History

```http
GET /purchases/history
Authorization: Bearer <token>
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 20)
  - type: "package" | "course" | "all" (default: "all")
  - status: "pending" | "completed" | "failed" | "all" (default: "all")
```

**Response:**

```json
{
  "success": true,
  "purchases": [
    {
      "id": "purchase-123",
      "type": "package",
      "itemName": "Premium Package",
      "amount": 100.0,
      "status": "completed",
      "purchasedAt": "2024-01-01T00:00:00Z",
      "expiresAt": "2024-04-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "totalPages": 3
  }
}
```

### 2. Get Purchase Details

```http
GET /purchases/{purchaseId}
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "purchase": {
    "id": "purchase-123",
    "type": "package",
    "itemId": "pkg-456",
    "itemName": "Premium Package",
    "amount": 100.0,
    "status": "completed",
    "paymentMethod": "santipay",
    "paymentReference": "santipay-ref-123",
    "transactionId": "txn-456",
    "purchasedAt": "2024-01-01T00:00:00Z",
    "expiresAt": "2024-04-01T00:00:00Z",
    "duration": 3
  }
}
```

### 3. Check Purchase Status

```http
GET /purchases/{purchaseId}/status
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "status": "completed",
  "paymentStatus": "success",
  "lastChecked": "2024-01-01T00:00:00Z"
}
```

## 🔄 Webhooks & Callbacks

### 1. Payment Success Callback

```http
POST /api/payment/bulk-callback
Content-Type: application/json

{
  "referenceId": "bulk-purchase-123",
  "status": "success",
  "transactionId": "santipay-txn-456",
  "amount": 150.00,
  "phoneNumber": "251912345678",
  "timestamp": "2024-01-01T00:00:00Z",
  "signature": "hmac-signature"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Payment processed successfully"
}
```

### 2. Payment Failure Callback

```http
POST /api/payment/bulk-callback
Content-Type: application/json

{
  "referenceId": "bulk-purchase-123",
  "status": "failed",
  "errorCode": "INSUFFICIENT_FUNDS",
  "errorMessage": "Insufficient balance",
  "timestamp": "2024-01-01T00:00:00Z",
  "signature": "hmac-signature"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Payment failure recorded"
}
```

## ❌ Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {
      "field": "Additional error details"
    }
  },
  "timestamp": "2024-01-01T00:00:00Z",
  "requestId": "req-123"
}
```

### Common Error Codes

#### Authentication Errors

- `UNAUTHORIZED` (401): Invalid or missing token
- `TOKEN_EXPIRED` (401): Token has expired
- `INVALID_TOKEN` (401): Malformed token

#### Validation Errors

- `VALIDATION_ERROR` (400): Request validation failed
- `INVALID_PHONE_NUMBER` (400): Phone number format invalid
- `INVALID_AMOUNT` (400): Amount must be positive
- `INVALID_DURATION` (400): Duration must be 1, 3, or 6

#### Business Logic Errors

- `ITEM_NOT_FOUND` (404): Package or course not found
- `INSUFFICIENT_STOCK` (400): Item out of stock
- `ALREADY_PURCHASED` (400): Item already purchased
- `PAYMENT_FAILED` (400): Payment processing failed

#### System Errors

- `INTERNAL_ERROR` (500): Internal server error
- `SERVICE_UNAVAILABLE` (503): Payment service unavailable
- `RATE_LIMITED` (429): Too many requests

### Error Handling Examples

#### 400 Bad Request

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": {
      "phoneNumber": "Phone number must be in format 251XXXXXXXXX",
      "amount": "Amount must be greater than 0"
    }
  },
  "timestamp": "2024-01-01T00:00:00Z",
  "requestId": "req-123"
}
```

#### 401 Unauthorized

```json
{
  "success": false,
  "error": {
    "code": "TOKEN_EXPIRED",
    "message": "Authentication token has expired",
    "details": {
      "expiredAt": "2024-01-01T00:00:00Z"
    }
  },
  "timestamp": "2024-01-01T00:00:00Z",
  "requestId": "req-124"
}
```

#### 500 Internal Server Error

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An internal error occurred",
    "details": {
      "errorId": "err-456"
    }
  },
  "timestamp": "2024-01-01T00:00:00Z",
  "requestId": "req-125"
}
```

## 🚦 Rate Limiting

### Rate Limit Headers

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

### Rate Limit Rules

- **General API**: 100 requests per minute per IP
- **Payment APIs**: 10 requests per minute per user
- **Cart APIs**: 200 requests per minute per user

### Rate Limit Exceeded Response

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMITED",
    "message": "Rate limit exceeded",
    "details": {
      "limit": 100,
      "remaining": 0,
      "resetAt": "2024-01-01T01:00:00Z"
    }
  },
  "timestamp": "2024-01-01T00:00:00Z",
  "requestId": "req-126"
}
```

## 🧪 Testing Endpoints

### 1. Health Check

```http
GET /health
```

**Response:**

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "version": "1.0.0",
  "services": {
    "database": "healthy",
    "payment": "healthy",
    "cache": "healthy"
  }
}
```

### 2. Test Payment (Development Only)

```http
POST /test/payment
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 100.00,
  "phoneNumber": "251912345678",
  "testMode": true
}
```

**Response:**

```json
{
  "success": true,
  "paymentUrl": "https://test-santipay.com/pay/test-123",
  "message": "Test payment initiated"
}
```

### 3. Mock Payment Callback

```http
POST /test/payment/callback
Content-Type: application/json

{
  "referenceId": "test-purchase-123",
  "status": "success",
  "transactionId": "test-txn-456"
}
```

## 📊 Monitoring & Analytics

### 1. API Metrics

```http
GET /admin/metrics
Authorization: Bearer <admin_token>
```

**Response:**

```json
{
  "success": true,
  "metrics": {
    "totalRequests": 10000,
    "successRate": 0.95,
    "averageResponseTime": 250,
    "errorRate": 0.05,
    "endpoints": {
      "/cart/bulk-purchase": {
        "requests": 1000,
        "successRate": 0.98,
        "averageResponseTime": 300
      }
    }
  }
}
```

### 2. Payment Analytics

```http
GET /admin/payments/analytics
Authorization: Bearer <admin_token>
Query Parameters:
  - startDate: string (ISO date)
  - endDate: string (ISO date)
  - groupBy: "day" | "week" | "month"
```

**Response:**

```json
{
  "success": true,
  "analytics": {
    "totalVolume": 50000.0,
    "totalTransactions": 500,
    "successRate": 0.92,
    "averageTransactionValue": 100.0,
    "dailyData": [
      {
        "date": "2024-01-01",
        "volume": 1000.0,
        "transactions": 10,
        "successRate": 0.9
      }
    ]
  }
}
```

## 🔧 Configuration

### Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/fayida
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=3600
REFRESH_TOKEN_EXPIRES_IN=604800

# Payment Gateway
SANTIPAY_API_KEY=your-santipay-key
SANTIPAY_SECRET=your-santipay-secret
SANTIPAY_BASE_URL=https://api.santipay.com

# Application
API_BASE_URL=https://api.fayida.com
FRONTEND_URL=https://fayida.com
WEBHOOK_SECRET=your-webhook-secret

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# Monitoring
SENTRY_DSN=your-sentry-dsn
LOG_LEVEL=info
```

## 📝 API Versioning

### Version Header

```http
API-Version: 1.0
```

### Versioning Strategy

- **Major versions** (v1, v2): Breaking changes
- **Minor versions** (v1.1, v1.2): New features, backward compatible
- **Patch versions** (v1.1.1, v1.1.2): Bug fixes

### Deprecation Notice

```http
Deprecation: true
Sunset: 2024-12-31T23:59:59Z
Link: <https://api.fayida.com/docs/v2>; rel="successor-version"
```

## 🔍 Request/Response Examples

### Complete Cart Checkout Flow

#### 1. Add Items to Cart

```http
POST /cart/items
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "type": "package",
  "itemId": "pkg-premium-123",
  "quantity": 1,
  "selectedDuration": 3
}
```

#### 2. Create Bulk Purchase

```http
POST /cart/bulk-purchase
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "packages": [
    {
      "packageId": "pkg-premium-123",
      "duration": 3,
      "quantity": 1,
      "price": 300.00
    }
  ],
  "courses": [],
  "totalAmount": 300.00,
  "phoneNumber": "251912345678",
  "paymentMethod": "santipay"
}
```

#### 3. Initiate Payment

```http
POST /paymenthandler/bulk-checkout/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "purchaseId": "bulk-purchase-abc123",
  "phoneNumber": "251912345678",
  "totalAmount": 300.00,
  "items": [
    {
      "type": "package",
      "id": "pkg-premium-123",
      "name": "Premium Package",
      "price": 300.00,
      "quantity": 1,
      "selectedDuration": 3
    }
  ]
}
```

#### 4. Payment Success Callback

```http
POST /api/payment/bulk-callback
Content-Type: application/json

{
  "referenceId": "bulk-purchase-abc123",
  "status": "success",
  "transactionId": "santipay-txn-xyz789",
  "amount": 300.00,
  "phoneNumber": "251912345678",
  "timestamp": "2024-01-01T12:00:00Z",
  "signature": "sha256=abc123def456..."
}
```

This comprehensive API specification provides everything needed to implement the complete cart and payment system backend. All endpoints are documented with request/response examples, error handling, and proper HTTP status codes.
