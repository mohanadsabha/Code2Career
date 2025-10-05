import { User } from "../../users/user.entity";

export type StringObject = Record<string, unknown>;

export type LoginDTO = {
  email: string;
  password: string;
};
export type RegisterDTO = Pick<User, "email" | "name" | "password">;

export type LoginResponseDTO = {
  success: boolean;
  data: Omit<User, "password">;
  token: string;
};

export type RegisterResponseDTO = {
  success: boolean;
  data: Omit<User, "password">;
};
