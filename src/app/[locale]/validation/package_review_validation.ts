import { z } from "zod";
export const packageReviewSchema: any = z.object({
  text: z.string().min(1, "text is required"),
});
