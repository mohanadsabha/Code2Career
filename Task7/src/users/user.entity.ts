import { Role } from "./utils/user.schema";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
