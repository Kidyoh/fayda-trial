import { z } from "zod";
export const RegisterExamTakerSchema: any = z.object({
  phoneNumber: z.string().min(1, "Phone Number is required"),
  school: z.string(),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region is required"),
  grade: z.string().min(1, "Grade is required"),
  gender: z.string().min(1, "Gender is required"),
  scienceType: z.string().min(6, "Science Feild is required!"),

  //isVerified: z.boolean().optional()
});
