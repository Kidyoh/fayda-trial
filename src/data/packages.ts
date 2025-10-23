import { z } from "zod";

export const PackageSchema = z.object({
  id: z.string(),
  packageName: z.string(),
  description: z.string().optional().default(""),
  price1: z.number(),
  price2: z.number().optional(),
  price3: z.number().optional(),
  temporaryPrice1: z.number().optional(),
  temporaryPrice2: z.number().optional(),
  temporaryPrice3: z.number().optional(),
  discountStatus: z.boolean().default(false),
  courses: z.array(z.string()).default([]),
});

export type Package = z.infer<typeof PackageSchema>;

export const packagesMock: Package[] = [
  {
    id: "p-sci-9",
    packageName: "Science Bundle Grade 9",
    description: "Biology + Chemistry + Physics",
    price1: 699,
    price2: 999,
    price3: 1299,
    temporaryPrice1: 499,
    discountStatus: true,
    courses: ["c-math-9", "c-physics-10"],
  },
];
