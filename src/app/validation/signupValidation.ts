import { z } from "zod";
export const signUpInfoSchema: any = z
  .object({
    email: z.string().email({ message: "An email is required." }),
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    schoolName: z.string(),
    grandName: z.string(),
    age: z.string().min(1, "Age is required"),
    gread: z.string().min(1, "Gread is required"),
    city: z.string().min(1, "City is required"),
    region: z.string().min(1, "Region is required"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string().min(6),

    //isVerified: z.boolean().optional()
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "The passwords did not match",
    path: ["confirmPassword"],
  });
