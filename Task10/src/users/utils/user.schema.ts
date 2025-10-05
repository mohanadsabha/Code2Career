import z, { ZodType } from "zod";
import { User } from "../user.entity";

export type Role = "ADMIN" | "COACH" | "STUDENT";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.enum(["ADMIN", "COACH", "STUDENT"]),
  createdAt: z.date(),
  updatedAt: z.date(),
  password: z.string().min(8),
}) satisfies ZodType<User>;
