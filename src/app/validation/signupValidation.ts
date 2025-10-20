import { z } from "zod";

// User-friendly password validation
const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(50, "Password is too long");

// Age validation
const ageSchema = z
  .string()
  .min(1, "Age is required")
  .refine((val) => {
    const age = parseInt(val);
    return age >= 13 && age <= 100;
  }, "Age must be between 13 and 100");

export const signUpInfoSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First Name is required")
      .max(50, "First name is too long"),
    lastName: z
      .string()
      .min(1, "Last Name is required")
      .max(50, "Last name is too long"),
    grandName: z
      .string()
      .min(1, "Grand Name is required")
      .max(50, "Grand name is too long"),
    email: z.string().email("Please enter a valid email address"),
    password: passwordSchema,
    confirmPassword: z.string(),
    age: ageSchema,
    grade: z.string().min(1, "Grade is required"), // Fixed typo: gread -> grade
    city: z.string().trim().min(1, "City is required"),
    region: z.string().trim().min(1, "Region is required"),
    schoolName: z
      .string()
      .min(1, "School Name is required")
      .max(100, "School name is too long"),
    promocode: z.string().optional(),
    studentStatus: z.enum(["active", "inactive"]).default("active"),
    referralSource: z.string().min(1, "Please select how you heard about us"),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Export the inferred type
export type SignUpFormData = z.infer<typeof signUpInfoSchema>;
