import { z } from "zod";

export const CompetitionSchema = z.object({
  id: z.string(),
  title: z.string(),
  grade: z.union([z.literal(9), z.literal(10), z.literal(11), z.literal(12)]),
  startTime: z.string(),
  endTime: z.string(),
  entryFee: z.number().default(0),
  prizePool: z.number().default(0),
});

export type Competition = z.infer<typeof CompetitionSchema>;

export const competitionsMock: Competition[] = [
  {
    id: "comp-physics-weekly",
    title: "Weekly Physics Challenge",
    grade: 10,
    startTime: "2099-01-01T09:00:00Z",
    endTime: "2099-01-01T10:00:00Z",
    entryFee: 10,
    prizePool: 1000,
  },
];
