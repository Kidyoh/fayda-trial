import { z } from "zod";
export const updatePasswordSchema: any = z
  .object({
    currentPassword: z.string().min(1, "Current Password is Required!"),
    newPassword: z
      .string()
      .min(6, "Password should be 6 or more characters long"),
    confirmPassword: z.string().min(6),

    //isVerified: z.boolean().optional()
  })
  .refine(
    ({ confirmPassword, newPassword }) => confirmPassword === newPassword,
    {
      message: "The passwords did not match",
      path: ["confirmPassword"],
    }
  );
