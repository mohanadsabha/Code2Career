import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import { Role } from "./util/user.schema";

class UserService {
  private repository = new UserRepository();

  getUser(id: string): User | undefined {
    return this.repository.findById(id);
  }

  public findByEmail(email: string) {
    return this.repository.findByEmail(email);
  }

  public createCoach(name: string, email: string, password: string): User {
    return this.repository.create({ name, email, password, role: "COACH" });
  }

  updateUser(id: string, name: string, email: string, role: Role): User | null {
    return this.repository.update(id, { name, email, role });
  }

  isUserIdExist(id: string): boolean {
    return !!this.repository.findById(id);
  }
}

export const userService = new UserService();
