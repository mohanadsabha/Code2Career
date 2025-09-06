import { userRepository } from "./user.repository";
import { User } from "./user.entity";

class UserService {
  private repository = userRepository;

  getUser(id: string): User | undefined {
    return this.repository.findById(id);
  }

  public findByEmail(email: string) {
    return this.repository.findByEmail(email);
  }

  public createCoach(name: string, email: string, password: string): User {
    return this.repository.create({ name, email, password, role: "COACH" });
  }

  public createUser(name: string, email: string, password: string): User {
    return this.repository.create({ name, email, password, role: "STUDENT" });
  }

  updateUser(id: string, name: string, email: string): User | null {
    return this.repository.update(id, { name, email });
  }

  isUserIdExist(id: string): boolean {
    return !!this.repository.findById(id);
  }
}

export const userService = new UserService();
