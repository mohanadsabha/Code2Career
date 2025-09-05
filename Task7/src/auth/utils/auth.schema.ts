import { ZodType } from "zod";
import { userSchema } from "../../users/utils/user.schema";
import { LoginDTO, RegisterDTO } from "../types/auth.dto";

export const registerDTOSchema = userSchema.pick({
  email: true,
  name: true,
  password: true,
}) satisfies ZodType<RegisterDTO>;

export const loginDTOSchema = userSchema.pick({
  email: true,
  password: true,
}) satisfies ZodType<LoginDTO>;
