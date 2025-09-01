import { userRole } from "./util/user.schema";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: userRole;
  createdAt: Date;
  updatedAt: Date;
}
