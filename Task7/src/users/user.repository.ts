import { User } from "./user.entity";
import { GenericRepository } from "../shared/generic.repository";

export class UserRepository extends GenericRepository<User> {
  constructor() {
    super();
    this.items = [
      {
        id: "1",
        name: "Admin",
        role: "ADMIN",
        email: "admin@no.com",
        createdAt: new Date("2025-01-01T10:00:00Z"),
        updatedAt: new Date("2025-01-01T10:00:00Z"),
        password: "admin123",
      },
    ];
    this.idCounter = 2;
  }

  findByEmail(email: string): User | undefined {
    return this.items.find((user) => user.email === email);
  }
}
