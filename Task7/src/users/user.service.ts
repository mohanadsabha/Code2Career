import { userRepository } from "./user.repository";
import { User } from "../generated/prisma";

class UserService {
  private repository = userRepository;

  async getUser(id: number): Promise<User | null> {
    return await this.repository.findById(id);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findByEmail(email);
  }

  public async createCoach(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    return await this.repository.create({
      name,
      email,
      password,
      Role: "COACH",
    });
  }

  public async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    return await this.repository.create({
      name,
      email,
      password,
      Role: "STUDENT",
    });
  }

  async updateUser(
    id: number,
    name: string,
    email: string
  ): Promise<User | null> {
    return await this.repository.update(id, { name, email });
  }

  async isUserIdExist(id: number): Promise<boolean> {
    const user = await this.repository.findById(id);
    return !!user;
  }
}

export const userService = new UserService();
