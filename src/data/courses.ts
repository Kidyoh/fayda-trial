import { z } from "zod";

export const CourseSchema = z.object({
  id: z.string(),
  courseName: z.string(),
  courseDescription: z.string().optional().default(""),
  price: z.number(),
  temporaryPrice: z.number().optional(),
  discountStatus: z.boolean().default(false),
  discountExpiryDate: z.string().optional(),
  status: z.boolean().default(true),
  displayOnHome: z.boolean().default(false),
  thumbnail: z.string().optional(),
});

export type Course = z.infer<typeof CourseSchema>;

export const coursesMock: Course[] = [
  {
    id: "c-math-9",
    courseName: "Mathematics Grade 9",
    courseDescription: "Algebra, geometry, and number theory fundamentals",
    price: 299,
    temporaryPrice: 199,
    discountStatus: true,
    discountExpiryDate: "2099-12-31",
    status: true,
    displayOnHome: true,
    thumbnail: "/course/Math.png",
  },
  {
    id: "c-physics-10",
    courseName: "Physics Grade 10",
    courseDescription: "Mechanics, energy, and waves",
    price: 349,
    discountStatus: false,
    status: true,
    displayOnHome: true,
    thumbnail: "/course/Physics.png",
  },
];
