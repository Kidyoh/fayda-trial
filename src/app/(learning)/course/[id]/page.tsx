"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Play, BookOpen, Clock, Users, Star, CheckCircle } from "lucide-react";
import { getPublicCourse, Course, getDisplayPrice } from "@/lib/courseAPI";
import { CoursePurchaseDialog } from "@/components/custom_components/coursePurchaseDialog";
import { CourseAddToCartButton } from "@/components/cart/AddToCartButton";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const courseData = await getPublicCourse(courseId);
        setCourse(courseData);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err instanceof Error ? err.message : 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-64 bg-gray-300 rounded mb-6"></div>
                <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
              <div className="h-96 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="text-red-500 text-lg font-semibold mb-4">
              Failed to load course
            </div>
            <div className="text-gray-600 mb-6">{error}</div>
            <Link
              href="/"
              className="bg-primaryColor text-white px-6 py-2 rounded-full font-semibold hover:bg-primaryColor/90 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="text-gray-600 text-lg font-semibold mb-4">
              Course not found
            </div>
            <Link
              href="/"
              className="bg-primaryColor text-white px-6 py-2 rounded-full font-semibold hover:bg-primaryColor/90 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const priceInfo = getDisplayPrice(course);
  const thumbnail = course.thumbnail || getCourseThumbnail(course);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-primaryColor hover:text-primaryColor/80 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Thumbnail/Video */}
            <div className="relative mb-6">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                {course.videoUrl ? (
                  <video
                    controls
                    poster={thumbnail}
                    className="w-full h-full object-cover"
                  >
                    <source src={course.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image
                      src={thumbnail}
                      alt={course.courseName}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Course Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {course.courseName}
            </h1>

            {/* Course Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">About This Course</h2>
              <p className="text-gray-700 leading-relaxed">
                {course.courseDescription || "No description available for this course."}
              </p>
            </div>

            {/* Course Units */}
            {course.CourseUnitsList && course.CourseUnitsList.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Units</h2>
                <div className="space-y-3">
                  {course.CourseUnitsList.map((unit) => (
                    <div key={unit.id} className="bg-white p-4 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Unit {unit.UnitNumber}: {unit.UnitName}
                      </h3>
                      <p className="text-gray-600">{unit.UnitDescription}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Course Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <BookOpen className="w-8 h-8 text-primaryColor mx-auto mb-2" />
                <div className="font-semibold text-gray-900">{course.parts} Parts</div>
                <div className="text-sm text-gray-600">Comprehensive Content</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <Clock className="w-8 h-8 text-primaryColor mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Self-Paced</div>
                <div className="text-sm text-gray-600">Learn at Your Speed</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <Users className="w-8 h-8 text-primaryColor mx-auto mb-2" />
                <div className="font-semibold text-gray-900">All Levels</div>
                <div className="text-sm text-gray-600">Beginner to Advanced</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
              {/* Pricing */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Course Price</h3>
                {priceInfo.isDiscounted ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-primaryColor">
                        {priceInfo.currentPrice} Birr
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        {priceInfo.originalPrice} Birr
                      </span>
                    </div>
                    <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium inline-block">
                      Limited Time Offer!
                    </div>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-primaryColor">
                    {priceInfo.currentPrice} Birr
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <CourseAddToCartButton 
                  courseData={{
                    id: course.id,
                    courseName: course.courseName,
                    price: parseFloat(priceInfo.currentPrice),
                    temporaryPrice: priceInfo.isDiscounted ? parseFloat(priceInfo.originalPrice!) : undefined,
                    discountStatus: priceInfo.isDiscounted,
                    discountExpiryDate: priceInfo.discountExpiry,
                    courseDescription: course.courseDescription
                  }}
                  size="lg"
                />
                
                <CoursePurchaseDialog
                  courseId={course.id}
                  courseName={course.courseName}
                  price={priceInfo.currentPrice}
                  temporaryPrice={priceInfo.isDiscounted ? priceInfo.originalPrice : undefined}
                  discountStatus={priceInfo.isDiscounted}
                  discountExpiryDate={priceInfo.discountExpiry}
                />
              </div>

              {/* Course Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">What's Included</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {course.parts} Course Parts
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Lifetime Access
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Mobile & Desktop Access
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Certificate of Completion
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get course thumbnail
function getCourseThumbnail(course: Course): string {
  if (course.thumbnail) {
    return course.thumbnail;
  }
  
  // Map course names to appropriate images
  const courseImages: { [key: string]: string } = {
    'Math': '/course/Math.png',
    'Physics': '/course/Physics.png',
    'Chemistry': '/course/Chemistry.png',
    'Biology': '/course/Biology.png',
    'History': '/course/History.png',
    'Economics': '/course/Economics.png'
  };
  
  // Try to match course name with available images
  for (const [key, image] of Object.entries(courseImages)) {
    if (course.courseName.toLowerCase().includes(key.toLowerCase())) {
      return image;
    }
  }
  
  // Default fallback
  return '/course/Math.png';
}
