# Course API Documentation for Frontend

This document provides all the course-related API endpoints and their responses for frontend integration.

## 🔐 **Authentication**

All endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## 📚 **Course Endpoints**

### **1. Get All Courses**

**Endpoint:** `GET /courses`

**Description:** Retrieves all courses with their details and pricing information.

**Headers:**

```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Response:**

```json
[
  {
    "id": "28a2a1a4-2316-4434-b1ac-5649ffe31e16",
    "courseName": "Chemistry-9",
    "courseDescription": "Grade 9 Chemistry has a total of 5 units. We divided every units in many parts of Video content, Assessments and Short notes. When you purchase a monthly subscription we will post you continuously according to school curriculum. Mostly we will post every part ahead of school schedule.",
    "createdAt": "2024-07-14T01:40:28.940Z",
    "parts": "2",
    "partName": "Grade 9 Unit one",
    "courseIntroductionVideo": null,
    "price": "200",
    "temporaryPrice": null,
    "discountStatus": false,
    "discountExpiryDate": null,
    "status": true,
    "displayOnHome": false,
    "thumbnail": null,
    "extra1": null,
    "extra2": null,
    "packages": [],
    "Forum": null
  },
  {
    "id": "30a3fda5-31cc-4aea-8867-83113d474052",
    "courseName": "Biology-12",
    "courseDescription": "Grade 12 Biology course covering all units",
    "createdAt": "2024-09-21T05:20:51.070Z",
    "parts": "1",
    "partName": "Grade 12 unit one",
    "courseIntroductionVideo": null,
    "price": "200",
    "temporaryPrice": "150",
    "discountStatus": true,
    "discountExpiryDate": "2024-12-31T23:59:59.000Z",
    "status": true,
    "displayOnHome": true,
    "thumbnail": "biology-12-thumbnail.jpg",
    "extra1": null,
    "extra2": null,
    "packages": [],
    "Forum": null
  }
]
```

**Field Descriptions:**

- `id`: Unique course identifier
- `courseName`: Course title
- `courseDescription`: Detailed course description
- `price`: Regular price (in birr)
- `temporaryPrice`: Discounted price (if on sale)
- `discountStatus`: Whether discount is active
- `discountExpiryDate`: When discount expires
- `status`: Whether course is active/available
- `displayOnHome`: Whether to show on homepage
- `thumbnail`: Course thumbnail image URL
- `parts`: Number of course parts
- `partName`: Name of the current part
- `courseIntroductionVideo`: Introduction video filename

---

### **2. Get Single Course**

**Endpoint:** `GET /courses/{id}`

**Description:** Retrieves a specific course with video URL and additional details.

**Headers:**

```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Response:**

```json
{
  "id": "28a2a1a4-2316-4434-b1ac-5649ffe31e16",
  "courseName": "Chemistry-9",
  "courseDescription": "Grade 9 Chemistry has a total of 5 units...",
  "createdAt": "2024-07-14T01:40:28.940Z",
  "parts": "2",
  "partName": "Grade 9 Unit one",
  "courseIntroductionVideo": "chemistry-9-intro.mp4",
  "price": "200",
  "temporaryPrice": null,
  "discountStatus": false,
  "discountExpiryDate": null,
  "status": true,
  "displayOnHome": false,
  "thumbnail": null,
  "extra1": null,
  "extra2": null,
  "packages": [],
  "Forum": null,
  "CourseUnitsList": [
    {
      "id": 1,
      "UnitNumber": 1,
      "UnitName": "Introduction to Chemistry",
      "UnitDescription": "Basic concepts of chemistry"
    }
  ],
  "videoUrl": "https://storage.googleapis.com/generalfilesbucket/course_introduction_videos/chemistry-9-intro.mp4?X-Goog-Algorithm=..."
}
```

**Additional Fields:**

- `CourseUnitsList`: Array of course units with structure
- `videoUrl`: Signed URL for course introduction video

---

### **3. Create Course**

**Endpoint:** `POST /courses`

**Description:** Creates a new course (Admin only).

**Headers:**

```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "courseName": "Physics-10",
  "courseDescription": "Grade 10 Physics course covering mechanics and thermodynamics",
  "price": "200",
  "temporaryPrice": "150",
  "discountStatus": true,
  "discountExpiryDate": "2024-12-31T23:59:59.000Z",
  "status": true,
  "displayOnHome": true,
  "thumbnail": "physics-10-thumbnail.jpg",
  "parts": "3",
  "partName": "Grade 10 Unit one",
  "courseIntroductionVideo": "physics-10-intro.mp4"
}
```

**Response:**

```json
{
  "id": "new-course-id-here",
  "courseName": "Physics-10",
  "courseDescription": "Grade 10 Physics course covering mechanics and thermodynamics",
  "createdAt": "2024-09-10T18:30:00.000Z",
  "parts": "3",
  "partName": "Grade 10 Unit one",
  "courseIntroductionVideo": "physics-10-intro.mp4",
  "price": "200",
  "temporaryPrice": "150",
  "discountStatus": true,
  "discountExpiryDate": "2024-12-31T23:59:59.000Z",
  "status": true,
  "displayOnHome": true,
  "thumbnail": "physics-10-thumbnail.jpg",
  "extra1": null,
  "extra2": null
}
```

---

### **4. Update Course**

**Endpoint:** `PATCH /courses/{id}`

**Description:** Updates an existing course (Admin only).

**Headers:**

```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "price": "250",
  "temporaryPrice": "200",
  "discountStatus": true,
  "discountExpiryDate": "2024-12-31T23:59:59.000Z",
  "status": true,
  "displayOnHome": true
}
```

**Response:**

```json
{
  "id": "28a2a1a4-2316-4434-b1ac-5649ffe31e16",
  "courseName": "Chemistry-9",
  "courseDescription": "Grade 9 Chemistry has a total of 5 units...",
  "createdAt": "2024-07-14T01:40:28.940Z",
  "parts": "2",
  "partName": "Grade 9 Unit one",
  "courseIntroductionVideo": null,
  "price": "250",
  "temporaryPrice": "200",
  "discountStatus": true,
  "discountExpiryDate": "2024-12-31T23:59:59.000Z",
  "status": true,
  "displayOnHome": true,
  "thumbnail": null,
  "extra1": null,
  "extra2": null
}
```

---

### **5. Delete Course**

**Endpoint:** `DELETE /courses/{id}`

**Description:** Deletes a course (Admin only).

**Headers:**

```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Response:**

```json
{
  "id": "28a2a1a4-2316-4434-b1ac-5649ffe31e16",
  "courseName": "Chemistry-9",
  "courseDescription": "Grade 9 Chemistry has a total of 5 units...",
  "createdAt": "2024-07-14T01:40:28.940Z",
  "parts": "2",
  "partName": "Grade 9 Unit one",
  "courseIntroductionVideo": null,
  "price": "200",
  "temporaryPrice": null,
  "discountStatus": false,
  "discountExpiryDate": null,
  "status": false,
  "displayOnHome": false,
  "thumbnail": null,
  "extra1": null,
  "extra2": null
}
```

---

## 💰 **Pricing Information**

### **Price Fields:**

- `price`: Regular price (string, in birr)
- `temporaryPrice`: Discounted price (string, in birr, nullable)
- `discountStatus`: Boolean indicating if discount is active
- `discountExpiryDate`: ISO date string when discount expires

### **Price Display Logic:**

```javascript
// Frontend logic for displaying price
function getDisplayPrice(course) {
  if (course.discountStatus && course.temporaryPrice) {
    return {
      currentPrice: course.temporaryPrice,
      originalPrice: course.price,
      isDiscounted: true,
      discountExpiry: course.discountExpiryDate,
    };
  }
  return {
    currentPrice: course.price,
    originalPrice: null,
    isDiscounted: false,
    discountExpiry: null,
  };
}
```

---

## 🛒 **Course Purchase Integration**

### **Bulk Purchase API:**

**Endpoint:** `POST /cart/bulk-purchase`

**Request Body:**

```json
{
  "courses": [
    {
      "courseId": "28a2a1a4-2316-4434-b1ac-5649ffe31e16",
      "quantity": 1,
      "price": 200
    }
  ],
  "packages": [],
  "totalAmount": 200,
  "phoneNumber": "+251912345678",
  "paymentMethod": "santipay"
}
```

### **Individual Course Purchase:**

**Endpoint:** `POST /paymenthandler/course-checkout`

**Request Body:**

```json
{
  "courseId": "28a2a1a4-2316-4434-b1ac-5649ffe31e16",
  "price": 200,
  "phoneNumber": "+251912345678"
}
```

---

## 📱 **Frontend Implementation Examples**

### **React/JavaScript Example:**

```javascript
// Fetch all courses
const fetchCourses = async () => {
  try {
    const response = await fetch("/courses", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const courses = await response.json();
    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};

// Display course with pricing
const CourseCard = ({ course }) => {
  const priceInfo = getDisplayPrice(course);

  return (
    <div className="course-card">
      <h3>{course.courseName}</h3>
      <p>{course.courseDescription}</p>
      <div className="price">
        {priceInfo.isDiscounted ? (
          <>
            <span className="current-price">${priceInfo.currentPrice}</span>
            <span className="original-price">${priceInfo.originalPrice}</span>
          </>
        ) : (
          <span className="price">${priceInfo.currentPrice}</span>
        )}
      </div>
      <button onClick={() => purchaseCourse(course.id)}>Purchase Course</button>
    </div>
  );
};
```

---

## ⚠️ **Error Handling**

### **Common Error Responses:**

```json
// 401 Unauthorized
{
  "Error": "You dont have access"
}

// 404 Not Found
{
  "Error": "Course not found"
}

// 500 Internal Server Error
{
  "Error": "Internal server error"
}
```

---

## 🔧 **Testing**

### **Test Course Data:**

After running the price update script, all courses will have:

- `price`: "200"
- `status`: true (for active courses)
- `discountStatus`: false (unless manually set)

### **Test Endpoints:**

```bash
# Get all courses
curl -H "Authorization: Bearer <token>" https://api.fayidaacademy.com/courses

# Get specific course
curl -H "Authorization: Bearer <token>" https://api.fayidaacademy.com/courses/{course-id}
```

---

This documentation provides everything your frontend team needs to integrate with the course API and display course information with proper pricing! 🚀

we need to populate the courses with this pelase not a mock data anymore
