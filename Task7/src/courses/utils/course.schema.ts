import z, { ZodType } from "zod";
import { Course } from "../course.entity";

export const courseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  image: z.optional(),
}) satisfies ZodType<Course>;
