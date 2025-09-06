import { User } from "./user.entity";
import { GenericRepository } from "../shared/generic.repository";
import { createArgonHash } from "../auth/utils/argon.util";

class UserRepository extends GenericRepository<User> {
  constructor() {
    super();
    this.items = [];
    this.idCounter = 2;
    this.init();
  }

  private async init() {
    this.items.push({
      id: "1",
      name: "Admin",
      role: "ADMIN",
      email: "admin@no.com",
      createdAt: new Date("2025-01-01T10:00:00Z"),
      updatedAt: new Date("2025-01-01T10:00:00Z"),
      password: await createArgonHash("admin123"),
    });
  }

  findByEmail(email: string): User | undefined {
    return this.items.find((user) => user.email === email);
  }
}

export const userRepository = new UserRepository();
