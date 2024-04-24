import { z } from "zod";
export const forgotPasswordValidationSchema: any = z
  .object({
    email: z.string(),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string().min(6),

    //isVerified: z.boolean().optional()
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "The passwords did not match",
    path: ["confirmPassword"],
  });
