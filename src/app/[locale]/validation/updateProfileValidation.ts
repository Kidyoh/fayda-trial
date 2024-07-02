import { z } from "zod";
export const updateProfileInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});
