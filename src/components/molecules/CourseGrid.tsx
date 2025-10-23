"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Course } from "@/data/courses";
import { useCourses } from "@/hooks/useCourses";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface CourseGridProps {
  limit?: number;
  showHomepageOnly?: boolean;
}

export function CourseGrid({
  limit,
  showHomepageOnly = false,
}: CourseGridProps) {
  const { data: courses, isLoading, error } = useCourses();

  const filteredCourses = useMemo(() => {
    if (!courses) return [];

    let filtered = courses;
    if (showHomepageOnly) {
      filtered = filtered.filter((course) => course.displayOnHome);
    }
    if (limit) {
      filtered = filtered.slice(0, limit);
    }
    return filtered;
  }, [courses, showHomepageOnly, limit]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-full mb-2" />
              <Skeleton className="h-3 w-2/3" />
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Skeleton className="h-8 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">
          Failed to load courses. Please try again.
        </p>
      </div>
    );
  }

  if (filteredCourses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No courses available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  const isDiscounted = course.discountStatus && course.temporaryPrice;
  const displayPrice = isDiscounted ? course.temporaryPrice : course.price;
  const originalPrice = isDiscounted ? course.price : null;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {course.thumbnail && (
        <div className="relative h-48 w-full">
          <Image
            src={course.thumbnail}
            alt={course.courseName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {isDiscounted && (
            <Badge className="absolute top-2 right-2 bg-red-500">Sale</Badge>
          )}
        </div>
      )}

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {course.courseName}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {course.courseDescription}
        </p>

        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-[#c7cc3f]">
            {displayPrice} ETB
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {originalPrice} ETB
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/course/${course.id}`}>View Course</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
