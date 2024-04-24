import { z } from "zod";
export const emailValidationSchema: any = z.object({
  email: z.string().email({ message: "An email is required." }),
});
