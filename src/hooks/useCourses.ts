"use client";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api/client";
import { CourseSchema, coursesMock } from "@/data/courses";
import { useAuth } from "./useAuth";

const coursesArraySchema = CourseSchema.array();

export function useCourses() {
  const { accessToken, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["courses", isAuthenticated],
    queryFn: async () => {
      if (!isAuthenticated) {
        // Return mock data for unauthenticated users
        return coursesMock;
      }

      try {
        return await apiGet("/courses", coursesArraySchema, { accessToken });
      } catch (error) {
        console.warn("API failed, falling back to mock data:", error);
        return coursesMock;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function usePublicCourses() {
  return useQuery({
    queryKey: ["courses", "public"],
    queryFn: async () => {
      try {
        return await apiGet("/courses/public", coursesArraySchema);
      } catch (error) {
        console.warn("API failed, falling back to mock data:", error);
        return coursesMock.filter((course) => course.displayOnHome);
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useCourse(courseId: string) {
  const { accessToken, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["course", courseId, isAuthenticated],
    queryFn: async () => {
      if (!isAuthenticated) {
        const course = coursesMock.find((c) => c.id === courseId);
        if (!course) throw new Error("Course not found");
        return course;
      }

      try {
        return await apiGet(`/courses/${courseId}`, CourseSchema, {
          accessToken,
        });
      } catch (error) {
        console.warn("API failed, falling back to mock data:", error);
        const course = coursesMock.find((c) => c.id === courseId);
        if (!course) throw new Error("Course not found");
        return course;
      }
    },
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
